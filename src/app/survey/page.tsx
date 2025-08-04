'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SurveyForm, { SurveyData } from '@/components/survey/SurveyForm';
import Card from '@/components/ui/Card';
import { surveyApi, formatApiError } from '@/utils/api';

export default function SurveyPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (data: SurveyData) => {
    setLoading(true);
    setError(null);

    try {
      // Log dữ liệu trước khi gửi để debug
      console.log('📤 Survey data before API call:', data);

      const result = await surveyApi.submitSurvey(data);

      console.log('📥 API response:', result);

      if (result.success && result.client_id) {
        // Lưu client_id vào localStorage
        localStorage.setItem('whisper_room_client_id', result.client_id.toString());

        // Lưu kết quả TAI để hiển thị ở trang kết quả
        const taiResults = {
          tai_score: result.tai_score,
          anxiety_level: result.anxiety_level,
          client_id: result.client_id,
          survey_id: result.survey_id
        };
        localStorage.setItem('tai_results', JSON.stringify(taiResults));

        console.log('✅ TAI Results saved:', taiResults);

        // Chuyển hướng đến trang hiển thị kết quả TAI
        router.push('/survey-results');
      } else {
        throw new Error(result.error || 'Có lỗi xảy ra khi gửi khảo sát');
      }
    } catch (err) {
      console.error('Survey submission error:', err);
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Phiếu Khảo Sát
          </h1>
          <Card className="max-w-4xl mx-auto">
            <div className="text-left">
              <p className="text-gray-600 mb-4">
                <strong>Kính chào các bạn sinh viên thân mến!</strong>
              </p>
              <p className="text-gray-600 mb-4">
                Chúng tôi là Nhóm sinh viên ngành Tâm lý học trường Đại học Công nghệ TP.HCM đang thực hiện đề tài nghiên cứu{' '}
                <strong>"Mối quan hệ giữa mức độ lo âu và thành tích học tập của sinh viên HUTECH".</strong>
              </p>
              <p className="text-gray-600 mb-4">
                Trước tiên, xin cảm ơn các bạn đã nhận lời tham gia trả lời cho phiếu khảo sát của chúng tôi. 
                Cũng xin lưu ý mọi thông tin trung thực do các bạn cung cấp không có quan điểm nào là đúng hay sai 
                và tất cả đều có giá trị cho nghiên cứu của chúng tôi.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Cam kết bảo mật:</strong> Mọi thông tin, kết quả có được chỉ phục vụ cho việc thực hiện đề tài, 
                  không sử dụng vào mục đích nào khác và sẽ được giữ bí mật hoàn toàn. 
                  Vì thế chúng tôi rất mong nhận được sự hợp tác của các bạn.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="max-w-4xl mx-auto mb-8 border-red-200 bg-red-50">
            <div className="text-red-800">
              <h3 className="font-semibold mb-2">Có lỗi xảy ra:</h3>
              <p>{error}</p>
            </div>
          </Card>
        )}

        {/* Survey Form */}
        <SurveyForm onSubmit={handleSubmit} loading={loading} />

        {/* Footer Note */}
        <div className="text-center mt-8">
          <Card className="max-w-2xl mx-auto">
            <p className="text-gray-600 text-sm">
              <strong>Thời gian ước tính:</strong> 5-10 phút<br />
              <strong>Số câu hỏi:</strong> 34 câu hỏi<br />
              <strong>Hỗ trợ:</strong> Nếu có thắc mắc, vui lòng liên hệ whisperroom@hutech.edu.vn
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
