$(document).ready(function () {
  $("body").fadeIn(750);

  $(".score-cell").on("click", function () {
    const $table = $(this).closest("table");
    
   
    $table.find(".score-cell").removeClass("selected dimmed");

   
    $(this).addClass("selected");

   
    $table.find(".score-cell").not(this).addClass("dimmed");

    let score = $(this).data("point");
    console.log("Selected FAST-ED score:", score);
  });
});
