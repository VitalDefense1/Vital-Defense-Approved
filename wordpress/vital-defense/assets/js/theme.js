(function () {
  var catalog = [];
  try {
    catalog = JSON.parse(document.getElementById("vd-catalog").textContent || "[]");
  } catch (error) {
    catalog = [];
  }
  var byId = {};
  catalog.forEach(function (item) { byId[item.id] = item; });

  function money(value) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
  }
  function read(key) {
    try { return JSON.parse(sessionStorage.getItem(key) || "[]"); } catch (error) { return []; }
  }
  function write(key, value) {
    try { sessionStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
  }
  function favorites() {
    try { return JSON.parse(localStorage.getItem("vd-favorites") || "[]"); } catch (error) { return []; }
  }
  function saveFavorites(ids) {
    try { localStorage.setItem("vd-favorites", JSON.stringify(ids)); } catch (error) {}
    paintHearts();
    if (document.querySelector('[data-dialog="favorites"]:not([hidden])')) paintFavorites();
  }
  function cart() { return read("vd-cart"); }
  function saveCart(items) {
    write("vd-cart", items);
    paintCart();
  }
  function addCart(item) {
    var items = cart();
    var found = items.find(function (line) { return line.id === item.id; });
    if (found) found.qty += 1;
    else items.push({ id: item.id, title: item.title, price: Number(item.price), qty: 1 });
    saveCart(items);
  }
  function product(id) { return byId[id]; }

  function paintHearts() {
    var ids = favorites();
    document.querySelectorAll("[data-favorite]").forEach(function (button) {
      var on = ids.indexOf(button.getAttribute("data-favorite")) !== -1;
      button.classList.toggle("is-on", on);
      button.setAttribute("aria-pressed", on ? "true" : "false");
      var title = button.getAttribute("data-title") || "item";
      button.setAttribute("aria-label", (on ? "Remove " : "Add ") + title + (on ? " from favorites" : " to favorites"));
    });
  }
  function paintCart() {
    var items = cart();
    var count = items.reduce(function (sum, item) { return sum + item.qty; }, 0);
    document.querySelectorAll("[data-cart-count]").forEach(function (badge) {
      badge.hidden = count < 1;
      badge.textContent = String(count);
    });
    var cartButton = document.querySelector('[data-open-dialog="cart"]');
    if (cartButton) cartButton.setAttribute("aria-label", count ? "Cart, " + count + " items" : "Cart");
    document.querySelectorAll("[data-cart-status]").forEach(function (node) {
      var line = items.find(function (item) { return item.id === node.getAttribute("data-cart-status"); });
      node.textContent = line ? "In the cart · " + line.qty : "";
    });
    var copy = document.querySelector("[data-cart-dialog-copy]");
    var lines = document.querySelector("[data-cart-dialog-lines]");
    if (copy && lines) {
      if (!items.length) {
        copy.textContent = "Nothing is in the cart yet.";
        lines.innerHTML = "";
      } else {
        copy.textContent = "Checkout is not connected. These items stay in this browser for the preview.";
        var subtotal = items.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
        lines.innerHTML = "<ul>" + items.map(function (item) {
          return '<li class="vd-cart-line"><div><p>' + escapeHtml(item.title) + '</p><p class="vd-muted">' + money(item.price) + " · " + item.qty + '</p></div><button type="button" class="vd-text-link" data-remove-cart="' + escapeHtml(item.id) + '">Remove</button></li>';
        }).join("") + '</ul><p class="vd-price">Subtotal ' + money(subtotal) + "</p>";
      }
    }
    paintCartPage();
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }
  function paintCartPage() {
    var page = document.querySelector("[data-cart-page]");
    if (!page) return;
    var saved = cart();
    var showingSaved = saved.length > 0 && !page.dataset.hidSample;
    var lines = showingSaved ? saved.map(function (item) {
      var record = product(item.id) || {};
      return { id: item.id, title: item.title, price: item.price, qty: item.qty, image: record.image || "", url: record.url || "#" };
    }) : sampleLines(page);
    var source = page.querySelector("[data-cart-source]");
    if (source) {
      source.textContent = showingSaved ? "Showing the items saved in this browser." : (page.dataset.hidSample ? "Nothing is saved in this browser." : "Showing sample products so this layout can be reviewed.");
    }
    var host = page.querySelector("[data-cart-lines]");
    if (!lines.length) {
      host.innerHTML = '<li class="vd-empty">No items to show on this page.</li>';
    } else {
      host.innerHTML = lines.map(function (line) {
        return '<li class="vd-cart-row"><a class="vd-product-media vd-cart-thumb" href="' + escapeHtml(line.url) + '">' + (line.image ? '<img src="' + escapeHtml(line.image) + '" alt="">' : "") + '</a><div class="vd-cart-main"><div class="vd-cart-title-row"><h3><a class="vd-text-link" href="' + escapeHtml(line.url) + '">' + escapeHtml(line.title) + '</a></h3><p class="vd-price">' + money(line.price * line.qty) + "</p></div>" + (line.qty > 1 ? '<p class="vd-muted">' + money(line.price) + ' each</p>' : "") + '<div class="vd-cart-actions"><div class="vd-qty" role="group" aria-label="Quantity for ' + escapeHtml(line.title) + '"><button type="button" data-qty="' + escapeHtml(line.id) + '" data-delta="-1"' + (line.qty <= 1 ? " disabled" : "") + '>−</button><span>' + line.qty + '</span><button type="button" data-qty="' + escapeHtml(line.id) + '" data-delta="1">+</button></div><button type="button" class="vd-text-link vd-remove" data-remove-line="' + escapeHtml(line.id) + '">Remove</button></div></div></li>';
      }).join("");
    }
    var subtotal = lines.reduce(function (sum, line) { return sum + line.price * line.qty; }, 0);
    var subtotalNode = page.querySelector("[data-cart-subtotal]");
    if (subtotalNode) subtotalNode.textContent = money(subtotal);
    page.dataset.saved = showingSaved ? "1" : "0";
  }
  function sampleLines(page) {
    if (page.dataset.hidSample === "1") return [];
    if (!page.dataset.sampleQty) page.dataset.sampleQty = JSON.stringify({ "scoped-rifle": 1, "pistol-optic": 1 });
    var qty = JSON.parse(page.dataset.sampleQty);
    return Object.keys(qty).map(function (id) {
      var record = product(id);
      if (!record) return null;
      return { id: id, title: record.title, price: record.price, qty: qty[id], image: record.image, url: record.url };
    }).filter(Boolean);
  }

  function openDialog(name) {
    closeMenu();
    document.querySelectorAll("[data-dialog]").forEach(function (dialog) {
      dialog.hidden = dialog.getAttribute("data-dialog") !== name;
    });
    if (name === "favorites") paintFavorites();
    document.body.style.overflow = "hidden";
  }
  function closeDialogs() {
    document.querySelectorAll("[data-dialog]").forEach(function (dialog) { dialog.hidden = true; });
    document.body.style.overflow = "";
  }
  function paintFavorites() {
    var host = document.querySelector("[data-favorites-body]");
    if (!host) return;
    var items = favorites().map(product).filter(Boolean);
    if (!items.length) {
      host.innerHTML = '<p class="vd-empty">NO FAVORITES YET</p>';
      return;
    }
    host.innerHTML = '<ul class="vd-favorites-grid">' + items.map(function (item) {
      return '<li class="vd-favorites-item"><a class="vd-product-card" href="' + escapeHtml(item.url) + '"><span class="vd-product-media"><img src="' + escapeHtml(item.image) + '" alt=""></span><span class="vd-product-title">' + escapeHtml(item.title) + '</span><span class="vd-price">' + money(item.price) + '</span></a><button type="button" class="vd-heart is-on" data-favorite="' + escapeHtml(item.id) + '" data-title="' + escapeHtml(item.title) + '" aria-pressed="true">' + heart() + "</button></li>";
    }).join("") + "</ul>";
    paintHearts();
  }
  function heart() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
  }
  function openMenu() {
    var sheet = document.querySelector("[data-sheet]");
    sheet.hidden = false;
    document.querySelector("[data-open-menu]").setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    var sheet = document.querySelector("[data-sheet]");
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true;
    document.querySelector("[data-open-menu]").setAttribute("aria-expanded", "false");
    if (!document.querySelector("[data-dialog]:not([hidden])")) document.body.style.overflow = "";
  }

  document.addEventListener("click", function (event) {
    var favorite = event.target.closest("[data-favorite]");
    if (favorite) {
      event.preventDefault();
      event.stopPropagation();
      var id = favorite.getAttribute("data-favorite");
      var ids = favorites();
      var index = ids.indexOf(id);
      if (index === -1) ids.push(id);
      else ids.splice(index, 1);
      saveFavorites(ids);
      return;
    }
    var add = event.target.closest("[data-add-cart]");
    if (add) {
      addCart({ id: add.getAttribute("data-id"), title: add.getAttribute("data-title"), price: add.getAttribute("data-price") });
      return;
    }
    if (event.target.closest("[data-open-menu]")) { openMenu(); return; }
    if (event.target.closest("[data-close-menu]")) { closeMenu(); return; }
    var opener = event.target.closest("[data-open-dialog]");
    if (opener) { openDialog(opener.getAttribute("data-open-dialog")); return; }
    if (event.target.closest("[data-close-dialog]")) { closeDialogs(); return; }
    var remove = event.target.closest("[data-remove-cart]");
    if (remove) {
      saveCart(cart().filter(function (item) { return item.id !== remove.getAttribute("data-remove-cart"); }));
      return;
    }
    var qty = event.target.closest("[data-qty]");
    if (qty) {
      var page = document.querySelector("[data-cart-page]");
      var lineId = qty.getAttribute("data-qty");
      var delta = Number(qty.getAttribute("data-delta"));
      if (page && page.dataset.saved === "1") {
        saveCart(cart().map(function (item) {
          return item.id === lineId ? Object.assign({}, item, { qty: Math.max(1, item.qty + delta) }) : item;
        }));
      } else if (page) {
        var sample = JSON.parse(page.dataset.sampleQty || "{}");
        sample[lineId] = Math.max(1, (sample[lineId] || 1) + delta);
        page.dataset.sampleQty = JSON.stringify(sample);
        paintCartPage();
      }
      return;
    }
    var removeLine = event.target.closest("[data-remove-line]");
    if (removeLine) {
      var cartPage = document.querySelector("[data-cart-page]");
      var removeId = removeLine.getAttribute("data-remove-line");
      if (cartPage && cartPage.dataset.saved === "1") {
        var next = cart().filter(function (item) { return item.id !== removeId; });
        if (!next.length) cartPage.dataset.hidSample = "1";
        saveCart(next);
      } else if (cartPage) {
        var sampleQty = JSON.parse(cartPage.dataset.sampleQty || "{}");
        delete sampleQty[removeId];
        cartPage.dataset.sampleQty = JSON.stringify(sampleQty);
        paintCartPage();
      }
    }
  });

  document.addEventListener("submit", function (event) {
    var contact = event.target.closest("[data-contact-form]");
    if (contact) {
      event.preventDefault();
      var note = contact.querySelector(".vd-form-note");
      note.hidden = false;
      note.textContent = "This preview does not send messages. Call or email the shop instead.";
    }
    var promo = event.target.closest("[data-promo-form]");
    if (promo) {
      event.preventDefault();
      var promoNote = promo.querySelector(".vd-form-note");
      promoNote.hidden = false;
      promoNote.textContent = "Promo codes are not checked in this preview. No discount was applied.";
    }
    var review = event.target.closest("[data-review-form]");
    if (review) {
      event.preventDefault();
      var first = review.querySelector("[name=firstName]").value.trim();
      var initial = review.querySelector("[name=lastInitial]").value.trim();
      var body = review.querySelector("[name=body]").value.trim();
      var rating = review.dataset.rating || "";
      var errors = {
        first: first ? "" : "Enter a first name.",
        initial: /^[A-Za-z]$/.test(initial) ? "" : "Enter one last initial.",
        body: body ? "" : "Enter a review.",
        rating: rating ? "" : "Select a rating."
      };
      Object.keys(errors).forEach(function (key) {
        var node = review.querySelector('[data-error="' + key + '"]');
        node.hidden = !errors[key];
        node.textContent = errors[key];
      });
      var status = review.querySelector(".vd-form-note");
      if (errors.first || errors.initial || errors.body || errors.rating) {
        status.hidden = true;
        return;
      }
      status.hidden = false;
      status.textContent = "This review was not saved. Persistent submission needs a review service that validates the entry, checks for spam, and moderates it before publication.";
    }
  });
  document.addEventListener("click", function (event) {
    var star = event.target.closest("[data-star]");
    if (!star) return;
    var form = star.closest("[data-review-form]");
    form.dataset.rating = star.getAttribute("data-star");
    form.querySelectorAll("[data-star]").forEach(function (button) {
      button.classList.toggle("is-on", Number(button.getAttribute("data-star")) <= Number(form.dataset.rating));
    });
  });
  var checkout = document.querySelector("[data-checkout]");
  if (checkout) {
    checkout.addEventListener("click", function () {
      var note = document.querySelector("[data-checkout-note]");
      note.hidden = false;
      note.textContent = "Checkout is not connected. This preview does not take payment or place an order.";
    });
  }

  document.querySelectorAll("[data-listing]").forEach(function (listing) {
    var size = Number(listing.getAttribute("data-page-size"));
    var cards = Array.prototype.slice.call(listing.querySelectorAll(".vd-card"));
    var page = 1;
    var status = listing.querySelector("[data-page-status]");
    var numbers = listing.querySelector("[data-page-numbers]");
    function render() {
      var count = Math.max(1, Math.ceil(cards.length / size));
      page = Math.min(page, count);
      cards.forEach(function (card, index) {
        card.hidden = index < (page - 1) * size || index >= page * size;
      });
      var start = (page - 1) * size;
      var end = Math.min(cards.length, start + size);
      status.textContent = cards.length ? "Showing " + (start + 1) + "–" + end + " of " + cards.length : "";
      numbers.innerHTML = "";
      for (var number = 1; number <= count; number++) {
        var button = document.createElement("button");
        button.type = "button";
        button.textContent = String(number);
        if (number === page) button.setAttribute("aria-current", "page");
        button.addEventListener("click", function (chosen) {
          return function () { page = chosen; render(); listing.querySelector(".vd-grid-wrap").focus(); };
        }(number));
        numbers.appendChild(button);
      }
      listing.querySelector("[data-page-prev]").disabled = page === 1;
      listing.querySelector("[data-page-next]").disabled = page === count;
    }
    listing.querySelector("[data-page-prev]").addEventListener("click", function () { page -= 1; render(); });
    listing.querySelector("[data-page-next]").addEventListener("click", function () { page += 1; render(); });
    render();
  });

  document.querySelectorAll("[data-tabs]").forEach(function (tabs) {
    var buttons = tabs.querySelectorAll("[data-tab]");
    var indicator = tabs.querySelector(".vd-tab-indicator");
    function select(id) {
      buttons.forEach(function (button) {
        var on = button.getAttribute("data-tab") === id;
        button.setAttribute("aria-selected", on ? "true" : "false");
        if (on && indicator) {
          indicator.style.width = button.offsetWidth + "px";
          indicator.style.transform = "translateX(" + button.offsetLeft + "px)";
        }
      });
      tabs.querySelectorAll("[data-panel]").forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-panel") !== id;
      });
    }
    buttons.forEach(function (button) {
      button.addEventListener("click", function () { select(button.getAttribute("data-tab")); });
    });
    select("description");
  });

  var summary = document.querySelector("[data-product-summary]");
  if (summary && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var text = summary.textContent;
    summary.setAttribute("aria-label", text);
    summary.textContent = "";
    Array.prototype.forEach.call(text, function (char, index) {
      var span = document.createElement("span");
      span.textContent = char;
      span.className = "is-pending";
      summary.appendChild(span);
      var delay = text.length ? (1438 / text.length) * index : 0;
      window.setTimeout(function () { span.classList.remove("is-pending"); }, delay);
    });
  }

  var ageGate = document.querySelector("[data-age-gate]");
  var app = document.getElementById("vd-app");
  function ageOk() {
    try { return sessionStorage.getItem("vd-age-confirmed") === "1"; } catch (error) { return false; }
  }
  if (ageOk()) {
    document.documentElement.dataset.age = "ok";
    if (ageGate) ageGate.hidden = true;
  } else if (ageGate) {
    ageGate.hidden = false;
    if (app) app.setAttribute("inert", "");
  }
  var confirmAge = document.querySelector("[data-age-confirm]");
  if (confirmAge) {
    confirmAge.addEventListener("click", function () {
      try { sessionStorage.setItem("vd-age-confirmed", "1"); } catch (error) {}
      document.documentElement.dataset.age = "ok";
      ageGate.hidden = true;
      if (app) app.removeAttribute("inert");
      startIntro();
    });
  }

  function measureLogo() {
    var stage = document.querySelector("[data-intro-stage]");
    var header = document.querySelector("[data-site-header]");
    var logo = document.querySelector("[data-intro-logo]");
    if (!stage || !header || !logo) return null;
    var stageRect = stage.getBoundingClientRect();
    var headerRect = header.getBoundingClientRect();
    var scale = Math.min(stageRect.width / 1920, stageRect.height / 1080);
    var frame = {
      width: 1920 * scale,
      height: 1080 * scale,
      left: (stageRect.width - 1920 * scale) / 2,
      top: (stageRect.height - 1080 * scale) / 2
    };
    var shieldTop = stageRect.top + frame.top + 53 * scale;
    var shieldCenter = shieldTop + (212 * scale) / 2;
    var desired = headerRect.top + headerRect.height / 2 - shieldCenter;
    var maxLift = Math.max(0, shieldTop - (headerRect.top + 2));
    var dy = desired < 0 ? Math.max(desired, -maxLift) : desired;
    frame.top += dy;
    var shieldW = 254 * scale;
    var imgW = shieldW * (293 / 288);
    var imgH = imgW * (248 / 293);
    var visibleW = imgW * (288 / 293);
    var visibleH = imgH * (241 / 248);
    var shieldLeft = frame.left + 832 * scale;
    var shieldTopLocal = frame.top + 53 * scale;
    var box = {
      left: stageRect.left - headerRect.left + shieldLeft + (shieldW - visibleW) / 2 - (4 / 293) * imgW,
      top: stageRect.top - headerRect.top + shieldTopLocal + (212 * scale - visibleH) / 2 - (3 / 248) * imgH,
      width: imgW,
      height: imgH
    };
    logo.style.left = box.left + "px";
    logo.style.top = box.top + "px";
    logo.style.width = box.width + "px";
    logo.style.height = box.height + "px";
    var section = stage.parentElement.getBoundingClientRect();
    var visibleBottom = headerRect.top + box.top + (3 / 248) * imgH + visibleH;
    var room = section.bottom - visibleBottom;
    var gap = Math.max(12, Math.min(36, room * 0.08));
    var wordmark = document.querySelector("[data-intro-wordmark]");
    if (wordmark) {
      wordmark.style.top = (visibleBottom - section.top + gap) + "px";
      wordmark.style.bottom = gap + "px";
    }
    return frame;
  }
  function placeVideo(frame) {
    var video = document.querySelector("[data-intro-video]");
    if (!video || !frame) return;
    video.style.left = frame.left + "px";
    video.style.top = frame.top + "px";
    video.style.width = frame.width + "px";
    video.style.height = frame.height + "px";
  }
  function finishIntro() {
    try { sessionStorage.setItem("vd-intro-seen", "1"); } catch (error) {}
    var section = document.querySelector(".vd-opening");
    if (section) section.setAttribute("data-intro", "done");
    document.body.setAttribute("data-intro-done", "1");
    var logo = document.querySelector("[data-intro-logo]");
    if (logo) logo.classList.add("is-shown");
    var skip = document.querySelector("[data-intro-skip]");
    if (skip) skip.hidden = true;
    var video = document.querySelector("[data-intro-video]");
    if (video) video.pause();
    var wordmark = document.querySelector("[data-intro-wordmark]");
    if (wordmark) wordmark.classList.add("is-shown");
    measureLogo();
  }
  function startIntro() {
    if (!document.body.classList.contains("vd-home")) {
      measureOtherPageLogo();
      return;
    }
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var seen = false;
    try { seen = sessionStorage.getItem("vd-intro-seen") === "1"; } catch (error) {}
    if (reduce || seen || !ageOk()) {
      finishIntro();
      return;
    }
    var section = document.querySelector(".vd-opening");
    var video = document.querySelector("[data-intro-video]");
    var skip = document.querySelector("[data-intro-skip]");
    if (!section || !video) return;
    section.setAttribute("data-intro", "playing");
    if (skip) skip.hidden = false;
    var frame = measureLogo();
    placeVideo(frame);
    video.addEventListener("canplay", function () { video.style.opacity = "1"; });
    var leadMarked = false;
    video.addEventListener("timeupdate", function () {
      if (leadMarked || !isFinite(video.duration) || video.duration <= 1.8) return;
      if (video.currentTime >= video.duration - 1.8) {
        leadMarked = true;
        var wordmark = document.querySelector("[data-intro-wordmark]");
        if (wordmark) wordmark.classList.add("is-shown");
      }
    });
    video.addEventListener("ended", finishIntro);
    video.addEventListener("error", finishIntro);
    if (skip) skip.addEventListener("click", finishIntro);
    var pending = video.play();
    if (pending) pending.catch(finishIntro);
    window.addEventListener("resize", function () {
      var next = measureLogo();
      placeVideo(next);
    });
  }
  function measureOtherPageLogo() {
    var logo = document.querySelector("[data-intro-logo]");
    if (!logo || document.body.classList.contains("vd-home")) return;
    var width = document.documentElement.clientWidth;
    var header = width >= 1024 ? 144 : width >= 640 ? 112 : 76;
    var padX = width >= 640 ? 32 : 12;
    var inner = Math.min(1152, Math.max(0, width - padX * 2));
    var section = (width >= 640 ? 32 : 20) + inner * (563 / 1180) + 64;
    var stageH = section + header;
    var scale = Math.min(width / 1920, stageH / 1080);
    var offsetX = (width - 1920 * scale) / 2;
    var offsetY = (stageH - 1080 * scale) / 2;
    var shieldW = 254 * scale;
    var shieldH = 212 * scale;
    var shieldLeft = offsetX + 832 * scale;
    var shieldTop = offsetY + 53 * scale;
    var imgW = shieldW * (293 / 288);
    var imgH = imgW * (248 / 293);
    var visibleW = imgW * (288 / 293);
    var visibleH = imgH * (241 / 248);
    var left = shieldLeft + (shieldW - visibleW) / 2 - (4 / 293) * imgW;
    var top = shieldTop + (shieldH - visibleH) / 2 - (3 / 248) * imgH;
    var desired = header / 2 - (shieldTop + shieldH / 2);
    var maxLift = Math.max(0, shieldTop - 2);
    top += desired < 0 ? Math.max(desired, -maxLift) : desired;
    logo.style.left = left + "px";
    logo.style.top = top + "px";
    logo.style.width = imgW + "px";
    logo.style.height = imgH + "px";
    logo.classList.add("is-shown");
  }

  document.querySelectorAll(".vd-sheet a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  function setupShowcase() {
    var root = document.querySelector("[data-showcase]");
    if (!root) return;
    var track = root.querySelector(".vd-showcase");
    var slides = Array.prototype.slice.call(track.querySelectorAll("[data-slide]"));
    var faces = slides.map(function (slide) { return slide.querySelector("[data-slide-face]"); });
    var count = slides.length / 3;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function metrics() {
      if (slides.length < 2) return null;
      var step = slides[1].offsetLeft - slides[0].offsetLeft;
      if (step <= 0) return null;
      var first = slides[count];
      return { step: step, setWidth: step * count, base: first.offsetLeft + first.offsetWidth / 2 - track.clientWidth / 2 };
    }
    function look(distance) {
      var abs = Math.abs(distance);
      var t = Math.min(abs, 1);
      var extra = Math.min(Math.max(abs - 1, 0), 1);
      return { scale: 1 - 0.1 * t - 0.05 * extra, opacity: 1 - 0.38 * t - 0.2 * extra, blur: reduce ? 0 : 2 * t + 1.25 * extra };
    }
    function apply() {
      var data = metrics();
      if (!data) return;
      var mid = track.scrollLeft + track.clientWidth / 2;
      slides.forEach(function (slide, index) {
        var distance = (slide.offsetLeft + slide.offsetWidth / 2 - mid) / data.step;
        var style = look(distance);
        faces[index].style.transform = "scale(" + style.scale + ")";
        faces[index].style.opacity = String(style.opacity);
        faces[index].style.filter = style.blur < 0.05 ? "none" : "blur(" + style.blur + "px)";
      });
    }
    function go(direction) {
      var data = metrics();
      if (!data) return;
      track.scrollBy({ left: direction * data.step, behavior: reduce ? "auto" : "smooth" });
    }
    var data = metrics();
    if (data) track.scrollTo({ left: data.base, behavior: "auto" });
    apply();
    track.addEventListener("scroll", function () { window.requestAnimationFrame(apply); }, { passive: true });
    root.querySelector(".vd-showcase-prev").addEventListener("click", function () { go(-1); });
    root.querySelector(".vd-showcase-next").addEventListener("click", function () { go(1); });
    track.addEventListener("keydown", function (event) {
      if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
    });
    window.addEventListener("resize", apply);
  }

  paintHearts();
  paintCart();
  setupShowcase();
  if (ageOk()) startIntro();
  else measureOtherPageLogo();
  window.addEventListener("resize", function () {
    if (!document.body.classList.contains("vd-home")) measureOtherPageLogo();
  });
})();
