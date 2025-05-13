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

    let dosage = weightInput * 10;
    if (dosage > 800) {
      dosage = 800;
    }

    $("#result")
      .html(
        `
        <h1>Ibueprofen</h1>
        <h2>Altitude Illness; Pain Management</h2>
        <p>
        <strong>Dosage: ${dosage}</strong>mg
        <br>
        <small>(Method: 10mg x weight in kg | Max: 800mg)</small>
        <br>
        <br>
        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.</small></i>
        </p>
      `
      )
      .fadeIn(200);
  });
});
