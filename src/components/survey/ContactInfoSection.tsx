import { SurveyData } from './SurveyForm';

interface ContactInfoSectionProps {
  data: Partial<SurveyData>;
  onChange: (data: Partial<SurveyData>) => void;
  errors: Record<string, string>;
}

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

function InputField({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false 
}: InputFieldProps) {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
        {!required && <span className="text-gray-500 text-xs">(tùy chọn)</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function ContactInfoSection({ data, onChange, errors }: ContactInfoSectionProps) {
  const handleChange = (field: keyof SurveyData, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">III. THÔNG TIN LIÊN HỆ</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800 mb-2">
            <strong>Thông tin này hoàn toàn tùy chọn.</strong> Nếu bạn muốn nhận thông báo về kết quả nghiên cứu 
            hoặc đặt lịch tham gia Whisper Room, vui lòng cung cấp thông tin liên hệ.
          </p>
          <p className="text-xs text-yellow-700">
            Chúng tôi cam kết bảo mật thông tin cá nhân và chỉ sử dụng cho mục đích nghiên cứu và hỗ trợ.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Tên gọi (biệt danh)"
          name="nick_name"
          placeholder="Ví dụ: Minh, An, Bình..."
          value={data.nick_name}
          onChange={(value) => handleChange('nick_name', value)}
          error={errors.nick_name}
        />

        <InputField
          label="Số điện thoại"
          name="phone"
          type="tel"
          placeholder="Ví dụ: 0901234567"
          value={data.phone}
          onChange={(value) => handleChange('phone', value)}
          error={errors.phone}
        />

        <div className="md:col-span-2">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Ví dụ: example@student.hutech.edu.vn"
            value={data.email}
            onChange={(value) => handleChange('email', value)}
            error={errors.email}
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h3 className="font-semibold text-blue-800 mb-2">Lợi ích khi cung cấp thông tin liên hệ:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Nhận thông báo về kết quả nghiên cứu và báo cáo tổng hợp</li>
          <li>• Được mời tham gia các buổi chia sẻ và hội thảo về sức khỏe tâm lý</li>
          <li>• Có thể đặt lịch tham gia Whisper Room để nhận hỗ trợ cá nhân</li>
          <li>• Được ưu tiên tham gia các chương trình hỗ trợ tâm lý miễn phí</li>
        </ul>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
        <h3 className="font-semibold text-green-800 mb-2">🎉 Bạn sắp hoàn thành khảo sát!</h3>
        <p className="text-sm text-green-700">
          Cảm ơn bạn đã dành thời gian tham gia nghiên cứu của chúng tôi. Thông tin bạn cung cấp 
          sẽ góp phần quan trọng vào việc hiểu rõ hơn về mối quan hệ giữa lo âu và thành tích học tập, 
          từ đó giúp chúng tôi phát triển các giải pháp hỗ trợ hiệu quả cho sinh viên.
        </p>
      </div>
    </div>
  );
}
