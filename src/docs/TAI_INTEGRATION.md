# 🧠 TAI Integration - Trait Anxiety Inventory Results

## 📋 Tổng quan

Đã tích hợp tính năng hiển thị kết quả TAI (Trait Anxiety Inventory) sau khi người dùng hoàn thành khảo sát. Người dùng sẽ xem điểm số và mức độ lo âu trước khi chọn phương thức hỗ trợ.

## 🔄 User Flow Mới

### Trước (Old Flow):
```
Home → Survey → Method Selection → Booking
```

### Sau (New Flow):
```
Home → Survey → TAI Results → Method Selection → Booking
```

## ✅ Các thay đổi chính

### 1. **API Response Updates**

**ApiResponse Interface:**
```typescript
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  client_id?: number;
  survey_id?: number;
  message?: string;
  count?: number;
  // TAI (Trait Anxiety Inventory) results
  tai_score?: number | null;
  anxiety_level?: string;
  // ... other fields
}
```

### 2. **New Survey Results Page**

**Route:** `/survey-results`

**Features:**
- Hiển thị TAI score (20-80 điểm)
- Phân loại mức độ lo âu (Thấp/Trung bình/Cao)
- Khuyến nghị dựa trên kết quả
- Thang đo TAI visualization
- Options để tiếp tục hoặc làm lại

### 3. **Updated Survey Submission**

**File:** `src/app/survey/page.tsx`

```typescript
// Lưu kết quả TAI để hiển thị ở trang kết quả
const taiResults = {
  tai_score: result.tai_score,
  anxiety_level: result.anxiety_level,
  client_id: result.client_id,
  survey_id: result.survey_id
};
localStorage.setItem('tai_results', JSON.stringify(taiResults));

// Chuyển hướng đến trang hiển thị kết quả TAI
router.push('/survey-results');
```

### 4. **Method Selection Protection**

**File:** `src/app/whisper-room-method/page.tsx`

```typescript
// Kiểm tra xem người dùng đã xem kết quả TAI chưa
const taiResults = localStorage.getItem('tai_results');

if (!taiResults) {
  // Nếu không có kết quả TAI, chuyển về trang kết quả
  router.push('/survey-results');
  return;
}
```

## 🎯 TAI Score Classification

### Thang đo điểm:
- **Tổng điểm**: 20-80 điểm (20 câu hỏi × 1-4 điểm)
- **Yêu cầu tối thiểu**: 15/20 câu trả lời

### Phân loại mức độ:
| Mức độ | Điểm số | Icon | Màu sắc | Khuyến nghị |
|--------|---------|------|---------|-------------|
| **Thấp** | 20-39 | 🟢 | Green | Duy trì lối sống lành mạnh |
| **Trung bình** | 40-59 | 🟡 | Yellow | Cần kỹ thuật quản lý stress |
| **Cao** | 60-80 | 🔴 | Red | Khuyến nghị hỗ trợ tâm lý |
| **Không đủ dữ liệu** | < 15 câu | ⚪ | Gray | Làm lại khảo sát |

## 📱 UI Components

### 1. **TAI Results Display**

```tsx
// Main results card với color coding
<Card className={`${anxietyInfo.bgColor} ${anxietyInfo.borderColor} border-2`}>
  <div className="text-6xl mb-4">{anxietyInfo.icon}</div>
  <h2 className="text-2xl font-bold">
    Mức độ lo âu: <span className={anxietyInfo.color}>{results.anxiety_level}</span>
  </h2>
  <span className="text-2xl font-bold text-primary">{results.tai_score}/80</span>
</Card>
```

### 2. **Score Breakdown**

```tsx
// Visual thang đo với highlighting
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {['Thấp', 'Trung bình', 'Cao'].map(level => (
    <div className={`p-4 rounded-lg border-2 ${
      results.anxiety_level === level ? 'bg-green-50 border-green-200' : 'bg-gray-50'
    }`}>
      <h4 className="font-semibold">{level}</h4>
      <p className="text-sm">Điểm số range</p>
    </div>
  ))}
</div>
```

### 3. **Action Buttons**

```tsx
// Continue hoặc retake options
<Button onClick={handleContinue} size="lg">
  Chọn phương thức hỗ trợ
</Button>

<Button onClick={handleRetakeTest} variant="outline" size="lg">
  Làm lại khảo sát
</Button>
```

## 🔧 Technical Implementation

### 1. **Data Flow**

```
Survey Form Submit
    ↓
API Call với TAI questions
    ↓
Server calculates TAI score
    ↓
Response với tai_score & anxiety_level
    ↓
Save to localStorage
    ↓
Redirect to /survey-results
    ↓
Display results
    ↓
Continue to method selection
```

### 2. **LocalStorage Management**

```typescript
// Save TAI results
const taiResults = {
  tai_score: result.tai_score,
  anxiety_level: result.anxiety_level,
  client_id: result.client_id,
  survey_id: result.survey_id
};
localStorage.setItem('tai_results', JSON.stringify(taiResults));

// Retrieve TAI results
const storedResults = localStorage.getItem('tai_results');
const parsedResults = JSON.parse(storedResults);
```

### 3. **Route Protection**

```typescript
// Protect method selection page
useEffect(() => {
  const taiResults = localStorage.getItem('tai_results');
  if (!taiResults) {
    router.push('/survey-results');
    return;
  }
}, [router]);
```

## 🧪 Testing

### 1. **Debug Tools Updated**

**File:** `src/components/debug/EnumMappingTest.tsx`

```typescript
// Enhanced API testing với TAI results
console.log('🧠 TAI Score:', result.tai_score);
console.log('📊 Anxiety Level:', result.anxiety_level);

// Visual TAI results trong debug UI
{apiTestResult.tai_score !== undefined && (
  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
    <h4 className="font-semibold text-blue-800 mb-2">🧠 TAI Results:</h4>
    <div className="text-sm text-blue-700 space-y-1">
      <p><strong>TAI Score:</strong> {apiTestResult.tai_score || 'null'}</p>
      <p><strong>Anxiety Level:</strong> {apiTestResult.anxiety_level || 'N/A'}</p>
    </div>
  </div>
)}
```

### 2. **Test Scenarios**

```bash
# Test complete flow
npm run dev

# 1. Complete survey
http://localhost:3000/survey

# 2. View TAI results  
http://localhost:3000/survey-results

# 3. Choose method
http://localhost:3000/whisper-room-method

# 4. Book appointment
http://localhost:3000/booking
```

### 3. **API Testing**

```bash
# Test với debug tools
http://localhost:3000/debug
# Click "Test Survey API" → Should show TAI results
```

## 📊 Sample API Response

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

## 🎨 UI/UX Features

### 1. **Color Coding**
- 🟢 **Green**: Thấp (positive, encouraging)
- 🟡 **Yellow**: Trung bình (neutral, informative)  
- 🔴 **Red**: Cao (attention, supportive)
- ⚪ **Gray**: Không đủ dữ liệu (neutral)

### 2. **Responsive Design**
- Mobile-friendly layout
- Adaptive grid systems
- Touch-friendly buttons

### 3. **Accessibility**
- High contrast colors
- Screen reader compatible
- Keyboard navigation support

## ✅ Verification Checklist

- [x] API returns TAI score and anxiety level
- [x] Survey results page displays correctly
- [x] Color coding works for all anxiety levels
- [x] Route protection prevents skipping results
- [x] LocalStorage management works
- [x] Continue flow to method selection
- [x] Retake survey option works
- [x] Debug tools show TAI results
- [x] Build process successful
- [x] Mobile responsive design

## 🚀 Next Steps

1. **User Testing**: Gather feedback on results presentation
2. **Analytics**: Track user behavior on results page
3. **Enhancements**: Add more detailed recommendations
4. **Integration**: Connect with booking system preferences

---

**Updated**: 2024-12-19  
**Status**: ✅ Completed and tested  
**New Route**: `/survey-results`  
**Impact**: Enhanced user experience with TAI insights
