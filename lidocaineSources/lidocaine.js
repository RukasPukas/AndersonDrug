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

    //Begin Adult Protocols
    const protocolSelected = $('input[name="protocol"]:checked').val();
    console.log("Selected protocol:", protocolSelected);

    if (protocolSelected === "Tachycardia") {
      console.log(protocolSelected);

      let lInitial = weightInput * 1;
      let hInitial = weightInput * 1.5;
      let repeat = weightInput * 0.75;

      if (lInitial > 1000) {
        alert("Please enter a valid weight");
        return;
      }
      if (hInitial > 1000) {
        alert("Please enter a valid weight");
        return;
      }
      if (repeat > 1000) {
        alert("Please enter a valid weight");
        return;
      }

      console.log("Dosage range is", lInitial, "-", hInitial, "mg/kg");
      console.log("Repeat Dosage is: ", repeat);

      $("#result")
        .html(
          `
        <h2><u>Adult</u><br> Tachycardia (with a Pulse) - Wide Complex; <br><br>
        Cardiac Arrest - (Vfib / Pulseless V-Tach);
        </h2>
        <p> <strong>Suggested <u>Initial</u> Dose Range:</strong> 
        <br>
        <br>
        ${lInitial.toFixed(2)}mg - ${hInitial.toFixed(2)}mg IV/IO
        <br>
        <small>(Method: ${weightInput}kg x 1mg/kg -<u>OR</u>- ${weightInput}kg x 1.5mg/kg)</small>
        <br>
        <br>
        <br>
        <br>
        <strong>Repeat Dosaging:</strong>
        <br>
        <br>
        <u>IF NEEDED</u> may repeat the following dosage x2 in 3-5 minute increments:
        <br>
        <br>${repeat.toFixed(2)}mg IV/IO
        <br>
        <small>(Method: ${weightInput.toFixed(2)}kg x 0.75mg/kg)</small>
        <br>
        <br>
        <br>
        <br>
        <strong>If Tachycardia Resolves With Bolus:</strong>
        <br>
        <br> Administer maintenance infusion at 2-4 mg/min.
        <br>
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
    if (protocolSelected === "Pain") {
      console.log(protocolSelected);

      $("#result")
        .html(
          `
        <h2><u>Adult</u><br>Intraosseous Access-Responsive To Pain</h2>
        <p> <strong>Suggested Dose:</strong> 
        <br>
        <br>
        <strong>40mg <br></strong>
        <small><i>Through IO insertion site, over 120 seconds.</i></small>
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

    if (protocolSelected === "Pain") {
      $("#resultPedi")
        .html(
          `
        <h2><u>Pediatric</u><br>Intraosseous Access-Responsive To Pain</h2>
        <p> <strong>Suggested Dose:</strong> 
        <br>
        <br>
        <strong>40mg <br></strong>
        <small><i>Through IO insertion site, over 120 seconds.</i></small>
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

    if (protocolSelected === "Tachycardia") {
      $("#resultPedi")
        .html(
          `
        <h2><u>
        Pediatric</u><br> Tachycardia (with a Pulse) - Wide Complex;
        <br>
        <br>
        Cardiac Arrest - (Vfib / Pulseless V-Tach);
        </h2>
        <p> <strong>Suggested Dose:</strong> 
        <br>
        <br>
        <strong>${pediWeightInput.toFixed(0)}mg IV/IO</strong>
        <br>
        <small>(Method: ${pediWeightInput}kgs x 1mg/kg)</small>
        <br><br>
        <strong>If Tachycardia Resolves With Bolus:</strong>
        <br><br>
        Maintenance infusion at 20-50 mcg/kg/min.
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
  });
});
