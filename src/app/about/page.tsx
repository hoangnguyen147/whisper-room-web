import Card from '@/components/ui/Card';

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Nguyễn Thị Minh Anh",
      role: "Trưởng nhóm nghiên cứu",
      major: "Tâm lý học",
      year: "Năm 4",
      description: "Chuyên về tâm lý học giáo dục và nghiên cứu về lo âu học đường",
      avatar: "👩‍🎓"
    },
    {
      name: "Trần Văn Bình",
      role: "Nghiên cứu viên",
      major: "Tâm lý học",
      year: "Năm 3",
      description: "Tập trung vào phân tích dữ liệu và thống kê tâm lý học",
      avatar: "👨‍🎓"
    },
    {
      name: "Lê Thị Cẩm",
      role: "Chuyên viên tư vấn",
      major: "Tâm lý học lâm sàng",
      year: "Năm 4",
      description: "Có kinh nghiệm tư vấn tâm lý cho sinh viên và học sinh",
      avatar: "👩‍⚕️"
    },
    {
      name: "Phạm Minh Đức",
      role: "Kỹ thuật viên",
      major: "Công nghệ thông tin",
      year: "Năm 3",
      description: "Phát triển hệ thống và ứng dụng công nghệ trong nghiên cứu",
      avatar: "👨‍💻"
    },
    {
      name: "Hoàng Thị Lan",
      role: "Chuyên viên VR",
      major: "Thiết kế đa phương tiện",
      year: "Năm 4",
      description: "Thiết kế và phát triển môi trường thực tế ảo cho liệu pháp",
      avatar: "👩‍🎨"
    },
    {
      name: "Võ Thanh Nam",
      role: "Chuyên viên AI",
      major: "Khoa học máy tính",
      year: "Năm 4",
      description: "Phát triển chatbot AI và hệ thống phân tích tâm lý tự động",
      avatar: "🤖"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-[#2d5aa0]">
        <div className="container-custom">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Về chúng tôi
            </h1>
            <p className="text-xl md:text-2xl mb-4 opacity-90 max-w-3xl mx-auto">
              Nhóm nghiên cứu đa ngành tại Đại học Công nghệ TP.HCM, 
              cam kết hỗ trợ sức khỏe tâm lý sinh viên
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Chúng tôi tin rằng sức khỏe tâm lý là nền tảng quan trọng cho thành công học tập. 
                Thông qua nghiên cứu khoa học và ứng dụng công nghệ hiện đại, chúng tôi mong muốn 
                tạo ra một môi trường hỗ trợ toàn diện cho sinh viên.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Dự án Whisper Room ra đời với mục tiêu cung cấp không gian an toàn, 
                nơi sinh viên có thể chia sẻ và nhận được sự hỗ trợ phù hợp với nhu cầu cá nhân.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-semibold mb-2">Mục tiêu</h3>
                <p className="text-sm text-gray-600">Nghiên cứu khoa học về lo âu học đường</p>
              </Card>
              <Card className="text-center">
                <div className="text-3xl mb-2">💡</div>
                <h3 className="font-semibold mb-2">Đổi mới</h3>
                <p className="text-sm text-gray-600">Ứng dụng công nghệ AI và VR</p>
              </Card>
              <Card className="text-center">
                <div className="text-3xl mb-2">🤝</div>
                <h3 className="font-semibold mb-2">Hỗ trợ</h3>
                <p className="text-sm text-gray-600">Tư vấn tâm lý chuyên nghiệp</p>
              </Card>
              <Card className="text-center">
                <div className="text-3xl mb-2">🔬</div>
                <h3 className="font-semibold mb-2">Nghiên cứu</h3>
                <p className="text-sm text-gray-600">Dựa trên bằng chứng khoa học</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Đội ngũ của chúng tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Một nhóm đa ngành với chuyên môn từ tâm lý học, công nghệ thông tin đến thiết kế, 
              cùng chung tầm nhìn về sức khỏe tâm lý sinh viên.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 mb-1">{member.major} - {member.year}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Values Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Giá trị cốt lõi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🔒</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Bảo mật</h3>
              <p className="text-gray-600 text-sm">
                Cam kết bảo vệ thông tin cá nhân và dữ liệu nghiên cứu một cách tuyệt đối
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">❤️</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Đồng cảm</h3>
              <p className="text-gray-600 text-sm">
                Hiểu và chia sẻ cảm xúc với sinh viên, tạo môi trường an toàn và tin cậy
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Hiệu quả</h3>
              <p className="text-gray-600 text-sm">
                Áp dụng phương pháp khoa học và công nghệ để đạt kết quả tối ưu
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🌟</span>
              </div>
              <h3 className="text-lg font-semibold mb-3">Chất lượng</h3>
              <p className="text-gray-600 text-sm">
                Duy trì tiêu chuẩn cao trong nghiên cứu và dịch vụ hỗ trợ tâm lý
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-[#2d5aa0]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Có câu hỏi về nghiên cứu hoặc cần hỗ trợ? Chúng tôi luôn sẵn sàng lắng nghe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div>
              <div className="text-3xl mb-2">📧</div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="opacity-90">whisperroom@hutech.edu.vn</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold mb-2">Điện thoại</h3>
              <p className="opacity-90">(028) 5445 7777</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold mb-2">Địa chỉ</h3>
              <p className="opacity-90">Đại học Công nghệ TP.HCM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
