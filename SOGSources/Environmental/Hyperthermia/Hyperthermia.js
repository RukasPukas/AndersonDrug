$(function () {
  $("body").hide().fadeIn(750);

  const weightInput = document.getElementById("weightSelect");
  const weightSelectedSpan = document.getElementById("weightSelected");
  const diazepamSpan = document.getElementById("DiazeapamDose");

  function updateAll(weightLbs) {
    if (!weightLbs || isNaN(weightLbs)) {
      
      weightSelectedSpan.textContent = "";
      diazepamSpan.textContent = "";
      return;
    }

    const kg = weightLbs * 0.45359237;

    weightSelectedSpan.textContent = `Selected Weight: ${weightLbs} lbs (${kg.toFixed(
      1
    )} kgs)`;


    //Begin Diazepam IV Calculations
    let diazepamDosage = kg * 0.1;
    if (diazepamDosage > 5) diazepamDosage = 5;
    let diazepamVolume = diazepamDosage / 5;

    diazepamSpan.textContent = `≈ ${diazepamDosage.toFixed(
      2
    )} mg IV (${diazepamVolume.toFixed(2)} mL at 5 mg/mL)`;
    //End Diazepam IV Calculations
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
