/* =========================================================
   data.js — KHAI BÁO TOÀN BỘ TÀI LIỆU
   Sửa file này là trang bìa, menu ☰, số trang và nút
   trước/sau của tất cả trang con đều tự cập nhật theo.
   ========================================================= */

window.DOC_DATA = {
  title: "Bộ tài liệu 100 ngày dành cho ba mẹ",
  /* Ảnh nền trang bìa — thay bằng ảnh của bạn trong assets/img/ */
  cover: "../../assets/img/cover.svg",
  /* Link tải PDF; để trống "" thì nút sẽ tự ẩn */
  pdf: "",

  /* ---------------------------------------------------------
     pages — THỨ TỰ THẬT của tài liệu.
     Dùng để đánh số trang (01, 02...), dựng menu ☰ và nút
     trước/sau. Trang bìa luôn là mục đầu tiên.
     --------------------------------------------------------- */
  pages: [
    { title: "Trang bìa",                  file: "index.html" },
    { title: "Giới thiệu",                 file: "pages/01-gioi-thieu.html" },
    { title: "Hiểu con từ gốc",            file: "pages/02-hieu-con.html" },
    { title: "Dấu hiệu và biểu hiện",      file: "pages/03-dau-hieu.html" },
    { title: "Hiểu hành vi của con",       file: "pages/04-phat-trien.html" },
    { title: "Đồng hành cùng con",         file: "pages/05-dong-hanh.html" },
    { title: "Phương pháp hỗ trợ",         file: "pages/06-ho-tro.html" },
    { title: "Quyền lợi và nhà trường",    file: "pages/07-nha-truong.html" },
    { title: "Cuộc sống hằng ngày",        file: "pages/08-cuoc-song.html" },
    { title: "Kế hoạch 100 ngày",          file: "pages/09-ke-hoach.html" },
    { title: "Thuật ngữ",                  file: "pages/10-thuat-ngu.html" }
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
      file: "pages/01-gioi-thieu.html",
      topics: ["Tài liệu này dành cho ai?", "Cách sử dụng tài liệu", "Ba mẹ không đơn độc"]
    },
    {
      label: "2. Hiểu con từ gốc",
      file: "pages/02-hieu-con.html",
      topics: ["Khái niệm", "Vì sao cần hiểu từ gốc rễ", "Những hiểu lầm thường gặp"]
    },
    {
      label: "3. Dấu hiệu và biểu hiện",
      file: "pages/03-dau-hieu.html",
      topics: ["Biểu hiện cảm xúc", "Biểu hiện hành vi", "Điểm mạnh của con"]
    },
    {
      label: "4. Hiểu hành vi của con",
      file: "pages/04-phat-trien.html",
      topics: ["Các mốc phát triển", "Hành vi nói lên điều gì"]
    },
    {
      label: "5. Đồng hành cùng con",
      file: "pages/05-dong-hanh.html",
      topics: ["Phản ứng đầu tiên của ba mẹ", "Chăm sóc chính mình", "Anh chị em trong nhà", "15 lời khuyên cho gia đình"]
    },
    {
      label: "6. Phương pháp hỗ trợ",
      file: "pages/06-ho-tro.html",
      topics: ["Các lựa chọn hiện có", "Chọn phương pháp phù hợp", "Theo dõi tiến bộ"]
    },
    {
      label: "7. Quyền lợi và nhà trường",
      file: "pages/07-nha-truong.html",
      topics: ["Lợi ích của can thiệp sớm", "Chọn dịch vụ phù hợp", "Bắt đầu từ đâu"]
    },
    {
      label: "8. Cuộc sống hằng ngày",
      file: "pages/08-cuoc-song.html",
      topics: ["Xây dựng đội ngũ hỗ trợ", "Công nghệ hỗ trợ", "An toàn cho con"]
    },
    {
      label: "9. Kế hoạch 100 ngày",
      file: "pages/09-ke-hoach.html",
      topics: ["Lộ trình theo từng tuần"]
    },
    {
      label: "Thuật ngữ",
      file: "pages/10-thuat-ngu.html",
      topics: []
    }
  ]
};
