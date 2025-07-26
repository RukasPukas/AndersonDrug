$(document).ready(function () {
  $("body").fadeIn(750);

  $(".score-cell").on("click", function () {
    const $table = $(this).closest("table");

    $table.find(".score-cell").removeClass("selected dimmed");
    $(this).addClass("selected");
    $table.find(".score-cell").not(this).addClass("dimmed");

    if ($(this).attr("id") === "YesCell") {
      $("#ThinnersID").fadeIn(750);
    } else {
      $("#ThinnersID").fadeOut(750);
    }

    console.log("Selected FAST-ED score:", $(this).data("point"));
  });

  $("#calculateScore").on("click", function () {
    let lkwDate = $("#LKWD").val();
    let lkwTime = $("#LKWT").val();
    let SST = $("#SST").val();
    let SSD = $("#SOD").val();
    let diffMins;
    let timeStatus;

    if (!lkwDate || !lkwTime) {
      alert("Please enter both the Last Known Well date and time.");
      return;
    }

    let lkwCombined = new Date(`${lkwDate}T${lkwTime}`);
    let now = new Date();
    let diffMs = now - lkwCombined;
    diffMins = Math.floor(diffMs / (1000 * 60));

    let hours = Math.floor(diffMins / 60);
    let minutes = diffMins % 60;
    if (diffMins < 0 || isNaN(diffMins)) {
      alert("Please enter a valid Last Known Well date and time.");
      return;
    }

    console.log(`Time since Last Known Well: ${diffMins} minutes`);

    if (diffMins <= 270) {
      timeStatus = "within4_5hrs";
    } else if (diffMins <= 1440) {
      timeStatus = "within24hrs";
    } else {
      timeStatus = "beyond24hrs";
    }

    console.log(
      `Time since Last Known Well is ${timeStatus} the 4.5-hour window.`
    );

    let allTablesComplete = true;
    $("table").each(function () {
      if (
        $(this).find(".score-cell").length > 0 &&
        $(this).find(".score-cell.selected").length === 0
      ) {
        allTablesComplete = false;
        return false;
      }
    });

    if (!allTablesComplete) {
      alert(
        "Please make a selection in every FAST-ED section before calculating the score."
      );
      return;
    }

    let scoreTotal = 0;
    $(".score-cell.selected").each(function () {
      let point = parseInt($(this).data("point"));
      if (!isNaN(point)) {
        scoreTotal += point;
      }
    });

    let reportHtml;

    //Begin Report Generation

    if (scoreTotal === 0) {
      reportHtml = `
        <h2>FAST-ED Score Report</h2>
        <h3>Score: ${scoreTotal}<br><br>
        Proceed to appropriate SOG/SOP and transport accordingly.</h3>
      `;
    } else if (scoreTotal > 0) {
      reportHtml = `
        <h2>FAST-ED Score Report</h2>
        <h3>Score: ${scoreTotal}<br><br>
        Last Known Well: ${lkwTime} on ${lkwDate}<br><br> 
        Symptom Onset: ${SST} on ${SSD}<br><br>
        Time Elapsed Since Last Known Well: ${hours} hour${
        hours !== 1 ? "s" : ""
      } 
        and ${minutes} minute${minutes !== 1 ? "s" : ""}</h3>
      `;

      if (timeStatus === "within4_5hrs") {
        reportHtml += `
          <h3>Time since Last Known Well is within the 4.5-hour window with symptoms. <br><u>Call Code Stroke Alert</u></h3>
        `;

        if (scoreTotal >= 4) {
          reportHtml += `
          <h3>Transport to a thrombectomy capable center if transport time does not add 15 or more minutes.</h3>
        `;
        } else {
          reportHtml += `
          <h3>Transport to nearest Acute Stroke Ready or Primary Stroke Center.</h3>
        `;
        }
      } else if (timeStatus === "within24hrs") {
        reportHtml += `
          <h3>Time since Last Known Well is within the 4.5-24 hour window with symptoms. <br><ul>Call Code Stroke Alert</ul></h3>
        `;

        if (scoreTotal >= 4) {
          reportHtml += `
          <h3>Transport to nearest thrombectomy capable center.</h3>
        `;
        } else {
          reportHtml += `
          <h3>Transport to nearest Acute Stroke Ready or Primary Stroke Center.</h3>
        `;
        }
      } else {
        reportHtml += `
          <h3>Time since Last Known Well is beyond the 24-hour window with symptoms.</h3>
                    <h3>Transport to nearest Acute Stroke Ready or Primary Stroke Center.</h3>
        `;
      }

      const reportedThinners =
        $("#ThinnersID input[type=checkbox]:checked")
          .map(function () {
            return $(this).val();
          })
          .get()
          .join(", ") || "None";

      reportHtml += `
  <h3>Reported Blood Thinners: ${reportedThinners}</h3>
`;
    }
    $(".TablesWrapper").fadeOut(300);
    $(".FastEDHeader").fadeOut(300);
    $("#Report").html(reportHtml).fadeIn(200);
  });
});
