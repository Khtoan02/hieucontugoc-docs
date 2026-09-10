/* =========================================================
   doc-layout.js — dựng mục lục / sidebar / điều hướng
   Dùng chung cho trang bìa tài liệu và mọi trang con.

   Cách dùng: trong <body> đặt data-doc-base (đường dẫn về thư
   mục gốc của tài liệu) và data-page (file hiện tại, nếu là
   trang con). File data.js phải được nạp TRƯỚC file này.
   ========================================================= */

(function () {
  "use strict";

  var data = window.DOC_DATA;
  if (!data) return;

  var body = document.body;
  var base = body.getAttribute("data-doc-base") || "";
  var current = body.getAttribute("data-page") || "";

  /* --- Danh sách phẳng tất cả trang, để làm nút trước/sau --- */
  var flat = [];
  data.sections.forEach(function (section) {
    section.pages.forEach(function (page) {
      flat.push({ title: page.title, file: page.file, section: section.title });
    });
  });

  /* --- Dựng HTML mục lục --- */
  function buildToc() {
    var html = "";
    data.sections.forEach(function (section) {
      html += '<div class="toc-section">';
      html += '<div class="toc-section-title">' + section.title + "</div>";
      html += '<ul class="toc-links">';
      section.pages.forEach(function (page) {
        var active = page.file === current ? ' class="is-active"' : "";
        html += "<li><a" + active + ' href="' + base + page.file + '">' + page.title + "</a></li>";
      });
      html += "</ul></div>";
    });
    return html;
  }

  /* --- Trang bìa: đổ mục lục + tiêu đề + ảnh nền --- */
  var coverToc = document.querySelector("[data-toc]");
  if (coverToc) coverToc.innerHTML = buildToc();

  var titleEl = document.querySelector("[data-doc-title]");
  if (titleEl) titleEl.textContent = data.title;

  var subtitleEl = document.querySelector("[data-doc-subtitle]");
  if (subtitleEl) subtitleEl.textContent = data.subtitle || "";

  var visual = document.querySelector(".cover-visual");
  if (visual && data.cover) {
    visual.style.setProperty("--cover-image", 'url("' + data.cover + '")');
  }

  var pdfLink = document.querySelector("[data-pdf-link]");
  if (pdfLink) {
    if (data.pdf) pdfLink.href = data.pdf;
    else pdfLink.remove();
  }

  /* --- Trang con: sidebar + breadcrumb + trước/sau --- */
  var sidebar = document.querySelector("[data-sidebar]");
  if (sidebar) {
    sidebar.innerHTML =
      '<a class="sidebar-home" href="' + base + 'index.html">← ' + data.title + "</a>" + buildToc();
  }

  var crumb = document.querySelector("[data-crumb]");
  if (crumb) crumb.textContent = data.title;

  var index = flat.findIndex(function (p) { return p.file === current; });

  var counter = document.querySelector("[data-page-count]");
  if (counter && index > -1) {
    counter.textContent = index + 1 + " / " + flat.length;
  }

  var pager = document.querySelector("[data-pager]");
  if (pager && index > -1) {
    var html = "";
    if (index > 0) {
      html +=
        '<a class="pager-prev" href="' + base + flat[index - 1].file + '">' +
        '<span class="pager-label">Trang trước</span>' + flat[index - 1].title + "</a>";
    }
    if (index < flat.length - 1) {
      html +=
        '<a class="pager-next" href="' + base + flat[index + 1].file + '">' +
        '<span class="pager-label">Trang sau</span>' + flat[index + 1].title + "</a>";
    }
    pager.innerHTML = html;
  }

  /* --- Nút mở/đóng sidebar trên màn hình nhỏ --- */
  var toggle = document.querySelector("[data-sidebar-toggle]");
  if (toggle && sidebar) {
    var small = window.matchMedia("(max-width: 900px)");
    if (small.matches) sidebar.hidden = true;
    toggle.addEventListener("click", function () {
      sidebar.hidden = !sidebar.hidden;
    });
  }
})();
