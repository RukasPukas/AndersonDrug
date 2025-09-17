$(document).ready(function () {
  $("body").fadeIn(750);

  let scores = {
    eye: 4,   
    verbal: 5,
    motor: 6
  };
  
  $(".eyeTable .score-cell").first().addClass("selected");
  $(".verbalTable .score-cell").first().addClass("selected");
  $(".motorTable .score-cell").first().addClass("selected");

  updateTotalScore();

  $(".score-cell").on("click", function () {
    const $cell = $(this);
    const point = parseInt($cell.data("point"));

   
    $cell.closest("table").find(".score-cell").removeClass("selected");
    $cell.addClass("selected");

    if ($cell.closest(".eyeTable").length) {
      scores.eye = point;
    } else if ($cell.closest(".verbalTable").length) {
      scores.verbal = point;
    } else if ($cell.closest(".motorTable").length) {
      scores.motor = point;
    }

    updateTotalScore();
  });

  function updateTotalScore() {
    const total = scores.eye + scores.verbal + scores.motor;
    $("#totalScoreDisplay").text(total);
  }
});
