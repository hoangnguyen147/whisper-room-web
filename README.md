# Whisper Room - Client Application

Ứng dụng web frontend cho hệ thống Whisper Room - nghiên cứu về mối quan hệ giữa mức độ lo âu và thành tích học tập của sinh viên HUTECH.

## 🚀 Tính năng chính

- **Trang chủ**: Giới thiệu về dự án và các phương thức hỗ trợ
- **Trang About**: Thông tin về đội ngũ nghiên cứu
- **Form khảo sát**: 34 câu hỏi dựa trên thang đo tâm lý học chuẩn quốc tế
- **Chọn phương thức**: 3 lựa chọn hỗ trợ (Trực tiếp, AI, VR)
- **Đặt lịch**: Hệ thống calendar booking với slots theo ngày
- **Xác nhận**: Trang hiển thị thông tin đặt lịch thành công

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)
- **State Management**: React Hooks
- **API Integration**: Fetch API với error handling

## 📁 Cấu trúc dự án

```
src/
├── app/                          # App Router pages
│   ├── about/                    # Trang giới thiệu
│   ├── booking/                  # Trang đặt lịch
│   ├── booking-confirmation/     # Trang xác nhận
│   ├── survey/                   # Trang khảo sát
│   ├── whisper-room-method/      # Trang chọn phương thức
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Trang chủ
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── booking/                 # Components cho booking
│   │   └── Calendar.tsx         # Calendar component
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Header navigation
│   │   └── Footer.tsx           # Footer
│   ├── survey/                  # Survey components
│   │   ├── SurveyForm.tsx       # Main survey form
│   │   ├── PersonalInfoSection.tsx
│   │   ├── AnxietyScaleSection.tsx
│   │   └── ContactInfoSection.tsx
│   └── ui/                      # UI components
│       ├── Button.tsx           # Button component
│       ├── Card.tsx             # Card component
│       ├── Loading.tsx          # Loading component
│       └── ErrorMessage.tsx     # Error message component
├── utils/                       # Utility functions
│   └── api.ts                   # API utilities
└── template/                    # Templates và docs
    └── survey-template.md       # Template khảo sát gốc
```

## 🎨 Design System

### Màu sắc chủ đạo
- **Primary**: `#3b82f6` (Blue)
- **Background**: `#f8fafc` (Light gray)
- **Text**: `#1f2937` (Dark gray)

### Typography
- **Font**: Inter
- **Sizes**: Responsive với Tailwind classes

### Components
- **Button**: 3 variants (primary, secondary, outline) và 3 sizes
- **Card**: Container với shadow và border radius
- **Loading**: Spinner với text tùy chọn
- **ErrorMessage**: Error display với retry button

## 🔗 API Integration

Ứng dụng kết nối với backend API tại `http://localhost:1337`:

### Endpoints
- `POST /api/post-survey`: Gửi dữ liệu khảo sát
- `GET /api/get-available-slots`: Lấy danh sách slots trống (hỗ trợ date range)
- `POST /api/post-schedule-slot`: Đặt lịch hẹn

### Slots API Parameters
- **Single date**: `?date=2024-01-15`
- **Date range**: `?start_date=2024-01-15&end_date=2024-01-20`
- **From date**: `?start_date=2024-01-15`
- **Until date**: `?end_date=2024-01-20`
- **All slots**: (no parameters)

### Enum Mapping
Ứng dụng tự động convert display values sang enum values cho API:
- **Age**: "20" → "age_20"
- **Academic Year**: "Năm 3" → "year_3"
- **Study Hours**: "1 – 2 giờ" → "from_1_to_2_hours"
- **Exam Prep**: "Vài ngày trước" → "few_days_before"

### Error Handling
- Centralized error handling trong `utils/api.ts`
- User-friendly error messages
- Network error detection
- Retry functionality
- Automatic data conversion với enum mapping

## 📱 Responsive Design

- **Mobile First**: Thiết kế ưu tiên mobile
- **Breakpoints**: sm, md, lg, xl (Tailwind standard)
- **Grid System**: CSS Grid và Flexbox
- **Touch Friendly**: Buttons và interactive elements phù hợp touch

## 🔄 User Flow

1. **Trang chủ** → Giới thiệu và CTA "Bắt đầu khảo sát"
2. **Khảo sát** → 3 bước: Thông tin cá nhân, Thang đo lo âu, Liên hệ
3. **Kết quả TAI** → Hiển thị điểm số và mức độ lo âu (20-80 điểm) 🧠
4. **Chọn phương thức** → Lựa chọn 1 trong 3 phương thức hỗ trợ
5. **Đặt lịch** → Chọn slot thời gian và thêm ghi chú
6. **Xác nhận** → Hiển thị thông tin và hướng dẫn tiếp theo

## 💾 Local Storage

Ứng dụng sử dụng localStorage để lưu trữ:
- `whisper_room_client_id`: ID client sau khi hoàn thành khảo sát
- `tai_results`: Kết quả TAI (điểm số và mức độ lo âu)
- `whisper_room_method`: Phương thức đã chọn
- `booking_info`: Thông tin đặt lịch

## 🚦 Getting Started

1. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

2. **Chạy development server**:
   ```bash
   npm run dev
   ```

3. **Mở trình duyệt**: http://localhost:3000

4. **Đảm bảo backend API chạy tại**: http://localhost:1337

## 📋 Validation

### Form Validation
- **Required fields**: Tất cả fields trong bước 1 và 2
- **Email validation**: Format email hợp lệ
- **Phone validation**: Format số điện thoại
- **Real-time validation**: Hiển thị lỗi ngay khi user input

### Data Validation
- **Survey data**: 34 fields bắt buộc
- **Anxiety scales**: Giá trị từ 1-4
- **Client ID**: Kiểm tra tồn tại trong localStorage

## 🔒 Security & Privacy

- **No sensitive data storage**: Chỉ lưu ID và preferences
- **API error handling**: Không expose sensitive information
- **Input sanitization**: Validate tất cả user input
- **Privacy notice**: Thông báo rõ ràng về bảo mật

## 🎯 Performance

- **Code splitting**: Automatic với Next.js App Router
- **Image optimization**: Next.js Image component
- **Font optimization**: Google Fonts với display=swap
- **Bundle size**: Optimized với tree shaking

## 🧪 Testing

### Automated Testing
```bash
# Test enum mapping
node scripts/test-enum-mapping.js

# Test slots API
node scripts/test-slots-api.js
```

### Debug Tools (Optional)
Debug tools are disabled by default. To enable:
```bash
# Set environment variable
echo "NEXT_PUBLIC_ENABLE_DEBUG=true" > .env.local
npm run dev
```
- Truy cập `/debug` khi enabled
- Test enum mapping và API calls
- Real-time validation

### Testing Checklist
- [ ] Responsive design trên mobile/tablet/desktop
- [ ] Form validation hoạt động đúng
- [ ] API integration và error handling
- [ ] Enum mapping conversion
- [ ] Navigation flow hoàn chỉnh
- [ ] LocalStorage persistence
- [ ] Loading states
- [ ] Error states
- [ ] Accessibility (keyboard navigation, screen readers)

## 📞 Support

Nếu có vấn đề hoặc câu hỏi:
- **Email**: whisperroom@hutech.edu.vn
- **Phone**: (028) 5445 7777
- **Giờ hỗ trợ**: 8:00 - 17:00 (Thứ 2 - Thứ 6)

---

**Phát triển bởi**: Nhóm nghiên cứu Tâm lý học HUTECH
**Phiên bản**: 1.0.0
**Cập nhật**: 2024
