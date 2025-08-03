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

    const dosagePerKg = 0.02;
    const rawDosage = weightInput * dosagePerKg;
    let dosage = rawDosage;

    const minDosage = 0.1;
    const childMaxSingle = 0.5;
    const adolescentMaxSingle = 1.0;

    const ageGroup = $('input[name="ageGroup"]:checked').val();

    if (ageGroup === "Child") {
      if (dosage > childMaxSingle) {
        dosage = childMaxSingle;
      }
    } else if (ageGroup === "Adolescent") {
      if (dosage > adolescentMaxSingle) {
        dosage = adolescentMaxSingle;
      }
    }

    if (dosage < minDosage) {
      dosage = minDosage;
    }

    console.log("Raw dosage:", rawDosage);
    console.log("Adjusted dosage:", dosage);

    //-----------------------------------Volume Calculation-----------------------------------
    const concentration = 0.1; // mg/mL
    const volume = dosage / concentration;
    console.log("Volume to administer:", volume);
    const volumeInMl = parseFloat(volume.toFixed(2));

    //-----------------------------------Display Result-----------------------------------

    $("#result")
      .html(
        `
            <h2>Recommended Initial Dose Bradycardia:</h2>
     <p>For a weight of <strong>${weightInput} kg</strong>, the recommended initial dose is <strong>${dosage.toFixed(
          2
        )}mg</strong>.<br><small>Method: 0.02mg x kg (MIN PEDIATRIC DOSE:0.1mg, MAX CHILD SINGLE DOSE: 0.5mg MAX ADOLESCENT SINGLE DOSE: 1.0mg)</small></p><h2>Repeat Dose:</h2><p>May repeat initial dose once in 3-5 minutes after initial administration for persistent bradycardia.</p>
  
      <h2>Volume to Administer:</h2>
      <p>For a concentration of <strong>${concentration} mg/mL</strong>, the volume to administer is <strong>${volumeInMl} mL</strong>.  <br><br>       <i
            ><small
              >If uncertainty arises, consult Anderson Protocols or contact
              Medical Control. Always check dosages and concentrations prior to administration.</small
            ></i
          ></p>
            `
      )
      .fadeIn(200);

    //-------------------------------------END BRADYCARDIA-----------------------------------
  });
});
