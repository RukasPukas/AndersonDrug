$(document).ready(function () {
  $("body").fadeIn(750);

  // Cache
  const $tabs = $(".AdultorInfantTable td");
  const $adult = $(".ADULTSECTION");
  const $infant = $(".INFANTSECTION");

 
  $("#TBA").text("0.0%");


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

$(".CalculateButton").on("click", function () {
  // 1) weight
  let weight = parseFloat($(".weightInput").val());
  const unit = $("input[name='unit']:checked").val();

  if (isNaN(weight) || weight <= 0 || weight > 1000) {
    alert("Please enter a valid weight in " + (unit || "kg/lbs"));
    return;
  }

  if (unit === "lbs") {
    weight = weight / 2.20462;
  }


  const tbsaPct = parseFloat($("#TBA").text().replace("%", "")) || 0;


  const total24 = 4 * weight * tbsaPct;  
  const first8  = total24 / 2;            
  const next16  = total24 / 2;          
  const rate8   = first8 / 8;            
  const rate16  = next16 / 16;            


  $("#ParklandResult").html(
    `
     First 8h: <strong>${Math.round(first8)} mL</strong> (${Math.round(rate8)} mL/hr)<br>
     Next 16h: <strong>${Math.round(next16)} mL</strong> (${Math.round(rate16)} mL/hr)<br>
     Total 24h: <strong>${Math.round(total24)} mL</strong><br>`
  );
});


});
