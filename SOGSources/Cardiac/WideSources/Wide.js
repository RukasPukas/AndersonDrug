$(function () {
  $("body").hide().fadeIn(750);

  const weightInput = document.getElementById("weightSelect");
  const weightSelectedSpan = document.getElementById("weightSelected");
  const lidocaineSelectedSpan = document.getElementById("LidocaineSpot");
  const lidocaineRepeatSelectedSpan = document.getElementById(
    "LidocaineRepeatSpot"
  );
  const etomidateSpan = document.getElementById("etomidateSpot");

  function updateAll(weightLbs) {
    if (!weightLbs || isNaN(weightLbs)) {
      weightSelectedSpan.textContent = "";
      lidocaineSelectedSpan.textContent = "";
      lidocaineRepeatSelectedSpan.textContent = "";
      etomidateSpan.textContent = "";
      return;
    }

    const kg = weightLbs * 0.45359237;

    weightSelectedSpan.textContent = `Selected Weight: ${weightLbs} lbs (${kg.toFixed(
      1
    )} kgs)`;

    //initial lidocaine
    lidocaineLowDose = kg * 1;
    lidocaineHighDose = kg * 1.5;
    lidocaineSelectedSpan.textContent = `≈ ${lidocaineLowDose.toFixed(
      2
    )}mg - ${lidocaineHighDose.toFixed(2)}mg`;

    //repeat lidocaine
    lidocaineRepeatDose = kg * 0.75;
    lidocaineRepeatSelectedSpan.textContent = `≈ ${lidocaineRepeatDose.toFixed(
      2
    )}mg`;

    //Etomidate Dose
    let etomidate = kg * 0.1;
    if (etomidate > 10) etomidate = 10;
    etomidateVol = etomidate / 2;
    etomidateSpan.textContent = `≈ (${etomidate.toFixed(
      2
    )}mg, ${etomidateVol.toFixed(2)}ml )`;
  }

  weightInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
    if (this.value.length > 3) this.value = this.value.slice(0, 3);
    const lbs = this.value ? parseInt(this.value, 10) : NaN;
    updateAll(lbs);
  });
  const init = weightInput.value
    ? parseInt(weightInput.value.replace(/\D/g, ""), 10)
    : NaN;
  if (!isNaN(init)) updateAll(init);
});
