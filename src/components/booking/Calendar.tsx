'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Loading from '@/components/ui/Loading';
import ErrorMessage from '@/components/ui/ErrorMessage';
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

interface CalendarProps {
  onSlotSelect: (slot: TimeSlot) => void;
  selectedSlot?: TimeSlot | null;
}

export default function Calendar({ onSlotSelect, selectedSlot }: CalendarProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tạo array 7 ngày từ ngày bắt đầu tuần
  const getWeekDays = (startDate: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeekStart);

  // Format date cho API
  const formatDateForAPI = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Format time cho hiển thị
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Format date cho hiển thị
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Lấy slots từ API
  const fetchSlots = async () => {
    setLoading(true);
    setError(null);

    try {
      // Sử dụng start_date và end_date theo API mới
      const startDate = formatDateForAPI(currentWeekStart);
      const endDate = formatDateForAPI(weekDays[6]); // Ngày cuối tuần

      console.log('📅 Fetching slots for week:', { startDate, endDate });

      const result = await slotsApi.getAvailableSlots({
        startDate,
        endDate
      });

      if (result.success) {
        setSlots(result.data || []);
        console.log('✅ Fetched slots:', result.data?.length || 0, 'slots');
        console.log('📊 Filter info:', result.filter);
      } else {
        throw new Error(result.error || 'Có lỗi xảy ra khi tải lịch');
      }
    } catch (err) {
      console.error('Fetch slots error:', err);
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // Load slots khi component mount hoặc tuần thay đổi
  useEffect(() => {
    fetchSlots();
  }, [currentWeekStart]);

  // Chuyển tuần trước
  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  // Chuyển tuần sau
  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  // Lọc slots theo ngày
  const getSlotsForDate = (date: Date) => {
    const dateString = formatDateForAPI(date);
    return slots.filter(slot => {
      const slotDate = formatDateForAPI(new Date(slot.start_time));
      return slotDate === dateString && !slot.is_scheduled;
    });
  };

  // Nhóm slots theo buổi
  const groupSlotsByPeriod = (daySlots: TimeSlot[]) => {
    const morning = daySlots.filter(slot => {
      const hour = new Date(slot.start_time).getHours();
      return hour < 12;
    });
    
    const afternoon = daySlots.filter(slot => {
      const hour = new Date(slot.start_time).getHours();
      return hour >= 13;
    });

    return { morning, afternoon };
  };

  if (loading && slots.length === 0) {
    return (
      <Card>
        <Loading text="Đang tải lịch..." className="py-8" />
      </Card>
    );
  }

  return (
    <div>
      {/* Calendar Header */}
      <Card className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Chọn thời gian phù hợp</h2>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={goToPreviousWeek}>
              ← Tuần trước
            </Button>
            <span className="text-sm text-gray-600">
              {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
            </span>
            <Button variant="outline" onClick={goToNextWeek}>
              Tuần sau →
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600">
          Thời gian hiển thị theo múi giờ GMT+7. Mỗi phiên tư vấn kéo dài 45 phút.
        </p>
      </Card>

      {/* Error Message */}
      {error && (
        <ErrorMessage
          message={error}
          onRetry={fetchSlots}
          className="mb-6"
        />
      )}

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const daySlots = getSlotsForDate(day);
          const { morning, afternoon } = groupSlotsByPeriod(daySlots);
          const isToday = day.toDateString() === new Date().toDateString();
          const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));

          return (
            <Card
              key={index}
              className={`${isToday ? 'ring-2 ring-primary ring-opacity-50' : ''} ${
                isPast ? 'opacity-50' : ''
              }`}
            >
              {/* Day Header */}
              <div className={`text-center pb-3 border-b border-gray-200 mb-3 ${
                isToday ? 'bg-primary text-white -m-6 mb-3 p-3 rounded-t-lg' : ''
              }`}>
                <div className="font-semibold">
                  {day.toLocaleDateString('vi-VN', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold ${isToday ? 'text-white' : 'text-primary'}`}>
                  {day.getDate()}
                </div>
              </div>

              {/* Morning Slots */}
              {morning.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Buổi sáng
                  </h4>
                  <div className="space-y-1">
                    {morning.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => onSlotSelect(slot)}
                        disabled={isPast}
                        className={`w-full text-xs p-2 rounded border transition-colors ${
                          selectedSlot?.id === slot.id
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        } ${isPast ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                      >
                        {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Afternoon Slots */}
              {afternoon.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Buổi chiều
                  </h4>
                  <div className="space-y-1">
                    {afternoon.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => onSlotSelect(slot)}
                        disabled={isPast}
                        className={`w-full text-xs p-2 rounded border transition-colors ${
                          selectedSlot?.id === slot.id
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        } ${isPast ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                      >
                        {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No slots available */}
              {daySlots.length === 0 && !isPast && (
                <div className="text-center text-gray-400 text-xs py-4">
                  Không có lịch trống
                </div>
              )}

              {/* Past day */}
              {isPast && (
                <div className="text-center text-gray-400 text-xs py-4">
                  Đã qua
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Refresh Button */}
      <div className="text-center mt-6">
        <Button variant="outline" onClick={fetchSlots} loading={loading}>
          🔄 Làm mới lịch
        </Button>
      </div>
    </div>
  );
}
