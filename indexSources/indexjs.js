$(document).ready(function () {
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
