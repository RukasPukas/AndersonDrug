$(document).ready(function () {
  $("body").fadeIn(750);

  $(".AdultorInfantTable td:first-child").addClass("selected");
  $(".ADULTSECTION").show();
  $(".INFANTSECTION").hide();

  $(".AdultorInfantTable td").on("click", function () {
    $(".AdultorInfantTable td").removeClass("selected");
    $(this).addClass("selected");

    const choice = $(this).text().trim().toLowerCase();

    if (choice === "adult") {
      $(".ADULTSECTION").show();
      $(".INFANTSECTION").hide();
    } else {
      $(".ADULTSECTION").hide();
      $(".INFANTSECTION").show();
    }
  });
});
