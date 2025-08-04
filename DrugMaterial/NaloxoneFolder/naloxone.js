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
    pediatricDosage = pediWeightInput * 0.01;
    console.log("Pediatric dosage:", pediatricDosage);
    if (pediWeightInput > 20) {
      pediatricDosage = 2;
    }
    $("#resultPedi")
      .html(
        `
        <h2><u>Pediatric</u><br>Pediatric Toxic Exposures/Ingestions;<br>
        Pediatric Altered Mental Status;
        </h2>
        <p><strong> IV/IO/IM/IN Dosage: </strong> ${pediatricDosage.toFixed(
          2
        )}mg<br>
        <small>(Method: 0.1mg/kg x ${pediWeightInput.toFixed(
          2
        )}kg with a max of 2mg)</small><br><br>
        <i>IN DOSAGE IS NOT TO EXCEED 1ml PER NOSTRIL</i>
        <br><br><i>REPEAT DOSAGES MAY BE NEEDED</i>
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
