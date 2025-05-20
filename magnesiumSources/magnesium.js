$(document).ready(function () {
  $("body").fadeIn(750);

  $("#calculateDosage").on("click", function () {
    //Begin Adult Protocols
    const protocolSelected = $('input[name="protocol"]:checked').val();
    console.log("Selected protocol:", protocolSelected);

    if (protocolSelected === "respiratory") {
      console.log(protocolSelected);

      //2 grams IV in 50 mL NS over 10-15 minutes
      const respiratoryDose = 2;

      $("#result")
        .html(
          `
        <h2><u>Adult</u><br> Bronchospasm / Asthma / COPD;
        </h2>
        <p> <strong>Method:</strong> 
        <br>
        <br>
        Mix <strong>2 grams</strong> of Magnesium Sulfate into <strong>50ml</strong> of normal saline and infuse over <strong>10-15 minutes</strong>.
          <br>
          <br>

        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }
    if (protocolSelected === "eclampsia") {
      console.log(protocolSelected);

      $("#result")
        .html(
          `
        <h2><u>Adult</u><br>Eclampsia / Pre-Eclapmsia;</h2>
        <p> 
          <strong>Method:</strong>
        <br>
        <br>
        Mix <strong>4 grams </strong> of Magnesium Sulfate in<strong> 50mL</strong> of normal saline and infuse over <strong>10-20 minutes for seizures</strong>.
        <br>
        <br>

        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }

    if (protocolSelected === "torsadespulse") {
      console.log(protocolSelected);

      $("#result")
        .html(
          `
        <h2><u>Adult</u><br>Tachycardia (with a Pulse)-Wide Complex (Torsades);</h2>
        <p> 
          <strong>Method:</strong>
        <br>
        <br>
        <strong>2 grams</strong> <u>SLOW</u> IV/IO push (over 2-3 minutes).
        <br>
        <br>

        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }

    if (protocolSelected === "torsadespulseless") {
      console.log(protocolSelected);

      $("#result")
        .html(
          `
        <h2><u>Adult</u><br>Cardiac Arrest-(V-Fib/Pulseless V-Tach)(Torsades)
        </h2>
        <p> 
          <strong>Method:</strong>
        <br>
        <br>
        <strong>2 grams</strong> IV/IO push (over 1-2 minutes).
        <br>
        <br>

        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }

    // END ADULT SECTION
  });

  //Begin Pediatric
  $("#calculateDosagePedi").on("click", function () {
    const pediInput = $("#weightInputPedi").val();
    console.log("Initial input:", pediInput);

    let pediWeightInput = parseFloat(pediInput);
    console.log("Parsed weight input:", pediWeightInput);

    if (isNaN(pediWeightInput) || pediWeightInput <= 0) {
      alert("Please enter a valid weight.");
      return;
    }

    const unitPedi = $('input[name="unitp"]:checked').val();
    console.log("Selected unit:", unitPedi);

    if (unitPedi === "lbs") {
      pediWeightInput = pediWeightInput / 2.20462;
      pediWeightInput = parseFloat(pediWeightInput.toFixed(2));
      console.log("Converted weight to kg:", pediWeightInput);
    }
    //END WEIGHT GATHERING

    const protocolSelected = $('input[name="Pediprotocol"]:checked').val();
    console.log("Selected pediatric protocol:", protocolSelected);

    if (protocolSelected === "Respiratory") {
      console.log("Pediatric: ", protocolSelected);

      let doseInMg = 50 * parseFloat(pediWeightInput);
      let respiratoryDose;

      if (doseInMg >= 2000) {
        respiratoryDose = "2 grams";
      } else {
        respiratoryDose = doseInMg.toFixed(2) + " mg";
      }

      let respiratoryVolume = doseInMg / 500;

      $("#resultPedi")
        .html(
          `
      <h2><u>Pediatric</u><br>Respiratory Distress-Lower Airway;<br><br><i><u>MEDICAL CONTROL MUST AUTHORIZE</u></i></h2>
      <p> <strong>Suggested Dose:</strong> 
      <br>
      <br>
      <strong>${respiratoryDose} in 50ml of normal saline, over 10-15 minutes.<br></strong>
      <small>(Method: 50mg/kg x ${pediWeightInput}kg = ${doseInMg}mg MAX of 2000mg)</small>
      <br>
      <br>
      <strong>Suggested Volume:</strong>
      <br>
      <u>(For Concentrations of <strong>500mg per 1ml</strong>)</u>
      <br>
      <br>
      <strong>${respiratoryVolume.toFixed(
        2
      )} ml</strong> of Magnesium Sulfate infused into <strong>50ml</strong> of normal saline.
       <br>
       <br>
      <small><i>Note: Always ensure amounts are accurate prior to administration. 
      Consult Anderson Protocols or Medical Control if uncertainty exists.
      </small></i>
       </p>
      `
        )
        .fadeIn(200);
    }

    if (protocolSelected === "PediPulseTorsades") {
      console.log("Pediatric: ", protocolSelected);

      let torsadesLDose = 25 * parseFloat(pediWeightInput);
      let torsadesHDose = 50 * parseFloat(pediWeightInput);

      if (torsadesLDose >= 2000 && torsadesHDose >= 2000) {
        let torsadesVolume = torsadesLDose / 500;
        $("#resultPedi")
          .html(
            `
      <h2><u>Pediatric</u><br>Tachycardia (with a Pulse)-Wide Complex (Torsades)</h2>
      <p> <strong>Suggested Dose:</strong> 
      <br>
      <br>
      <strong>${torsadesLDose}mg in 50ml of normal saline, over 10 minutes.<br></strong>
      <small>(Method: 25-50mg/kg x ${pediWeightInput}kg = ${torsadesLDose}mg MAX of 2000mg)</small>
      <br>
      <br>
      <strong>Suggested Volume:</strong>
      <br>
      <u>(For Concentrations of <strong>500mg per 1ml</strong>)</u>
      <br>
      <br>
      <strong>${torsadesVolume.toFixed(
        2
      )} ml</strong> of Magnesium Sulfate infused into <strong>50ml</strong> of normal saline.
       <br>
       <br>
      <small><i>Note: Always ensure amounts are accurate prior to administration. 
      Consult Anderson Protocols or Medical Control if uncertainty exists.
      </small></i>
       </p>
      `
          )
          .fadeIn(200);
      } else if (torsadesLDose < 2000 && torsadesHDose >= 2000) {
        torsadesHDose = 2000;
        let torsadesLVolume = torsadesLDose / 500;
        let torsadesHVolume = 4;
        $("#resultPedi")
          .html(
            `
      <h2><u>Pediatric</u><br>Tachycardia (with a Pulse)-Wide Complex (Torsades)</h2>
      <p> <strong>Suggested Dose Range:</strong> 
      <br>
      <br>
      <strong>${torsadesLDose}mg - ${torsadesHDose}mg in 50ml of normal saline, over 10 minutes.<br></strong>
      <small>(Method: 25-50mg/kg x ${pediWeightInput}kg = ${torsadesLDose}mg -${torsadesHDose}mg MAX of 2000mg)</small>
      <br>
      <br>
      <strong>Suggested Volume Range:</strong>
      <br>
      <u>(For Concentrations of <strong>500mg per 1ml</strong>)</u>
      <br>
      <br>
      <strong>${torsadesLVolume.toFixed(
        2
      )} ml - ${torsadesHVolume} ml</strong> of Magnesium Sulfate infused into <strong>50ml</strong> of normal saline.
       <br>
       <br>
      <small><i>Note: Always ensure amounts are accurate prior to administration. 
      Consult Anderson Protocols or Medical Control if uncertainty exists.
      </small></i>
       </p>
      `
          )
          .fadeIn(200);
      } else if (torsadesLDose < 2000 && torsadesHDose < 2000) {
        let torsadesLVolume = torsadesLDose / 500;
        let torsadesHVolume = torsadesHDose / 500;
        $("#resultPedi")
          .html(
            `
      <h2><u>Pediatric</u><br>Tachycardia (with a Pulse)-Wide Complex (Torsades)</h2>
      <p> <strong>Suggested Dose Range:</strong> 
      <br>
      <br>
      <strong>${torsadesLDose}mg - ${torsadesHDose}mg in 50ml of normal saline, over 10 minutes.<br></strong>
      <small>(Method: 25-50mg/kg x ${pediWeightInput}kg = ${torsadesLDose}mg -${torsadesHDose}mg MAX of 2000mg)</small>
      <br>
      <br>
      <strong>Suggested Volume Range:</strong>
      <br>
      <u>(For Concentrations of <strong>500mg per 1ml</strong>)</u>
      <br>
      <br>
      <strong>${torsadesLVolume.toFixed(
        2
      )} ml - ${torsadesHVolume} ml</strong> of Magnesium Sulfate infused into <strong>50ml</strong> of normal saline.
       <br>
       <br>
      <small><i>Note: Always ensure amounts are accurate prior to administration. 
      Consult Anderson Protocols or Medical Control if uncertainty exists.
      </small></i>
       </p>
      `
          )
          .fadeIn(200);
      }
    }
    if (protocolSelected === "PediPulselessTorsades") {
      console.log("Pediatric: ", protocolSelected);

      let torsadesLDose = 25 * parseFloat(pediWeightInput);
      let torsadesHDose = 50 * parseFloat(pediWeightInput);

      if (torsadesLDose >= 2000 && torsadesHDose >= 2000) {
        let torsadesVolume = torsadesLDose / 500;
        $("#resultPedi")
          .html(
            `
      <h2><u>Pediatric</u><br>Tachycardia (with a Pulse)-Wide Complex (Torsades)</h2>
      <p> <strong>Suggested Dose:</strong> 
      <br>
      <br>
      <strong>${torsadesLDose}mg IV/IO over 1-2 minutes..<br></strong>
      <small>(Method: 25-50mg/kg x ${pediWeightInput}kg = ${torsadesLDose}mg MAX of 2000mg)</small>
      <br>
      <br>
      <strong>Suggested Volume:</strong>
      <br>
      <u>(For Concentrations of <strong>500mg per 1ml</strong>)</u>
      <br>
      <br>
      <strong>${torsadesVolume.toFixed(2)} ml</strong> 
       <br>
       <br>
      <small><i>Note: Always ensure amounts are accurate prior to administration. 
      Consult Anderson Protocols or Medical Control if uncertainty exists.
      </small></i>
       </p>
      `
          )
          .fadeIn(200);
      } else if (torsadesLDose < 2000 && torsadesHDose >= 2000) {
        torsadesHDose = 2000;
        let torsadesLVolume = torsadesLDose / 500;
        let torsadesHVolume = 4;
        $("#resultPedi")
          .html(
            `
      <h2><u>Pediatric</u><br>Tachycardia (with a Pulse)-Wide Complex (Torsades)</h2>
      <p> <strong>Suggested Dose Range:</strong> 
      <br>
      <br>
      <strong>${torsadesLDose}mg - ${torsadesHDose}mg IV/IO over 1-2 minutes.<br></strong>
      <small>(Method: 25-50mg/kg x ${pediWeightInput}kg = ${torsadesLDose}mg -${torsadesHDose}mg MAX of 2000mg)</small>
      <br>
      <br>
      <strong>Suggested Volume Range:</strong>
      <br>
      <u>(For Concentrations of <strong>500mg per 1ml</strong>)</u>
      <br>
      <br>
      <strong>${torsadesLVolume.toFixed(2)} ml - ${torsadesHVolume} ml</strong>.
       <br>
       <br>
      <small><i>Note: Always ensure amounts are accurate prior to administration. 
      Consult Anderson Protocols or Medical Control if uncertainty exists.
      </small></i>
       </p>
      `
          )
          .fadeIn(200);
      } else if (torsadesLDose < 2000 && torsadesHDose < 2000) {
        let torsadesLVolume = torsadesLDose / 500;
        let torsadesHVolume = torsadesHDose / 500;
        $("#resultPedi")
          .html(
            `
      <h2><u>Pediatric</u><br>Tachycardia (with a Pulse)-Wide Complex (Torsades)</h2>
      <p> <strong>Suggested Dose Range:</strong> 
      <br>
      <br>
      <strong>${torsadesLDose}mg - ${torsadesHDose}mg IV/IO over 1-2 minutes.<br></strong>
      <small>(Method: 25-50mg/kg x ${pediWeightInput}kg = ${torsadesLDose}mg -${torsadesHDose}mg MAX of 2000mg)</small>
      <br>
      <br>
      <strong>Suggested Volume Range:</strong>
      <br>
      <u>(For Concentrations of <strong>500mg per 1ml</strong>)</u>
      <br>
      <br>
      <strong>${torsadesLVolume.toFixed(2)} ml - ${torsadesHVolume} ml</strong>.
       <br>
       <br>
      <small><i>Note: Always ensure amounts are accurate prior to administration. 
      Consult Anderson Protocols or Medical Control if uncertainty exists.
      </small></i>
       </p>
      `
          )
          .fadeIn(200);
      }
    }
  });
});
