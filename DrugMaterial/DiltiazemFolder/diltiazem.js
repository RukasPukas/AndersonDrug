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
  

      const ageInput = $('input[name="age"]:checked').val();
        
      if (ageInput === "Less65"){
          console.log("Age is less than 65 years");
          const less65DosePerKG = 0.25;
          let dosageless65 = weightInput * less65DosePerKG;
          console.log("Calculated dosage:", dosageless65);
          console.log(`Recommended dosage: ${dosageless65.toFixed(2)} mg`);
    
    
    
          if (dosageless65 > 25) {
            dosageless65 = 25;
            console.log("Dosage capped at 25 mg:", dosageless65);
          }

          $("#result")
          .html(
            `
          <strong>Recommended Initial Dose:<br><br><u>If less than 65 years of age and SBP > 100mmHg</u></strong> <br><br><strong>${dosageless65.toFixed(2)}mg <br>Over 2-5 Minutes<br>
          Slow IV/IO Push</strong></br><br>
          <small>(Weight in kg: ${weightInput.toFixed(
            2
          )} × 0.25 mg/kg)
            <br><br></small>
            <strong>Recommended Repeat Dose:<br><br></strong>
            15 minutes after initial administration, if needed contact medical control for further dosaging.<br><br>
            <small>Note: Always ensure amounts are accurate prior to administration, consult Anderson Protocols or medical control prior to administration if uncertainty exists.</small>
        `
          )
          .fadeIn(200);
         
      }

      if (ageInput === "Great65"){
      const great65DosePerKG = 0.1;
      let dosagegreat65 = weightInput * great65DosePerKG;
      console.log("Calculated dosage:", dosagegreat65);
      console.log(`Recommended dosage: ${dosagegreat65.toFixed(2)} mg`);

      if (dosagegreat65 > 10) {
        dosagegreat65 = 10;
        console.log("Dosage capped at 10 mg:", dosagegreat65);
      }
      $("#result")
      .html(
        `
      <strong>Recommended Initial Dose:<br><br><u>If greater than 65 years of age and SBP > 100mmHg</u></strong> <br><br><strong>${dosagegreat65.toFixed(2)}mg <br>Over 2-5 Minutes<br>
      Slow IV/IO Push</strong></br><br>
      <small>(Weight in kg: ${weightInput.toFixed(
        2
      )} × 0.10 mg/kg)
        <br><br></small>
        <strong>Recommended Repeat Dose:<br><br></strong>
        15 minutes after initial administration; if needed contact medical control for further dosaging.<br><br>
        <small>Note: Always ensure amounts are accurate prior to administration, consult Anderson Protocols or medical control prior to administration if uncertainty exists.</small>
    `
      )
      .fadeIn(200);

    }





    });
  });
  