/* =========================================================
   doc-layout.js — Dựng khung điều hướng của tài liệu &
   Chuyển trang siêu mượt mà chuẩn 60/120 FPS (View Transitions)
   ========================================================= */

(function () {
  "use strict";

  var data = window.DOC_DATA;
  if (!data) return;

  var body = document.body;
  var pages = data.pages || [];
  var current = body.getAttribute("data-page") || "index.html";
  var base = body.getAttribute("data-doc-base") || "";

  /* Lấy đường dẫn thư mục gốc của tài liệu hiện tại (e.g. /tai-lieu-mau/) */
  function getDocFolder(path) {
    if (!path && base && base.startsWith("/")) {
      return base.endsWith("/") ? base : base + "/";
    }
    var p = path || location.pathname;
    var parts = p.split("/").filter(Boolean);
    if (parts.length > 1) {
      return "/" + parts.slice(0, parts.length - 1).join("/") + "/";
    }
    if (parts.length === 1) {
      return "/" + parts[0] + "/";
    }
    return "/";
  }

  var docFolder = getDocFolder();
  var siteRoot = "/";

  function href(file) {
    var f = (file || "").replace(/\.html$/, "");
    if (!f || f === "index") return docFolder.replace(/\/$/, "");
    return docFolder + f;
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function getPageIndex(pageFile) {
    var cf = (pageFile || "").replace(/\.html$/, "");
    return pages.findIndex(function (p) {
      var pf = (p.file || "").replace(/\.html$/, "");
      return pf === cf || (pf === "index" && (cf === "index" || cf === "index.html" || cf === ""));
    });
  }

  var index = getPageIndex(current);

  /* --- Icon SVG --- */
  var ICON = {
    menu: '<svg width="22" height="22" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true"><path d="m5 10h30v3.4h-30v-3.4z m0 11.6v-3.2h30v3.2h-30z m0 8.4v-3.4h30v3.4h-30z"/></svg>',
    close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    prev: '<svg width="22" height="22" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true"><path d="m33.4 18.4v3.2h-20.4l9.3 9.4-2.3 2.4-13.4-13.4 13.4-13.4 2.3 2.4-9.3 9.4h20.4z"/></svg>',
    next: '<svg width="22" height="22" viewBox="0 0 40 40" fill="currentColor" aria-hidden="true"><path d="m20 6.6l13.4 13.4-13.4 13.4-2.3-2.4 9.3-9.4h-20.4v-3.2h20.4l-9.3-9.4z"/></svg>',
    help: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>'
  };

  /* =======================================================
     1. Top bar
     ======================================================= */
  var topbar = document.createElement("header");
  topbar.className = "topbar";
  topbar.innerHTML =
    '<a class="brand" href="' + siteRoot + '">HIỂU CON <em>TỪ GỐC</em></a>' +
    '<span class="divider"></span>' +
    '<button class="menu-btn" type="button" aria-label="Danh sách trang" aria-expanded="false">' + ICON.menu + "</button>" +
    '<span class="divider"></span>' +
    '<div class="page-indicator">' + (index > -1 ? index + 1 : 1) + " / " + pages.length + "</div>" +
    '<span class="divider"></span>' +
    '<div class="doc-name">' + data.title + "</div>" +
    '<div class="spacer"></div>' +
    '<a class="topbar-help" href="https://hieucontugoc.online/zalo-group" target="_blank" rel="noopener noreferrer" title="Tham gia nhóm Zalo hỗ trợ">' +
    ICON.help +
    "<span>Chúng tôi ở đây để giúp bạn</span></a>";
  body.insertBefore(topbar, body.firstChild);

  /* =======================================================
     2. Menu ☰ — lưới toàn bộ trang
     ======================================================= */
  var overlay = document.createElement("div");
  overlay.className = "page-index";
  overlay.hidden = true;

  function renderMenuCards() {
    return pages.map(function (p, i) {
      var isCurr = i === index;
      var cls = "page-index-item" + (isCurr ? " is-current" : "");
      return (
        '<a class="' + cls + '" href="' + href(p.file) + '">' +
        '<div class="thumb">' + pad(i + 1) + "</div>" +
        '<span class="label"><b>' + pad(i + 1) + "</b>" + p.title + "</span></a>"
      );
    }).join("");
  }

  overlay.innerHTML =
    '<button class="page-index-close" type="button" aria-label="Đóng">' + ICON.close + "</button>" +
    '<div class="page-index-head"><span>Mục lục</span><h2>' + data.title + "</h2></div>" +
    '<div class="page-index-grid">' + renderMenuCards() + "</div>";
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
    if (e.key === "ArrowLeft" && prev) navigateDoc(href(prev.file));
    if (e.key === "ArrowRight" && next) navigateDoc(href(next.file));
  });

  /* =======================================================
     4. Khởi tạo nội dung trang (Trang bìa hoặc Trang con)
     ======================================================= */
  function initPageElements() {
    /* Trang bìa: ảnh nền, tiêu đề, nút, mục lục */
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

    /* Trang con: điền nhãn "Trang x / y" và thẻ trang tiếp theo */
    var eyebrow = document.querySelector("[data-eyebrow]");
    if (eyebrow && index > -1) {
      eyebrow.textContent = "Trang " + pad(index + 1) + " / " + pad(pages.length);
    }

    var nextCard = document.querySelector("[data-next-card]");
    if (nextCard) {
      if (next) {
        nextCard.innerHTML =
          '<a href="' + href(next.file) + '">' +
          '<div class="doc-next-text">' +
          '<span class="label">Trang tiếp theo</span>' +
          '<span class="title">' + next.title + "</span>" +
          "</div>" +
          '<div class="arrow-icon" aria-hidden="true">' + ICON.next + "</div>" +
          "</a>";
      } else {
        nextCard.remove();
      }
    }
  }

  /* Khởi tạo trang lần đầu */
  initPageElements();

  /* =======================================================
     5. BỘ CHUYỂN TRANG SIÊU MƯỢT (Instant Preload & View Transitions)
     ======================================================= */
  var pageCache = {};

  function preloadPage(url) {
    if (!url || pageCache[url]) return;
    fetch(url, { priority: "low" })
      .then(function (res) { return res.ok ? res.text() : null; })
      .then(function (html) { if (html) pageCache[url] = html; })
      .catch(function () {});
  }

  // Tiền nạp trước trang sau và trang trước để chuyển tức thì 0ms
  if (next) preloadPage(href(next.file));
  if (prev) preloadPage(href(prev.file));

  function navigateDoc(targetUrl, isPopState) {
    if (!targetUrl) return;

    var cachedHtml = pageCache[targetUrl];
    var fetchPromise = cachedHtml
      ? Promise.resolve(cachedHtml)
      : fetch(targetUrl).then(function (res) {
          if (!res.ok) throw new Error("HTTP error " + res.status);
          return res.text();
        });

    fetchPromise
      .then(function (html) {
        pageCache[targetUrl] = html;
        var parser = new DOMParser();
        var newDoc = parser.parseFromString(html, "text/html");

        function updateDOM() {
          // Cập nhật tiêu đề trang
          document.title = newDoc.title;

          // Cập nhật thuộc tính body
          var newPage = newDoc.body.getAttribute("data-page") || "";
          var newBase = newDoc.body.getAttribute("data-doc-base") || "";
          body.setAttribute("data-page", newPage);
          body.setAttribute("data-doc-base", newBase);
          body.className = newDoc.body.className;

          // Thay thế phần nội dung chính (.doc-cover hoặc .doc-page)
          var oldMain = document.querySelector(".doc-cover, .doc-page");
          var newMain = newDoc.querySelector(".doc-cover, .doc-page");
          if (oldMain && newMain) {
            oldMain.replaceWith(newMain);
          }

          // Cập nhật trạng thái trang
          current = newPage;
          base = newBase;
          index = getPageIndex(current);
          prev = index > 0 ? pages[index - 1] : null;
          next = index > -1 && index < pages.length - 1 ? pages[index + 1] : null;

          // Cập nhật bộ đếm trang trên topbar
          var indicator = topbar.querySelector(".page-indicator");
          if (indicator) {
            indicator.textContent = (index > -1 ? index + 1 : 1) + " / " + pages.length;
          }

          // Cập nhật thẻ mục lục ☰
          var grid = overlay.querySelector(".page-index-grid");
          if (grid) grid.innerHTML = renderMenuCards();

          // Cập nhật nút mũi tên góc dưới
          arrows.innerHTML = arrow(prev, "prev", "Trang trước") + arrow(next, "next", "Trang sau");

          // Khởi tạo các thành phần giao diện của trang mới
          initPageElements();

          // Đóng menu nếu đang mở
          setMenu(false);

          // Cuộn lên đầu trang
          window.scrollTo(0, 0);

          // Đẩy vào lịch sử trình duyệt
          if (!isPopState) {
            history.pushState({ url: targetUrl }, "", targetUrl);
          }

          // Tiền nạp các trang lân cận cho lần bấm tiếp theo
          if (next) preloadPage(href(next.file));
          if (prev) preloadPage(href(prev.file));
        }

        if (document.startViewTransition) {
          document.startViewTransition(updateDOM);
        } else {
          updateDOM();
        }
      })
      .catch(function () {
        // Dự phòng: chuyển trang chuẩn nếu fetch thất bại
        window.location.href = targetUrl;
      });
  }

  /* Bắt sự kiện click vào các liên kết trong cùng tài liệu */
  document.addEventListener("click", function (e) {
    var link = e.target.closest("a");
    if (!link) return;

    // Bỏ qua nếu là tab mới, tải về hoặc phím tắt đặc biệt
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;

    var url = new URL(link.href, location.href);

    // Bỏ qua nếu khác tên miền
    if (url.origin !== location.origin) return;

    // Nếu cùng trang và có hash (#), để trình duyệt tự cuộn
    if (url.pathname === location.pathname && url.hash) return;

    // Kiểm tra xem liên kết có thuộc về tài liệu hiện tại hay không
    var targetFolder = getDocFolder(url.pathname);
    if (targetFolder === docFolder) {
      e.preventDefault();
      navigateDoc(link.href, false);
    }
  });

  /* Tiền nạp tức thì khi rê chuột qua liên kết (0ms latency khi bấm) */
  document.addEventListener("mouseover", function (e) {
    var link = e.target.closest("a");
    if (!link || link.target === "_blank") return;
    if (link.origin === location.origin) {
      var targetFolder = getDocFolder(link.pathname);
      if (targetFolder === docFolder) {
        preloadPage(link.href);
      }
    }
  }, { passive: true });

  /* Hỗ trợ nút Back / Forward trên trình duyệt */
  window.addEventListener("popstate", function () {
    navigateDoc(location.href, true);
  });

  /* =======================================================
     6. Vercel Web Analytics
     ======================================================= */
  if (!window.va) {
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    var vaScript = document.createElement("script");
    vaScript.defer = true;
    vaScript.src = "/_vercel/insights/script.js";
    document.head.appendChild(vaScript);
  }
})();
