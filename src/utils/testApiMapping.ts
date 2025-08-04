// Test function để kiểm tra enum mapping
import { convertToApiFormat, convertFromApiFormat } from './enumMappings';

// Sample data với display values
const sampleDisplayData = {
  gender: 'Nam',
  age: '20',
  major_group: 'Khối ngành I: Khoa học giáo dục và đào tạo giáo viên',
  academic_year: 'Năm 3',
  relationship_status: 'Đang hẹn hò',
  is_only_child: 'Có',
  living_area: 'Nông thôn',
  work_status: 'Không đi làm',
  family_economic_status: 'Trung bình',
  academic_performance: 'Giỏi (3.2 đến 3.59)',
  major_satisfaction: 'Bình thường',
  daily_study_hours: '1 – 2 giờ',
  exam_preparation_time: 'Vài ngày trước',
  anxiety_impact_on_performance: 'Ít ảnh hưởng',
  
  // Anxiety scales
  w1_fear_poor_performance: 1,
  w2_fear_disappointing_others: 2,
  w3_worry_before_exam: 3,
  w4_fear_forgetting: 2,
  w5_self_blame: 4,
  w6_worry_about_future: 3,
  w7_worry_others_better: 3,
  w8_fear_losing_composure: 3,
  e1_stress_preparing: 2,
  e2_difficulty_concentrating: 3,
  e3_heart_racing: 2,
  e4_muscle_tension: 2,
  e5_stomach_discomfort: 3,
  e6_nervous_when_receiving_test: 3,
  e7_trembling_hands: 2,
  e8_time_pressure: 1,
  e9_difficulty_sleeping: 1,
  e10_rapid_breathing: 4,
  e11_restless_waiting: 4,
  e12_heart_pounding_mention: 4,
  
  // Contact info
  nick_name: 'Test User',
  phone: '0123456789',
  email: 'test@example.com'
};

// Expected API format
const expectedApiData = {
  gender: 'Nam',
  age: 'age_20',
  major_group: 'Khối ngành I: Khoa học giáo dục và đào tạo giáo viên',
  academic_year: 'year_3',
  relationship_status: 'Đang hẹn hò',
  is_only_child: 'Có',
  living_area: 'Nông thôn',
  work_status: 'Không đi làm',
  family_economic_status: 'Trung bình',
  academic_performance: 'Giỏi (3.2 đến 3.59)',
  major_satisfaction: 'Bình thường',
  daily_study_hours: 'from_1_to_2_hours',
  exam_preparation_time: 'few_days_before',
  anxiety_impact_on_performance: 'Ít ảnh hưởng',
  
  // Anxiety scales (unchanged)
  w1_fear_poor_performance: 1,
  w2_fear_disappointing_others: 2,
  w3_worry_before_exam: 3,
  w4_fear_forgetting: 2,
  w5_self_blame: 4,
  w6_worry_about_future: 3,
  w7_worry_others_better: 3,
  w8_fear_losing_composure: 3,
  e1_stress_preparing: 2,
  e2_difficulty_concentrating: 3,
  e3_heart_racing: 2,
  e4_muscle_tension: 2,
  e5_stomach_discomfort: 3,
  e6_nervous_when_receiving_test: 3,
  e7_trembling_hands: 2,
  e8_time_pressure: 1,
  e9_difficulty_sleeping: 1,
  e10_rapid_breathing: 4,
  e11_restless_waiting: 4,
  e12_heart_pounding_mention: 4,
  
  // Contact info (unchanged)
  nick_name: 'Test User',
  phone: '0123456789',
  email: 'test@example.com'
};

export const testEnumMapping = () => {
  console.log('🧪 Testing enum mapping...');
  
  // Test conversion to API format
  const convertedToApi = convertToApiFormat(sampleDisplayData);
  console.log('📤 Converted to API format:', convertedToApi);
  
  // Test conversion back to display format
  const convertedToDisplay = convertFromApiFormat(expectedApiData);
  console.log('📥 Converted back to display format:', convertedToDisplay);
  
  // Verify key mappings
  const testCases = [
    { field: 'age', display: '20', api: 'age_20' },
    { field: 'academic_year', display: 'Năm 3', api: 'year_3' },
    { field: 'daily_study_hours', display: '1 – 2 giờ', api: 'from_1_to_2_hours' },
    { field: 'exam_preparation_time', display: 'Vài ngày trước', api: 'few_days_before' }
  ];
  
  console.log('✅ Verification results:');
  testCases.forEach(testCase => {
    const toApiResult = convertToApiFormat({ [testCase.field]: testCase.display });
    const toDisplayResult = convertFromApiFormat({ [testCase.field]: testCase.api });
    
    const toApiCorrect = toApiResult[testCase.field] === testCase.api;
    const toDisplayCorrect = toDisplayResult[testCase.field] === testCase.display;
    
    console.log(`${testCase.field}: ${toApiCorrect && toDisplayCorrect ? '✅' : '❌'} 
      Display->API: ${testCase.display} -> ${toApiResult[testCase.field]} (expected: ${testCase.api})
      API->Display: ${testCase.api} -> ${toDisplayResult[testCase.field]} (expected: ${testCase.display})`);
  });
  
  return {
    sampleDisplayData,
    convertedToApi,
    expectedApiData,
    convertedToDisplay
  };
};

// Export sample data for testing
export { sampleDisplayData, expectedApiData };
