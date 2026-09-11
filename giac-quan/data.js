/* =========================================================
   data.js — KHAI BÁO TOÀN BỘ TÀI LIỆU
   Hiểu Giác Quan & Cách Não Xử Lý Thông Tin
   ========================================================= */

window.DOC_DATA = {
  title: "Hiểu Giác Quan & Cách Não Xử Lý Thông Tin",
  subtitle: "Cẩm nang toàn diện về giác quan, điều hòa và cách đồng hành cùng con từ gốc rễ.",
  /* Ảnh nền trang bìa */
  cover: "/assets/img/2.jpg",
  /* Link tải PDF; để trống "" thì nút sẽ tự ẩn */
  pdf: "",

  /* ---------------------------------------------------------
     pages — THỨ TỰ THẬT của tài liệu.
     Dùng để đánh số trang (01, 02...), dựng menu ☰ và nút
     trước/sau. Trang bìa luôn là mục đầu tiên.
     --------------------------------------------------------- */
  pages: [
    { title: "Trang bìa",                                      file: "index" },
    { title: "1. Hiểu giác quan và cách não xử lý thông tin",  file: "hieu-giac-quan" },
    { title: "2. Từ điều hòa đến quá tải giác quan",           file: "tu-dieu-hoa-den-qua-tai" },
    { title: "3. Khi quá tải biểu hiện thành hành vi",         file: "khi-qua-tai-thanh-hanh-vi" },
    { title: "4. Bản đồ các hệ giác quan của cơ thể",          file: "ban-do-cac-he-giac-quan" },
    { title: "5. Trẻ phản ứng với cảm giác theo những cách nào", file: "phan-ung-voi-cam-giac" },
    { title: "6. Giác quan không tồn tại tách biệt",           file: "giac-quan-khong-tach-biet" },
    { title: "7. Ba mẹ nên quan sát con như thế nào?",         file: "ba-me-quan-sat-con" },
    { title: "8. Hỗ trợ trẻ khi khó điều hòa",                 file: "ho-tro-tre-kho-dieu-hoa" },
    { title: "9. Khi nào cần nhìn xa hơn giác quan?",          file: "khi-nao-nhin-xa-hon" },
    { title: "10. Bộ công cụ hiểu giác quan của con",          file: "bo-cong-cu" },
    { title: "11. Những câu hỏi ba mẹ thường gặp (FAQ)",       file: "cau-hoi-thuong-gap" },
    { title: "12. Hiểu con trước khi cố thay đổi con",         file: "hieu-con-truoc-khi-thay-doi" }
  ],

  /* ---------------------------------------------------------
     toc — MỤC LỤC HIỂN THỊ Ở TRANG BÌA.
     Mỗi mục gồm một nhãn chương (bấm được) và các dòng nội
     dung nhỏ bên dưới.
     --------------------------------------------------------- */
  toc: [
    {
      label: "1. Hiểu giác quan và cách não xử lý thông tin",
      file: "hieu-giac-quan",
      topics: [
        "Giác quan là gì?",
        "Xử lý thông tin cảm giác là gì?",
        "Não không xử lý mọi kích thích như nhau",
        "Vì sao trẻ tự kỷ có thể có khác biệt về cảm giác?"
      ]
    },
    {
      label: "2. Từ điều hòa đến quá tải giác quan",
      file: "tu-dieu-hoa-den-qua-tai",
      topics: [
        "Điều hòa giác quan là gì?",
        "Mất điều hòa là gì?",
        "Quá tải giác quan là gì?",
        "Ngưỡng chịu đựng của hệ thần kinh",
        "Vì sao hôm nay con chịu được nhưng hôm khác lại không?"
      ]
    },
    {
      label: "3. Khi quá tải biểu hiện thành hành vi",
      file: "khi-qua-tai-thanh-hanh-vi",
      topics: [
        "Quá tải có thể trông như thế nào?",
        "Bùng nổ do quá tải (Meltdown)",
        "Thu mình / đóng lại (Shutdown)",
        "Meltdown có giống ăn vạ không?",
        "Dấu hiệu báo trước một lần quá tải",
        "Trẻ cần gì sau quá tải?"
      ]
    },
    {
      label: "4. Bản đồ các hệ giác quan của cơ thể",
      file: "ban-do-cac-he-giac-quan",
      topics: [
        "Thính giác & Thị giác",
        "Xúc giác, Mùi và vị",
        "Hệ tiền đình (Vestibular)",
        "Cảm nhận bản thể (Proprioception)",
        "Cảm nhận bên trong cơ thể (Interoception)"
      ]
    },
    {
      label: "5. Trẻ phản ứng với cảm giác theo những cách nào",
      file: "phan-ung-voi-cam-giac",
      topics: [
        "Khi trẻ phản ứng mạnh hơn với cảm giác",
        "Khi trẻ phản ứng ít hơn với cảm giác",
        "Khi trẻ chủ động tìm kiếm cảm giác",
        "Tránh né cảm giác: Một phản ứng có mục đích",
        "Một trẻ có thể vừa nhạy cảm vừa tìm kiếm cảm giác"
      ]
    },
    {
      label: "6. Giác quan không tồn tại tách biệt",
      file: "giac-quan-khong-tach-biet",
      topics: [
        "Giác quan và giấc ngủ",
        "Giác quan và đau",
        "Giác quan và tiêu hóa",
        "Giác quan và lo âu",
        "Giác quan và giao tiếp, ăn uống, học tập"
      ]
    },
    {
      label: "7. Ba mẹ nên quan sát con như thế nào?",
      file: "ba-me-quan-sat-con",
      topics: [
        "Đừng chỉ ghi lại hành vi",
        "Quan sát Trước – Trong – Sau",
        "Tìm mẫu hình lặp lại",
        "Theo dõi trạng thái cơ thể",
        "Ghi nhận điều gì giúp con phục hồi"
      ]
    },
    {
      label: "8. Hỗ trợ trẻ khi khó điều hòa",
      file: "ho-tro-tre-kho-dieu-hoa",
      topics: [
        "Khi trẻ đang quá tải",
        "Giảm kích thích không cần thiết & giảm lời nói",
        "Chuẩn bị trước cho tình huống khó",
        "Hỗ trợ trẻ nhận biết tín hiệu cơ thể",
        "Công cụ hỗ trợ cảm giác",
        "Điều gì không nên làm máy móc?"
      ]
    },
    {
      label: "9. Khi nào cần nhìn xa hơn giác quan?",
      file: "khi-nao-nhin-xa-hon",
      topics: [
        "Hành vi thay đổi đột ngột",
        "Những vấn đề sức khỏe dễ bị nhầm với giác quan",
        "Khi nào nên gặp hoạt động trị liệu (OT)",
        "Khi nào cần đánh giá y khoa",
        "Vai trò của các chuyên gia khác"
      ]
    },
    {
      label: "10. Bộ công cụ hiểu giác quan của con",
      file: "bo-cong-cu",
      topics: [
        "Checklist dấu hiệu quá tải",
        "Nhật ký giác quan 7 ngày",
        "Phiếu Trước – Trong – Sau",
        "Bản đồ giác quan của con (Sensory Profile)",
        "Phiếu chuẩn bị khi gặp chuyên gia"
      ]
    },
    {
      label: "11. Những câu hỏi ba mẹ thường gặp (FAQ)",
      file: "cau-hoi-thuong-gap",
      topics: [
        "Giải đáp các thắc mắc phổ biến của phụ huynh"
      ]
    },
    {
      label: "12. Hiểu con trước khi cố thay đổi con",
      file: "hieu-con-truoc-khi-thay-doi",
      topics: [
        "Chuyển từ can thiệp sang thấu hiểu",
        "Thông điệp gửi gắm ba mẹ"
      ]
    }
  ]
};
