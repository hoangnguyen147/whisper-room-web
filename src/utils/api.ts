const API_BASE_URL = 'https://magical-benefit-935c97ace5.strapiapp.com';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  client_id?: number;
  survey_id?: number;
  message?: string;
  count?: number;
}

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Có lỗi xảy ra khi kết nối với server'
    );
  }
}

// Survey API
export const surveyApi = {
  async submitSurvey(surveyData: any): Promise<ApiResponse> {
    // Import enum mapping function
    const { convertToApiFormat } = await import('./enumMappings');

    // Convert data to API format
    const convertedData = convertToApiFormat(surveyData);

    // Log để debug
    console.log('🔄 Original data:', surveyData);
    console.log('🔄 Converted data:', convertedData);
    console.log('📤 Sending to API:', { data: convertedData });

    return apiRequest('/api/post-survey', {
      method: 'POST',
      body: JSON.stringify({ data: convertedData }),
    });
  },
};

// Slots API
export const slotsApi = {
  async getAvailableSlots(options?: {
    date?: string;
    startDate?: string;
    endDate?: string;
    dates?: string[];
  }): Promise<ApiResponse> {
    let endpoint = '/api/get-available-slots';
    const queryParams: string[] = [];

    if (options) {
      // Ưu tiên sử dụng start_date và end_date theo API mới
      if (options.startDate && options.endDate) {
        queryParams.push(`start_date=${options.startDate}`);
        queryParams.push(`end_date=${options.endDate}`);
      } else if (options.startDate) {
        queryParams.push(`start_date=${options.startDate}`);
      } else if (options.endDate) {
        queryParams.push(`end_date=${options.endDate}`);
      } else if (options.date) {
        queryParams.push(`date=${options.date}`);
      } else if (options.dates && options.dates.length > 0) {
        // Fallback cho backward compatibility
        queryParams.push(...options.dates.map(date => `date=${date}`));
      }
    }

    if (queryParams.length > 0) {
      endpoint += `?${queryParams.join('&')}`;
    }

    return apiRequest(endpoint);
  },

  async scheduleSlot(slotData: {
    slot_id: number;
    client_id: number;
    whisper_room_type: string;
    message?: string;
  }): Promise<ApiResponse> {
    return apiRequest('/api/post-schedule-slot', {
      method: 'POST',
      body: JSON.stringify(slotData),
    });
  },
};

// Utility functions
export const formatApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.';
      case 401:
        return 'Không có quyền truy cập. Vui lòng đăng nhập lại.';
      case 403:
        return 'Không có quyền thực hiện hành động này.';
      case 404:
        return 'Không tìm thấy dữ liệu yêu cầu.';
      case 500:
        return 'Lỗi server. Vui lòng thử lại sau.';
      default:
        return error.message;
    }
  }
  
  return error instanceof Error ? error.message : 'Có lỗi không xác định xảy ra';
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof ApiError && !error.status;
};
