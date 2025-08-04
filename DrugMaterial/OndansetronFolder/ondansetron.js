$(document).ready(function () {
  $("body").fadeIn(750);

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
    let pediDosage = pediWeightInput * 0.15;
    console.log("Calculated dosage:", pediDosage);

    if (pediDosage > 4) {
      pediDosage = 4;
      console.log("Adjusted dosage to max:", pediDosage);
    }
    pediVolume = pediDosage / 2;
    console.log("Calculated volume:", pediVolume);

    $("#resultPedi")
      .html(
        `
        <h2><u>Pediatric</u><br>Pediatric Nausea/Vomiting;<br><br>
        <i>6 months old - 4 years old</i><br><br><u>MEDICAL CONTROL MUST AUTHORIZE</u></h2>
        
        <p><strong>Suggested IV/IM Dosage: </strong> ${pediDosage.toFixed(
          2
        )}mg<br>
        <small>(Method: 0.15mg/kg x ${pediWeightInput.toFixed(
          2
        )}kg with a max of 4mg)</small><br><br>
        <strong>Suggested IV/IM Volume: </strong> ${pediVolume.toFixed(2)}ml

        <br><br>
        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.
        </small></i>
         </p>
            
        `
      )
      .fadeIn(200);
  });
});
