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

    const protocolSelected = $('input[name="protocol"]:checked').val();
    console.log("Selected protocol:", protocolSelected);

    if (protocolSelected === "Behavioral") {
      let agitatedDose = 2;
      console.log("Agitated dose:", agitatedDose);

      $("#result")
        .html(
          `
        <h2>Agitated or Violent Patient/Behavioral Emergencies:</h2>
        <p> <strong>Suggested Dosage:</strong> ${agitatedDose}mg IV/IM
        <br>
        <br>
        <small>NOTE: DO NOT EXCEED <strong>5ml</strong> PER IM INJECTION SITE</small>
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
      let agitatedDose = 2;
      console.log("Agitated dose:", agitatedDose);

      $("#result")
        .html(
          `
        <h2>Pain Management</h2>
        <p> <strong>Suggested Dosage:</strong> ${agitatedDose}mg IV/IM
        <br>
        <br>
        <small>NOTE: DO NOT EXCEED <strong>5ml</strong> PER IM INJECTION SITE</small>
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

    if (protocolSelected === "Seizure") {
      seizureDose = weightInput * 0.1;
      console.log("Seizure dose pre max check:", seizureDose);
      if (seizureDose > 4) {
        seizureDose = 4;
        console.log("Assisted intubation dose capped at 4:", seizureDose);
      }

      $("#result")
        .html(
          `
        <h2>Seizure Dose:</h2>
        <p><strong>Suggested Dosage IV/IO:</strong> ${seizureDose.toFixed(2)}mg
        <br>
        <small>(Method: 0.1mg x ${weightInput.toFixed(2)}kg MAX: 4mg)</small>
        <br>
        <br>
        <strong>-OR-</strong>
        <br>
        <br>
        <strong>Suggested Dosage IM: </strong>${seizureDose.toFixed(
          2
        )}mg <i>(Least desirable route)</i>
        <br>
        <small>(Method: 0.1mg x ${weightInput.toFixed(2)}kg MAX: 4mg)</small>
        <br>
        <br>
        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.</small></i>
         </p>
            
        `
        )
        .fadeIn(200);
    }
    if (protocolSelected === "postIntubation") {
      let postIntubationDose = weightInput * 1;
      console.log("Post Intubation dose:", postIntubationDose);
      if (postIntubationDose > 200) {
        postIntubationDose = 200;
        console.log("Post intubation dose capped at 200:", postIntubationDose);
      }
      let sedationVolume = postIntubationDose / 50;
      console.log("Post intubation volume:", postIntubationDose);
      $("#result")
        .html(
          `
            <h2>Post Intubation Sedation:</h2>
            <p><strong>Suggested Dosage IV/IO:</strong> ${postIntubationDose.toFixed(
              2
            )}mg
            <br>
            <small>(Method: 1mg x ${weightInput.toFixed(
              2
            )}kg MAX: 200mg)</small>
            <br>
            <br>
            <strong>Suggested Volume:</strong> ${sedationVolume.toFixed(2)}ml
            <br><small>(For Concentrations of 50mg per ml)
            <br>
            <br>
            <strong>NOTE:</strong> After 15 min. may repeat dose x1 from either route for a
            maximum combined dose of 200 mg.
            <br>
            <br>
            <small><i>Note: Always ensure amounts are accurate prior to administration. 
            Consult Anderson Protocols or Medical Control if uncertainty exists.</small></i>
             </p>
                
            `
        )
        .fadeIn(200);
    }
  });
});
