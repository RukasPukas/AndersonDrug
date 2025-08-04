$(document).ready(function () {
  $("body").fadeIn(750);

  //-----------------------------------Weight Calculation-----------------------------------
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

    if (unit === "lbs") {
      console.log("Weight in lbs:", weightInput);
      weightInput = weightInput / 2.20462;
      weightInput = parseFloat(weightInput.toFixed(2));
      console.log("Converted weight to kg:", weightInput);
    } else {
      console.log("Weight in kg:", weightInput);
    }
    //-------------------------------------BRADYCARDIA-----------------------------------
    //-----------------------------------Dosage Calculation-----------------------------------

    const dosagePerKgLow = 1; //ml
    const dosagePerKgHigh = 2; //ml
    const rawDosageLow = weightInput * dosagePerKgLow;
    const rawDosageHigh = weightInput * dosagePerKgHigh;
    let dosageLow = rawDosageLow;
    let dosageHigh = rawDosageHigh;

    //-----------------------------------Display Result-----------------------------------

    $("#result")
      .html(
        `
              <h2>Recommended D50% Volume to Administer:</h2>
       <p>For a weight of <strong>${weightInput} kg</strong>, the recommended initial dose is <strong>${dosageLow.toFixed(
          0
        )}ml - ${dosageHigh.toFixed(
          0
        )}ml</strong>.<br><small>Method: 1ml - 2ml x kg (Suitable for pediatrics aged greater than 8 years)</p><p>        <i
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

    //-------------------------------------END BRADYCARDIA-----------------------------------
  });
});
