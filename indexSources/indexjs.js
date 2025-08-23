$(document).ready(function () {
  const $searchInput = $("#searchInput");
  const $searchButton = $("#searchButton");
  const $resultsWrap = $("#searchResults");

  const ITEMS = [];
  $(".drugContainer button, .drugContainer2 button").each(function () {
    const $btn = $(this);
    const label = $btn.text().replace(/\s+/g, " ").trim();

    let url = null;
    const onclick = $btn.attr("onclick");
    if (onclick) {
      const m = onclick.match(/location\.href\s*=\s*['"]([^'"]+)['"]/);
      if (m) url = m[1];
    }

    if ($btn.data("url")) url = $btn.data("url");

    if (label) ITEMS.push({ label, url, $src: $btn });
  });

  function normalize(s) {
    return s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function search(q) {
    const query = normalize(q.trim());
    if (!query) return [];
    return ITEMS.filter((it) => normalize(it.label).includes(query)).slice(
      0,
      20
    );
  }

  function renderResults(list) {
    $resultsWrap.empty();
    if (!list.length) {
      $resultsWrap.html('<div class="no-results">No matches.</div>').show();
      return;
    }
    list.forEach((it) => {
      const $b = $('<button type="button" class="result-btn"></button>')
        .text(it.label)
        .on("click", () => {
          if (it.url) {
            location.href = it.url;
          } else if (it.$src && it.$src.length) {
            it.$src[0].click();
          }
        });
      $resultsWrap.append($b);
    });
    $resultsWrap.show();
  }

  let debounce;
  function handleSearch() {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const q = $searchInput.val();
      if (!q.trim()) {
        $resultsWrap.hide().empty();
        return;
      }
      renderResults(search(q));
    }, 120);
  }

  $searchInput.on("input", handleSearch);
  $searchButton.on("click", handleSearch);
  $searchInput.on("keydown", (e) => {
    if (e.key === "Escape") {
      $searchInput.val("");
      $resultsWrap.hide().empty();
    }
  });
  const acceptedAt = localStorage.getItem("disclaimerAcceptedAt");
  const now = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (acceptedAt && now - parseInt(acceptedAt, 10) < oneDay) {
    // pre 24 hour acceptance check
    $("#disclaimer-modal").hide();
    $("body").fadeIn(750);
  } else {
    // post 24 hour refusal
    $("#disclaimer-modal").show();
    $("#mainContent, footer, .header").css({
      "pointer-events": "none",
      opacity: "0.3",
    });
  }

  $("#agree-checkbox").on("change", function () {
    $("#accept-button").prop("disabled", !this.checked);
  });

  $("#accept-button").on("click", function () {
    localStorage.setItem("disclaimerAcceptedAt", now.toString());

    $("#disclaimer-modal").fadeOut(300, function () {
      $("#mainContent, footer, .header").css({
        "pointer-events": "auto",
        opacity: "1",
      });
      $("body").fadeIn(750);
    });
  });

  $("#toggleDrugs").on("click", function () {
    $("#drugList").slideToggle("slow");

    const isOpen = $(this).text().includes("▲");
    $(this).text(isOpen ? "▼ View Medication List" : "▲ Hide Medication List");
  });

  $("#toggleProcedures").on("click", function () {
    $("#procedureList").slideToggle("slow");

    const isOpen = $(this).text().includes("▲");
    $(this).text(
      isOpen ? "▼ View Reference Material" : "▲ Hide Reference Material"
    );
  });
});
