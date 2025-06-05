$(document).ready(function () {
  $("body").delay(1000).fadeIn(750);

  $("#toggleDrugs").on("click", function () {
    $("#drugList").slideToggle("slow");

    const isOpen = $(this).text().includes("▲");
    $(this).text(isOpen ? "▼ View Medication List" : "▲ Hide Medication List");
  });
});
