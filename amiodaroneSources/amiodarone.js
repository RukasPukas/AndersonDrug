$(document).ready(function () {
    $("body").fadeIn(750);
  
    //calculate weight ------------------------------------------->
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
  //end calculate weight ------------------------------------------->

//calculate dosage ------------------------------------------->
      const dosagePerKg = 5;
      let dosage = weightInput * dosagePerKg;
      console.log("Calculated dosage:", dosage);
      console.log(`Recommended dosage: ${dosage.toFixed(2)} mg`);
  
      if (dosage > 150) {
        console.log("Warning: Dosage exceeds recommended maximum of 150 mg.");
        dosage = 150;
        console.log("Adjusted dosage to maximum:", dosage);
      }
  
      const volumeML = dosage / 50;
      console.log(`Recommended volume: ${volumeML.toFixed(2)} mL`);

      //end calculate dosage ------------------------------------------->

      // With a pulse protocol -------------------------------------------->
      const protocol = $('input[name="protocol"]:checked').val();
      if (protocol === "Pulse") {
        $("#result")
        .html(`
            <strong><u>With A Pulse</u></strong><br><br>
          <strong>Recommended Dose:</strong><br> ${dosage.toFixed(2)} mg<br>
          <small>(Weight in kg: ${weightInput.toFixed(
            2
          )} × 5 mg/kg)<br>Maximum Pediatric Initial Dose 150 mg</small>
          <br><br>
          <strong>Volume to Administer:</strong><br>For a solution of 50 mg per 1 ml<br> Initial Dose: ${volumeML.toFixed(
            2
          )} mL
          <br><br>
          <strong>Infusion Time Frame:</strong><br> 20-60 minutes<br><br>
          <strong>NO REPEAT DOSAGE WITHOUT CONTACTING MEDICAL CONTROL</strong><br><br>
          <small>Note: Always ensure amounts are accurate prior to administration, consult Anderson Protocols or medical control prior to administration if uncertainty exists.</small>
        `)
        .fadeIn(200);
      }

      
    //end With a pulse protocol --------------------------------------------->
    // Pulseless protocol --------------------------------------------->
  else {
    const dosePerKg = 5;
    const maxSingleDose = 300;
    const maxTotalPerKg = 15;
    const concentration = 50; 
  
    let singleDose = weightInput * dosePerKg;
    if (singleDose > maxSingleDose) singleDose = maxSingleDose;
  
    const maxTotalDoseAllowed = weightInput * maxTotalPerKg;
    const potentialTotalDose = singleDose * 3;
  
    const totalDose = Math.min(potentialTotalDose, maxTotalDoseAllowed);
    const numberOfDoses = Math.floor(totalDose / singleDose);
  
    const singleDoseVolume = singleDose / concentration;
    const totalVolume = totalDose / concentration;
  
    console.log("Weight (kg):", weightInput);
    console.log("Single Dose:", singleDose);
    console.log("Total Dose:", totalDose);
    console.log("Number of Doses:", numberOfDoses);
    console.log("Volume per dose:", singleDoseVolume);
    console.log("Total Volume:", totalVolume);
  
    $("#result")
      .html(`
        <strong><u>Pulseless Protocol</u></strong><br><br>
  
        <strong>Initial Dose:</strong><br>
        ${singleDose.toFixed(2)} mg <br>(${weightInput.toFixed(
            2
          )}kgs x 5mg/kg)<br><small>Maximum of 300mg per dosage</small><br><br><strong>
        Volume:</strong> <br>${singleDoseVolume.toFixed(2)}mL for a 50 mg/mL solution
        <br><br>
  
        <strong>Repeat Dose Instructions:</strong><br>May repeat 2 additional times after initial dose, every 5 minutes if needed.<br><br>
     

  
        <small><strong>DO NOT</strong> exceed 300 mg per dose or a combined 15 mg/kg total dose given. Doses may be repeated up to 2 additional times after initial dose, every 5 minutes if needed.<br>If uncertainty
        arises, consult Anderson Protocols or contact Medical Control.</small>
      `)
      .fadeIn(200);
  }
  
  
    });
  });
  