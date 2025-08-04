# 🔄 Cập nhật Enum Mapping cho API

## 📋 Tổng quan

Đã cập nhật ứng dụng để sử dụng đúng enum values theo API documentation mới. Các thay đổi đảm bảo dữ liệu được gửi đến API với format chính xác.

## ✅ Các file đã được cập nhật

### 1. **src/utils/enumMappings.ts** (MỚI)
- Mapping giữa display text và enum values
- Functions để convert qua lại giữa 2 formats
- Support cho: age, academic_year, daily_study_hours, exam_preparation_time

### 2. **src/utils/api.ts**
- Cập nhật `surveyApi.submitSurvey()` để tự động convert data
- Thêm logging để debug
- Sử dụng `convertToApiFormat()` trước khi gửi API

### 3. **src/utils/testApiMapping.ts** (MỚI)
- Test functions để kiểm tra enum mapping
- Sample data cho testing
- Validation logic

### 4. **src/utils/validateEnumMapping.ts** (MỚI)
- Comprehensive validation cho tất cả enum mappings
- Test cases dựa trên documentation
- Helper functions để tạo sample data

### 5. **src/components/debug/EnumMappingTest.tsx** (MỚI)
- Debug component để test enum mapping trong UI
- Real-time testing với API calls
- Visual validation results

### 6. **src/app/debug/page.tsx** (MỚI)
- Debug page để access testing tools
- Chỉ hiển thị trong development mode

### 7. **src/components/layout/Header.tsx**
- Thêm debug link (chỉ trong development)
- Access tại `/debug`

### 8. **src/app/survey/page.tsx**
- Thêm logging để debug survey submission
- Enhanced error handling

### 9. **scripts/test-enum-mapping.js** (MỚI)
- Standalone script để test enum mapping
- Có thể chạy với `node scripts/test-enum-mapping.js`

## 🔄 Enum Mappings

### Age (Tuổi)
```
"18" → "age_18"
"19" → "age_19"
"20" → "age_20"
"21" → "age_21"
"22" → "age_22"
"23" → "age_23"
"Khác" → "age_other"
```

### Academic Year (Năm học)
```
"Năm 1" → "year_1"
"Năm 2" → "year_2"
"Năm 3" → "year_3"
"Năm 4" → "year_4"
"Năm 5" → "year_5"
```

### Daily Study Hours (Giờ học mỗi ngày)
```
"Dưới 1 giờ" → "under_1_hour"
"1 – 2 giờ" → "from_1_to_2_hours"
"3 – 4 giờ" → "from_3_to_4_hours"
"Trên 4 giờ" → "over_4_hours"
```

### Exam Preparation Time (Thời gian chuẩn bị thi)
```
"Ngay từ đầu kỳ" → "from_beginning_of_term"
"1 – 2 tuần trước" → "one_to_two_weeks_before"
"Vài ngày trước" → "few_days_before"
"Sát ngày thi" → "close_to_exam_day"
```

## 🧪 Testing

### 1. Automated Testing
```bash
# Test enum mapping logic
node scripts/test-enum-mapping.js
```

### 2. UI Testing
- Truy cập `/debug` trong development mode
- Click "Run Validation Tests" để kiểm tra mappings
- Click "Test API Call" để test với real API

### 3. Manual Testing
- Điền form khảo sát với các giá trị test
- Kiểm tra console logs để xem data conversion
- Verify API response

## 📤 Data Flow

```
User Input (Display Text)
    ↓
Form Component
    ↓
Survey Submission
    ↓
convertToApiFormat()
    ↓
API Call với Enum Values
    ↓
Backend Processing
```

## 🔍 Debug Tools

### Console Logs
- `📤 Survey data before API call`: Original form data
- `🔄 Original data`: Data trước khi convert
- `🔄 Converted data`: Data sau khi convert
- `📤 Sending to API`: Final payload

### Debug Page
- Real-time validation testing
- API call testing
- Visual results display

## ✅ Verification

Đã test thành công với:
- ✅ Enum mapping functions hoạt động đúng
- ✅ API calls với converted data
- ✅ All validation tests pass
- ✅ Backward compatibility maintained

## 🚀 Next Steps

1. **Production Testing**: Test với real backend API
2. **Error Handling**: Monitor for any edge cases
3. **Performance**: Optimize conversion functions if needed
4. **Documentation**: Update user-facing docs if required

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra console logs
2. Sử dụng debug page tại `/debug`
3. Chạy validation script
4. Liên hệ team để hỗ trợ

---

**Cập nhật**: 2024-12-19  
**Status**: ✅ Hoàn thành và tested  
**Compatibility**: Backward compatible với existing data
