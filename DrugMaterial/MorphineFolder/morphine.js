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
    //START ADULT DOSAGE CALCULATION
    const protocolSelected = $('input[name="protocol"]:checked').val();
    console.log("Selected protocol:", protocolSelected);

    if (protocolSelected === "acs") {
      const selectedRadio = $('input[name="protocol"]:checked');
      const protocolName = selectedRadio
        .parent()
        .text()
        .trim()
        .replace(/;$/, "");

      console.log("Selected protocol name:", protocolName);
      $("#result")
        .html(
          `
        <h2><u>Adult</u><br> ${protocolName} 
        </h2>
        <p> <strong>2-4mg IV/IO <u>slow</u> push.</strong><br><br>
        <i>Repeat dose instructions to be obtained from Medical Control.</i>
        <br><br>

        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }

    if (protocolSelected === "pain") {
      const selectedRadio = $('input[name="protocol"]:checked');
      const protocolName = selectedRadio
        .parent()
        .text()
        .trim()
        .replace(/;$/, "");
      L75Dose = weightInput * 0.1;
      if (L75Dose > 8) {
        L75Dose = 8;
      }
      G75Dose = weightInput * 0.05;
      if (G75Dose > 8) {
        G75Dose = 8;
      }
      L75Volume = L75Dose / 4;
      G75Volume = G75Dose / 4;

      console.log("Selected protocol name:", protocolName);
      $("#result")
        .html(
          `
        <h2><u>Adult</u><br> ${protocolName} 
        
         <br><br>≤ 75 Years of Age Dose:
        </h2>
        <p><strong>
        ${L75Dose.toFixed(2)}mg IV/IO or IM/SQ <u>slow</u> push.</strong><br>
        <small>(Method: 0.1mg/kg x ${weightInput.toFixed(
          2
        )}kg with a max of 8mg)</small>
        <br><br>
        <strong> ≤ 75 Years of age Volume to Administer</strong><br><br>
        ${L75Volume.toFixed(2)}ml<br>
        <small>(For concentrations of 4mg/ml)</small>
        <br><br>
        <i>May repeat dose x1 after 10-15 minutes if needed.</i>
        </p>
         <h2>> 75 Years of Age Dose:</h2>
         <p>
        <strong>
        ${G75Dose.toFixed(2)}mg IV/IO or IM/SQ <u>slow</u> push.<br></strong>
        <small>(Method: 0.05mg/kg x ${weightInput.toFixed(
          2
        )}kg with a max of 8mg)</small>
        <br><br>
        <strong> > 75 Years of age Volume to Administer</strong><br><br>
        ${G75Volume.toFixed(2)}ml<br>
        <small>(For concentrations of 4mg/ml)</small>
        <br><br>

        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }
  });
  //END ADULT

  //START PEDIATRIC DOSAGE CALCULATION
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

    const protocolSelected = $('input[name="Pediprotocol"]:checked').val();
    console.log("Selected pediatric protocol:", protocolSelected);

    if (protocolSelected === "pPain") {
      let pediDose = pediWeightInput * 0.1;
      if (pediDose > 5) {
        pediDose = 5;
      }
      pediVolume = pediDose / 4;

      $("#resultPedi")
        .html(
          `
        <h2><u>Pediatric</u><br>Pain Management;
        </h2>
        <p><strong> IV/IO/IM Dosage: </strong> ${pediDose.toFixed(2)}mg<br>
        <small>(Method: 0.1mg/kg x ${pediWeightInput.toFixed(
          2
        )}kg with a max of 5mg)</small>
        <br><br>
        <strong>Volume to Administer: </strong>
        ${pediVolume.toFixed(2)}ml<br>
        <small>(For concentrations of 4mg/ml)</small>
        <br><br>
        <i>May repeat dose x1 after 15 minutes if needed.</i><br><br>
        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }
  });
});
