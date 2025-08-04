# 📅 Cập nhật Slots API - Duration với start_date và end_date

## 📋 Tổng quan

Đã cập nhật ứng dụng để sử dụng API `/api/get-available-slots` mới với support cho `start_date` và `end_date` parameters thay vì multiple date queries.

## ✅ Các thay đổi chính

### 1. **API Parameters mới**

**Trước (Old):**
```
/api/get-available-slots?date=2024-01-15&date=2024-01-16&date=2024-01-17
```

**Sau (New):**
```
/api/get-available-slots?start_date=2024-01-15&end_date=2024-01-17
```

### 2. **Supported Query Patterns**

```bash
# Single date
/api/get-available-slots?date=2024-01-15

# Date range (RECOMMENDED)
/api/get-available-slots?start_date=2024-01-15&end_date=2024-01-20

# From specific date onwards
/api/get-available-slots?start_date=2024-01-15

# Until specific date
/api/get-available-slots?end_date=2024-01-20

# All available slots
/api/get-available-slots
```

## 🔄 Files Updated

### 1. **src/utils/api.ts**
- Cập nhật `slotsApi.getAvailableSlots()` function
- Support cho multiple parameter patterns
- Backward compatibility với old `dates` array

**New Function Signature:**
```typescript
async getAvailableSlots(options?: {
  date?: string;
  startDate?: string;
  endDate?: string;
  dates?: string[]; // Backward compatibility
}): Promise<ApiResponse>
```

### 2. **src/components/booking/Calendar.tsx**
- Sử dụng `start_date` và `end_date` cho week range
- Enhanced logging để debug
- Improved error handling

**Key Changes:**
```typescript
// Old
const dates = weekDays.map(day => formatDateForAPI(day));
const result = await slotsApi.getAvailableSlots(dates);

// New
const startDate = formatDateForAPI(currentWeekStart);
const endDate = formatDateForAPI(weekDays[6]);
const result = await slotsApi.getAvailableSlots({
  startDate,
  endDate
});
```

### 3. **src/utils/testSlotsApi.ts** (NEW)
- Comprehensive testing functions
- Multiple test scenarios
- Performance monitoring
- Data grouping utilities

### 4. **scripts/test-slots-api.js** (NEW)
- Standalone testing script
- Direct API calls without frontend
- Can run with `node scripts/test-slots-api.js`

### 5. **src/components/debug/EnumMappingTest.tsx**
- Added slots API testing
- Real-time testing trong UI
- Visual results display

## 🧪 Testing

### 1. **Automated Testing**
```bash
# Test với Node.js script
node scripts/test-slots-api.js

# Test trong ứng dụng
npm run dev
# Truy cập http://localhost:3000/debug
# Click "Test Slots API" và "Test Week Range"
```

### 2. **Manual Testing**
```bash
# Test direct API calls
curl "http://localhost:1337/api/get-available-slots?start_date=2024-12-19&end_date=2024-12-25"
```

### 3. **Calendar Component Testing**
- Truy cập `/booking` page
- Navigate qua các tuần khác nhau
- Kiểm tra console logs cho API calls
- Verify slots hiển thị đúng

## 📊 API Response Format

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
    }
  ],
  "count": 1,
  "filter": {
    "type": "date_range",
    "start_date": "2024-01-15",
    "end_date": "2024-01-20"
  }
}
```

## 🔍 Debug Information

### Console Logs
```
📅 Fetching slots for week: { startDate: "2024-12-19", endDate: "2024-12-25" }
✅ Fetched slots: 42 slots
📊 Filter info: { type: "date_range", start_date: "2024-12-19", end_date: "2024-12-25" }
```

### Debug Tools
- `/debug` page với real-time testing
- Performance monitoring (response times)
- Data grouping by date
- Error tracking

## ⚡ Performance Benefits

### 1. **Reduced API Calls**
- **Before:** 7 separate API calls cho 7 ngày
- **After:** 1 API call cho cả tuần

### 2. **Better Server Performance**
- Single database query thay vì multiple queries
- Reduced network overhead
- Faster response times

### 3. **Improved UX**
- Faster calendar loading
- Less network traffic
- Better error handling

## 🔄 Backward Compatibility

API utils vẫn support old format:
```typescript
// Old way (still works)
const result = await slotsApi.getAvailableSlots({
  dates: ['2024-01-15', '2024-01-16', '2024-01-17']
});

// New way (recommended)
const result = await slotsApi.getAvailableSlots({
  startDate: '2024-01-15',
  endDate: '2024-01-17'
});
```

## 🎯 Usage Examples

### Calendar Component
```typescript
// Fetch slots cho current week
const startDate = formatDateForAPI(currentWeekStart);
const endDate = formatDateForAPI(weekDays[6]);

const result = await slotsApi.getAvailableSlots({
  startDate,
  endDate
});
```

### Single Day
```typescript
// Fetch slots cho specific date
const result = await slotsApi.getAvailableSlots({
  date: '2024-01-15'
});
```

### Open-ended Range
```typescript
// Fetch slots từ ngày cụ thể trở đi
const result = await slotsApi.getAvailableSlots({
  startDate: '2024-01-15'
});
```

## ✅ Verification Checklist

- [x] API calls sử dụng start_date/end_date
- [x] Calendar component hoạt động với API mới
- [x] Backward compatibility maintained
- [x] Error handling improved
- [x] Debug tools available
- [x] Performance monitoring
- [x] Console logging for debugging
- [x] Test scripts created
- [x] Documentation updated

## 🚀 Next Steps

1. **Monitor Performance**: Track API response times
2. **User Testing**: Verify calendar UX improvements
3. **Optimization**: Further optimize if needed
4. **Cleanup**: Remove old code sau khi stable

---

**Updated**: 2024-12-19  
**Status**: ✅ Completed and tested  
**Performance**: Improved (1 API call vs 7 calls)  
**Compatibility**: Backward compatible
