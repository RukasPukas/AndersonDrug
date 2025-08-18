$(document).ready(function () {
  $("body").fadeIn(750);

  // Cache
  const $tabs = $(".AdultorInfantTable td");
  const $adult = $(".ADULTSECTION");
  const $infant = $(".INFANTSECTION");

  // Init total display
  $("#TBA").text("0.0%");

  // Reset all selected cells
  function resetSelections() {
    $(".select-table tbody td").removeClass("selected");
  }

  // Sum selected TBSA in the VISIBLE section only
  function recomputeTBA() {
    const $section = $adult.is(":visible") ? $adult : $infant;
    let sum = 0;
    $section.find(".select-table tbody td.selected").each(function () {
      const v = parseFloat($(this).data("tbsa"));
      if (!isNaN(v)) sum += v;
    });
    $("#TBA").text(sum.toFixed(1) + "%");
  }

  // Show section and reset counts
  function showSection(which) {
    resetSelections();
    if (which === "adult") {
      $adult.show();
      $infant.hide();
    } else {
      $adult.hide();
      $infant.show();
    }
    recomputeTBA(); // refresh total after switching
  }

  // Preselect Adult on load
  $tabs.removeClass("selected").first().addClass("selected");
  showSection("adult"); // shows adult + resets selections
  recomputeTBA(); // ensure total starts at 0.0%

  // Top tabs: click + keyboard toggle
  $tabs
    .attr("tabindex", "0")
    .on("click", function () {
      $tabs.removeClass("selected");
      $(this).addClass("selected");
      const choice = $(this).text().trim().toLowerCase();
      showSection(choice);
    })
    .on("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        $(this).trigger("click");
      }
    });

  // MULTI-SELECT for body-part cells (both tables)
  $(document).on("click", ".select-table tbody td", function () {
    if (!$(this).text().trim()) return; // ignore empty cells
    $(this).toggleClass("selected");
    recomputeTBA(); // update total on each toggle
  });

  // Optional: keyboard toggle for body-part cells
  $(".select-table tbody td").attr("tabindex", "0");
  $(document).on("keydown", ".select-table tbody td", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      $(this).trigger("click");
    }
  });
});
