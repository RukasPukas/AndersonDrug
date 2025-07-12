$(document).ready(function () {
  $("body").fadeIn(750);

  $("#showRanges").on("click", function () {
    let selectedAgeGroup = $("#ageGroup").val();
    console.log(selectedAgeGroup);

    switch (selectedAgeGroup) {
      case "one":
        $("#ageSelected").text("0 - < 3 Months");
        $("#pulseCell").text("100 - 180");
        $("#SBPCell").text("> 60");
        $("#respiratoryCell").text("30 - 60");
        break;

      case "two":
        $("#ageSelected").text("3 Months - < 6 Months");
        $("#pulseCell").text("100 - 180");
        $("#SBPCell").text("> 70");
        $("#respiratoryCell").text("30 - 60");
        break;

      case "three":
        $("#ageSelected").text("6 Months - < 9 Months");
        $("#pulseCell").text("11 0- 160");
        $("#SBPCell").text("> 70");
        $("#respiratoryCell").text("30 - 60");
        break;

      case "four":
        $("#ageSelected").text("9 Months - < 1 Year");
        $("#pulseCell").text("110 - 160");
        $("#SBPCell").text("> 70");
        $("#respiratoryCell").text("30 - 60");
        break;

      case "five":
        $("#ageSelected").text("1 Year - < 2 Years");
        $("#pulseCell").text("110 - 160");
        $("#SBPCell").text("> 70");
        $("#respiratoryCell").text("30 - 60");
        break;

      case "six":
        $("#ageSelected").text("2 Years - < 4 Years");
        $("#pulseCell").text("90 - 150");
        $("#SBPCell").text("> 70");
        $("#respiratoryCell").text("24 - 40");
        break;

      case "seven":
        $("#ageSelected").text("4 Years - < 6 Years");
        $("#pulseCell").text("90 - 150");
        $("#SBPCell").text("> 75");
        $("#respiratoryCell").text("22 - 34");
        break;

      case "eight":
        $("#ageSelected").text("6 Years - < 8 Years");
        $("#pulseCell").text("70 - 120");
        $("#SBPCell").text("> 80");
        $("#respiratoryCell").text("18 - 30");
        break;

      case "nine":
        $("#ageSelected").text("8 Years - < 10 Years");
        $("#pulseCell").text("70 - 120");
        $("#SBPCell").text("> 80");
        $("#respiratoryCell").text("18 - 30");
        break;

      case "ten":
        $("#ageSelected").text("10 Years - < 12 Years");
        $("#pulseCell").text("70 - 120");
        $("#SBPCell").text("> 80");
        $("#respiratoryCell").text("18 - 30");
        break;

      case "eleven":
        $("#ageSelected").text("120 Years - < Puberty");
        $("#pulseCell").text("60 - 110");
        $("#SBPCell").text("> 90");
        $("#respiratoryCell").text("12 - 16");
        break;
    }

    $("#outcome").css("visibility", "visible").hide().fadeIn(500);
  });
});
