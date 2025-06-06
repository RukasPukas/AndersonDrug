$(document).ready(function () {
  $("body").css("overflow", "hidden");

  $("#agree-checkbox").on("change", function () {
    $("#accept-button").prop("disabled", !this.checked);
  });

  $("#accept-button").on("click", function () {
    $("#disclaimer-modal").fadeOut(300, function () {
      $("body").css("overflow", "auto").fadeIn(750);
    });
  });

  $("#toggleDrugs").on("click", function () {
    $("#drugList").slideToggle("slow");

    const isOpen = $(this).text().includes("▲");
    $(this).text(isOpen ? "▼ View Medication List" : "▲ Hide Medication List");
  });
});
