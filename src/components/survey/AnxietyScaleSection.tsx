import { SurveyData } from './SurveyForm';

interface AnxietyScaleSectionProps {
  data: Partial<SurveyData>;
  onChange: (data: Partial<SurveyData>) => void;
  errors: Record<string, string>;
}

interface ScaleQuestionProps {
  id: string;
  question: string;
  value?: number;
  onChange: (value: number) => void;
  error?: string;
}

function ScaleQuestion({ id, question, value, onChange, error }: ScaleQuestionProps) {
  const scales = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' }
  ];

  return (
    <div className="mb-4 p-4 border border-gray-200 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1 mb-3 md:mb-0 md:mr-4">
          <p className="text-sm font-medium text-gray-700">{question}</p>
        </div>
        <div className="flex space-x-4">
          {scales.map((scale) => (
            <label key={scale.value} className="flex items-center">
              <input
                type="radio"
                name={id}
                value={scale.value}
                checked={value === scale.value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <span className="ml-1 text-sm text-gray-700">{scale.label}</span>
            </label>
          ))}
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function AnxietyScaleSection({ data, onChange, errors }: AnxietyScaleSectionProps) {
  const handleChange = (field: keyof SurveyData, value: number) => {
    onChange({ [field]: value });
  };

  const worryQuestions = [
    { id: 'w1_fear_poor_performance', text: 'Tôi lo sợ sẽ không làm tốt bài kiểm tra.' },
    { id: 'w2_fear_disappointing_others', text: 'Tôi lo rằng mình sẽ làm người khác thất vọng nếu làm bài không tốt.' },
    { id: 'w3_worry_before_exam', text: 'Tôi thấy lo lắng khi nghĩ về bài thi trước khi bắt đầu.' },
    { id: 'w4_fear_forgetting', text: 'Tôi lo rằng sẽ quên những gì đã học khi làm bài kiểm tra.' },
    { id: 'w5_self_blame', text: 'Tôi thấy tự trách mình nếu làm bài không tốt.' },
    { id: 'w6_worry_about_future', text: 'Tôi lo rằng kết quả kiểm tra sẽ ảnh hưởng đến tương lai của mình.' },
    { id: 'w7_worry_others_better', text: 'Tôi lo lắng về việc người khác làm bài tốt hơn tôi.' },
    { id: 'w8_fear_losing_composure', text: 'Tôi lo rằng sẽ mất bình tĩnh trong phòng thi.' }
  ];

  const emotionalityQuestions = [
    { id: 'e1_stress_preparing', text: 'Tôi cảm thấy căng thẳng khi chuẩn bị cho một kỳ thi quan trọng.' },
    { id: 'e2_difficulty_concentrating', text: 'Tôi thấy khó tập trung khi đang làm bài thi.' },
    { id: 'e3_heart_racing', text: 'Tôi cảm thấy tim mình đập nhanh khi đang làm bài kiểm tra.' },
    { id: 'e4_muscle_tension', text: 'Tôi cảm thấy các cơ bắp của mình căng cứng trong khi làm bài thi.' },
    { id: 'e5_stomach_discomfort', text: 'Tôi cảm thấy dạ dày khó chịu trước hoặc trong khi làm bài thi.' },
    { id: 'e6_nervous_when_receiving_test', text: 'Tôi cảm thấy hồi hộp khi giáo viên phát đề kiểm tra.' },
    { id: 'e7_trembling_hands', text: 'Tôi cảm thấy run rẩy tay khi làm bài thi.' },
    { id: 'e8_time_pressure', text: 'Tôi cảm thấy áp lực thời gian khi làm bài thi.' },
    { id: 'e9_difficulty_sleeping', text: 'Tôi thấy khó ngủ vào đêm trước khi có kỳ thi quan trọng.' },
    { id: 'e10_rapid_breathing', text: 'Tôi cảm thấy nhịp thở nhanh hơn bình thường khi đang làm bài thi.' },
    { id: 'e11_restless_waiting', text: 'Tôi thấy bồn chồn khi chờ đợi đến lượt mình thi.' },
    { id: 'e12_heart_pounding_mention', text: 'Tôi cảm thấy tim đập mạnh khi nghe nhắc đến kỳ thi sắp tới.' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">II. NHẬN XÉT CỦA ĐÁP VIÊN</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Hướng dẫn:</strong> Các bạn vui lòng cho biết mức độ đồng ý của mình về các phát biểu dưới đây theo thang điểm từ 1 đến 4:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-blue-700">
            <div><strong>1.</strong> Hầu như không bao giờ</div>
            <div><strong>2.</strong> Thỉnh thoảng</div>
            <div><strong>3.</strong> Thường xuyên</div>
            <div><strong>4.</strong> Hầu như luôn luôn</div>
          </div>
        </div>
      </div>

      {/* Lo lắng nhận thức (Worry) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 bg-primary text-white p-3 rounded-lg">
          Lo lắng nhận thức (Worry)
        </h3>
        <div className="space-y-2">
          {worryQuestions.map((question, index) => (
            <ScaleQuestion
              key={question.id}
              id={question.id}
              question={`W${index + 1}. ${question.text}`}
              value={data[question.id as keyof SurveyData] as number}
              onChange={(value) => handleChange(question.id as keyof SurveyData, value)}
              error={errors[question.id]}
            />
          ))}
        </div>
      </div>

      {/* Căng thẳng sinh lý (Emotionality) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 bg-primary text-white p-3 rounded-lg">
          Căng thẳng sinh lý (Emotionality)
        </h3>
        <div className="space-y-2">
          {emotionalityQuestions.map((question, index) => (
            <ScaleQuestion
              key={question.id}
              id={question.id}
              question={`E${index + 1}. ${question.text}`}
              value={data[question.id as keyof SurveyData] as number}
              onChange={(value) => handleChange(question.id as keyof SurveyData, value)}
              error={errors[question.id]}
            />
          ))}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm text-green-800">
          <strong>Lưu ý:</strong> Không có câu trả lời đúng hay sai. Vui lòng trả lời một cách trung thực nhất 
          để chúng tôi có thể hiểu rõ hơn về tình trạng của bạn và đưa ra hỗ trợ phù hợp.
        </p>
      </div>
    </div>
  );
}
