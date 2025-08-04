# Whisper Room API Documentation

## Tổng quan
API cho hệ thống khảo sát và đặt lịch hẹn Whisper Room với chủ đề "Mối quan hệ giữa mức độ lo âu và thành tích học tập của sinh viên HUTECH".

## Models

### Client
- `nick_name`: string (optional)
- `phone`: string (optional) 
- `email`: email (optional)
- `note`: text (optional)

### SlotTimetable
- `start_time`: datetime (required)
- `end_time`: datetime (required)
- `is_scheduled`: boolean (default: false)
- `message`: text (optional)
- `whisper_room_type`: enum ["direct_human", "ai_interaction", "virtual_reality"] (optional)
- `client`: relation to Client

### Survey
Bao gồm tất cả các trường từ template khảo sát:
- Thông tin cá nhân (giới tính, tuổi, ngành học, v.v.)
- Thang đo lo âu (W1-W8, E1-E12) với thang điểm 1-4
- `client`: relation to Client

## API Endpoints

### 1. POST /api/post-survey
Người dùng điền khảo sát và cập nhật thông tin lên hệ thống.

**Request Body:**
```json
{
  "data": {
    "nick_name": "Nguyễn Văn A", // optional
    "phone": "0123456789", // optional
    "email": "test@example.com", // optional
    "gender": "Nam",
    "age": "age_20",
    "major_group": "Khối ngành V: Toán và thống kê, Máy tính và công nghệ thông tin...",
    "academic_year": "year_3",
    "relationship_status": "Độc thân",
    "is_only_child": "Không",
    "living_area": "Thành thị",
    "work_status": "Đi làm",
    "family_economic_status": "Trung bình",
    "academic_performance": "Khá (2.5 đến 3.19)",
    "major_satisfaction": "Hài lòng",
    "daily_study_hours": "from_1_to_2_hours",
    "exam_preparation_time": "one_to_two_weeks_before",
    "anxiety_impact_on_performance": "Trung bình",
    "w1_fear_poor_performance": 3,
    "w2_fear_disappointing_others": 2,
    "w3_worry_before_exam": 4,
    "w4_fear_forgetting": 3,
    "w5_self_blame": 2,
    "w6_worry_about_future": 4,
    "w7_worry_others_better": 2,
    "w8_fear_losing_composure": 3,
    "e1_stress_preparing": 3,
    "e2_difficulty_concentrating": 4,
    "e3_heart_racing": 2,
    "e4_muscle_tension": 3,
    "e5_stomach_discomfort": 2,
    "e6_nervous_when_receiving_test": 4,
    "e7_trembling_hands": 1,
    "e8_time_pressure": 4,
    "e9_difficulty_sleeping": 3,
    "e10_rapid_breathing": 2,
    "e11_restless_waiting": 3,
    "e12_heart_pounding_mention": 4
  }
}
```

**Response:**
```json
{
  "success": true,
  "client_id": 1,
  "survey_id": 1,
  "message": "Survey submitted successfully"
}
```

### 2. GET /api/get-available-slots
Lấy danh sách các slot có thể được chọn.

**Query Parameters:**
- `date`: string (optional) - Format: YYYY-MM-DD (lấy slot trong 1 ngày cụ thể)
- `start_date`: string (optional) - Format: YYYY-MM-DD (ngày bắt đầu)
- `end_date`: string (optional) - Format: YYYY-MM-DD (ngày kết thúc)

**Examples:**
- Lấy slot trong 1 ngày: `/api/get-available-slots?date=2024-01-15`
- Lấy slot trong khoảng thời gian: `/api/get-available-slots?start_date=2024-01-15&end_date=2024-01-20`
- Lấy slot từ ngày cụ thể trở đi: `/api/get-available-slots?start_date=2024-01-15`
- Lấy slot đến ngày cụ thể: `/api/get-available-slots?end_date=2024-01-20`
- Lấy tất cả slot có sẵn: `/api/get-available-slots`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "start_time": "2024-01-15T09:00:00.000Z",
      "end_time": "2024-01-15T09:45:00.000Z",
      "is_scheduled": false,
      "message": null,
      "whisper_room_type": null,
      "client": null
    },
    {
      "id": 2,
      "start_time": "2024-01-15T10:00:00.000Z",
      "end_time": "2024-01-15T10:45:00.000Z",
      "is_scheduled": false,
      "message": null,
      "whisper_room_type": null,
      "client": null
    }
  ],
  "count": 2,
  "filter": {
    "type": "date_range",
    "start_date": "2024-01-15",
    "end_date": "2024-01-20"
  }
}
```

### 3. POST /api/post-schedule-slot
Schedule một slot.

**Request Body:**
```json
{
  "slot_id": 1,
  "client_id": 1,
  "whisper_room_type": "direct_human", // "direct_human", "ai_interaction", "virtual_reality"
  "message": "Ghi chú thêm cho cuộc hẹn"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "start_time": "2024-01-15T09:00:00.000Z",
    "end_time": "2024-01-15T09:45:00.000Z",
    "is_scheduled": true,
    "message": "Ghi chú thêm cho cuộc hẹn",
    "whisper_room_type": "direct_human",
    "client": 1
  },
  "message": "Slot scheduled successfully"
}
```

### 4. POST /api/generate-slots (Admin)
Tạo các slot thời gian tự động.

**Request Body (Single Date):**
```json
{
  "date": "2024-01-15"
}
```

**Request Body (Date Range):**
```json
{
  "startDate": "2024-01-15",
  "endDate": "2024-01-31"
}
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 6,
  "message": "Slots generated successfully"
}
```

## Lịch làm việc
- **Giờ làm việc:** 9:00 - 16:00
- **Nghỉ trưa:** 12:00 - 13:00
- **Các slot:** 
  - 9:00-9:45
  - 10:00-10:45
  - 11:00-11:45
  - 13:00-13:45
  - 14:00-14:45
  - 15:00-15:45

## Phương thức tham gia Whisper Room
1. **direct_human**: Trực tiếp với người thật
2. **ai_interaction**: Tương tác với AI
3. **virtual_reality**: Trải nghiệm mô hình thực tế ảo

## Enum Values Mapping

### Age Values:
- `age_18` = "18 tuổi"
- `age_19` = "19 tuổi"
- `age_20` = "20 tuổi"
- `age_21` = "21 tuổi"
- `age_22` = "22 tuổi"
- `age_23` = "23 tuổi"
- `age_other` = "Khác"

### Academic Year Values:
- `year_1` = "Năm 1"
- `year_2` = "Năm 2"
- `year_3` = "Năm 3"
- `year_4` = "Năm 4"
- `year_5` = "Năm 5"

### Daily Study Hours Values:
- `under_1_hour` = "Dưới 1 giờ"
- `from_1_to_2_hours` = "1 – 2 giờ"
- `from_3_to_4_hours` = "3 – 4 giờ"
- `over_4_hours` = "Trên 4 giờ"

### Exam Preparation Time Values:
- `from_beginning_of_term` = "Ngay từ đầu kỳ"
- `one_to_two_weeks_before` = "1 – 2 tuần trước"
- `few_days_before` = "Vài ngày trước"
- `close_to_exam_day` = "Sát ngày thi"

## Error Handling
Tất cả API sẽ trả về format lỗi như sau:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Setup và Chạy
1. Cài đặt dependencies: `npm install`
2. Cấu hình database trong `config/database.ts`
3. Chạy development: `npm run develop`
4. Tạo slots cho ngày hiện tại: POST `/api/generate-slots` với `{"date": "YYYY-MM-DD"}`
