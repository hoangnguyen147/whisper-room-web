// Test functions cho slots API mới
import { slotsApi } from './api';

// Helper function để format date
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper function để tạo date range
const getDateRange = (startDate: Date, days: number): { start: string; end: string } => {
  const start = formatDate(startDate);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + days - 1);
  const end = formatDate(endDate);
  return { start, end };
};

export const testSlotsApiCalls = async () => {
  console.log('🧪 Testing Slots API with new parameters...\n');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const testCases = [
    {
      name: 'Get slots for today only',
      params: { date: formatDate(today) },
      description: 'Single date query'
    },
    {
      name: 'Get slots for next 7 days',
      params: getDateRange(today, 7),
      description: 'Week range query'
    },
    {
      name: 'Get slots from today onwards',
      params: { startDate: formatDate(today) },
      description: 'Open-ended start date'
    },
    {
      name: 'Get slots until next week',
      params: { endDate: formatDate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) },
      description: 'Open-ended end date'
    },
    {
      name: 'Get all available slots',
      params: {},
      description: 'No parameters - all slots'
    }
  ];

  const results = [];

  for (const testCase of testCases) {
    console.log(`🔍 ${testCase.name}`);
    console.log(`📝 ${testCase.description}`);
    
    try {
      const startTime = Date.now();
      
      // Prepare params for API call
      let apiParams: any = {};
      if ('start' in testCase.params && 'end' in testCase.params) {
        apiParams = {
          startDate: testCase.params.start,
          endDate: testCase.params.end
        };
      } else {
        apiParams = testCase.params;
      }
      
      console.log(`📤 API params:`, apiParams);
      
      const result = await slotsApi.getAvailableSlots(apiParams);
      const duration = Date.now() - startTime;
      
      if (result.success) {
        console.log(`✅ Success! Found ${result.data?.length || 0} slots (${duration}ms)`);
        console.log(`📊 Filter info:`, result.filter);
        
        // Log first few slots for verification
        if (result.data && result.data.length > 0) {
          console.log(`📅 Sample slots:`);
          result.data.slice(0, 3).forEach((slot: any, index: number) => {
            const startTime = new Date(slot.start_time).toLocaleString('vi-VN');
            const endTime = new Date(slot.end_time).toLocaleString('vi-VN');
            console.log(`   ${index + 1}. ${startTime} - ${endTime} (ID: ${slot.id})`);
          });
          if (result.data.length > 3) {
            console.log(`   ... and ${result.data.length - 3} more slots`);
          }
        }
        
        results.push({
          testCase: testCase.name,
          success: true,
          count: result.data?.length || 0,
          duration,
          filter: result.filter
        });
      } else {
        console.log(`❌ Failed: ${result.error}`);
        results.push({
          testCase: testCase.name,
          success: false,
          error: result.error,
          duration
        });
      }
    } catch (error) {
      console.log(`💥 Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      results.push({
        testCase: testCase.name,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    
    console.log(''); // Empty line for readability
  }

  // Summary
  console.log('📋 Test Summary:');
  console.log('================');
  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    const info = result.success 
      ? `${result.count} slots (${result.duration}ms)`
      : `Error: ${result.error}`;
    console.log(`${status} ${index + 1}. ${result.testCase}: ${info}`);
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎯 Overall: ${successCount}/${results.length} tests passed`);

  return results;
};

// Test specific date range (useful for calendar component)
export const testWeekRange = async (startDate?: Date) => {
  const start = startDate || new Date();
  const { start: startDateStr, end: endDateStr } = getDateRange(start, 7);
  
  console.log(`🗓️ Testing week range: ${startDateStr} to ${endDateStr}`);
  
  try {
    const result = await slotsApi.getAvailableSlots({
      startDate: startDateStr,
      endDate: endDateStr
    });
    
    if (result.success) {
      console.log(`✅ Found ${result.data?.length || 0} slots for the week`);
      
      // Group by date
      const slotsByDate: { [key: string]: any[] } = {};
      result.data?.forEach((slot: any) => {
        const date = slot.start_time.split('T')[0];
        if (!slotsByDate[date]) {
          slotsByDate[date] = [];
        }
        slotsByDate[date].push(slot);
      });
      
      console.log('📅 Slots by date:');
      Object.entries(slotsByDate).forEach(([date, slots]) => {
        console.log(`   ${date}: ${slots.length} slots`);
      });
      
      return { success: true, slotsByDate, total: result.data?.length || 0 };
    } else {
      console.log(`❌ Failed: ${result.error}`);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.log(`💥 Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Export for use in debug components
export { formatDate, getDateRange };
