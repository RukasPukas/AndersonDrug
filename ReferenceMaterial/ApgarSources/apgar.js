$(document).ready(function () {
  $("body").fadeIn(750);
  const initial = JSON.parse(localStorage.getItem("initialAPGAR"));
  const repeat = JSON.parse(localStorage.getItem("repeatAPGAR"));
  let apgarClicks = 0;

  if (initial) {
    $("#apgarResult")
      .addClass("visible")
      .html(
        `
        <h2>Initial APGAR Score</h2>
        <p><strong>${initial.score} / 10</strong>
        <br><br>Time: ${initial.time}</p>
      `
      );
    apgarClicks = 1;
  }

  if (repeat) {
    $("#apgarResult").append(`
      <h2>Repeat APGAR Score</h2>
      <p><strong>${repeat.score} / 10</strong>
      <br><br>Time: ${repeat.time}</p>
    `);
    apgarClicks = 2;

    $("#calculateAPGAR").prop("disabled", true).text("Score Saved").css({
      backgroundColor: "gray",
      cursor: "not-allowed",
      opacity: "0.6",
    });

    $("#resetAPGAR").fadeIn();
  }

  $(".score-cell").on("click", function () {
    const row = $(this).closest("tr");
    const isAlreadySelected = $(this).hasClass("selected");

    row.find(".score-cell").removeClass("selected");

    if (!isAlreadySelected) {
      $(this).addClass("selected");
    }
  });

  $("#calculateAPGAR").on("click", function () {
    const allRowsComplete = $(".apgar-table tr")
      .not(".apgar-headrow")
      .toArray()
      .every((row) => {
        return $(row).find(".score-cell.selected").length === 1;
      });

    if (!allRowsComplete) {
      $(".apgar-table tr")
        .not(".apgar-headrow")
        .each(function () {
          const selected = $(this).find(".score-cell.selected").length;
          if (selected === 0) {
            $(this)
              .find(".score-cell")
              .css("filter", "brightness(120%)")
              .delay(200)
              .queue(function (next) {
                $(this).css("filter", "");
                next();
              });
          }
        });
      return;
    }

    apgarClicks++;
    const currentTime = new Date().toLocaleTimeString();
    let totalScore = 0;

    $(".score-cell.selected").each(function () {
      const points = parseInt($(this).data("point"));
      totalScore += isNaN(points) ? 0 : points;
    });

    if (apgarClicks === 1) {
      localStorage.setItem(
        "initialAPGAR",
        JSON.stringify({ score: totalScore, time: currentTime })
      );

      $("#apgarResult")
        .addClass("visible")
        .html(
          `
        <h2>Initial APGAR Score</h2>
        <p><strong>${totalScore} / 10</strong>
        <br><br>Time: ${currentTime}</p>
      `
        )
        .fadeIn(200);

      $(".score-cell").removeClass("selected");
    } else if (apgarClicks === 2) {
      localStorage.setItem(
        "repeatAPGAR",
        JSON.stringify({ score: totalScore, time: currentTime })
      );

      $("#apgarResult").append(`
        <h2>Repeat APGAR Score</h2>
        <p><strong>${totalScore} / 10</strong>
        <br><br>Time: ${currentTime}</p>
      `);

      $(this).prop("disabled", true).text("Score Saved").css({
        backgroundColor: "gray",
        cursor: "not-allowed",
        opacity: "0.6",
      });

      $(".score-cell").removeClass("selected");
      $("#resetAPGAR").fadeIn();
    }
  });

  // Reset logic
  $("#resetAPGAR").on("click", function () {
    $(".score-cell").removeClass("selected");
    $("#apgarResult")
      .removeClass("visible")
      .fadeOut(500, function () {
        $(this).html("");
      });

    $("#calculateAPGAR").prop("disabled", false).text("Save APGAR Score").css({
      backgroundColor: "cornflowerblue",
      cursor: "pointer",
      opacity: "1",
    });

    $(this).fadeOut(200);
    localStorage.removeItem("initialAPGAR");
    localStorage.removeItem("repeatAPGAR");
    apgarClicks = 0;
  });
});
