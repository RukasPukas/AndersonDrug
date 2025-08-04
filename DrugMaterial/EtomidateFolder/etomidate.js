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

    let dosage;
    let volume;
    if (protocol === "cardioversion") {
      dosage = weightInput * 0.1;
      if (dosage > 10) {
        dosage = 10;
      }

      volume = dosage / 2; // ✅ move this *outside* the if-block

      $("#result")
        .html(
          `
            <h2>Etomidate<br> <u>Synchronized Cardioversion</u></h2>
      
            <p><strong>Dosage: ${dosage.toFixed(2)}mg</strong>
            <br><small>Method: (${weightInput.toFixed(
              2
            )}kgs x 0.1 mg/kg MAX: 10mg)</small>
            
            <br><br>
            <strong>Volume: ${volume.toFixed(2)}mL</strong><br>
            <small>(For concentrations of 20mg per 10ml)</small>
            <br><br>
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

    if (protocol === "intubation") {
      dosage = weightInput * 0.3;
      volume = dosage / 2;
      $("#result")
        .html(
          `
        <h2>Etomidate<br> <u>Assisted Intubation</u></h2>

        <p><strong>Dosage: ${dosage.toFixed(2)}mg</strong>
        <br><small>Method: (${weightInput.toFixed(2)}kgs x 0.3 mg/kg)</small>
        
        <br><br>
        <strong>Volume: ${volume.toFixed(2)}mL</strong><br>
        <small>(For concentrations of 20mg per 10ml)</small>
        <br><br>
                <i
          ><small
            >If uncertainty arises, consult Anderson Protocols or contact
            Medical Control. Always check dosages and concentrations prior to
            administration.</small
          ></i
        >
        </p>
      `
        )
        .fadeIn(200);
    }
  });
});
