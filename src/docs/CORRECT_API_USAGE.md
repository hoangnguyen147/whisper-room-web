# ✅ Cách sử dụng API đúng format

## 🎯 Vấn đề bạn gặp phải

Bạn đã gửi dữ liệu với format cũ:
```json
{
  "data": {
    "age": "20",                           // ❌ SAI
    "academic_year": "Năm 3",              // ❌ SAI  
    "daily_study_hours": "1 – 2 giờ",     // ❌ SAI
    "exam_preparation_time": "Vài ngày trước" // ❌ SAI
  }
}
```

## ✅ Format đúng phải sử dụng

```json
{
  "data": {
    "age": "age_20",                       // ✅ ĐÚNG
    "academic_year": "year_3",             // ✅ ĐÚNG
    "daily_study_hours": "from_1_to_2_hours", // ✅ ĐÚNG
    "exam_preparation_time": "few_days_before" // ✅ ĐÚNG
  }
}
```

## 📋 Mapping đầy đủ các enum values

### Age (Tuổi):
```
"age_18" = 18 tuổi
"age_19" = 19 tuổi  
"age_20" = 20 tuổi
"age_21" = 21 tuổi
"age_22" = 22 tuổi
"age_23" = 23 tuổi
"age_other" = Khác
```

### Academic Year (Năm học):
```
"year_1" = Năm 1
"year_2" = Năm 2
"year_3" = Năm 3
"year_4" = Năm 4
"year_5" = Năm 5
```

### Daily Study Hours (Số giờ học mỗi ngày):
```
"under_1_hour" = Dưới 1 giờ
"from_1_to_2_hours" = 1 – 2 giờ
"from_3_to_4_hours" = 3 – 4 giờ
"over_4_hours" = Trên 4 giờ
```

### Exam Preparation Time (Thời gian chuẩn bị thi):
```
"from_beginning_of_term" = Ngay từ đầu kỳ
"one_to_two_weeks_before" = 1 – 2 tuần trước
"few_days_before" = Vài ngày trước
"close_to_exam_day" = Sát ngày thi
```

## 🧪 Test API với curl (đúng format)

```bash
curl -X POST http://localhost:1337/api/post-survey \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "gender": "Nam",
      "age": "age_20",
      "major_group": "Khối ngành I: Khoa học giáo dục và đào tạo giáo viên",
      "academic_year": "year_3",
      "is_only_child": "Có",
      "work_status": "Không đi làm",
      "academic_performance": "Giỏi (3.2 đến 3.59)",
      "major_satisfaction": "Bình thường",
      "exam_preparation_time": "few_days_before",
      "relationship_status": "Đang hẹn hò",
      "living_area": "Nông thôn",
      "family_economic_status": "Trung bình",
      "daily_study_hours": "from_1_to_2_hours",
      "anxiety_impact_on_performance": "Ít ảnh hưởng",
      "w3_worry_before_exam": 3,
      "w2_fear_disappointing_others": 2,
      "w1_fear_poor_performance": 1,
      "w4_fear_forgetting": 2,
      "w5_self_blame": 4,
      "w6_worry_about_future": 3,
      "w7_worry_others_better": 3,
      "w8_fear_losing_composure": 3,
      "e1_stress_preparing": 2,
      "e2_difficulty_concentrating": 3,
      "e3_heart_racing": 2,
      "e4_muscle_tension": 2,
      "e5_stomach_discomfort": 3,
      "e6_nervous_when_receiving_test": 3,
      "e7_trembling_hands": 2,
      "e8_time_pressure": 1,
      "e9_difficulty_sleeping": 1,
      "e10_rapid_breathing": 4,
      "e11_restless_waiting": 4,
      "e12_heart_pounding_mention": 4,
      "nick_name": "Huy Hoang",
      "phone": "0898141935",
      "email": ""
    }
  }'
```

## ✅ Response thành công:

```json
{
  "success": true,
  "client_id": 7,
  "survey_id": 6,
  "message": "Survey submitted successfully"
}
```

## 🔧 Các API khác hoạt động bình thường:

### Lấy slot trống:
```bash
curl http://localhost:1337/api/get-available-slots
```

### Đặt lịch:
```bash
curl -X POST http://localhost:1337/api/post-schedule-slot \
  -H "Content-Type: application/json" \
  -d '{
    "slot_id": 3,
    "client_id": 7,
    "whisper_room_type": "direct_human",
    "message": "Cuộc hẹn test"
  }'
```

## 🎊 Kết luận

Vấn đề của bạn đã được giải quyết! Hệ thống hiện đang hoạt động hoàn hảo với:

✅ **184 slots** có sẵn cho 30 ngày tới  
✅ **API post-survey** hoạt động với format đúng  
✅ **API get-available-slots** trả về danh sách slot  
✅ **API post-schedule-slot** đặt lịch thành công  

Chỉ cần sử dụng đúng enum values như đã hướng dẫn ở trên! 🚀
