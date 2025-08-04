// Validation script để đảm bảo enum mapping hoạt động đúng
import { 
  AGE_MAPPING, 
  ACADEMIC_YEAR_MAPPING, 
  DAILY_STUDY_HOURS_MAPPING, 
  EXAM_PREPARATION_TIME_MAPPING,
  convertToApiFormat,
  convertFromApiFormat 
} from './enumMappings';

// Test cases dựa trên documentation
const testCases = [
  // Age mapping
  { field: 'age', display: '18', expected: 'age_18' },
  { field: 'age', display: '19', expected: 'age_19' },
  { field: 'age', display: '20', expected: 'age_20' },
  { field: 'age', display: '21', expected: 'age_21' },
  { field: 'age', display: '22', expected: 'age_22' },
  { field: 'age', display: '23', expected: 'age_23' },
  { field: 'age', display: 'Khác', expected: 'age_other' },
  
  // Academic year mapping
  { field: 'academic_year', display: 'Năm 1', expected: 'year_1' },
  { field: 'academic_year', display: 'Năm 2', expected: 'year_2' },
  { field: 'academic_year', display: 'Năm 3', expected: 'year_3' },
  { field: 'academic_year', display: 'Năm 4', expected: 'year_4' },
  { field: 'academic_year', display: 'Năm 5', expected: 'year_5' },
  
  // Daily study hours mapping
  { field: 'daily_study_hours', display: 'Dưới 1 giờ', expected: 'under_1_hour' },
  { field: 'daily_study_hours', display: '1 – 2 giờ', expected: 'from_1_to_2_hours' },
  { field: 'daily_study_hours', display: '3 – 4 giờ', expected: 'from_3_to_4_hours' },
  { field: 'daily_study_hours', display: 'Trên 4 giờ', expected: 'over_4_hours' },
  
  // Exam preparation time mapping
  { field: 'exam_preparation_time', display: 'Ngay từ đầu kỳ', expected: 'from_beginning_of_term' },
  { field: 'exam_preparation_time', display: '1 – 2 tuần trước', expected: 'one_to_two_weeks_before' },
  { field: 'exam_preparation_time', display: 'Vài ngày trước', expected: 'few_days_before' },
  { field: 'exam_preparation_time', display: 'Sát ngày thi', expected: 'close_to_exam_day' }
];

export const validateEnumMapping = () => {
  console.log('🧪 Validating enum mapping...');
  
  let allPassed = true;
  const results: any[] = [];
  
  testCases.forEach((testCase, index) => {
    // Test display -> API conversion
    const inputData = { [testCase.field]: testCase.display };
    const convertedData = convertToApiFormat(inputData);
    const actualApiValue = convertedData[testCase.field];
    
    // Test API -> display conversion
    const apiData = { [testCase.field]: testCase.expected };
    const convertedBackData = convertFromApiFormat(apiData);
    const actualDisplayValue = convertedBackData[testCase.field];
    
    const toApiPassed = actualApiValue === testCase.expected;
    const toDisplayPassed = actualDisplayValue === testCase.display;
    const testPassed = toApiPassed && toDisplayPassed;
    
    if (!testPassed) {
      allPassed = false;
    }
    
    const result = {
      index: index + 1,
      field: testCase.field,
      display: testCase.display,
      expectedApi: testCase.expected,
      actualApi: actualApiValue,
      actualDisplay: actualDisplayValue,
      toApiPassed,
      toDisplayPassed,
      testPassed
    };
    
    results.push(result);
    
    const status = testPassed ? '✅' : '❌';
    console.log(`${status} Test ${index + 1}: ${testCase.field}`);
    console.log(`   Display: "${testCase.display}" -> API: "${actualApiValue}" (expected: "${testCase.expected}") ${toApiPassed ? '✅' : '❌'}`);
    console.log(`   API: "${testCase.expected}" -> Display: "${actualDisplayValue}" (expected: "${testCase.display}") ${toDisplayPassed ? '✅' : '❌'}`);
    console.log('');
  });
  
  console.log(`🎯 Overall result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  console.log(`📊 Summary: ${results.filter(r => r.testPassed).length}/${results.length} tests passed`);
  
  return {
    allPassed,
    results,
    summary: {
      total: results.length,
      passed: results.filter(r => r.testPassed).length,
      failed: results.filter(r => !r.testPassed).length
    }
  };
};

// Sample data để test API call hoàn chỉnh
export const createSampleSurveyData = () => {
  return {
    // Personal info
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
    
    // Anxiety scales (Worry)
    w1_fear_poor_performance: 2,
    w2_fear_disappointing_others: 3,
    w3_worry_before_exam: 3,
    w4_fear_forgetting: 2,
    w5_self_blame: 2,
    w6_worry_about_future: 3,
    w7_worry_others_better: 2,
    w8_fear_losing_composure: 2,
    
    // Anxiety scales (Emotionality)
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
    
    // Contact info (optional)
    nick_name: 'Test User',
    phone: '0123456789',
    email: 'test@example.com'
  };
};

// Expected API format sau khi convert
export const getExpectedApiFormat = () => {
  const sampleData = createSampleSurveyData();
  return convertToApiFormat(sampleData);
};
