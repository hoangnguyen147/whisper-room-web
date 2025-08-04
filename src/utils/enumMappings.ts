// Mapping giữa display text và enum values cho API

export const AGE_MAPPING = {
  '18': 'age_18',
  '19': 'age_19',
  '20': 'age_20',
  '21': 'age_21',
  '22': 'age_22',
  '23': 'age_23',
  'Khác': 'age_other'
};

export const ACADEMIC_YEAR_MAPPING = {
  'Năm 1': 'year_1',
  'Năm 2': 'year_2',
  'Năm 3': 'year_3',
  'Năm 4': 'year_4',
  'Năm 5': 'year_5'
};

export const DAILY_STUDY_HOURS_MAPPING = {
  'Dưới 1 giờ': 'under_1_hour',
  '1 – 2 giờ': 'from_1_to_2_hours',
  '3 – 4 giờ': 'from_3_to_4_hours',
  'Trên 4 giờ': 'over_4_hours'
};

export const EXAM_PREPARATION_TIME_MAPPING = {
  'Ngay từ đầu kỳ': 'from_beginning_of_term',
  '1 – 2 tuần trước': 'one_to_two_weeks_before',
  'Vài ngày trước': 'few_days_before',
  'Sát ngày thi': 'close_to_exam_day'
};

// Reverse mappings để convert từ enum về display text
export const REVERSE_AGE_MAPPING = Object.fromEntries(
  Object.entries(AGE_MAPPING).map(([key, value]) => [value, key])
);

export const REVERSE_ACADEMIC_YEAR_MAPPING = Object.fromEntries(
  Object.entries(ACADEMIC_YEAR_MAPPING).map(([key, value]) => [value, key])
);

export const REVERSE_DAILY_STUDY_HOURS_MAPPING = Object.fromEntries(
  Object.entries(DAILY_STUDY_HOURS_MAPPING).map(([key, value]) => [value, key])
);

export const REVERSE_EXAM_PREPARATION_TIME_MAPPING = Object.fromEntries(
  Object.entries(EXAM_PREPARATION_TIME_MAPPING).map(([key, value]) => [value, key])
);

// Helper functions để convert data
export const convertToApiFormat = (data: any) => {
  const converted = { ...data };

  // Convert các fields cần mapping
  if (converted.age && AGE_MAPPING[converted.age as keyof typeof AGE_MAPPING]) {
    converted.age = AGE_MAPPING[converted.age as keyof typeof AGE_MAPPING];
  }

  if (converted.academic_year && ACADEMIC_YEAR_MAPPING[converted.academic_year as keyof typeof ACADEMIC_YEAR_MAPPING]) {
    converted.academic_year = ACADEMIC_YEAR_MAPPING[converted.academic_year as keyof typeof ACADEMIC_YEAR_MAPPING];
  }

  if (converted.daily_study_hours && DAILY_STUDY_HOURS_MAPPING[converted.daily_study_hours as keyof typeof DAILY_STUDY_HOURS_MAPPING]) {
    converted.daily_study_hours = DAILY_STUDY_HOURS_MAPPING[converted.daily_study_hours as keyof typeof DAILY_STUDY_HOURS_MAPPING];
  }

  if (converted.exam_preparation_time && EXAM_PREPARATION_TIME_MAPPING[converted.exam_preparation_time as keyof typeof EXAM_PREPARATION_TIME_MAPPING]) {
    converted.exam_preparation_time = EXAM_PREPARATION_TIME_MAPPING[converted.exam_preparation_time as keyof typeof EXAM_PREPARATION_TIME_MAPPING];
  }

  return converted;
};

export const convertFromApiFormat = (data: any) => {
  const converted = { ...data };

  // Convert từ enum về display text
  if (converted.age && REVERSE_AGE_MAPPING[converted.age]) {
    converted.age = REVERSE_AGE_MAPPING[converted.age];
  }

  if (converted.academic_year && REVERSE_ACADEMIC_YEAR_MAPPING[converted.academic_year]) {
    converted.academic_year = REVERSE_ACADEMIC_YEAR_MAPPING[converted.academic_year];
  }

  if (converted.daily_study_hours && REVERSE_DAILY_STUDY_HOURS_MAPPING[converted.daily_study_hours]) {
    converted.daily_study_hours = REVERSE_DAILY_STUDY_HOURS_MAPPING[converted.daily_study_hours];
  }

  if (converted.exam_preparation_time && REVERSE_EXAM_PREPARATION_TIME_MAPPING[converted.exam_preparation_time]) {
    converted.exam_preparation_time = REVERSE_EXAM_PREPARATION_TIME_MAPPING[converted.exam_preparation_time];
  }

  return converted;
};
