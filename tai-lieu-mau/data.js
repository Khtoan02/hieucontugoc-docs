/* =========================================================
   data.js — KHAI BÁO TOÀN BỘ TÀI LIỆU
   Sửa file này là trang bìa, menu ☰, số trang và nút
   trước/sau của tất cả trang con đều tự cập nhật theo.
   ========================================================= */

window.DOC_DATA = {
  title: "Bộ tài liệu 100 ngày dành cho ba mẹ",
  /* Ảnh nền trang bìa — thay bằng ảnh của bạn trong assets/img/ */
  cover: "/assets/img/2.jpg",
  /* Link tải PDF; để trống "" thì nút sẽ tự ẩn */
  pdf: "",

  /* ---------------------------------------------------------
     pages — THỨ TỰ THẬT của tài liệu.
     Dùng để đánh số trang (01, 02...), dựng menu ☰ và nút
     trước/sau. Trang bìa luôn là mục đầu tiên.
     --------------------------------------------------------- */
  pages: [
    { title: "Trang bìa",                  file: "index" },
    { title: "Giới thiệu",                 file: "01-gioi-thieu" },
    { title: "Hiểu con từ gốc",            file: "02-hieu-con" },
    { title: "Dấu hiệu và biểu hiện",      file: "03-dau-hieu" },
    { title: "Hiểu hành vi của con",       file: "04-phat-trien" },
    { title: "Đồng hành cùng con",         file: "05-dong-hanh" },
    { title: "Phương pháp hỗ trợ",         file: "06-ho-tro" },
    { title: "Quyền lợi và nhà trường",    file: "07-nha-truong" },
    { title: "Cuộc sống hằng ngày",        file: "08-cuoc-song" },
    { title: "Kế hoạch 100 ngày",          file: "09-ke-hoach" },
    { title: "Thuật ngữ",                  file: "10-thuat-ngu" },
    { title: "Nguồn tài liệu & Lời cảm ơn", file: "acknowledgments" }
  ],

  /* ---------------------------------------------------------
     toc — MỤC LỤC HIỂN THỊ Ở TRANG BÌA.
     Mỗi mục gồm một nhãn chương (bấm được) và các dòng nội
     dung nhỏ bên dưới. Không nhất thiết phải liệt kê hết
     mọi trang trong `pages`.
     --------------------------------------------------------- */
  toc: [
    {
      label: "1. Giới thiệu",
      file: "01-gioi-thieu",
      topics: ["Tài liệu này dành cho ai?", "Cách sử dụng tài liệu", "Ba mẹ không đơn độc"]
    },
    {
      label: "2. Hiểu con từ gốc",
      file: "02-hieu-con",
      topics: ["Khái niệm", "Vì sao cần hiểu từ gốc rễ", "Những hiểu lầm thường gặp"]
    },
    {
      label: "3. Dấu hiệu và biểu hiện",
      file: "03-dau-hieu",
      topics: ["Biểu hiện cảm xúc", "Biểu hiện hành vi", "Điểm mạnh của con"]
    },
    {
      label: "4. Hiểu hành vi của con",
      file: "04-phat-trien",
      topics: ["Các mốc phát triển", "Hành vi nói lên điều gì"]
    },
    {
      label: "5. Đồng hành cùng con",
      file: "05-dong-hanh",
      topics: ["Phản ứng đầu tiên của ba mẹ", "Chăm sóc chính mình", "Anh chị em trong nhà", "15 lời khuyên cho gia đình"]
    },
    {
      label: "6. Phương pháp hỗ trợ",
      file: "06-ho-tro",
      topics: ["Các lựa chọn hiện có", "Chọn phương pháp phù hợp", "Theo dõi tiến bộ"]
    },
    {
      label: "7. Quyền lợi và nhà trường",
      file: "07-nha-truong",
      topics: ["Lợi ích của can thiệp sớm", "Chọn dịch vụ phù hợp", "Bắt đầu từ đâu"]
    },
    {
      label: "8. Cuộc sống hằng ngày",
      file: "08-cuoc-song",
      topics: ["Xây dựng đội ngũ hỗ trợ", "Công nghệ hỗ trợ", "An toàn cho con"]
    },
    {
      label: "9. Kế hoạch 100 ngày",
      file: "09-ke-hoach",
      topics: ["Lộ trình theo từng tuần"]
    },
    {
      label: "Thuật ngữ",
      file: "10-thuat-ngu",
      topics: []
    },
    {
      label: "Nguồn tài liệu & Lời cảm ơn",
      file: "acknowledgments",
      topics: ["Các tổ chức & nguồn tham khảo", "Đội ngũ biên soạn", "Miễn trừ trách nhiệm"]
    }
  ]
};
