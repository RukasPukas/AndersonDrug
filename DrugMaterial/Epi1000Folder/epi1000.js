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
  
      const epidosekg = 0.01;
      let dosage = weightInput * epidosekg;
      console.log("Calculated dosage (mg):", dosage);
  
      if (dosage > 0.3) {
        dosage = 0.3;
        console.log("Capped dosage at 0.3 mg:", dosage);
      }
  
      $("#result")
        .html(
          `
        <strong>Allergic Reaction / Anaphylaxis</strong><br><u><i><small>ALS PROVIDERS ONLY</small></u></i><br><br>
        Recommended Dose: <br><strong>${dosage.toFixed(2)}mg IM (1:1,000)</strong><br><br>Recommended Volume: <br><strong>${dosage.toFixed(2)}ml IM (1:1,000)12</strong>
        <br><br><small>Every 5-15 minutes as needed (max 3 doses)</small><br><br>
        <small>Weight in kg: ${weightInput.toFixed(2)} × 0.01 mg/kg<br>
        Max Single Dose: 0.3 mg IM</small><br><br>
        <small>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.</small>
      `
        )
        .fadeIn(200);
    });
  });
  