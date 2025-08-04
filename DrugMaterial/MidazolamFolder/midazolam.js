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

    if (protocolSelected === "Agitated") {
      $("#result")
        .html(
          `
        <h2><u>Adult</u><br> Agitated or Violent Patient/Behavioral Emergencies; 
        </h2>
        <p> <strong>IV/IM: 5 mg;</strong><br>
        <br>Onset IV: 3-5 min; IM: 10-15 min;<br>
        <br> May repeat after max onset up to a maximum total dose of 10 mg.
        <br><br>


        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }

    if (
      protocolSelected === "brady" ||
      protocolSelected === "regulartachy" ||
      protocolSelected === "irregulartachy" ||
      protocolSelected === "tachywide" ||
      protocolSelected === "acs" ||
      protocolSelected === "hyperthermia"
    ) {
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
        <p> 2 mg IV/IN/IO <br><br>
        Repeat every 5 minutes as needed to maintain sedation.
        <br><br>

        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }
    if (protocolSelected === "intubation") {
      console.log("protocolSelected: ", protocolSelected);
      let initialDosage = 0.1 * weightInput;
      let repeatDosage = 0.05 * weightInput;

      if (initialDosage > 10) {
        initialDosage = 10;
      }
      if (repeatDosage > 10) {
        repeatDosage = 10;
      }
      $("#result")
        .html(
          `
        <h2><u>Adult</u><br>Assisted (Medication) Intubation;
        </h2>
        <p> <strong> Initial Dose: </strong>${initialDosage.toFixed(
          2
        )}mg IV/IO <br>
        <small>(Method: 0.1mg/kg x ${weightInput.toFixed(
          2
        )}kg with a max of 10mg)</small>
        <br><br>
        <strong> Initial Volume: </strong>${initialDosage.toFixed(2)}mL <br>
        <small>(For concentrations of 1mg/1ml)</small>
        <br><br>
        <strong> Post-Intubation Dose: </strong>${repeatDosage.toFixed(
          2
        )}mg IV/IO <br>
        <small>(Method: 0.05mg/kg x ${weightInput.toFixed(
          2
        )}kg. May repeat every 3-5 minutes for a cumulative total of 10mg)</small>
        <br>
        <br><strong> Post-Intubation Volume: </strong>${repeatDosage.toFixed(
          2
        )}mL <br>
        <small>(For concentrations of 1mg/1ml)</small>
        <br><br>

        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }
    if (protocolSelected === "seizure") {
      console.log("Protocol selected: ", protocolSelected);
      let seizureIVDosage = 0.1 * weightInput;
      if (seizureIVDosage > 5) {
        seizureIVDosage = 5;
      }
      let seizureIMDosage = 0.2 * weightInput;
      if (seizureIMDosage > 10) {
        seizureIMDosage = 10;
      }
      $("#result")
        .html(
          `
        <h2><u>Adult</u><br>Seizure / Status Epilepticus;
        </h2>
        <p> 
        <strong>IV/IO Dosage: </strong> ${seizureIVDosage.toFixed(2)}mg<br>
        <small>(Method: 0.1mg/kg x ${weightInput.toFixed(
          2
        )}kg with a max of 5mg)</small>
        <br><br>
         May Repeat <strong><u>IV/IO</u></strong> dosage after 5 minutes if seizures persist.
         <br><br>
        <strong>IM Dosage: </strong> ${seizureIMDosage.toFixed(2)}mg<br>
        <small>(Method: 0.2mg/kg x ${weightInput.toFixed(
          2
        )}kg with a max of 10mg)</small>
        <br><br>
        <strong>IN Dosage: </strong> ${seizureIMDosage.toFixed(2)}mg<br>
        <small>(Method: 0.2mg/kg x ${weightInput.toFixed(
          2
        )}kg with a max of 10mg)</small>
        <br><br>
        Intra Nasal (IN) route only administer a max of <strong>5ml</strong> per nostril.
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

    if (protocolSelected === "pBehavior") {
      let behavioralDose = 0.1 * pediWeightInput;
      if (behavioralDose > 5) {
        behavioralDose = 5;
      }
      $("#resultPedi")
        .html(
          `
        <h2><u>Pediatric</u><br>Behavioral Emergencies;
        <br><br><u>MEDICAL CONTROL MUST AUTHORIZE</u>
        </h2>
        <p> <strong>IV/IM/IN: </strong>${behavioralDose.toFixed(2)}mg<br>
        <small>(Method: 0.1mg/kg x ${pediWeightInput.toFixed(
          2
        )}kg with a max of 5mg)</small>
        <br><br>

        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }
    if (protocolSelected === "pSeizure") {
      console.log("Protocol selected: ", protocolSelected);
      let seizureIVDosageFive = 0.1 * pediWeightInput;
      if (seizureIVDosageFive > 5) {
        seizureIVDosageFive = 5;
      }
      let seizureIVDosageTen = 0.1 * pediWeightInput;
      if (seizureIVDosageTen > 10) {
        seizureIVDosageTen = 10;
      }
      seizureIMDosage = 0.2 * pediWeightInput;
      if (seizureIMDosage > 10) {
        seizureIMDosage = 10;
      }
      $("#resultPedi")
        .html(
          `
        <h2><u>Pediatric</u><br>Seizure;
        </h2>
        <p><strong> IV/IO Dosage for pediatrics less than or equal to 5 years old: </strong> ${seizureIVDosageFive.toFixed(
          2
        )}mg<br>
        <small>(Method: 0.1mg/kg x ${pediWeightInput.toFixed(
          2
        )}kg with a max of 5mg)</small>
        <br><br>
          <strong>IV/IO Dosage for pediatrics greater than 5 years old: </strong> ${seizureIVDosageTen.toFixed(
            2
          )}mg<br>
        <small>(Method: 0.1mg/kg x ${pediWeightInput.toFixed(
          2
        )}kg with a max of 10mg)</small>
        <br><br>
        <strong>IM Dosage: </strong> ${seizureIMDosage.toFixed(2)}mg<br>
        <small>(Method: 0.2mg/kg x ${pediWeightInput.toFixed(
          2
        )}kg with a max of 10mg)</small>
        <br><br>
        <strong>IN Dosage: </strong> ${seizureIMDosage.toFixed(2)}mg<br>
        <small>(Method: 0.2mg/kg x ${pediWeightInput.toFixed(
          2
        )}kg with a max of 10mg)<br>
        (Maximum of 1ml per nostril)</small>
          <br><br>
        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }
    if (protocolSelected === "pHyperthermia") {
      console.log("Protocol selected: ", protocolSelected);
      let hyperthermiaIVDosage = 0.1 * pediWeightInput;
      if (hyperthermiaIVDosage > 1) {
        hyperthermiaIVDosage = 1;
      }
      hyperthermiaIMDosage = 0.2 * pediWeightInput;
      if (hyperthermiaIMDosage > 1) {
        hyperthermiaIMDosage = 1;
      }
      $("#resultPedi")
        .html(
          `
        <h2><u>Pediatric</u><br>Environmental Hyperthermia;
        </h2>
        <p><strong> IV/IO Dosage: </strong> ${hyperthermiaIVDosage.toFixed(
          2
        )}mg<br>
        <small>(Method: 0.1mg/kg x ${pediWeightInput.toFixed(
          2
        )}kg with a max of 1mg)</small>
        <br><br>
        <strong>IM/IN Dosage: </strong> ${hyperthermiaIMDosage.toFixed(2)}mg<br>
        <small>(Method: 0.2mg/kg x ${pediWeightInput.toFixed(
          2
        )}kg with a max of 1mg)</small>
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
