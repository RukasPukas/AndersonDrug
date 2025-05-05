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









  
      const selectedDose = parseFloat($("#repeatsDropdown").val());
      let dosage = ((weightInput * selectedDose) /1600) * 60;
      console.log("Calculated infusion rate:", dosage);
      console.log(`Recommended infusion rate: ${dosage.toFixed(2)} mL/hr`);
  

  

  

  
      $("#result")
      .html(
        `
        <strong><u>Recommended Infusion Rate</u></strong><br><br>
        <strong>${dosage.toFixed(2)} mL/hr<br>Titrated to a SBP of 90-100 mmHg or MAP >
65 mmHg.</strong><br><br>
        <small>(Weight in kg: ${weightInput.toFixed(2)} × ${selectedDose} mcg/kg/min ÷ 1600 mcg/mL × 60 min)<br>(In the absence of an IV pump, use 60 drop tubing and ml/hr=drops/min)</small><br><br>
        <p><i><small>If uncertainty arises, consult Anderson Protocols or contact Medical Control. Always check dosages and concentrations prior to administration.</small></i></p>
        `
      )
      .fadeIn(200);
    });
  });
  