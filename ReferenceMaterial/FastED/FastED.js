$(document).ready(function () {
  $("body").fadeIn(750);
  if (localStorage.getItem("fastedSubmitted") === "true") {
    const savedReport = localStorage.getItem("fastedReport");
    $(".TablesWrapper").hide();
    $(".FastEDHeader").hide();
    $(".ScoreWrapper").show();
    $("#Report").html(savedReport).show();
  }

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

  $("#resetBtn").on("click", function () {
    localStorage.removeItem("fastedReport");
    localStorage.removeItem("fastedSubmitted");
    localStorage.removeItem("fastedState");
    location.reload();
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

    if (!SST || !SSD) {
      alert("Please enter both the Symptom Onset date and time.");
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
        <h3>Fast-ED Score: ${scoreTotal}<br><br>
        Proceed to appropriate SOG/SOP and transport accordingly.</h3>
      `;
    } else if (scoreTotal > 0) {
      reportHtml = `
        <h2>FAST-ED Score Report</h2>
        <h3>Fast-ED Score: ${scoreTotal}<br><br>
        </h3>
        <h2> Time Breakdown</h2>
        <h3>
        Report Generated:</h3> <p>${now}</p>
        <h3>Last Known Well: </h3><p>${lkwTime} on ${lkwDate}</p>
        <h3>Symptom Onset: </h3><p>${SST} on ${SSD}</p>
        <h3>Time Elapsed Since Last Known Well:</h3><p> ${hours} hour${
        hours !== 1 ? "s" : ""
      } 
        and ${minutes} minute${minutes !== 1 ? "s" : ""}</p>
      `;

      if (timeStatus === "within4_5hrs") {
        reportHtml += `
          <p>Time since Last Known Well is within the 4.5-hour window with symptoms. 
          <h2>Action</h2><p>Call Code Stroke Alert</p>
        `;

        if (scoreTotal >= 4) {
          reportHtml += `
          <p>Transport to a thrombectomy capable center if transport time does not add 15 or more minutes.</p>
        `;
        } else {
          reportHtml += `
          <p>Transport to nearest Acute Stroke Ready or Primary Stroke Center.</p>
        `;
        }
      } else if (timeStatus === "within24hrs") {
        reportHtml += `
          <p>Time since Last Known Well is within the 4.5-24 hour window with symptoms.<h2>Action</h2><p>Call Code Stroke Alert</p>
        `;

        if (scoreTotal >= 4) {
          reportHtml += `
          <p>Transport to nearest thrombectomy capable center.</p>
        `;
        } else {
          reportHtml += `
          <p>Transport to nearest Acute Stroke Ready or Primary Stroke Center.</p>
        `;
        }
      } else {
        reportHtml += `
          <p>Time since Last Known Well is beyond the 24-hour window with symptoms.</p>
          <h2>Action</h2>
                    <p>Transport to nearest Acute Stroke Ready or Primary Stroke Center.</p>
        `;
      }

      if ((YesCell = $("#YesCell").hasClass("selected"))) {
        const reportedThinners =
          $("#ThinnersID input[type=checkbox]:checked")
            .map(function () {
              return $(this).val();
            })
            .get()
            .join(", ") || "None";

        reportHtml += `
        <h2>Additional Information</h2>
  <h3>Reported Blood Thinners:</h3><p> ${reportedThinners}</p>
`;
      } else if ($("#NoCell").hasClass("selected")) {
        reportHtml += `
        <h2>Additional Information</h2>
        <h3>Blood Thinner Usage:</h3><p>No reported blood thinners.</p>
      `;
      } else {
        reportHtml += `
        <h2>Additional Information</h2>
        <h3>Blood Thinner Usage:</h3><p>Blood thinners status unknown.</p>
      `;
      }

      const breakdownSections = [
        { label: "Facial Droop", class: ".FacialTable" },
        { label: "Arm Weakness", class: ".ArmTable" },
        {
          label: "Speech Disturbance <i>Expressive</i>",
          class: ".SpeechTable",
        },
        { label: "Speech Disturbance <i>Receptive</i>", class: ".FingerTable" },
        { label: "Eye Deviation", class: ".EyeTable" },
        { label: "Denial", class: ".DenialTable" },
        { label: "Neglect", class: ".NeglectTable" },
      ];

      reportHtml += `<h3>FAST-ED Score Breakdown:</h3><p>`;
      breakdownSections.forEach((section) => {
        const val =
          $(`${section.class} .score-cell.selected`).data("point") || 0;
        reportHtml += `${section.label}: ${val}<br>`;
      });
      reportHtml += `<br>Total Score: ${scoreTotal}</p>`;
    }

    $(".TablesWrapper").fadeOut(300);
    $(".FastEDHeader").fadeOut(300);
    $(".ScoreWrapper").fadeIn(200);
    $("#Report").html(reportHtml).fadeIn(200);

    localStorage.setItem("fastedReport", reportHtml);
    localStorage.setItem("fastedSubmitted", "true");
  });
});
