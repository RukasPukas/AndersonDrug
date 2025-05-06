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
  
      if (dosage > 1) {
        dosage = 1;
        console.log("Capped dosage at 1 mg:", dosage);
      }

      let volume = dosage / 0.1;
      console.log("Calculated volume (ml):", volume);
  
      $("#result")
        .html(
          `
        <strong>Cardiac Arrest-(Asystole/PEA); Bradycardia; Neonatal
        Resuscitation; Cardiac Arrest-(V-Fib/Pulseless V-Tach)</strong>
        <br><br>
        Recommended Dose: <br><br><strong>${dosage.toFixed(2)}mg IV/IO (1:10,000)</strong><br><br>Recommended Volume: <br><small>(If concentration is 0.1mg/ml)</small><br><br>
        <strong>${volume.toFixed(2)}ml IV/IO (1:10,000)</strong>
        <br><br><strong>Every 3-5 minutes as long as patient remains pulseless</strong><br><br>
        <small>Weight in kg: ${weightInput.toFixed(2)} × 0.01 mg/kg<br>
        Max Single Dose: 1mg IV/IO</small><br><br> 
        <small>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.</small>
      `
        )
        .fadeIn(200);
    });
  });
  