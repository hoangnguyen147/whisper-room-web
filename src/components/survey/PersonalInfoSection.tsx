import { SurveyData } from './SurveyForm';

interface PersonalInfoSectionProps {
  data: Partial<SurveyData>;
  onChange: (data: Partial<SurveyData>) => void;
  errors: Record<string, string>;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

function RadioGroup({ name, label, options, value, onChange, error, required = true }: RadioGroupProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function PersonalInfoSection({ data, onChange, errors }: PersonalInfoSectionProps) {
  const handleChange = (field: keyof SurveyData, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">I. THÔNG TIN ĐÁP VIÊN</h2>
        <p className="text-gray-600">
          Vui lòng cung cấp thông tin cá nhân để chúng tôi có thể phân tích dữ liệu một cách chính xác.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RadioGroup
          name="gender"
          label="1. Giới tính của bạn?"
          options={['Nam', 'Nữ']}
          value={data.gender}
          onChange={(value) => handleChange('gender', value)}
          error={errors.gender}
        />

        <RadioGroup
          name="age"
          label="2. Tuổi của bạn?"
          options={['18', '19', '20', '21', '22', '23', 'Khác']}
          value={data.age}
          onChange={(value) => handleChange('age', value)}
          error={errors.age}
        />
      </div>

      <RadioGroup
        name="major_group"
        label="3. Ngành học của bạn thuộc nhóm nào dưới đây?"
        options={[
          'Khối ngành I: Khoa học giáo dục và đào tạo giáo viên',
          'Khối ngành II: Nghệ thuật',
          'Khối ngành III: Kinh doanh và quản lý, Pháp luật',
          'Khối ngành IV: Khoa học sự sống, Khoa học tự nhiên',
          'Khối ngành V: Toán và thống kê, Máy tính và công nghệ thông tin...',
          'Khối ngành VI: Sức khoẻ',
          'Khối ngành VII: Nhân văn, Khoa học xã hội và hành vi...'
        ]}
        value={data.major_group}
        onChange={(value) => handleChange('major_group', value)}
        error={errors.major_group}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RadioGroup
          name="academic_year"
          label="4. Bạn đang là sinh viên năm mấy?"
          options={['Năm 1', 'Năm 2', 'Năm 3', 'Năm 4', 'Năm 5']}
          value={data.academic_year}
          onChange={(value) => handleChange('academic_year', value)}
          error={errors.academic_year}
        />

        <RadioGroup
          name="relationship_status"
          label="5. Tình trạng mối quan hệ hiện tại của bạn?"
          options={['Độc thân', 'Đang hẹn hò', 'Đã kết hôn']}
          value={data.relationship_status}
          onChange={(value) => handleChange('relationship_status', value)}
          error={errors.relationship_status}
        />

        <RadioGroup
          name="is_only_child"
          label="6. Bạn có phải là con một không?"
          options={['Có', 'Không']}
          value={data.is_only_child}
          onChange={(value) => handleChange('is_only_child', value)}
          error={errors.is_only_child}
        />

        <RadioGroup
          name="living_area"
          label="7. Khu vực sinh sống hiện tại của gia đình bạn?"
          options={['Nông thôn', 'Thành thị']}
          value={data.living_area}
          onChange={(value) => handleChange('living_area', value)}
          error={errors.living_area}
        />

        <RadioGroup
          name="work_status"
          label="8. Tình trạng công việc của bạn?"
          options={['Không đi làm', 'Đi làm']}
          value={data.work_status}
          onChange={(value) => handleChange('work_status', value)}
          error={errors.work_status}
        />

        <RadioGroup
          name="family_economic_status"
          label="9. Tình trạng kinh tế của gia đình bạn?"
          options={['Thấp', 'Trung bình', 'Cao']}
          value={data.family_economic_status}
          onChange={(value) => handleChange('family_economic_status', value)}
          error={errors.family_economic_status}
        />
      </div>

      <RadioGroup
        name="academic_performance"
        label="10. Kết quả học tập của bạn ở kỳ học gần nhất?"
        options={[
          'Xuất sắc (3.6 đến 4.0)',
          'Giỏi (3.2 đến 3.59)',
          'Khá (2.5 đến 3.19)',
          'Trung bình (2.0 đến 2.49)',
          'Trung bình yếu (1.5 đến 1.9)',
          'Yếu (1.0 đến 1.49)',
          'Kém (dưới 1.0)'
        ]}
        value={data.academic_performance}
        onChange={(value) => handleChange('academic_performance', value)}
        error={errors.academic_performance}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RadioGroup
          name="major_satisfaction"
          label="11. Mức độ hài lòng của bạn với ngành học?"
          options={['Không hài lòng', 'Bình thường', 'Hài lòng']}
          value={data.major_satisfaction}
          onChange={(value) => handleChange('major_satisfaction', value)}
          error={errors.major_satisfaction}
        />

        <RadioGroup
          name="daily_study_hours"
          label="12. Trung bình mỗi ngày bạn dành bao nhiêu giờ cho việc học ngoài giờ lên lớp?"
          options={['Dưới 1 giờ', '1 – 2 giờ', '3 – 4 giờ', 'Trên 4 giờ']}
          value={data.daily_study_hours}
          onChange={(value) => handleChange('daily_study_hours', value)}
          error={errors.daily_study_hours}
        />

        <RadioGroup
          name="exam_preparation_time"
          label="13. Trước kỳ thi, bạn thường bắt đầu ôn tập từ khi nào?"
          options={['Ngay từ đầu kỳ', '1 – 2 tuần trước', 'Vài ngày trước', 'Sát ngày thi']}
          value={data.exam_preparation_time}
          onChange={(value) => handleChange('exam_preparation_time', value)}
          error={errors.exam_preparation_time}
        />

        <RadioGroup
          name="anxiety_impact_on_performance"
          label="14. Mức độ lo âu trước kỳ thi ảnh hưởng đến kết quả học tập của bạn ở mức nào?"
          options={['Không ảnh hưởng', 'Ít ảnh hưởng', 'Trung bình', 'Cao']}
          value={data.anxiety_impact_on_performance}
          onChange={(value) => handleChange('anxiety_impact_on_performance', value)}
          error={errors.anxiety_impact_on_performance}
        />
      </div>
    </div>
  );
}
