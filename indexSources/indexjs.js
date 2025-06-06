$(document).ready(function () {
  const acceptedAt = localStorage.getItem("disclaimerAcceptedAt");
  const now = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000; // 24 hours in ms

  if (acceptedAt && now - parseInt(acceptedAt, 10) < oneDay) {
    // Already accepted within 24 hours
    $("#disclaimer-modal").hide();
    $("body").fadeIn(750);
  } else {
    // Show disclaimer and dim the rest of the page
    $("#disclaimer-modal").show();
    $("#mainContent, footer, .header").css({
      "pointer-events": "none",
      opacity: "0.3",
    });
  }

  // Enable Accept button only when checkbox is checked
  $("#agree-checkbox").on("change", function () {
    $("#accept-button").prop("disabled", !this.checked);
  });

  // When Accept is clicked
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

  // Toggle Medication List
  $("#toggleDrugs").on("click", function () {
    $("#drugList").slideToggle("slow");

    const isOpen = $(this).text().includes("▲");
    $(this).text(isOpen ? "▼ View Medication List" : "▲ Hide Medication List");
  });
});
