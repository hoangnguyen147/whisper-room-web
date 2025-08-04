'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-[#2d5aa0]">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Whisper Room
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90">
              Nghiên cứu về mối quan hệ giữa mức độ lo âu và thành tích học tập
            </p>
            <p className="text-lg mb-8 opacity-80">
              của sinh viên Đại học Công nghệ TP.HCM
            </p>
            <Link href="/survey">
              <Button variant="white" size="lg">
                Bắt đầu khảo sát
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tại sao tham gia khảo sát?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Khảo sát này giúp chúng tôi hiểu rõ hơn về tác động của lo âu đến kết quả học tập,
              từ đó đưa ra những giải pháp hỗ trợ hiệu quả cho sinh viên.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Khảo sát khoa học</h3>
                <p className="text-gray-600">
                  Phiếu khảo sát được thiết kế dựa trên các thang đo tâm lý học chuẩn quốc tế
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Bảo mật tuyệt đối</h3>
                <p className="text-gray-600">
                  Mọi thông tin cá nhân được bảo mật hoàn toàn và chỉ phục vụ mục đích nghiên cứu
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">💬</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Hỗ trợ tâm lý</h3>
                <p className="text-gray-600">
                  Sau khảo sát, bạn có thể đặt lịch tham gia Whisper Room để được hỗ trợ
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Whisper Room Methods */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Các phương thức tham gia Whisper Room
            </h2>
            <p className="text-lg text-gray-600">
              Chọn phương thức phù hợp với bạn để nhận được sự hỗ trợ tốt nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-[#2d5aa0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">👥</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Trực tiếp với người thật</h3>
                <p className="text-gray-600 mb-4">
                  Tương tác trực tiếp với chuyên gia tâm lý, nhận được sự hỗ trợ cá nhân hóa
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>✓ Tư vấn chuyên sâu</li>
                  <li>✓ Phản hồi tức thì</li>
                  <li>✓ Kết nối con người</li>
                </ul>
              </div>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-[#2d5aa0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Tương tác với AI</h3>
                <p className="text-gray-600 mb-4">
                  Trò chuyện với AI được huấn luyện chuyên biệt về tâm lý học sinh viên
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {/* <li>✓ Có sẵn 24/7</li> */}
                  <li>✓ Không áp lực xã hội</li>
                  <li>✓ Phân tích dữ liệu</li>
                </ul>
              </div>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-[#2d5aa0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">🥽</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Thực tế ảo (VR)</h3>
                <p className="text-gray-600 mb-4">
                  Trải nghiệm môi trường ảo được thiết kế để giảm stress và lo âu
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>✓ Môi trường an toàn</li>
                  <li>✓ Trải nghiệm nhập vai</li>
                  <li>✓ Công nghệ hiện đại</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-[#2d5aa0]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Chỉ mất 5-10 phút để hoàn thành khảo sát. Thông tin của bạn sẽ góp phần
            vào nghiên cứu có ý nghĩa cho cộng đồng sinh viên.
          </p>
          <Link href="/survey">
            <Button variant="white" size="lg">
              Làm khảo sát ngay
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
