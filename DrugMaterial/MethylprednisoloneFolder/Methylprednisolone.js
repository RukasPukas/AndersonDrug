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

    console.log("Weight input is valid.");

    const unit = $('input[name="unit"]:checked').val();
    console.log("Selected unit:", unit);

    if (unit === "kg") {
      console.log("Weight in kg:", weightInput);
    } else if (unit === "lbs") {
      console.log("Weight in lbs:", weightInput);
      weightInput = weightInput / 2.20462;
      weightInput = parseFloat(weightInput.toFixed(2));
      console.log("Converted weight to kg:", weightInput);
    }

    const dosagePerKg = 2;
    let dosage = weightInput * dosagePerKg;
    console.log("Calculated dosage:", dosage);
    console.log(`Recommended dosage: ${dosage.toFixed(2)} mg`);

    if (dosage > 125) {
      console.log("Warning: Dosage exceeds recommended maximum of 125 mg.");
      dosage = 125;
      console.log("Adjusted dosage to maximum:", dosage);
    }

    $("#result")
      .html(
        `
        <h2><u>MEDICAL CONTROL MUST AUTHORIZE</h2></u>
        <strong><u>Recommended Pediatric Dose</u><br><br> ${dosage.toFixed(
          2
        )}mg IV/IM</strong><br>
        <small><br>(Weight in kg: ${weightInput.toFixed(
          2
        )} ×2 mg/kg)<br>Maximum Pediatric Dose 125mg</small>
         <br><br>
          
 <p><i><small>If uncertainty arises, consult Anderson Protocols or contact Medical Control. Always check dosages and concentrations prior to administration.</small></i></p>
      `
      )
      .fadeIn(200);
  });
});
