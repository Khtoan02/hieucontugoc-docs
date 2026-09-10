/* =========================================================
   doc-layout.js — dựng toàn bộ khung điều hướng của tài liệu:
   thanh top bar, menu ☰ (lưới các trang), nút mũi tên
   trước/sau, và mục lục ở trang bìa.

   Mỗi file HTML chỉ cần khai báo trên thẻ <body>:
     data-doc-base="..."   đường dẫn về thư mục gốc tài liệu
                           ("" ở trang bìa, "../" ở trang con)
     data-page="..."       file hiện tại, đúng như trong data.js
   và nạp data.js TRƯỚC file này.
   ========================================================= */

(function () {
  "use strict";

  var data = window.DOC_DATA;
  if (!data) return;

  var body = document.body;
  var base = body.getAttribute("data-doc-base") || "";
  var current = body.getAttribute("data-page") || "index.html";
  var siteRoot = base + "../../";
  var pages = data.pages || [];
  var index = pages.findIndex(function (p) { return p.file === current; });

  function href(file) { return base + file; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* --- Icon SVG --- */
  var ICON = {
    menu: '<svg width="22" height="22" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true"><path d="m5 10h30v3.4h-30v-3.4z m0 11.6v-3.2h30v3.2h-30z m0 8.4v-3.4h30v3.4h-30z"/></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    prev: '<svg width="22" height="22" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true"><path d="m33.4 18.4v3.2h-20.4l9.3 9.4-2.3 2.4-13.4-13.4 13.4-13.4 2.3 2.4-9.3 9.4h20.4z"/></svg>',
    next: '<svg width="22" height="22" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true"><path d="m20 6.6l13.4 13.4-13.4 13.4-2.3-2.4 9.3-9.4h-20.4v-3.2h20.4l-9.3-9.4z"/></svg>'
  };

  /* =======================================================
     1. Top bar
     ======================================================= */
  var topbar = document.createElement("header");
  topbar.className = "topbar";
  topbar.innerHTML =
    '<a class="brand" href="' + siteRoot + 'index.html">hiểu con <em>từ gốc</em></a>' +
    '<span class="divider"></span>' +
    '<button class="menu-btn" type="button" aria-label="Danh sách trang" aria-expanded="false">' + ICON.menu + "</button>" +
    '<span class="divider"></span>' +
    '<div class="page-indicator">' + (index > -1 ? index + 1 : 1) + " / " + pages.length + "</div>" +
    '<span class="divider"></span>' +
    '<div class="doc-name">' + data.title + "</div>" +
    '<div class="spacer"></div>';
  body.insertBefore(topbar, body.firstChild);

  /* =======================================================
     2. Menu ☰ — lưới toàn bộ trang
     ======================================================= */
  var overlay = document.createElement("div");
  overlay.className = "page-index";
  overlay.hidden = true;

  var cards = pages.map(function (p, i) {
    var cls = "page-index-item" + (p.file === current ? " is-current" : "");
    return (
      '<a class="' + cls + '" href="' + href(p.file) + '">' +
      '<div class="thumb">' + pad(i + 1) + "</div>" +
      '<span class="label"><b>' + pad(i + 1) + "</b>" + p.title + "</span></a>"
    );
  }).join("");

  overlay.innerHTML =
    '<button class="page-index-close" type="button" aria-label="Đóng">' + ICON.close + "</button>" +
    '<div class="page-index-head"><span>Mục lục</span><h2>' + data.title + "</h2></div>" +
    '<div class="page-index-grid">' + cards + "</div>";
  body.appendChild(overlay);

  function setMenu(open) {
    overlay.hidden = !open;
    body.classList.toggle("is-locked", open);
    topbar.querySelector(".menu-btn").setAttribute("aria-expanded", String(open));
  }

  topbar.querySelector(".menu-btn").addEventListener("click", function () {
    setMenu(overlay.hidden);
  });
  overlay.querySelector(".page-index-close").addEventListener("click", function () {
    setMenu(false);
  });

  /* =======================================================
     3. Mũi tên trước / sau
     ======================================================= */
  var prev = index > 0 ? pages[index - 1] : null;
  var next = index > -1 && index < pages.length - 1 ? pages[index + 1] : null;

  function arrow(page, dir, label) {
    if (!page) return '<span class="arrow-off" aria-hidden="true">' + ICON[dir] + "</span>";
    return (
      '<span class="arrow-wrap">' +
      '<span class="arrow-label">' + label + ": " + page.title + "</span>" +
      '<a href="' + href(page.file) + '" aria-label="' + label + ": " + page.title + '">' + ICON[dir] + "</a>" +
      "</span>"
    );
  }

  var arrows = document.createElement("nav");
  arrows.className = "doc-arrows";
  arrows.setAttribute("aria-label", "Chuyển trang");
  arrows.innerHTML = arrow(prev, "prev", "Trang trước") + arrow(next, "next", "Trang sau");
  body.appendChild(arrows);

  /* Phím mũi tên trái/phải để lật trang */
  document.addEventListener("keydown", function (e) {
    if (e.target.matches("input, textarea")) return;
    if (e.key === "Escape" && !overlay.hidden) return setMenu(false);
    if (e.key === "ArrowLeft" && prev) location.href = href(prev.file);
    if (e.key === "ArrowRight" && next) location.href = href(next.file);
  });

  /* =======================================================
     4. Trang bìa: ảnh nền, tiêu đề, nút, mục lục
     ======================================================= */
  var cover = document.querySelector(".doc-cover");
  if (cover && data.cover) {
    cover.style.setProperty("--cover-image", 'url("' + data.cover + '")');
  }

  var titleEl = document.querySelector("[data-doc-title]");
  if (titleEl) titleEl.textContent = data.title;

  var subEl = document.querySelector("[data-doc-subtitle]");
  if (subEl) {
    if (data.subtitle) subEl.textContent = data.subtitle;
    else subEl.remove();
  }

  var pdfLink = document.querySelector("[data-pdf-link]");
  if (pdfLink) {
    if (data.pdf) pdfLink.href = data.pdf;
    else pdfLink.remove();
  }

  var tocEl = document.querySelector("[data-toc]");
  if (tocEl) {
    tocEl.innerHTML = (data.toc || []).map(function (entry) {
      var topics = (entry.topics || []).map(function (t) {
        return '<li><a href="' + href(entry.file) + '">' + t + "</a></li>";
      }).join("");
      return (
        '<div class="toc-entry">' +
        '<a class="toc-chapter" href="' + href(entry.file) + '">' + entry.label + "</a>" +
        '<ul class="toc-topics">' + topics + "</ul></div>"
      );
    }).join("");
  }

  /* Trang con: điền nhãn "chương x / y" và thẻ trang tiếp theo */
  var eyebrow = document.querySelector("[data-eyebrow]");
  if (eyebrow && index > -1) {
    eyebrow.textContent = "Trang " + pad(index + 1) + " / " + pad(pages.length);
  }

  var nextCard = document.querySelector("[data-next-card]");
  if (nextCard) {
    if (next) {
      nextCard.innerHTML =
        '<a href="' + href(next.file) + '">' +
        '<span class="label">Trang tiếp theo</span>' +
        '<span class="title">' + next.title + "</span></a>";
    } else {
      nextCard.remove();
    }
  }

  /* =======================================================
     5. Vercel Web Analytics
     ======================================================= */
  if (!window.va) {
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    var vaScript = document.createElement("script");
    vaScript.defer = true;
    vaScript.src = "/_vercel/insights/script.js";
    document.head.appendChild(vaScript);
  }
})();
