// Script để test enum mapping trực tiếp
// Chạy với: node scripts/test-enum-mapping.js

// Simulate enum mappings
const AGE_MAPPING = {
  '18': 'age_18',
  '19': 'age_19',
  '20': 'age_20',
  '21': 'age_21',
  '22': 'age_22',
  '23': 'age_23',
  'Khác': 'age_other'
};

const ACADEMIC_YEAR_MAPPING = {
  'Năm 1': 'year_1',
  'Năm 2': 'year_2',
  'Năm 3': 'year_3',
  'Năm 4': 'year_4',
  'Năm 5': 'year_5'
};

const DAILY_STUDY_HOURS_MAPPING = {
  'Dưới 1 giờ': 'under_1_hour',
  '1 – 2 giờ': 'from_1_to_2_hours',
  '3 – 4 giờ': 'from_3_to_4_hours',
  'Trên 4 giờ': 'over_4_hours'
};

const EXAM_PREPARATION_TIME_MAPPING = {
  'Ngay từ đầu kỳ': 'from_beginning_of_term',
  '1 – 2 tuần trước': 'one_to_two_weeks_before',
  'Vài ngày trước': 'few_days_before',
  'Sát ngày thi': 'close_to_exam_day'
};

const convertToApiFormat = (data) => {
  const converted = { ...data };

  if (converted.age && AGE_MAPPING[converted.age]) {
    converted.age = AGE_MAPPING[converted.age];
  }

  if (converted.academic_year && ACADEMIC_YEAR_MAPPING[converted.academic_year]) {
    converted.academic_year = ACADEMIC_YEAR_MAPPING[converted.academic_year];
  }

  if (converted.daily_study_hours && DAILY_STUDY_HOURS_MAPPING[converted.daily_study_hours]) {
    converted.daily_study_hours = DAILY_STUDY_HOURS_MAPPING[converted.daily_study_hours];
  }

  if (converted.exam_preparation_time && EXAM_PREPARATION_TIME_MAPPING[converted.exam_preparation_time]) {
    converted.exam_preparation_time = EXAM_PREPARATION_TIME_MAPPING[converted.exam_preparation_time];
  }

  return converted;
};

// Test data
const testData = {
  gender: 'Nam',
  age: '20',
  major_group: 'Khối ngành V: Toán và thống kê, Máy tính và công nghệ thông tin...',
  academic_year: 'Năm 3',
  relationship_status: 'Đang hẹn hò',
  is_only_child: 'Có',
  living_area: 'Thành thị',
  work_status: 'Không đi làm',
  family_economic_status: 'Trung bình',
  academic_performance: 'Giỏi (3.2 đến 3.59)',
  major_satisfaction: 'Hài lòng',
  daily_study_hours: '1 – 2 giờ',
  exam_preparation_time: 'Vài ngày trước',
  anxiety_impact_on_performance: 'Trung bình',
  w1_fear_poor_performance: 2,
  w2_fear_disappointing_others: 3,
  w3_worry_before_exam: 3,
  w4_fear_forgetting: 2,
  w5_self_blame: 2,
  w6_worry_about_future: 3,
  w7_worry_others_better: 2,
  w8_fear_losing_composure: 2,
  e1_stress_preparing: 3,
  e2_difficulty_concentrating: 2,
  e3_heart_racing: 2,
  e4_muscle_tension: 2,
  e5_stomach_discomfort: 1,
  e6_nervous_when_receiving_test: 3,
  e7_trembling_hands: 1,
  e8_time_pressure: 3,
  e9_difficulty_sleeping: 2,
  e10_rapid_breathing: 1,
  e11_restless_waiting: 2,
  e12_heart_pounding_mention: 2,
  nick_name: 'Test User',
  phone: '0123456789',
  email: 'test@example.com'
};

console.log('🧪 Testing Enum Mapping...\n');

console.log('📤 Original data:');
console.log(JSON.stringify({
  age: testData.age,
  academic_year: testData.academic_year,
  daily_study_hours: testData.daily_study_hours,
  exam_preparation_time: testData.exam_preparation_time
}, null, 2));

const convertedData = convertToApiFormat(testData);

console.log('\n📥 Converted data:');
console.log(JSON.stringify({
  age: convertedData.age,
  academic_year: convertedData.academic_year,
  daily_study_hours: convertedData.daily_study_hours,
  exam_preparation_time: convertedData.exam_preparation_time
}, null, 2));

console.log('\n✅ Expected values:');
console.log('age: "20" -> "age_20"');
console.log('academic_year: "Năm 3" -> "year_3"');
console.log('daily_study_hours: "1 – 2 giờ" -> "from_1_to_2_hours"');
console.log('exam_preparation_time: "Vài ngày trước" -> "few_days_before"');

console.log('\n🎯 Validation:');
console.log(`age: ${convertedData.age === 'age_20' ? '✅' : '❌'} (${convertedData.age})`);
console.log(`academic_year: ${convertedData.academic_year === 'year_3' ? '✅' : '❌'} (${convertedData.academic_year})`);
console.log(`daily_study_hours: ${convertedData.daily_study_hours === 'from_1_to_2_hours' ? '✅' : '❌'} (${convertedData.daily_study_hours})`);
console.log(`exam_preparation_time: ${convertedData.exam_preparation_time === 'few_days_before' ? '✅' : '❌'} (${convertedData.exam_preparation_time})`);

console.log('\n📋 Full converted data for API:');
console.log(JSON.stringify({ data: convertedData }, null, 2));
