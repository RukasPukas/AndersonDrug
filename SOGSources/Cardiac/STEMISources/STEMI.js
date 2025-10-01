$(function () {
  $("body").hide().fadeIn(750);

  const weightInput = document.getElementById("weightSelect");
  const weightSelectedSpan = document.getElementById("weightSelected");
  const IVIOIMKetIntDoseSpan = document.querySelector(".IVIOIMKetIntDose");
  const INKetIntDoseSpan = document.querySelector(".INKetIntDose");
  const fentRepeat = document.querySelector(".fentRepeat");
  const fentGeriRepeat = document.querySelector(".fentGeriRepeat");
  const diazepamSpan = document.querySelector(".DiazepamDose");

  const FentanylAdultInitialDoseSpan = document.querySelector(
    ".fentAdultInitialDose"
  );

  const FentanylGeriInitialDoseSpan = document.querySelector(
    ".fentGeriInitialDose"
  );

  function updateAll(weightLbs) {
    if (!weightLbs || isNaN(weightLbs)) {
      weightSelectedSpan.textContent = "";
      FentanylAdultInitialDoseSpan.textContent = "";
      FentanylGeriInitialDoseSpan.textContent = "";

      return;
    }

    const kg = weightLbs * 0.45359237;

    weightSelectedSpan.textContent = `Selected Weight: ${weightLbs} lbs (${kg.toFixed(
      1
    )} kgs)`;

    // Fentanyl Adult: initial 1 mcg/kg (max 100), repeat 0.5 mcg/kg (max 50) @ 50 mcg/mL
    let fentInit = kg * 1;
    if (fentInit > 100) fentInit = 100;
    const fentInitVol = fentInit / 50;
    FentanylAdultInitialDoseSpan.textContent = `≈ ${fentInit.toFixed(
      2
    )} mcg (${fentInitVol.toFixed(2)} mL at 50 mcg/mL)`;

    // Fentanyl Geri: initial 0.5 mcg/kg (max 50), repeat 0.5 mcg/kg (max 25) @ 50 mcg/mL
    let fentGeriInit = kg * 0.5;
    if (fentGeriInit > 50) fentGeriInit = 50;
    const fentGeriInitVol = fentGeriInit / 50;
    FentanylGeriInitialDoseSpan.textContent = `≈ ${fentGeriInit.toFixed(
      2
    )} mcg (${fentGeriInitVol.toFixed(1)} mL at 50 mcg/mL) initial `;

    // Ketamine Initial: 0.2 mg/kg slow IV/IO/IM or 0.5 mg/kg IN, max single dose 20 mg, may repeat x1 for a max total dose 50 mg
    let ketIntIVIOIM = kg * 0.2;
    if (ketIntIVIOIM > 20) ketIntIVIOIM = 20;
    let ketIntIN = kg * 0.5;
    if (ketIntIN > 20) ketIntIN = 20;
    let ketIntIVIOIMVol = ketIntIVIOIM / 50;
    let ketIntINVol = ketIntIN / 50;

    IVIOIMKetIntDoseSpan.textContent = `≈ ${ketIntIVIOIM.toFixed(
      2
    )} mg IV/IO/IM (${ketIntIVIOIMVol.toFixed(2)} mL at 50 mg/mL)`;
    INKetIntDoseSpan.textContent = `≈ ${ketIntIN.toFixed(
      2
    )} mg IN (${ketIntINVol.toFixed(2)} mL at 50 mg/mL)`;

    //FENTANYL REPEAT SECTION
    let fentRepeatDose = kg * 0.5;
    if (fentRepeatDose > 100) fentRepeatDose = 100;
    const fentRepeatVol = fentRepeatDose / 50;

    fentRepeat.textContent = `≈ ${fentRepeatDose.toFixed(
      2
    )} - ${fentInit.toFixed(2)}mcg (${fentRepeatVol.toFixed(
      2
    )} or ${fentInitVol.toFixed(2)}  mL at 50 mcg/mL) `;

    //FENTANYL GERIATRIC REPEAT SECTION
    let fentGeriRepeatDose = kg * 0.5;
    if (fentGeriRepeatDose > 25) fentGeriRepeatDose = 25;
    const fentGeriRepeatVol = fentGeriRepeatDose / 50;

    fentGeriRepeat.textContent = `≈ ${fentGeriRepeatDose.toFixed(
      2
    )}mcg (${fentGeriRepeatVol.toFixed(2)}mL at 50 mcg/mL) `;

    //DIAZEPAM DOSE
    let diazDose = kg * 0.1;
    if (diazDose > 5) diazDose = 5;
    let diazVol = diasDoxe *.2;
    diazepamSpan.textContent = `≈ ${diazDose.toFixed(2)}mg (${diazVol.toFixed(2)}mL at 5mg/mL) `;
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
