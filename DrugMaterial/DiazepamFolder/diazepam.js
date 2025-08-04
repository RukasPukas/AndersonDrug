$(document).ready(function () {
  $("body").fadeIn(750);

  function togglePediatricOptions() {
    const selected = $('input[name="protocol"]:checked').val();
    if (selected === "Child") {
      $(".pediatric-only").fadeIn(400);
      toggleageOptions(); // check if IV seizure is selected and show age input
    } else {
      $(".pediatric-only").hide(600);
      $(".agerange-only").hide(600); // hide age input if switching to adult
    }
  }

  function toggleageOptions() {
    const selected = $('input[name="individualProtocol"]:checked').val();
    if (selected === "seizureIV") {
      $(".agerange-only").fadeIn(400);
    } else {
      $(".agerange-only").hide(600);
    }
  }

  togglePediatricOptions(); // run on page load
  toggleageOptions();       // run on page load

  $('input[name="protocol"]').on("change", togglePediatricOptions);
  $('input[name="individualProtocol"]').on("change", toggleageOptions);

  $("#calculateDosage").on("click", function () {
    const initialInput = $("#weightInput").val();
    let weightInput = parseFloat(initialInput);

    if (isNaN(weightInput) || weightInput <= 0) {
      alert("Please enter a valid weight.");
      return;
    }

    const unit = $('input[name="unit"]:checked').val();
    if (unit === "lbs") {
      weightInput = weightInput / 2.20462;
      weightInput = parseFloat(weightInput.toFixed(2));
    }

    const adultorped = $('input[name="protocol"]:checked').val();

    if (adultorped === "Adult") {
      const adultDosage = 0.1;
      let adultDosageFinal = weightInput * adultDosage;
      if (adultDosageFinal > 5) adultDosageFinal = 5;
      const volume = 5;
      let volumeFinal = adultDosageFinal / volume;

      $("#result")
        .html(`
          <h2><u>Adult Dosage:</u></h2>
          <h3>Seizure/Status Epilepticus;<br>ChestPain<br>Acute Coronary Syndrome<br>STEMI;<br>Environmental Hyperthermia;</h3>
          <strong>Recommended Initial Dose:<br><br> ${adultDosageFinal.toFixed(2)} mg<br><br>Volume To Administer: ${volumeFinal.toFixed(2)}ml</strong><br>
          <small>(For concentrations of 5mg/ml)</small><br><br>
          <small>(METHOD: Weight in kg: ${weightInput.toFixed(2)} × 0.1 mg/kg)<br>
          Maximum Single Dose of 5 mg.<br>May repeat <strong>${adultDosageFinal.toFixed(2)}mg</strong> once <i>(if needed)</i> 5 minutes after initial administration.</small>
          <br><br>
          <p><i><small>If uncertainty arises, consult Anderson Protocols or contact Medical Control. Always check dosages and concentrations prior to administration.</small></i></p>
        `)
        .fadeIn(200);
    }

    if (adultorped === "Child") {
      const protocol = $('input[name="individualProtocol"]:checked').val();

      if (protocol === "pediEnvironment") {
        const dosePerKg = 0.05;
        let finalDose = weightInput * dosePerKg;
        if (finalDose > 2) finalDose = 2;
        let volume = finalDose / 5;

        $("#result")
          .html(`
            <h2><u>Pediatric Dosage:</u></h2>
            <h3>Environmental Hyperthermia<br><small>(Shivering)</small></h3>
            <strong>Recommended Dose:<br><small><i>Must Contact Medical Control</small></i><br><br> ${finalDose.toFixed(2)}mg over 2-3 minutes.<br><br>Volume To Administer: ${volume.toFixed(2)}ml</strong><br>
            <small>(For concentrations of 5mg/ml)</small><br><br>
            <small>(METHOD: Weight in kg: ${weightInput.toFixed(2)} × 0.05 mg/kg)<br>
            Maximum Single Dose of 2mg over 2-3 minutes.</small>
            <br><br>
            <p><i><small>If uncertainty arises, consult Anderson Protocols or contact Medical Control. Always check dosages and concentrations prior to administration.</small></i></p>
          `)
          .fadeIn(200);
      }

      if (protocol === "seizureRectal") {
        const dosePerKg = 0.5;
        let finalDose = weightInput * dosePerKg;
        if (finalDose > 2) finalDose = 2;
        let volume = finalDose / 5;

        $("#result")
          .html(`
            <h2><u>Pediatric Dosage:</u></h2>
            <h3>Seizure/Status Epilepticus<br><Strong>(Rectal Administration)</Strong></h3>
            <strong>Recommended Dose:<br><br> ${finalDose.toFixed(2)}mg</strong><br>
            <small><u>Must contact medical control prior to administration.</u></small><br><br>
            <strong>Volume To Administer: ${volume.toFixed(2)}ml</strong><br>
            <small>(For concentrations of 5mg/ml)</small><br><br>
            <small>(METHOD: Weight in kg: ${weightInput.toFixed(2)} × 0.5 mg/kg)<br>
            Maximum Single Dose of 2mg.</small>
            <br><br>
            <p><i><small>If uncertainty arises, consult Anderson Protocols or contact Medical Control. Always check dosages and concentrations prior to administration.</small></i></p>
          `)
          .fadeIn(200);
      }

      if (protocol === "seizureIV") {
        const age = $('input[name="age"]:checked').val();
        if(age === "lessThanFive"){
         const ivSeizureDosage = 0.1;
          let ivSeizureDosageFinal = weightInput * ivSeizureDosage;

          if(ivSeizureDosageFinal > 5){
            ivSeizureDosageFinal = 5;
          }

          volume = ivSeizureDosageFinal / 5;
          $("#result")
          .html(`
            <h2><u>Pediatric Dosage:</u></h2>
            <h3>Seizure/Status Epilepticus<br><Strong>(Intravenous Administration)</Strong></h3>
            <strong>Recommended Dose for ages less than 5<br><br> ${ivSeizureDosageFinal.toFixed(2)}mg</strong><br><br>
            <strong>Volume To Administer: ${volume.toFixed(2)}ml</strong><br>
            <small>(For concentrations of 5mg/ml)</small><br><br>
            <small>(METHOD: Weight in kg: ${weightInput.toFixed(2)} × 0.1 mg/kg)<br>
            Maximum Single Dose of 5mg.<br> May repeat every 15 minutes as needed.</small>
            <br><br>
            <p><i><small>If uncertainty arises, consult Anderson Protocols or contact Medical Control. Always check dosages and concentrations prior to administration.</small></i></p>
          `)
          .fadeIn(200);

        }

        if(age === "GreaterThanFive"){

          const ivSeizureDosage = 0.1;
          let ivSeizureDosageFinal = weightInput * ivSeizureDosage;

          if(ivSeizureDosageFinal > 10){
            ivSeizureDosageFinal = 10;
          }

          volume = ivSeizureDosageFinal / 5;
          $("#result")
          .html(`
            <h2><u>Pediatric Dosage:</u></h2>
            <h3>Seizure/Status Epilepticus<br><Strong>(Intravenous Administration)</Strong></h3>
            <strong>Recommended Dose for ages greater than or equal to 5<br><br> ${ivSeizureDosageFinal.toFixed(2)}mg</strong><br><br>
            <strong>Volume To Administer: ${volume.toFixed(2)}ml</strong><br>
            <small>(For concentrations of 5mg/ml)</small><br><br>
            <small>(METHOD: Weight in kg: ${weightInput.toFixed(2)} × 0.1 mg/kg)<br>
            Maximum Single Dose of 10mg.<br> May repeat every 15 minutes as needed.</small>
            <br><br>
            <p><i><small>If uncertainty arises, consult Anderson Protocols or contact Medical Control. Always check dosages and concentrations prior to administration.</small></i></p>
          `)
          .fadeIn(200);
          
        }
      }
    }
  });
});
