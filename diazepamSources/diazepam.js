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

    //END OF WEIGHT GATHERING INFORMATION

    const adultorped = $('input[name="protocol"]:checked').val();

    //ADULT SECTION

    if (adultorped === "Adult") {
      console.log("Adult Protocols selected.");
      const adultDosage = 0.1; // mg/kg, max 5mg, may repeat once in 5 minutes

      let adultDosageFinal = weightInput * adultDosage;
      console.log("Adult dosage before max check:", adultDosageFinal);
      if (adultDosageFinal > 5) {
        adultDosageFinal = 5;
        console.log("Adult dosage after max check:", adultDosageFinal);
      }

      $("#result")
        .html(
          `
          <h2><u>Adult Dosage:</u></h2>
          <h3>Seizure/Status Epilepticus;<br>ChestPain<br>Acute Coronary Syndrome<br>Stemi;<br>Environmental Hyperthermia;</h3>
        <strong>Recommended Initial Dose:<br><br> ${adultDosageFinal.toFixed(
          2
        )} mg</strong><br><br>
        <small>(METHOD: Weight in kg: ${weightInput.toFixed(
          2
        )} × 0.1 mg/kg)<br>Maximum Single Dose of 5 mg</small>
          <br><br>
          <strong>Recommended Repeat Dose:<br> <i><u>(If needed)</i></u></strong><br><br><strong> ${adultDosageFinal.toFixed(
            2
          )} mg<br><br><small>After </strong>5 minutes from initial administration.</small>
           <p>        <i
            ><small
              >If uncertainty arises, consult Anderson Protocols or contact
              Medical Control. Always check dosages and concentrations prior to
              administration.</small
            ></i
          >
        </p>

      `
        )
        .fadeIn(200);
    }

    //END OF ADULT SECTION
    //PEDIATRIC SECTION
  });
});
