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

    //WEIGHT CALCULATION ENDS HERE
    //DOSE CALCULATION STARTS HERE

    protocol = $("input[name='protocol']:checked").val();
    console.log("Selected protocol:", protocol);

    agerange = $("input[name='Age']:checked").val();
    console.log("Selected age range:", agerange);
    let dosagePerKg;
    let repeatDose;
    let volume;
    let repeatVolume;

    // Determine dosage per kg based on protocol and age range

    // Less than 75 Pain management

    if (agerange === "L75" && protocol === "PainManagement") {
      console.log("Selected protocol: Pain Management for age range L75");
      dosagePerKg = 1 * weightInput;
      console.log("Dosage per kg:", dosagePerKg);

      if (dosagePerKg > 100) {
        dosagePerKg = 100;
        console.log("Dosage per kg capped at 100mcg");
      }
      volume = dosagePerKg / 50;

      console.log("Initial Volume to administer:", volume);

      repeatDose = 0.5 * weightInput;
      console.log("Repeat dose:", repeatDose);

      if (repeatDose > 50) {
        repeatDose = 50;
        console.log("Repeat dose capped at 50mcg");
      }
      repeatVolume = repeatDose / 50;
      console.log("Repeat volume:", repeatVolume);

      $("#result")
        .html(
          `
          <h2>Fentanyl <br><br> Pain Management <br><br><i> 75 YOA and Less</i></h2>
          <p>
            <strong><u>Initial Dose:</u></strong>
            <br>
            <br>
            <strong> ${dosagePerKg.toFixed(2)}mcg </strong>
             <br>
             <small>Slow IV Push 
             <br>
             (Over 2-3 Minutes)</small>
             <br>
             <br>
            <small>Method: 1mcg x ${weightInput}kg<br>(Max 100mcg)</small>
            <br>
            <br>
            <strong><u>Initial Volume To Administer: </u></strong>
            <br>
            <br>
            <strong> ${volume.toFixed(2)}mL </strong>
            <br>
            <small>(For concentrations of 50mcg/mL)</small>
            <br>
            <br>
            <small><b><u>NOTE:</u></b> 
            <br>
            Initial maximum dose <u>recommendation</u> is 50mcg. <br><br>Use <u><b>EXTREME</b></u> caution when exceeding 50mcg for initial dose using 1mcg/kg (Max 100mcg).</small>
            <br>
            <br>
            <strong><u>Repeat Dose:</u></strong>
            <br>
            <br>
            <strong> ${repeatDose.toFixed(2)}mcg </strong>
            <br><small> Slow IV Push 
            <br>
            (Over 2-3 Minutes)
            <br>
            (10-15 Minutes After Initial Dose)</small>
            <br>
            <br>
            <small>Method: 0.5mcg x ${weightInput}kg<br>(Max 50mcg)</small>
            <br>
            <br>
            <strong><u>Repeat Volume To Administer:</u></strong>
            <br>
            <br>
             <strong> ${repeatVolume.toFixed(2)}mL </strong>
            <br>
            <small>(For concentrations of 50mcg/mL)</small>
            <br>
            <br>
            <i><small>
              If uncertainty arises, consult Anderson Protocols or contact
              Medical Control. Always check dosages and concentrations prior to
              administration.
            </small></i>
            </p>
          `
        )
        .fadeIn(200);
    }
    // Less than 75 Pain management END

    // More than 75 Pain management Begin
    if (agerange === "G75" && protocol === "PainManagement") {
      console.log("Selected protocol: Pain Management for age range G75");
      dosagePerKg = 0.5 * weightInput;
      console.log("Dosage per kg:", dosagePerKg);

      if (dosagePerKg > 50) {
        dosagePerKg = 50;
        console.log("Dosage per kg capped at 50mcg");
      }
      volume = dosagePerKg / 50;

      console.log("Initial Volume to administer:", volume);

      repeatDose = 0.5 * weightInput;
      console.log("Repeat dose:", repeatDose);

      if (repeatDose > 25) {
        repeatDose = 25;
        console.log("Repeat dose capped at 25mcg");
      }
      repeatVolume = repeatDose / 50;
      console.log("Repeat volume:", repeatVolume);

      $("#result")
        .html(
          `
          <h2>Fentanyl <br><br> Pain Management <br><br><i> Greater than 75 YOA</i></h2>
          <p>
            <strong><u>Initial Dose:</u></strong>
            <br>
            <br>
            <strong> ${dosagePerKg.toFixed(2)}mcg </strong>
             <br>
             <small>Slow IV Push 
             <br>
             (Over 2-3 Minutes)</small>
             <br>
             <br>
            <small>Method: 0.5mcg x ${weightInput}kg<br>(Max 50mcg)</small>
            <br>
            <br>
            <strong><u>Initial Volume To Administer: </u></strong>
            <br>
            <br>
            <strong> ${volume.toFixed(2)}mL </strong>
            <br>
            <small>(For concentrations of 50mcg/mL)</small>
            <br>
            <br>
            <strong><u>Repeat Dose:</u></strong>
            <br>
            <br>
            <strong> ${repeatDose.toFixed(2)}mcg </strong>
                      <br><small> Slow IV Push 
            <br>
            (Over 2-3 Minutes)
            <br>
            (10-15 Minutes After Initial Dose)</small>
            <br>
            <br>
            <small>Method: 0.5mcg x ${weightInput}kg<br>(Max 25mcg)</small>
            <br>
            <br>
            <strong><u>Repeat Volume To Administer:</u></strong>
            <br>
            <br>
             <strong> ${repeatVolume.toFixed(2)}mL </strong>
            <br>
            <small>(For concentrations of 50mcg/mL)</small>
            <br>
            <br>
            <i><small>
              If uncertainty arises, consult Anderson Protocols or contact
              Medical Control. Always check dosages and concentrations prior to
              administration.
            </small></i>
            </p>
          `
        )
        .fadeIn(200);
    }
    // More than 75 Pain management END

    //Assisted Medication post intubation begin
    if (protocol === "PostIntubation") {
      console.log("Selected protocol: Post Intubation");
      dosagePerKg = 1 * weightInput;
      console.log("Dosage per kg:", dosagePerKg);

      if (dosagePerKg > 100) {
        dosagePerKg = 100;
        console.log("Dosage per kg capped at 100mcg");
      }
      volume = dosagePerKg / 50;

      console.log("Initial Volume to administer:", volume);

      repeatDose = 0.5 * weightInput;
      console.log("Repeat dose:", repeatDose);

      if (repeatDose > 50) {
        repeatDose = 50;
        console.log("Repeat dose capped at 50mcg");
      }
      repeatVolume = repeatDose / 50;
      console.log("Repeat volume:", repeatVolume);

      $("#result")
        .html(
          `
          <h1>Fentanyl</h1><h2><u>Assisted Intubation</u></h2>
          <p>
            <strong><u>Initial Dose:</u></strong>
            <br>
            <br>
            <strong> ${dosagePerKg.toFixed(2)}mcg </strong>
             <br>
             <br>
            <small>Method: 1mcg x ${weightInput}kg<br>(Max 100mcg)</small>
            <br>
            <br>
            <strong><u>Volume To Administer: </u></strong>
            <br>
            <br>
            <strong> ${volume.toFixed(2)}mL </strong>
            <br>
            <small>(For concentrations of 50mcg/mL)</small>
            <br>
            <br>
            </p>
            <h2><u>Post Intubation</u></h2>
            <p>
            <strong><u>Dose:</u></strong>
            <br>
            <br>
            <strong> ${repeatDose.toFixed(2)}mcg </strong>
            <br>
            <small>
            (Every 3-5 Minutes As Needed)
            <br>
            (Maximum Aloquets of 50mcg)</small>
            <br>
            <br>
            <small>Method: 0.5mcg x ${weightInput}kg<br>(Max 50mcg)</small>
            <br>
            <br>
             <strong><u>Repeat Volume:</u>
             <br>
             <br>
             ${repeatVolume.toFixed(2)}mL </strong>
            <br>
            <small>(For concentrations of 50mcg/mL)</small>
            <br>
            <br>
            <i><small>
              If uncertainty arises, consult Anderson Protocols or contact
              Medical Control. Always check dosages and concentrations prior to
              administration.
            </small></i>
            </p>
          `
        )
        .fadeIn(200);
    }
    // Assisted Medication post intubation end
    //Chest Pain Management begin <75

    if (protocol === "ChestPain" && agerange === "L75") {
      console.log("Selected protocol: Chest Pain Management for age range L75");
      dosagePerKg = 1 * weightInput;
      console.log("Dosage per kg:", dosagePerKg);

      if (dosagePerKg > 100) {
        dosagePerKg = 100;
        console.log("Dosage per kg capped at 100mcg");
      }
      volume = dosagePerKg / 50;

      console.log("Initial Volume to administer:", volume);

      $("#result")
        .html(
          `
          <h2>Fentanyl <br><br> Chest Pain Management <br><br><i> 75 YOA and Less</i></h2>
          <p>
            <strong><u>Initial Dose:</u></strong>
            <br>
            <br>
            <strong> ${dosagePerKg.toFixed(2)}mcg </strong>
             <br>
             <small>Slow IV Push 
             <br>
             (Over 2 Minutes)</small>
             <br>
             <br>
            <small>Method: 1mcg x ${weightInput}kg<br>(Max 100mcg)</small>
            <br>
            <br>
            <strong><u>Initial Volume To Administer: </u></strong>
            <br>
            <br>
            <strong> ${volume.toFixed(2)}mL </strong>
            <br>
            <small>(For concentrations of 50mcg/mL)</small>
            <br>
            <br>
            <strong><u>Repeat Dose:</u></strong>
            <br>
            <br>
            <strong> CONTACT MEDICAL CONTROL FOR ADDITIONAL DOSAGE</strong>
            <br>
            <br>
            <i><small>
              If uncertainty arises, consult Anderson Protocols or contact
              Medical Control. Always check dosages and concentrations prior to
              administration.
            </small></i>
            </p>
            `
        )
        .fadeIn(200);
    }
    //Chest Pain Management END <75
    //Chest Pain Management begin >75
    if (protocol === "ChestPain" && agerange === "G75") {
      console.log("Selected protocol: Chest Pain Management for age range G75");
      dosagePerKg = 0.5 * weightInput;
      console.log("Dosage per kg:", dosagePerKg);

      if (dosagePerKg > 50) {
        dosagePerKg = 50;
        console.log("Dosage per kg capped at 50mcg");
      }
      volume = dosagePerKg / 50;

      console.log("Initial Volume to administer:", volume);

      $("#result")
        .html(
          `
          <h2>Fentanyl <br><br> Chest Pain Management <br><br><i> Greater than 75 YOA</i></h2>
          <p>
            <strong><u>Initial Dose:</u></strong>
            <br>
            <br>
            <strong> ${dosagePerKg.toFixed(2)}mcg </strong>
             <br>
             <small>Slow IV Push 
             <br>
             (Over 2 Minutes)</small>
             <br>
             <br>
            <small>Method: 0.5mcg x ${weightInput}kg<br>(Max 50mcg)</small>
            <br>
            <br>
            <strong><u>Initial Volume To Administer: </u></strong>
            <br>
            <br>
            <strong> ${volume.toFixed(2)}mL </strong>
            <br>
            <small>(For concentrations of 50mcg/mL)</small>
            <br>
            <br>
            <strong><u>Repeat Dose:</u></strong>
            <br>
            <br>
            <strong> CONTACT MEDICAL CONTROL FOR ADDITIONAL DOSAGE</strong>
            <br>
            <br>
            <i><small>
              If uncertainty arises, consult Anderson Protocols or contact
              Medical Control. Always check dosages and concentrations prior to
              administration.
            </small></i>
            </p>`
        )
        .fadeIn(200);
    }
  });
});
