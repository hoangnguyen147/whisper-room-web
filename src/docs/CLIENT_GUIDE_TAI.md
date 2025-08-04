# 🧠 Hướng dẫn sử dụng API Survey với tính năng TAI

## 🎯 Tổng quan
API Survey đã được nâng cấp với tính năng tự động tính điểm TAI (Trait Anxiety Inventory) - thang đo đánh giá mức độ lo âu đặc trưng của sinh viên.

## 🚀 Thay đổi quan trọng

### ✅ Schema đã được cập nhật
- **Trước**: Các field enum với giá trị cố định
- **Sau**: Tất cả field thông tin cá nhân là text field
- **Lợi ích**: Không còn bị lỗi enum validation, linh hoạt hơn

### 🧮 Tính năng TAI tự động
- Tự động tính điểm từ 20 câu hỏi lo âu
- Phân loại mức độ lo âu ngay lập tức
- Trả về kết quả trong response

## 📡 API Endpoint

```
POST https://magical-benefit-935c97ace5.strapiapp.com/api/post-survey
```

## 📝 Request Format

### Headers
```
Content-Type: application/json
```

### Body Structure
```json
{
  "data": {
    // Thông tin cá nhân (tùy chọn)
    "nick_name": "Nguyễn Văn A",
    "phone": "0123456789", 
    "email": "test@example.com",
    
    // Thông tin nhân khẩu học (text fields - không bị giới hạn enum)
    "gender": "Nam",
    "age": "20 tuổi",
    "major_group": "Khối ngành V: Toán và thống kê",
    "academic_year": "Năm 3",
    "relationship_status": "Độc thân",
    "is_only_child": "Không",
    "living_area": "Thành thị",
    "work_status": "Không đi làm",
    "family_economic_status": "Trung bình",
    "academic_performance": "Khá (2.5 đến 3.19)",
    "major_satisfaction": "Hài lòng",
    "daily_study_hours": "3-4 giờ",
    "exam_preparation_time": "1-2 tuần trước",
    "anxiety_impact_on_performance": "Trung bình",
    
    // 🔥 CÁC CÂU HỎI TAI (BẮT BUỘC) - Thang điểm 1-4
    // W1-W8: Câu hỏi về lo lắng
    "w1_fear_poor_performance": 3,
    "w2_fear_disappointing_others": 2,
    "w3_worry_before_exam": 4,
    "w4_fear_forgetting": 3,
    "w5_self_blame": 2,
    "w6_worry_about_future": 3,
    "w7_worry_others_better": 2,
    "w8_fear_losing_composure": 3,
    
    // E1-E12: Câu hỏi về cảm xúc/thể chất
    "e1_stress_preparing": 3,
    "e2_difficulty_concentrating": 2,
    "e3_heart_racing": 3,
    "e4_muscle_tension": 2,
    "e5_stomach_discomfort": 2,
    "e6_nervous_when_receiving_test": 4,
    "e7_trembling_hands": 1,
    "e8_time_pressure": 3,
    "e9_difficulty_sleeping": 2,
    "e10_rapid_breathing": 2,
    "e11_restless_waiting": 3,
    "e12_heart_pounding_mention": 2
  }
}
```

## 📊 Response Format

### ✅ Thành công
```json
{
  "success": true,
  "client_id": 123,
  "survey_id": 456,
  "tai_score": 52,
  "anxiety_level": "Trung bình",
  "message": "Survey submitted successfully"
}
```

### ❌ Lỗi
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🎯 Cách tính điểm TAI

### Công thức
1. **Câu hỏi**: 20 câu (W1-W8 + E1-E12)
2. **Thang điểm**: 1-4 điểm/câu
3. **Tổng điểm**: 20-80 điểm
4. **Yêu cầu**: Tối thiểu 15/20 câu trả lời

### Phân loại mức độ
- 🟢 **"Thấp"**: 20-39 điểm
- 🟡 **"Trung bình"**: 40-59 điểm
- 🔴 **"Cao"**: 60-80 điểm
- ⚪ **"Không đủ dữ liệu"**: < 15 câu trả lời

## 💡 Ví dụ thực tế

### Ví dụ 1: Mức độ lo âu cao
```bash
curl -X POST https://magical-benefit-935c97ace5.strapiapp.com/api/post-survey \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "nick_name": "Sinh viên A",
      "w1_fear_poor_performance": 4,
      "w2_fear_disappointing_others": 4,
      "w3_worry_before_exam": 4,
      "w4_fear_forgetting": 4,
      "w5_self_blame": 4,
      "w6_worry_about_future": 4,
      "w7_worry_others_better": 4,
      "w8_fear_losing_composure": 4,
      "e1_stress_preparing": 4,
      "e2_difficulty_concentrating": 4,
      "e3_heart_racing": 4,
      "e4_muscle_tension": 4,
      "e5_stomach_discomfort": 4,
      "e6_nervous_when_receiving_test": 4,
      "e7_trembling_hands": 3,
      "e8_time_pressure": 4,
      "e9_difficulty_sleeping": 4,
      "e10_rapid_breathing": 4,
      "e11_restless_waiting": 4,
      "e12_heart_pounding_mention": 4
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "client_id": 123,
  "survey_id": 456,
  "tai_score": 79,
  "anxiety_level": "Cao",
  "message": "Survey submitted successfully"
}
```

### Ví dụ 2: Dữ liệu không đủ
```json
{
  "data": {
    "nick_name": "Sinh viên B",
    // Chỉ có 8 câu hỏi (< 15 yêu cầu)
    "w1_fear_poor_performance": 3,
    "w2_fear_disappointing_others": 2,
    "w3_worry_before_exam": 3,
    "w4_fear_forgetting": 3,
    "w5_self_blame": 2,
    "e1_stress_preparing": 3,
    "e2_difficulty_concentrating": 2,
    "e3_heart_racing": 3
  }
}
```

**Response:**
```json
{
  "success": true,
  "client_id": 124,
  "survey_id": 457,
  "tai_score": null,
  "anxiety_level": "Không đủ dữ liệu",
  "message": "Survey submitted successfully"
}
```

## ⚠️ Lưu ý quan trọng

### 1. Text Fields
- Tất cả field thông tin cá nhân giờ là text
- Không còn bị giới hạn bởi enum values
- Có thể gửi bất kỳ giá trị text nào

### 2. TAI Questions
- Chỉ chấp nhận giá trị 1-4
- Cần ít nhất 15/20 câu để tính điểm
- Các giá trị không hợp lệ sẽ bị bỏ qua

### 3. Backward Compatibility
- API vẫn hoạt động với request cũ
- Chỉ thêm field mới trong response
- Không breaking changes

## 🧪 Testing

### Postman
1. Import URL: `https://magical-benefit-935c97ace5.strapiapp.com/api/post-survey`
2. Method: POST
3. Headers: `Content-Type: application/json`
4. Body: raw JSON (xem ví dụ trên)

### JavaScript/Axios
```javascript
const response = await axios.post(
  'https://magical-benefit-935c97ace5.strapiapp.com/api/post-survey',
  { data: surveyData },
  { headers: { 'Content-Type': 'application/json' } }
);

console.log('TAI Score:', response.data.tai_score);
console.log('Anxiety Level:', response.data.anxiety_level);
```

## 🆘 Troubleshooting

### Lỗi thường gặp
1. **Missing TAI questions**: Đảm bảo có ít nhất 15 câu hỏi W/E
2. **Invalid TAI values**: Chỉ sử dụng 1-4 cho câu hỏi TAI
3. **Network timeout**: Retry request nếu gặp lỗi network

### Support
- 📧 Email: [your-email]
- 📱 Phone: [your-phone]
- 💬 Slack: [your-slack]

---
**Cập nhật:** 04/08/2025  
**Version:** 2.0 (TAI Integration)
