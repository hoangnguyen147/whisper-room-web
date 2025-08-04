'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface BookingInfo {
  slot: {
    id: number;
    start_time: string;
    end_time: string;
    is_scheduled: boolean;
    message?: string;
    whisper_room_type: string;
    client: number;
  };
  method: string;
  message?: string;
}

export default function BookingConfirmationPage() {
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Lấy thông tin booking từ localStorage
    const storedBookingInfo = localStorage.getItem('booking_info');
    
    if (!storedBookingInfo) {
      // Nếu không có thông tin booking, chuyển về trang chủ
      router.push('/');
      return;
    }

    try {
      const parsedInfo = JSON.parse(storedBookingInfo);
      setBookingInfo(parsedInfo);
    } catch (error) {
      console.error('Error parsing booking info:', error);
      router.push('/');
      return;
    }

    setLoading(false);
  }, [router]);

  const getMethodDisplayName = (method: string) => {
    switch (method) {
      case 'direct_human':
        return 'Trực tiếp với người thật';
      case 'ai_interaction':
        return 'Tương tác với AI';
      case 'virtual_reality':
        return 'Thực tế ảo (VR)';
      default:
        return method;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'direct_human':
        return '👥';
      case 'ai_interaction':
        return '🤖';
      case 'virtual_reality':
        return '🥽';
      default:
        return '💬';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const handleStartOver = () => {
    // Xóa tất cả thông tin trong localStorage
    localStorage.removeItem('whisper_room_client_id');
    localStorage.removeItem('whisper_room_method');
    localStorage.removeItem('booking_info');
    
    // Chuyển về trang chủ
    router.push('/');
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Card>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Đang tải thông tin...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!bookingInfo) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Card>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Không tìm thấy thông tin đặt lịch
            </h2>
            <Link href="/">
              <Button>Về trang chủ</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const { date, time } = formatDateTime(bookingInfo.slot.start_time);
  const endTime = formatDateTime(bookingInfo.slot.end_time).time;

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container-custom">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white">✓</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Đặt lịch thành công!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cảm ơn bạn đã tin tưởng Whisper Room. Chúng tôi đã nhận được yêu cầu đặt lịch 
            và sẽ sớm liên hệ với bạn để xác nhận.
          </p>
        </div>

        {/* Booking Details */}
        <Card className="max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Thông tin cuộc hẹn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date & Time */}
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-3">📅</div>
              <h3 className="font-semibold text-gray-800 mb-2">Thời gian</h3>
              <p className="text-gray-700 font-medium">{date}</p>
              <p className="text-primary font-bold text-lg">{time} - {endTime}</p>
            </div>

            {/* Method */}
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-3xl mb-3">{getMethodIcon(bookingInfo.method)}</div>
              <h3 className="font-semibold text-gray-800 mb-2">Phương thức</h3>
              <p className="text-gray-700 font-medium">
                {getMethodDisplayName(bookingInfo.method)}
              </p>
            </div>
          </div>

          {/* Message */}
          {bookingInfo.message && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Ghi chú của bạn:</h3>
              <p className="text-gray-700 italic">"{bookingInfo.message}"</p>
            </div>
          )}

          {/* Booking ID */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Mã đặt lịch: <span className="font-mono font-semibold">WR-{bookingInfo.slot.id}</span>
            </p>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="max-w-3xl mx-auto mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Các bước tiếp theo</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                1
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Xác nhận từ đội ngũ</h4>
                <p className="text-gray-600 text-sm">
                  Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận cuộc hẹn và cung cấp thông tin chi tiết.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                2
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Chuẩn bị cho buổi hẹn</h4>
                <p className="text-gray-600 text-sm">
                  Hãy chuẩn bị tinh thần thoải mái và suy nghĩ về những vấn đề bạn muốn chia sẻ.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                3
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Tham gia phiên hỗ trợ</h4>
                <p className="text-gray-600 text-sm">
                  Đến đúng giờ và tận hưởng trải nghiệm hỗ trợ tâm lý chuyên nghiệp tại Whisper Room.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Important Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-3">📞 Liên hệ khẩn cấp</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Email:</strong> whisperroom@hutech.edu.vn</p>
              <p><strong>Điện thoại:</strong> (028) 5445 7777</p>
              <p><strong>Giờ hỗ trợ:</strong> 8:00 - 17:00 (T2-T6)</p>
            </div>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <h3 className="font-semibold text-green-800 mb-3">📋 Chính sách hủy/đổi lịch</h3>
            <div className="text-sm text-green-700 space-y-1">
              <p>• Có thể hủy/đổi lịch trước 24 giờ</p>
              <p>• Liên hệ qua email hoặc điện thoại</p>
              {/* <p>• Không mất phí cho việc thay đổi</p> */}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="space-x-4">
            <Link href="/">
              <Button variant="outline" size="lg">
                Về trang chủ
              </Button>
            </Link>
            <Button onClick={handleStartOver} size="lg">
              Đặt lịch mới
            </Button>
          </div>
          
          <p className="text-sm text-gray-500">
            Bạn có thể lưu trang này để tham khảo thông tin cuộc hẹn
          </p>
        </div>

        {/* Thank You Message */}
        <Card className="mt-8 max-w-2xl mx-auto bg-gradient-to-r from-primary to-[#2d5aa0] text-white">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3">Cảm ơn bạn đã tin tưởng!</h3>
            <p className="opacity-90">
              Whisper Room cam kết mang đến cho bạn trải nghiệm hỗ trợ tâm lý tốt nhất. 
              Chúng tôi rất mong được đồng hành cùng bạn trên hành trình chăm sóc sức khỏe tinh thần.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
