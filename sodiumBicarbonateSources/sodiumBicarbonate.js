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

    const selectedRadio = $('input[name="protocol"]:checked');
    const protocolName = selectedRadio.parent().text().trim().replace(/;$/, "");

    console.log("Selected protocol name:", protocolName);
    if (
      protocolSelected === "CA" ||
      protocolSelected === "Poisoning" ||
      protocolSelected === "DKA"
    ) {
      let dosage = weightInput * 1;
      if (dosage > 50) {
        dosage = 50;
      }
      console.log("Calculated dosage:", dosage);

      $("#result")
        .html(
          `
        <h2><u>Adult</u><br> ${protocolName} 
        </h2>
        <p>${dosage.toFixed(2)}mEq IV/IO <br>
        <small>(Method 1mEq x ${weightInput.toFixed(2)}kg MAX 50)</small>
        <br><br>

        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }
    if (protocolSelected === "Crush") {
      let dosage = weightInput * 1;
      if (dosage > 50) {
        dosage = 50;
      }
      console.log("Calculated dosage:", dosage);

      $("#result")
        .html(
          `
        <h2><u>Adult</u><br> ${protocolName} 
        </h2>
        <p>${dosage.toFixed(2)}mEq IV/IO <br>
        <small>(Method 1mEq x ${weightInput.toFixed(2)}kg MAX 50)</small>
        <br><br>
        <strong><i>Note: </strong></i>
        <br><br>
          a. Should be given for significant crush injuries or
  prolonged entrapment of an extremity.
  <br><br>b. Should be given over 5 minute just PRIOR to the
  release of the crushed body part.
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

    if (protocolSelected === "pPoison") {
      let dosage = pediWeightInput * 1;
      if (dosage > 50) {
        dosage = 50;
      }
      console.log("Calculated dosage:", dosage);

      $("#resultPedi")
        .html(
          `
        <h2><u>Pediatric<br>Poisoning / Overdose;<br>MEDICAL CONTROL MUST AUTHORIZE</u>
        </h2>
        <p>${dosage.toFixed(2)}mEq IV/IO <br>
        <small>(Method 1mEq x ${pediWeightInput.toFixed(2)}kg MAX 50)</small>
        <br><br>

        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }
    if (protocolSelected === "pCrush") {
      let dosage = pediWeightInput * 1;
      if (dosage > 50) {
        dosage = 50;
      }
      console.log("Calculated dosage:", dosage);

      $("#resultPedi")
        .html(
          `
        <h2><u>Pediatric<br>Crush Injuries<br>MEDICAL CONTROL MUST AUTHORIZE</u>
        </h2>
        <p>${dosage.toFixed(2)}mEq IV/IO <br>
        <small>(Method 1mEq x ${pediWeightInput.toFixed(2)}kg MAX 50)</small>
        <br><br>
        <strong><i>Note: </strong></i>
        <br><br>
          a. Should be given for significant crush injuries or
  prolonged entrapment of an extremity.
  <br><br>b. Should be given over 5 minute just PRIOR to the
  release of the crushed body part.
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
  //END WEIGHT GATHERING
});
