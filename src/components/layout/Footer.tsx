export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo và mô tả */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-primary mb-4">Whisper Room</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nghiên cứu về mối quan hệ giữa mức độ lo âu và thành tích học tập của sinh viên HUTECH. 
              Chúng tôi cam kết bảo mật thông tin và hỗ trợ sinh viên tốt nhất.
            </p>
          </div>

          {/* Liên hệ */}
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Liên hệ</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📧 whisperroom@hutech.edu.vn</p>
              <p>📞 (028) 5445 7777</p>
              <p>📍 Đại học Công nghệ TP.HCM</p>
            </div>
          </div>

          {/* Thông tin bổ sung */}
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Thông tin</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>🔒 Bảo mật thông tin tuyệt đối</p>
              <p>🎯 Phục vụ mục đích nghiên cứu</p>
              <p>💬 Hỗ trợ tâm lý miễn phí</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2024 Whisper Room - Nhóm nghiên cứu Tâm lý học HUTECH. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
