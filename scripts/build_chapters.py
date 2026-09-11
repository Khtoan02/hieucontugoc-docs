import os, re, html
from html.parser import HTMLParser

IMG_MAPPING = {
    "image15.png": {
        "src": "/assets/img/giac-quan/01-nao-xu-ly-thong-tin-cam-giac.png",
        "alt": "Não xử lý thông tin cảm giác như thế nào",
        "caption": "Hình 1.1: Não xử lý thông tin cảm giác như thế nào"
    },
    "image12.png": {
        "src": "/assets/img/giac-quan/02-tu-kich-thich-den-dieu-hoa.png",
        "alt": "Từ kích thích đến điều hòa",
        "caption": "Hình 2.1: Từ kích thích đến điều hòa"
    },
    "image3.png": {
        "src": "/assets/img/giac-quan/02-trang-thai-dieu-hoa-theo-pho.png",
        "alt": "Trạng thái điều hòa thay đổi theo một phổ",
        "caption": "Hình 2.2: Trạng thái điều hòa thay đổi theo một phổ"
    },
    "image4.png": {
        "src": "/assets/img/giac-quan/02-chiec-coc-nguong-chiu-dung.png",
        "alt": "Chiếc cốc ngưỡng chịu đựng",
        "caption": "Hình 2.3: Chiếc cốc ngưỡng chịu đựng",
        "layout": "side",
        "split_before": "Điều này giúp giải thích"
    },
    "image11.png": {
        "src": "/assets/img/giac-quan/03-hai-huong-bieu-hien-qua-tai.png",
        "alt": "Hai hướng biểu hiện của quá tải",
        "caption": "Hình 3.1: Hai hướng biểu hiện của quá tải"
    },
    "image9.png": {
        "src": "/assets/img/giac-quan/03-meltdown-va-shutdown.png",
        "alt": "Meltdown và Shutdown",
        "caption": "Hình 3.2: Meltdown và Shutdown"
    },
    "image14.png": {
        "src": "/assets/img/giac-quan/03-duong-cong-qua-tai.png",
        "alt": "Đường cong quá tải",
        "caption": "Hình 3.3: Đường cong quá tải"
    },
    "image6.png": {
        "src": "/assets/img/giac-quan/03-truoc-trong-sau.png",
        "alt": "Mô hình Trước – Trong – Sau",
        "caption": "Hình 3.4: Mô hình Trước – Trong – Sau"
    },
    "image8.png": {
        "src": "/assets/img/giac-quan/04-ban-do-cac-he-giac-quan.png",
        "alt": "Bản đồ các hệ giác quan của cơ thể",
        "caption": "Hình 4.1: Bản đồ các hệ giác quan của cơ thể",
        "layout": "side",
        "split_before": "Trong đời sống hằng ngày"
    },
    "image2.png": {
        "src": "/assets/img/giac-quan/05-ba-huong-phan-ung-voi-kich-thich.png",
        "alt": "Ba hướng phản ứng với kích thích",
        "caption": "Hình 5.1: Ba hướng phản ứng với kích thích"
    },
    "image5.png": {
        "src": "/assets/img/giac-quan/05-ho-so-cam-giac-khong-phai-mot-chiec-nhan.png",
        "alt": "Hồ sơ cảm giác không phải một chiếc nhãn",
        "caption": "Hình 5.2: Hồ sơ cảm giác không phải một chiếc nhãn"
    },
    "image7.png": {
        "src": "/assets/img/giac-quan/06-giac-quan-khong-tach-biet.png",
        "alt": "Giác quan không tồn tại tách biệt",
        "caption": "Hình 6.1: Giác quan không tồn tại tách biệt"
    },
    "image10.png": {
        "src": "/assets/img/giac-quan/07-mo-hinh-truoc-trong-sau.png",
        "alt": "Mô hình Trước – Trong – Sau",
        "caption": "Hình 7.1: Mô hình Trước – Trong – Sau"
    },
    "image1.png": {
        "src": "/assets/img/giac-quan/07-tu-su-kien-don-le-den-mau-hinh.png",
        "alt": "Từ sự kiện đơn lẻ đến mẫu hình",
        "caption": "Hình 7.2: Từ sự kiện đơn lẻ đến mẫu hình"
    },
    "image17.png": {
        "src": "/assets/img/giac-quan/08-ba-tang-ho-tro-dieu-hoa.png",
        "alt": "Ba tầng hỗ trợ điều hòa",
        "caption": "Hình 8.1: Ba tầng hỗ trợ điều hòa"
    },
    "image16.png": {
        "src": "/assets/img/giac-quan/09-khi-nao-nhin-xa-hon-giac-quan.png",
        "alt": "Khi nào cần nhìn xa hơn giác quan",
        "caption": "Hình 9.1: Khi nào cần nhìn xa hơn giác quan"
    },
    "image13.png": {
        "src": "/assets/img/giac-quan/12-nhieu-manh-ghep-mot-hanh-trinh-ho-tro.png",
        "alt": "Nhiều mảnh ghép một hành trình hỗ trợ",
        "caption": "Hình 12.1: Nhiều mảnh ghép một hành trình hỗ trợ"
    }
}

PAIRED_SECTIONS = {
    3: [
        {
            "pair": ("Bùng nổ do quá tải", "Thu mình hoặc “đóng lại”"),
            "colors": ("card-rose", "card-teal")
        }
    ],
    5: [
        {
            "pair": ("Khi trẻ phản ứng mạnh hơn với cảm giác", "Khi trẻ phản ứng ít hơn với cảm giác"),
            "colors": ("card-amber", "card-teal")
        }
    ]
}

CHAPTERS_CONFIG = [
    {
        "index": 1,
        "file": "hieu-giac-quan",
        "title": "Hiểu giác quan và cách não xử lý thông tin"
    },
    {
        "index": 2,
        "file": "tu-dieu-hoa-den-qua-tai",
        "title": "Từ điều hòa đến quá tải giác quan"
    },
    {
        "index": 3,
        "file": "khi-qua-tai-thanh-hanh-vi",
        "title": "Khi quá tải biểu hiện thành hành vi"
    },
    {
        "index": 4,
        "file": "ban-do-cac-he-giac-quan",
        "title": "Bản đồ các hệ giác quan của cơ thể"
    },
    {
        "index": 5,
        "file": "phan-ung-voi-cam-giac",
        "title": "Trẻ phản ứng với cảm giác theo những cách nào"
    },
    {
        "index": 6,
        "file": "giac-quan-khong-tach-biet",
        "title": "Giác quan không tồn tại tách biệt"
    },
    {
        "index": 7,
        "file": "ba-me-quan-sat-con",
        "title": "Ba mẹ nên quan sát con như thế nào?"
    },
    {
        "index": 8,
        "file": "ho-tro-tre-kho-dieu-hoa",
        "title": "Hỗ trợ trẻ khi khó điều hòa"
    },
    {
        "index": 9,
        "file": "khi-nao-nhin-xa-hon",
        "title": "Khi nào cần nhìn xa hơn giác quan?"
    },
    {
        "index": 10,
        "file": "bo-cong-cu",
        "title": "Bộ công cụ hiểu giác quan của con"
    },
    {
        "index": 11,
        "file": "cau-hoi-thuong-gap",
        "title": "Những câu hỏi ba mẹ thường gặp"
    },
    {
        "index": 12,
        "file": "hieu-con-truoc-khi-thay-doi",
        "title": "Hiểu con trước khi cố thay đổi con"
    }
]

class CleanGDocParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.elements = []
        self.current_tag = None
        self.current_attrs = {}
        self.current_data = []
        self.bold_depth = 0

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'):
            self.current_tag = tag
            self.current_attrs = attr_dict
            self.current_data = []
            self.bold_depth = 0
        elif tag == 'img' and self.current_tag:
            src = attr_dict.get('src', '')
            self.current_data.append(f'<img src="{src}">')
        elif tag == 'span' and self.current_tag:
            cls = attr_dict.get('class', '')
            if re.search(r'\b(c4|c5|c7)\b', cls):
                self.bold_depth += 1
                self.current_data.append('<strong>')
        elif tag == 'a' and self.current_tag:
            href = attr_dict.get('href', '')
            href = re.sub(r'https://www\.google\.com/url\?q=([^&\"x27]+)[^\"x27]*', r'\1', href)
            self.current_data.append(f'<a href="{href}">')

    def handle_endtag(self, tag):
        if tag == self.current_tag:
            while self.bold_depth > 0:
                self.current_data.append('</strong>')
                self.bold_depth -= 1
            raw_html = ''.join(self.current_data)
            self.elements.append((self.current_tag, self.current_attrs, raw_html))
            self.current_tag = None
            self.current_attrs = {}
            self.current_data = []
            self.bold_depth = 0
        elif tag == 'span' and self.current_tag:
            if self.bold_depth > 0:
                self.current_data.append('</strong>')
                self.bold_depth -= 1
        elif tag == 'a' and self.current_tag:
            self.current_data.append('</a>')

    def handle_data(self, data):
        if self.current_tag:
            self.current_data.append(data)

def clean_html_fragment(s):
    s = html.unescape(s)
    s = s.replace('\xa0', ' ')
    s = re.sub(r'<strong>\s*</strong>', '', s)
    s = re.sub(r'</strong>\s*<strong>', ' ', s)
    s = re.sub(r'<strong>([^\w<]*)</strong>', r'\1', s)
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

def is_quote_or_question(plain):
    plain = plain.strip()
    # Checks if text is an explicit quote / reflection question
    if (plain.startswith('“') and plain.endswith('”')) or (plain.startswith('"') and plain.endswith('"')):
        return True
    if plain in (
        '“Não của trẻ tự kỷ xử lý giác quan như thế nào?”',
        '“Con của mình đang phản ứng với loại thông tin nào, trong hoàn cảnh nào và điều đó ảnh hưởng đến cuộc sống của con ra sao?”',
        '“Con nhạy với giác quan nào?”',
        '“Những gì đang xảy ra trong cơ thể, cảm xúc và môi trường của con kết hợp với nhau như thế nào?”',
        '“Điều gì có thể làm tình huống an toàn và bớt quá sức hơn ngay lúc này?”',
        '“Làm thế nào để con nghe lời ngay?”',
        '“Giác quan có thể là một phần của bức tranh, nhưng liệu chúng ta có đang bỏ sót một nguyên nhân y khoa, cảm xúc hoặc môi trường nào không?”',
        '“Làm sao để con dừng lại?”',
        '“Điều gì đang khiến con gặp khó khăn?”',
        'Điều gì xảy ra trước đó? Trạng thái cơ thể của con ra sao? Điều gì làm tình hình khó khăn hơn và điều gì giúp con bình tĩnh lại?',
        '“Con đang cần mình hiểu điều gì?”'
    ):
        return True
    return False

BANNER_PALETTE = ["banner-blue", "banner-teal", "banner-amber", "banner-rose", "banner-orange"]

def get_banner_class(heading, index, prev_class=None):
    h_lower = heading.lower()
    candidate = None
    
    if any(k in h_lower for k in ["meltdown", "shutdown", "quá tải", "vượt ngưỡng", "nguy cơ", "bùng nổ", "khẩn cấp", "cấp độ", "sức khỏe"]):
        candidate = "banner-rose"
    elif any(k in h_lower for k in ["bản đồ", "hệ giác quan", "thính giác", "thị giác", "xúc giác", "tiền đình", "cảm nhận", "mùi và vị", "tiêu hóa", "giấc ngủ"]):
        candidate = "banner-teal"
    elif any(k in h_lower for k in ["chiếc cốc", "điều hòa", "ngưỡng", "quan sát", "mô hình trước", "bức tranh", "kinh nghiệm", "nhìn xa hơn"]):
        candidate = "banner-orange"
    elif any(k in h_lower for k in ["hành vi", "tìm kiếm", "tránh né", "phản ứng", "giao tiếp", "lo âu", "ăn uống", "khác biệt"]):
        candidate = "banner-amber"
    elif any(k in h_lower for k in ["não", "xử lý", "thông tin", "hỗ trợ", "an toàn", "công cụ", "định nghĩa", "kết luận"]):
        candidate = "banner-blue"
        
    if not candidate or candidate == prev_class:
        avail = [c for c in BANNER_PALETTE if c != prev_class]
        candidate = avail[index % len(avail)]
        
    return candidate

def render_chapter_html(ch_num, cfg, raw_items):
    file_slug = cfg["file"]
    page_title = cfg["title"]
    
    # Structure items into semantic groups:
    # 1. Lead intro (items before first H2)
    # 2. Main sections (H2 + body items)
    # 3. Summary section ("Tóm tắt chương" + items)
    # 4. Next chapter teaser / Epilogue (last uppercase H1/H2 + items)
    
    clean_items = []
    first_title_skipped = False
    
    for tag, attrs, raw_text in raw_items:
        plain = html.unescape(re.sub(r'<[^>]+>', '', raw_text)).strip()
        
        # Skip image file name placeholders only if there is no <img> tag
        if '<img' not in raw_text and re.search(r'\d{2}_\d\s+.*?\.(png|jpg|webp)', plain, re.I):
            continue
        if not plain and '<img' not in raw_text:
            continue
        if plain == "________________":
            continue
            
        # First title H1
        if tag == "h1" and not first_title_skipped:
            first_title_skipped = True
            continue
            
        clean_items.append((tag, attrs, raw_text, plain))
        
    # Group into blocks
    blocks = []
    current_section = {"type": "lead", "heading": "", "items": []}
    
    for idx, (tag, attrs, raw_text, plain) in enumerate(clean_items):
        is_heading = False
        heading_text = plain
        
        # Check if this item is a section heading
        if tag in ("h1", "h2", "h3"):
            is_heading = True
        elif 'c5' in attrs.get('class', '') or 'c7' in attrs.get('class', ''):
            is_heading = True
            
        if is_heading:
            # Save previous section if it has items
            if current_section["items"] or current_section["heading"]:
                blocks.append(current_section)
                
            clean_h = clean_html_fragment(plain)
            
            # Determine section type
            if "tóm tắt chương" in clean_h.lower():
                current_section = {"type": "summary", "heading": clean_h, "items": []}
            elif ch_num < 12 and (
                tag == "h1" or 
                clean_h.isupper() or 
                (idx >= len(clean_items) - 5 and ("CHƯƠNG" in clean_h.upper() or "CÂU HỎI" in clean_h.upper() or "HIỂU CON" in clean_h.upper() or "BỘ CÔNG CỤ" in clean_h.upper() or "TỪ ĐIỀU HÒA" in clean_h.upper() or "KHI QUÁ TẢI" in clean_h.upper() or "BẢN ĐỒ" in clean_h.upper() or "TRẺ PHẢN ỨNG" in clean_h.upper() or "GIÁC QUAN KHÔNG" in clean_h.upper() or "BA MẸ NÊN" in clean_h.upper() or "HỖ TRỢ TRẺ" in clean_h.upper() or "KHI NÀO CẦN" in clean_h.upper()))
            ):
                current_section = {"type": "next_teaser", "heading": clean_h, "items": []}
            elif ch_num == 12 and ("HIỂU GIÁC QUAN CỦA CON" in clean_h.upper() or tag == "h1"):
                current_section = {"type": "epilogue", "heading": clean_h, "items": []}
            elif ch_num == 10 and clean_h.startswith(("Checklist", "Nhật ký", "Phiếu Trước", "Bản đồ giác quan", "Phiếu chuẩn bị")):
                current_section = {"type": "tool_card", "heading": clean_h, "items": []}
            elif ch_num == 11 and re.match(r'^\d+\.\s+', clean_h):
                current_section = {"type": "faq_item", "heading": clean_h, "items": []}
            else:
                current_section = {"type": "regular", "heading": clean_h, "items": []}
        else:
            current_section["items"].append((tag, attrs, raw_text, plain))
            
    if current_section["items"] or current_section["heading"]:
        blocks.append(current_section)
        
    # Render HTML for all blocks
    output_html_lines = []
    
    def render_body_item(tag, attrs, raw_text, plain, is_lead=False):
        # 1. Image check
        img_match = re.search(r'src=[\"\x27]images/(image\d+\.png)[\"\x27]', raw_text)
        if img_match:
            img_key = img_match.group(1)
            if img_key in IMG_MAPPING:
                info = IMG_MAPPING[img_key]
                return f"""      <figure class="doc-figure">
        <img src="{info["src"]}" alt="" loading="lazy">
        <figcaption>{info["caption"]}</figcaption>
      </figure>"""
              
        cleaned = clean_html_fragment(raw_text)
        
        # 2. Tool PDF download check (Chapter 10)
        download_match = re.match(r'^\[Tải\s+(.*?)\s*–\s*PDF\]$', plain)
        if download_match:
            doc_name = download_match.group(1)
            import urllib.parse
            doc_param = urllib.parse.quote(doc_name)
            return f"""      <div class="tool-action">
        <a class="btn btn-download" data-no-pjax href="/nhan-tai-lieu?doc={doc_param}">
          <span>📄 {doc_name}</span>
        </a>
      </div>"""

        # 3. Callout / Takeaway check
        if plain.startswith(("Ghi nhớ cho Ba mẹ:", "Ba mẹ cần nhớ:", "Lưu ý:", "Ghi nhớ:", "Điều dễ hiểu nhầm:")):
            return f"""      <div class="doc-callout">
        <div class="doc-callout-icon">💡</div>
        <div class="doc-callout-content">
          <p>{cleaned}</p>
        </div>
      </div>"""
          
        # 4. Standalone quote / inquiry check
        if is_quote_or_question(plain):
            return f"""      <blockquote class="doc-quote-focus">
        <p>{cleaned}</p>
      </blockquote>"""
          
        # 5. Lead paragraph
        if is_lead:
            return f"      <p class=\"lead-p\">{cleaned}</p>"
            
        return f"      <p>{cleaned}</p>"

    h2_counter = 0
    prev_banner_class = None
    b_idx = 0
    pairs = PAIRED_SECTIONS.get(ch_num, [])

    while b_idx < len(blocks):
        block = blocks[b_idx]
        b_type = block["type"]
        heading = block["heading"]
        items = block["items"]

        # Check if this block starts a paired 2-column comparative section
        matched_pair = None
        for p_cfg in pairs:
            h1, h2 = p_cfg["pair"]
            if heading == h1 and b_idx + 1 < len(blocks) and blocks[b_idx + 1]["heading"] == h2:
                matched_pair = p_cfg
                break

        if matched_pair:
            b1 = blocks[b_idx]
            b2 = blocks[b_idx + 1]
            c1, c2 = matched_pair["colors"]

            items1_clean, post_imgs1 = [], []
            for it in b1["items"]:
                if re.search(r'src=[\"\x27]images/(image\d+\.png)[\"\x27]', it[2]):
                    post_imgs1.append(it)
                else:
                    items1_clean.append(it)

            items2_clean, post_imgs2 = [], []
            for it in b2["items"]:
                if re.search(r'src=[\"\x27]images/(image\d+\.png)[\"\x27]', it[2]):
                    post_imgs2.append(it)
                else:
                    items2_clean.append(it)

            c1_inner = []
            for t, a, raw, p in items1_clean:
                rendered = render_body_item(t, a, raw, p)
                if rendered:
                    c1_inner.append(rendered)

            c2_inner = []
            for t, a, raw, p in items2_clean:
                rendered = render_body_item(t, a, raw, p)
                if rendered:
                    c2_inner.append(rendered)

            c1_html = "\n".join(["    " + line if line.strip() else line for item in c1_inner for line in item.split("\n")])
            c2_html = "\n".join(["    " + line if line.strip() else line for item in c2_inner for line in item.split("\n")])

            grid_html = f"""      <div class="doc-grid-2col doc-cols-cards">
        <div class="doc-col-card {c1}">
          <h3 class="col-card-title">{b1['heading']}</h3>
{c1_html}
        </div>
        <div class="doc-col-card {c2}">
          <h3 class="col-card-title">{b2['heading']}</h3>
{c2_html}
        </div>
      </div>"""
            output_html_lines.append(grid_html)

            # Render any attached images right below the 2-column grid spanning full width
            for it in (post_imgs1 + post_imgs2):
                rendered = render_body_item(it[0], it[1], it[2], it[3])
                if rendered:
                    output_html_lines.append(rendered)

            b_idx += 2
            continue
        
        if b_type == "lead":
            for t, a, raw, p in items:
                rendered = render_body_item(t, a, raw, p, is_lead=True)
                if rendered: output_html_lines.append(rendered)
                
        elif b_type == "regular":
            banner_class = get_banner_class(heading, h2_counter, prev_banner_class)
            prev_banner_class = banner_class
            h2_counter += 1
            output_html_lines.append(f"      <h2 class=\"{banner_class}\">{heading}</h2>")
            # Check if any item has an image with layout == "side"
            side_img_info = None
            side_img_tag = None
            for t, a, raw, p in items:
                img_match = re.search(r'src=[\"\x27]images/(image\d+\.png)[\"\x27]', raw)
                if img_match and img_match.group(1) in IMG_MAPPING:
                    info = IMG_MAPPING[img_match.group(1)]
                    if info.get("layout") == "side":
                        side_img_info = info
                        side_img_tag = (t, a, raw, p)
                        break

            if side_img_info:
                split_prefix = side_img_info.get("split_before")
                if split_prefix:
                    split_idx = -1
                    for i, (t, a, raw, p) in enumerate(items):
                        if p.strip().startswith(split_prefix):
                            split_idx = i
                            break
                    if split_idx != -1:
                        items_before = [it for it in items[:split_idx] if it != side_img_tag]
                        items_after = [it for it in items[split_idx:] if it != side_img_tag]
                    else:
                        img_idx = items.index(side_img_tag)
                        items_before = items[:img_idx]
                        items_after = items[img_idx + 1:]
                else:
                    img_idx = items.index(side_img_tag)
                    items_before = items[:img_idx]
                    items_after = items[img_idx + 1:]

                side_fig_html = f"""        <figure class="doc-figure doc-figure-side">
          <img src="{side_img_info["src"]}" alt="" loading="lazy">
          <figcaption>{side_img_info["caption"]}</figcaption>
        </figure>"""
                text_inner = []
                for t, a, raw, p in items_before:
                    rendered = render_body_item(t, a, raw, p)
                    if rendered:
                        text_inner.append(rendered)
                text_str = "\n".join(text_inner)
                output_html_lines.append(f"""      <div class="doc-media-row">
{side_fig_html}
        <div class="doc-media-text">
{text_str}
        </div>
      </div>""")
                # Items after image resume full width normally
                for t, a, raw, p in items_after:
                    rendered = render_body_item(t, a, raw, p)
                    if rendered:
                        output_html_lines.append(rendered)
            else:
                for t, a, raw, p in items:
                    rendered = render_body_item(t, a, raw, p)
                    if rendered: output_html_lines.append(rendered)
                
        elif b_type == "summary":
            summary_inner = []
            for t, a, raw, p in items:
                rendered = render_body_item(t, a, raw, p)
                if rendered: summary_inner.append(rendered)
            inner_str = "\n".join(summary_inner)
            output_html_lines.append(f"""      <div class="doc-summary-box">
        <div class="summary-badge">📌 TÓM TẮT CHƯƠNG</div>
        <div class="summary-body">
{inner_str}
        </div>
      </div>""")

        elif b_type == "next_teaser":
            teaser_inner = []
            for t, a, raw, p in items:
                rendered = render_body_item(t, a, raw, p)
                if rendered: teaser_inner.append(rendered)
            inner_str = "\n".join(teaser_inner)
            output_html_lines.append(f"""      <div class="doc-next-teaser">
        <span class="teaser-badge">Đọc tiếp chương sau</span>
        <h3 class="teaser-title">{heading}</h3>
        <div class="teaser-body">
{inner_str}
        </div>
      </div>""")

        elif b_type == "tool_card":
            card_inner = []
            for t, a, raw, p in items:
                rendered = render_body_item(t, a, raw, p)
                if rendered: card_inner.append(rendered)
            inner_str = "\n".join(card_inner)
            output_html_lines.append(f"""      <div class="tool-card">
        <div class="tool-card-body">
          <h3 class="tool-title">{heading}</h3>
{inner_str}
        </div>
      </div>""")

        elif b_type == "faq_item":
            faq_inner = []
            for t, a, raw, p in items:
                rendered = render_body_item(t, a, raw, p)
                if rendered: faq_inner.append(rendered)
            inner_str = "\n".join(faq_inner)
            output_html_lines.append(f"""      <div class="faq-item">
        <h3 class="faq-question">{heading}</h3>
        <div class="faq-answer">
{inner_str}
        </div>
      </div>""")

        elif b_type == "epilogue":
            epilogue_inner = []
            signature_rendered = False
            for t, a, raw, p in items:
                if p == "Hiểu con từ Gốc":
                    epilogue_inner.append('          <div class="epilogue-signature">Hiểu con từ Gốc</div>')
                    signature_rendered = True
                    continue
                rendered = render_body_item(t, a, raw, p)
                if rendered: epilogue_inner.append(rendered)
            if not signature_rendered:
                epilogue_inner.append('          <div class="epilogue-signature">Hiểu con từ Gốc</div>')
            inner_str = "\n".join(epilogue_inner)
            output_html_lines.append(f"""      <div class="doc-epilogue">
        <h2 class="epilogue-title">{heading}</h2>
        <div class="epilogue-body">
{inner_str}
        </div>
      </div>""")

        b_idx += 1

    content_html = "\n".join(output_html_lines)
    
    file_content = f"""<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{page_title} — Hiểu con từ Gốc - Giác quan</title>
  <meta name="description" content="{page_title} — Tài liệu Hiểu con từ Gốc - Giác quan">
  <meta property="og:title" content="{page_title} — Hiểu con từ Gốc - Giác quan">
  <meta property="og:description" content="Cẩm nang toàn diện về 8 hệ giác quan, điều hòa và cách đồng hành cùng con từ gốc rễ.">
  <meta property="og:type" content="article">
  <meta property="og:image" content="/assets/img/2.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{page_title} — Hiểu con từ Gốc - Giác quan">
  <meta name="twitter:description" content="Cẩm nang toàn diện về 8 hệ giác quan, điều hòa và cách đồng hành cùng con từ gốc rễ.">
  <meta name="twitter:image" content="/assets/img/2.jpg">
  <link rel="icon" type="image/png" href="/assets/img/icon.png">
  <link rel="stylesheet" href="/assets/css/base.css">
  <link rel="stylesheet" href="/assets/css/doc.css">
</head>

<body data-doc-base="/giac-quan/" data-page="{file_slug}.html">

  <!-- Top bar, menu ☰ và nút mũi tên do doc-layout.js tự chèn -->

  <div class="doc-page">
    <header class="doc-page-head">
      <div class="inner">
        <span class="eyebrow" data-eyebrow></span>
        <h1>{page_title}</h1>
      </div>
    </header>

    <!-- ============ NỘI DUNG TRANG ============ -->
    <main class="doc-content">
{content_html}

      <div class="doc-next" data-next-card></div>
    </main>
    <!-- ============ HẾT NỘI DUNG TRANG ============ -->
  </div>

  <script src="/giac-quan/data.js"></script>
  <script src="/assets/js/doc-layout.js"></script>
</body>

</html>
"""
    return file_content

def main():
    parser = CleanGDocParser()
    with open('/tmp/gdoc_updated/01_GicQuan.html', 'r', encoding='utf-8') as f:
        parser.feed(f.read())

    chapters = {}
    current_ch = 0

    for tag, attrs, text in parser.elements:
        cls = attrs.get('class', '')
        plain = re.sub(r'<[^>]+>', '', text).strip()
        plain = html.unescape(plain)
        
        ch_match = re.match(r'^(0[1-9]|1[0-2])\s+(.*)', plain)
        if 'title' in cls and ch_match:
            current_ch = int(ch_match.group(1))
            chapters[current_ch] = []
            continue
        elif 'title' in cls and 'Visual' in plain:
            current_ch = 99
            continue
            
        if 1 <= current_ch <= 12:
            chapters[current_ch].append((tag, attrs, text))

    output_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "giac-quan")

    for cfg in CHAPTERS_CONFIG:
        ch_num = cfg["index"]
        file_slug = cfg["file"]
        raw_items = chapters.get(ch_num, [])
        
        file_content = render_chapter_html(ch_num, cfg, raw_items)
        target_path = os.path.join(output_dir, f"{file_slug}.html")
        with open(target_path, "w", encoding="utf-8") as out_f:
            out_f.write(file_content)
        print(f"Generated {file_slug}.html ({len(file_content)} bytes)")

    print("All 12 chapter HTML files updated successfully with Autism Speaks IA structure!")

if __name__ == "__main__":
    main()
