'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

type WhisperRoomType = 'direct_human' | 'ai_interaction' | 'virtual_reality';

interface MethodOption {
  id: WhisperRoomType;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

export default function WhisperRoomMethodPage() {
  const [selectedMethod, setSelectedMethod] = useState<WhisperRoomType | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra xem có client_id trong localStorage không
    const storedClientId = localStorage.getItem('whisper_room_client_id');
    if (!storedClientId) {
      // Nếu không có client_id, chuyển hướng về trang khảo sát
      router.push('/survey');
      return;
    }
    setClientId(storedClientId);
  }, [router]);

  const methods: MethodOption[] = [
    {
      id: 'direct_human',
      title: 'Trực tiếp với người thật',
      description: 'Tương tác trực tiếp với chuyên gia tâm lý, nhận được sự hỗ trợ cá nhân hóa và chuyên nghiệp.',
      icon: '👥',
      features: [
        'Tư vấn chuyên sâu từ chuyên gia',
        'Phản hồi tức thì và cá nhân hóa',
        'Kết nối con người thực sự',
        'Môi trường an toàn và riêng tư',
        'Phương pháp trị liệu truyền thống'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'ai_interaction',
      title: 'Tương tác với AI',
      description: 'Trò chuyện với AI được huấn luyện chuyên biệt về tâm lý học sinh viên',
      icon: '🤖',
      features: [
        // 'Có sẵn 24/7, mọi lúc mọi nơi',
        'Không áp lực xã hội',
        'Phân tích dữ liệu thông minh',
        'Đáp ứng nhanh chóng',
        'Bảo mật thông tin tuyệt đối'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'virtual_reality',
      title: 'Thực tế ảo (VR)',
      description: 'Trải nghiệm môi trường ảo được thiết kế đặc biệt để giảm stress và lo âu hiệu quả.',
      icon: '🥽',
      features: [
        'Môi trường ảo an toàn',
        'Trải nghiệm nhập vai sâu sắc',
        'Công nghệ hiện đại tiên tiến',
        'Liệu pháp thư giãn tự nhiên',
        'Hiệu quả giảm lo âu cao'
      ],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleMethodSelect = (method: WhisperRoomType) => {
    console.log('🎯 Method selected:', method);
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (selectedMethod && clientId) {
      // Lưu phương thức đã chọn vào localStorage
      localStorage.setItem('whisper_room_method', selectedMethod);
      // Chuyển đến trang đặt lịch
      router.push('/booking');
    }
  };

  if (!clientId) {
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
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Chọn phương thức tham gia Whisper Room
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cảm ơn bạn đã hoàn thành khảo sát! Bây giờ hãy chọn phương thức phù hợp nhất 
            để nhận được sự hỗ trợ tâm lý từ Whisper Room.
          </p>
        </div>

        {/* Method Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`cursor-pointer transition-all duration-300 rounded-lg ${
                selectedMethod === method.id
                  ? 'ring-4 ring-primary ring-opacity-50 shadow-xl transform scale-105'
                  : 'hover:shadow-lg hover:transform hover:scale-102'
              }`}
              onClick={() => handleMethodSelect(method.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMethodSelect(method.id);
                }
              }}
            >
              <Card className="h-full border-2 border-transparent hover:border-primary/20 group">
              <div className="text-center">
                {/* Icon */}
                <div className={`w-24 h-24 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-4xl text-white">{method.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {method.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {method.description}
                </p>

                {/* Features */}
                <div className="text-left">
                  <h4 className="font-semibold text-gray-800 mb-3">Đặc điểm nổi bật:</h4>
                  <ul className="space-y-2">
                    {method.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <span className="text-green-500 mr-2 mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selection/Hover Indicator */}
                <div className="mt-4">
                  {selectedMethod === method.id ? (
                    <div className="p-3 bg-primary text-white rounded-lg shadow-md">
                      <span className="text-sm font-medium flex items-center justify-center">
                        <span className="mr-2">✓</span>
                        Đã chọn
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 border-2 border-gray-200 rounded-lg group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                      <span className="text-sm font-medium flex items-center justify-center text-gray-500 group-hover:text-white">
                        Click để chọn
                      </span>
                    </div>
                  )}
                </div>
              </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedMethod}
            className={`px-8 py-4 min-w-[200px] ${!selectedMethod ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {selectedMethod ? 'Tiếp tục đặt lịch' : 'Vui lòng chọn phương thức'}
          </Button>
        </div>

        {/* Additional Info */}
        <Card className="mt-8 max-w-3xl mx-auto">
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-3">Thông tin quan trọng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>⏰ Thời gian:</strong> Mỗi phiên kéo dài 45 phút
              </div>
              <div>
                <strong>💰 Chi phí:</strong> Hoàn toàn miễn phí
              </div>
              <div>
                <strong>📅 Lịch làm việc:</strong> Thứ 2 - Thứ 6, 9:00 - 16:00
              </div>
              <div>
                <strong>🔒 Bảo mật:</strong> Thông tin được bảo vệ tuyệt đối
              </div>
            </div>
          </div>
        </Card>

        {/* Help Section */}
        <Card className="mt-6 max-w-2xl mx-auto bg-blue-50 border-blue-200">
          <div className="text-center">
            <h3 className="font-semibold text-blue-800 mb-2">Cần hỗ trợ chọn phương thức?</h3>
            <p className="text-sm text-blue-700 mb-3">
              Nếu bạn không chắc chắn phương thức nào phù hợp, đội ngũ của chúng tôi sẽ tư vấn miễn phí.
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
