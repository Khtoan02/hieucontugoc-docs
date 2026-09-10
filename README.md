# hieucontugoc-docs

Trang tài liệu tĩnh, thuần HTML/CSS/JS — không cần build, mở file là chạy.

## Cấu trúc thư mục

```
index.html                     Trang chủ tổng thể ("Welcome to Hieucontugoc")
assets/
  css/
    base.css                   Reset, biến màu, header/footer/nút dùng chung
    home.css                   Riêng cho trang chủ
    doc.css                    Trang bìa tài liệu + trang nội dung con
  js/
    doc-layout.js              Dựng mục lục, sidebar, nút trước/sau
  img/
    cover.svg                  Ảnh bìa mặc định
docs/
  tai-lieu-mau/                Một thư mục = một bộ tài liệu
    data.js                    Khai báo mục lục của tài liệu này
    index.html                 Trang bìa (ảnh + tiêu đề bên trái, mục lục bên phải)
    pages/                     Các trang nội dung con
      01-gioi-thieu.html
      ...
```

## Chạy thử

Mở thẳng `index.html` bằng trình duyệt, hoặc chạy một server tĩnh:

```bash
python3 -m http.server 8000
```

Rồi vào http://localhost:8000

## Thêm / sửa nội dung

**Đổi mục lục:** sửa `docs/tai-lieu-mau/data.js`. Trang bìa và sidebar của
tất cả trang con tự cập nhật theo — không phải sửa từng file HTML.

**Thêm một trang con:**
1. Copy một file bất kỳ trong `pages/` thành file mới.
2. Sửa `data-page="pages/ten-file-moi.html"` trong thẻ `<body>` cho khớp tên file.
3. Thêm một dòng `{ title: "...", file: "pages/ten-file-moi.html" }` vào `data.js`.
4. Viết nội dung trong khối `<main class="doc-content">`.

**Thêm một bộ tài liệu mới:** copy cả thư mục `docs/tai-lieu-mau/` sang tên
mới, sửa `data.js`, rồi thêm một thẻ `.home-doc-card` ở `index.html`.

**Đổi màu sắc:** sửa các biến ở đầu `assets/css/base.css`.
