# hieucontugoc-docs

Trang tài liệu tĩnh, thuần HTML/CSS/JS — không cần build, mở file là chạy.

- **Bố cục** dựng theo docs.autismspeaks.org: top bar mỏng (logo · ☰ · số trang),
  menu ☰ mở lưới toàn bộ trang, trang bìa ảnh nền full màn hình chia 2 cột,
  nút mũi tên trước/sau nổi ở góc dưới bên phải.
- **Màu sắc & font** lấy theo hieucontugoc.online: navy `#0A1931`, cam `#F97316`,
  chữ Lora (tiêu đề) + Nunito (nội dung).

## Cấu trúc thư mục

```
index.html                     Trang chủ tổng thể ("Welcome to Hieucontugoc")
assets/
  css/
    base.css                   Biến màu, font, top bar, menu ☰, mũi tên, nút
    home.css                   Riêng trang chủ
    doc.css                    Trang bìa tài liệu + trang nội dung con
  js/
    doc-layout.js              Tự chèn top bar, menu ☰, mũi tên; dựng mục lục
  img/
    cover.svg                  Ảnh nền trang bìa mặc định
giac-quan/                  Một thư mục = một bộ tài liệu (URL: /giac-quan)
  data.js                      Khai báo danh sách trang + mục lục
  index.html                   Trang bìa
  hieu-giac-quan.html          Các trang nội dung con (URL: /giac-quan/hieu-giac-quan)
  tu-dieu-hoa-den-qua-tai.html
  ...
```

## Chạy thử

```bash
python3 serve.py
```

Rồi vào http://localhost:8000 hoặc http://localhost:8000/giac-quan

## Sửa nội dung

**Toàn bộ điều hướng nằm trong một file: `giac-quan/data.js`.**

- `pages` — thứ tự thật của tài liệu. Quyết định số trang (`06 / 13`),
  nội dung menu ☰ và nút trước/sau.
- `toc` — mục lục hiển thị ở trang bìa: nhãn chương (bấm được) + các dòng
  nội dung nhỏ bên dưới.
- `cover` — ảnh nền trang bìa. `pdf` — link tải PDF, để trống thì nút tự ẩn.

Sửa file này là trang bìa và toàn bộ trang con tự cập nhật theo, không phải
sờ vào từng file HTML.

**Thêm một trang con:**
1. Copy một file bất kỳ trong `giac-quan/` thành file mới.
2. Sửa `data-page="ten-file-moi.html"` ở thẻ `<body>` cho khớp tên file.
3. Thêm một dòng vào `pages` (và `toc` nếu muốn hiện ở trang bìa) trong `data.js`.
4. Viết nội dung trong khối `<main class="doc-content">`.

**Thêm một bộ tài liệu mới:** copy cả thư mục `giac-quan/` sang tên mới,
sửa `data.js`, rồi thêm một thẻ `.home-doc-card` ở `index.html`.

**Đổi màu:** sửa các biến ở đầu `assets/css/base.css`.

## Phím tắt

- `←` / `→` — lật trang trước / sau
- `Esc` — đóng menu ☰
