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

    const dosagePerKg = 0.1;
    let dosage = weightInput * dosagePerKg;
    console.log("Calculated dosage:", dosage);
    console.log(`Recommended dosage: ${dosage.toFixed(2)} mg`);

    if (dosage > 6) {
      console.log("Warning: Dosage exceeds recommended maximum of 6 mg.");
      dosage = 6;
      console.log("Adjusted dosage to maximum:", dosage);
    }

    const volumeML = dosage / 3;
    console.log(`Recommended volume: ${volumeML.toFixed(2)} mL`);

    const repeatDosagePerKg = 0.2;
    let repeatDosage = weightInput * repeatDosagePerKg;
    console.log("Calculated repeat dosage:", repeatDosage);
    if (repeatDosage > 12) {
      console.log(
        "Warning: Repeat dosage exceeds recommended maximum of 12 mg."
      );
      repeatDosage = 12;
      console.log("Adjusted repeat dosage to maximum:", repeatDosage);
    }

    const repeatVolumeML = repeatDosage / 3;
    console.log(`Recommended repeat volume: ${repeatVolumeML.toFixed(2)} mL`);

    $("#result")
      .html(
        `
      <strong>Recommended Initial Dose:</strong><br> ${dosage.toFixed(2)} mg<br>
      <small>(Weight in kg: ${weightInput.toFixed(
        2
      )} × 0.1 mg/kg)<br>Maximum Pediatric Initial Dose 6 mg</small>
        <br><br>
        <strong>Recommended Repeat Dose:</strong><br> ${repeatDosage.toFixed(
          2
        )} mg<br>
        <small>(Weight in kg: ${weightInput.toFixed(
          2
        )} × 0.2 mg/kg)<br>Maximum Pediatric Repeat Dose 12 mg</small>
        <br><br>
        <strong>Volume to Administer:</strong><br>For a solution of 3 mg per 1 ml<br> Initial Dose: ${volumeML.toFixed(
          2
        )} mL<br>
        Repeat Dose: ${repeatVolumeML.toFixed(2)} mL
        <br><br>
        <small>Note: Always ensure amounts are accurate prior to administration, consult Anderson Protocols or medical control prior to administration if uncertainty exists.</small>
    `
      )
      .fadeIn(200);
  });
});
