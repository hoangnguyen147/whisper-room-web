'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface TAIResults {
  tai_score: number | null;
  anxiety_level: string;
  client_id: number;
  survey_id: number;
}

export default function SurveyResultsPage() {
  const [results, setResults] = useState<TAIResults | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Lấy kết quả TAI từ localStorage
    const storedResults = localStorage.getItem('tai_results');
    
    if (!storedResults) {
      // Nếu không có kết quả, chuyển về trang khảo sát
      router.push('/survey');
      return;
    }

    try {
      const parsedResults = JSON.parse(storedResults);
      setResults(parsedResults);
    } catch (error) {
      console.error('Error parsing TAI results:', error);
      router.push('/survey');
      return;
    }

    setLoading(false);
  }, [router]);

  const getAnxietyLevelInfo = (level: string) => {
    switch (level) {
      case 'Thấp':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: '🟢',
          description: 'Mức độ lo âu của bạn ở mức thấp. Đây là dấu hiệu tích cực cho sức khỏe tâm lý.',
          recommendation: 'Hãy duy trì lối sống lành mạnh và các hoạt động giảm stress hiện tại.'
        };
      case 'Trung bình':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: '🟡',
          description: 'Mức độ lo âu của bạn ở mức trung bình. Đây là mức độ phổ biến ở sinh viên.',
          recommendation: 'Có thể cần một số kỹ thuật quản lý stress để cải thiện sức khỏe tâm lý.'
        };
      case 'Cao':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: '🔴',
          description: 'Mức độ lo âu của bạn ở mức cao. Điều này có thể ảnh hưởng đến học tập và cuộc sống.',
          recommendation: 'Chúng tôi khuyến nghị bạn tham gia các phiên hỗ trợ tâm lý để được giúp đỡ.'
        };
      case 'Không đủ dữ liệu':
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: '⚪',
          description: 'Không đủ dữ liệu để đánh giá chính xác mức độ lo âu.',
          recommendation: 'Bạn có thể làm lại khảo sát để có kết quả chính xác hơn.'
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: '❓',
          description: 'Kết quả chưa được xác định.',
          recommendation: 'Vui lòng liên hệ với chúng tôi để được hỗ trợ.'
        };
    }
  };

  const handleContinue = () => {
    // Chuyển đến trang chọn phương thức
    router.push('/whisper-room-method');
  };

  const handleRetakeTest = () => {
    // Xóa kết quả cũ và làm lại khảo sát
    localStorage.removeItem('tai_results');
    localStorage.removeItem('whisper_room_client_id');
    router.push('/survey');
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Card>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Đang tải kết quả...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Card>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Không tìm thấy kết quả khảo sát
            </h2>
            <Link href="/survey">
              <Button>Làm khảo sát</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const anxietyInfo = getAnxietyLevelInfo(results.anxiety_level);

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Kết quả đánh giá TAI
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dựa trên thang đo TAI (Trait Anxiety Inventory), chúng tôi đã phân tích mức độ lo âu của bạn
          </p>
        </div>

        {/* Main Results */}
        <Card className={`max-w-4xl mx-auto mb-8 ${anxietyInfo.bgColor} ${anxietyInfo.borderColor} border-2`}>
          <div className="text-center">
            <div className="text-6xl mb-4">{anxietyInfo.icon}</div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Mức độ lo âu: <span className={anxietyInfo.color}>{results.anxiety_level}</span>
            </h2>
            
            {results.tai_score !== null && (
              <div className="mb-4">
                <span className="text-lg text-gray-600">Điểm TAI: </span>
                <span className="text-2xl font-bold text-primary">{results.tai_score}/80</span>
              </div>
            )}

            <p className="text-gray-700 mb-4 leading-relaxed">
              {anxietyInfo.description}
            </p>

            <div className={`p-4 rounded-lg ${anxietyInfo.bgColor} border ${anxietyInfo.borderColor}`}>
              <h3 className="font-semibold text-gray-800 mb-2">💡 Khuyến nghị:</h3>
              <p className="text-gray-700">{anxietyInfo.recommendation}</p>
            </div>
          </div>
        </Card>

        {/* TAI Score Breakdown */}
        <Card className="max-w-4xl mx-auto mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Thang đo TAI</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-lg border-2 ${results.anxiety_level === 'Thấp' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="text-center">
                <div className="text-2xl mb-2">🟢</div>
                <h4 className="font-semibold text-green-600">Thấp</h4>
                <p className="text-sm text-gray-600">20-39 điểm</p>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border-2 ${results.anxiety_level === 'Trung bình' ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="text-center">
                <div className="text-2xl mb-2">🟡</div>
                <h4 className="font-semibold text-yellow-600">Trung bình</h4>
                <p className="text-sm text-gray-600">40-59 điểm</p>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border-2 ${results.anxiety_level === 'Cao' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="text-center">
                <div className="text-2xl mb-2">🔴</div>
                <h4 className="font-semibold text-red-600">Cao</h4>
                <p className="text-sm text-gray-600">60-80 điểm</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p><strong>Lưu ý:</strong> Thang đo TAI đánh giá mức độ lo âu đặc trưng dựa trên 20 câu hỏi. 
            Kết quả này chỉ mang tính chất tham khảo và không thay thế cho chẩn đoán y khoa chuyên nghiệp.</p>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="max-w-4xl mx-auto mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🚀 Bước tiếp theo</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h4 className="font-semibold text-gray-800 mb-2">Nhận hỗ trợ</h4>
              <p className="text-gray-600 text-sm mb-4">
                Tham gia Whisper Room để nhận được sự hỗ trợ tâm lý chuyên nghiệp
              </p>
              <Button onClick={handleContinue} size="lg" className="w-full">
                Chọn phương thức hỗ trợ
              </Button>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🔄</div>
              <h4 className="font-semibold text-gray-800 mb-2">Làm lại khảo sát</h4>
              <p className="text-gray-600 text-sm mb-4">
                Nếu bạn muốn trả lời lại các câu hỏi để có kết quả chính xác hơn
              </p>
              <Button onClick={handleRetakeTest} variant="outline" size="lg" className="w-full">
                Làm lại khảo sát
              </Button>
            </div>
          </div>
        </Card>

        {/* Contact Info */}
        <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
          <div className="text-center">
            <h3 className="font-semibold text-blue-800 mb-2">📞 Cần hỗ trợ ngay?</h3>
            <p className="text-sm text-blue-700 mb-3">
              Nếu bạn cảm thấy lo âu nghiêm trọng hoặc cần hỗ trợ khẩn cấp, hãy liên hệ với chúng tôi ngay.
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
