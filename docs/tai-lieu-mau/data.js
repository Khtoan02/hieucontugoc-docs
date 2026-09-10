/* =========================================================
   data.js — CẤU TRÚC MỤC LỤC CỦA TÀI LIỆU NÀY
   Muốn thêm/bớt/đổi tên chương mục thì chỉ cần sửa file này,
   trang bìa và sidebar của tất cả trang con sẽ tự cập nhật.

   file: đường dẫn tương đối tính từ thư mục tài liệu
   ========================================================= */

window.DOC_DATA = {
  title: "Tài liệu mẫu cho Hiếu Con Tự Gọc",
  subtitle: "Bộ tài liệu hướng dẫn dành cho người mới bắt đầu",
  // Ảnh bìa cột trái. Đổi sang ảnh của bạn trong assets/img/ là được.
  cover: "../../assets/img/cover.svg",
  // Link tải bản PDF (để trống "" nếu chưa có)
  pdf: "",
  sections: [
    {
      title: "1. Giới thiệu",
      pages: [
        { title: "Tài liệu này dành cho ai?", file: "pages/01-gioi-thieu.html" },
        { title: "Cách đọc tài liệu", file: "pages/02-cach-doc.html" }
      ]
    },
    {
      title: "2. Bắt đầu",
      pages: [
        { title: "Chuẩn bị trước khi bắt đầu", file: "pages/03-chuan-bi.html" },
        { title: "Các bước thực hiện", file: "pages/04-cac-buoc.html" }
      ]
    },
    {
      title: "3. Nội dung chính",
      pages: [
        { title: "Khái niệm cốt lõi", file: "pages/05-khai-niem.html" },
        { title: "Ví dụ thực tế", file: "pages/06-vi-du.html" }
      ]
    },
    {
      title: "4. Tham khảo",
      pages: [
        { title: "Câu hỏi thường gặp", file: "pages/07-faq.html" },
        { title: "Thuật ngữ", file: "pages/08-thuat-ngu.html" }
      ]
    }
  ]
};
