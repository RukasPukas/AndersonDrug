$(document).ready(function () {
  $("body").fadeIn(750);

  $("#calculateDosage").on("click", function () {
    const initialInput = $("#weightInput").val();
    console.log("Initial input:", initialInput);

    let weightInput = parseFloat(initialInput);
    console.log("Parsed weight input:", weightInput);

    if (isNaN(weightInput) || weightInput <= 0) {
      alert("Please enter a valid weight.");
      return;
    }

    const unit = $('input[name="unit"]:checked').val();
    console.log("Selected unit:", unit);

    if (unit === "lbs") {
      weightInput = weightInput / 2.20462;
      weightInput = parseFloat(weightInput.toFixed(2));
      console.log("Converted weight to kg:", weightInput);
    }

    let dose;

    dose = weightInput * 0.1;

    if (dose > 1) {
      dose = 1;
    }
    volume = dose / 1;

    $("#result")
      .html(
        `
            <h2><u>Pediatric Glucagon</u><br><br>Altered Mental Status<br>Diabetic Emergencies</h2>
            <p>
            <strong>Less than or equal to 8 years old:</strong>
            <br>
            <br>
            0.5 mg IM/IN
            <br>
            <br>
            <strong> Greater than 8 years old:</strong>
            <br>
            <br>
            1 mg IM/IN
            </p>
            <h2>Poisoning and Overdose</h2>
            <p><strong>Dosage: ${dose.toFixed(2)}mg</strong>
            <br><small>Method: (${weightInput.toFixed(
              2
            )}kgs x 0.1 mg/kg MAX: 1mg)</small>
            <br><br>
            <strong>Volume: ${volume.toFixed(2)}mL</strong><br>
            <small>(For concentrations of 1mg per 1ml)</small>
            <br><br>
            <i><small>
              If uncertainty arises, consult Anderson Protocols or contact
              Medical Control. Always check dosages and concentrations prior to
              administration.
            </small></i>
            </p>
          `
      )
      .fadeIn(200);
  });
});
