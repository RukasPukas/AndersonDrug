$(function () {
  $("body").hide().fadeIn(750);

  const weightInput = document.getElementById("weightSelect");
  const weightSelectedSpan = document.getElementById("weightSelected");
  const midazolamSpan = document.querySelector(".MidazolamDose");
  const lorazepamSpan = document.querySelector(".LorazepamDose");
  const midazolamIVSpan = document.querySelector(".MidazolamIVDose");
  const lorazeapamIVSpan = document.querySelector(".LorazepamIVDose");
  const diazepamSpan = document.querySelector(".DiazeapamDose");

  function updateAll(weightLbs) {
    if (!weightLbs || isNaN(weightLbs)) {
      lorazepamSpan.textContent = "";
      midazolamSpan.textContent = "";
      midazolamIVSpan.textContent = "";
      lorazeapamIVSpan.textContent = "";
      diazepamSpan.textContent = "";
      weightSelectedSpan.textContent = "";

      return;
    }

    const kg = weightLbs * 0.45359237;

    weightSelectedSpan.textContent = `Selected Weight: ${weightLbs} lbs (${kg.toFixed(
      1
    )} kgs)`;

    //Begin Midazolam IM/IN Calculations
    let midazolamDosage = kg * 0.2;
    if (midazolamDosage > 10) midazolamDosage = 10;
    let midazolamVolume = midazolamDosage / 1;

    midazolamSpan.textContent = `≈ ${midazolamDosage.toFixed(
      2
    )} mg IM/IN (${midazolamVolume.toFixed(2)} mL at 1 mg/mL)`;
    //End Midazolam IM/IN Calculations
    //Begin Midazolam IV Calculations
    let midazolamIVDosage = kg * 0.1;
    if (midazolamIVDosage > 5) midazolamIVDosage = 5;
    let midazolamIVVolume = midazolamIVDosage / 1;

    midazolamIVSpan.textContent = `≈ ${midazolamIVDosage.toFixed(
      2
    )} mg IV (${midazolamIVVolume.toFixed(2)} mL at 1 mg/mL)`;
    //End Midazolam IV Calculations

    //Begin Lorazepam IM Calculations
    let lorazepamDosage = kg * 0.1;
    if (lorazepamDosage > 4) lorazepamDosage = 4;
    lorazepamSpan.textContent = `≈ ${lorazepamDosage.toFixed(2)} mg IM`;
    lorazeapamIVSpan.textContent = `≈ ${lorazepamDosage.toFixed(2)} mg IV`;
    //End Lorazepam IM Calculations

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
