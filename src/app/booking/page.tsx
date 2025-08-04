'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from '@/components/booking/Calendar';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { slotsApi, formatApiError } from '@/utils/api';

interface TimeSlot {
  id: number;
  start_time: string;
  end_time: string;
  is_scheduled: boolean;
  message?: string;
  whisper_room_type?: string;
  client?: number;
}

export default function BookingPage() {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [whisperRoomMethod, setWhisperRoomMethod] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra thông tin cần thiết từ localStorage
    const storedClientId = localStorage.getItem('whisper_room_client_id');
    const storedMethod = localStorage.getItem('whisper_room_method');
    
    if (!storedClientId || !storedMethod) {
      // Nếu thiếu thông tin, chuyển hướng về trang khảo sát
      router.push('/survey');
      return;
    }
    
    setClientId(storedClientId);
    setWhisperRoomMethod(storedMethod);
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

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setError(null);
  };

  const handleBooking = async () => {
    if (!selectedSlot || !clientId || !whisperRoomMethod) {
      setError('Thiếu thông tin cần thiết để đặt lịch');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await slotsApi.scheduleSlot({
        slot_id: selectedSlot.id,
        client_id: parseInt(clientId),
        whisper_room_type: whisperRoomMethod,
        message: message.trim() || undefined
      });

      if (result.success) {
        // Lưu thông tin booking vào localStorage
        localStorage.setItem('booking_info', JSON.stringify({
          slot: result.data,
          method: whisperRoomMethod,
          message: message
        }));

        // Chuyển hướng đến trang xác nhận
        router.push('/booking-confirmation');
      } else {
        throw new Error(result.error || 'Có lỗi xảy ra khi đặt lịch');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  if (!clientId || !whisperRoomMethod) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Card>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Đang kiểm tra thông tin...</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Đặt lịch Whisper Room
          </h1>
          <Card className="max-w-2xl mx-auto">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                <strong>Phương thức đã chọn:</strong> {getMethodDisplayName(whisperRoomMethod)}
              </p>
              <p className="text-sm text-gray-500">
                Vui lòng chọn thời gian phù hợp để tham gia phiên hỗ trợ tâm lý
              </p>
            </div>
          </Card>
        </div>

        {/* Calendar */}
        <Calendar onSlotSelect={handleSlotSelect} selectedSlot={selectedSlot} />

        {/* Booking Details */}
        {selectedSlot && (
          <Card className="mt-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Chi tiết đặt lịch</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời gian
                  </label>
                  <p className="text-gray-900">
                    {formatDateTime(selectedSlot.start_time)}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phương thức
                  </label>
                  <p className="text-gray-900">
                    {getMethodDisplayName(whisperRoomMethod)}
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú thêm (tùy chọn)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ví dụ: Tôi muốn tập trung vào vấn đề lo âu trước kỳ thi..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Chia sẻ thêm về tình trạng hoặc mong muốn của bạn để chúng tôi chuẩn bị tốt hơn
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Booking Button */}
            <div className="mt-6 text-center">
              <Button
                size="lg"
                onClick={handleBooking}
                loading={loading}
                className="px-8"
              >
                Xác nhận đặt lịch
              </Button>
            </div>
          </Card>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
          <Card>
            <h3 className="font-semibold text-gray-800 mb-3">📋 Chuẩn bị trước buổi hẹn</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Chuẩn bị tinh thần thoải mái và cởi mở</li>
              <li>• Suy nghĩ về những vấn đề muốn chia sẻ</li>
              <li>• Đảm bảo môi trường riêng tư và yên tĩnh</li>
              <li>• Có sẵn giấy bút để ghi chú nếu cần</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-800 mb-3">ℹ️ Thông tin quan trọng</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Thời gian: 45 phút mỗi phiên</li>
              <li>• Hoàn toàn miễn phí cho sinh viên</li>
              <li>• Có thể hủy/đổi lịch trước 24h</li>
              <li>• Thông tin được bảo mật tuyệt đối</li>
            </ul>
          </Card>
        </div>

        {/* Contact Info */}
        <Card className="mt-6 max-w-2xl mx-auto bg-blue-50 border-blue-200">
          <div className="text-center">
            <h3 className="font-semibold text-blue-800 mb-2">Cần hỗ trợ?</h3>
            <p className="text-sm text-blue-700 mb-2">
              Nếu bạn gặp khó khăn trong việc đặt lịch hoặc có câu hỏi, hãy liên hệ với chúng tôi.
            </p>
            <div className="text-sm text-blue-600">
              📧 whisperroom@hutech.edu.vn | 📞 (028) 5445 7777
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
