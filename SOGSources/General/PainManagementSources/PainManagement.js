$(function () {
  $("body").hide().fadeIn(750);


  const weightInput = document.getElementById("weightSelect");
  const weightSelectedSpan = document.getElementById("weightSelected");
  const ketamineSpan = document.querySelector(".KetamineDose");
  const fentanylSpan = document.querySelector(".FentanylDose");
  const AcetaminophenSpan = document.querySelector(".AcetaminophenDose");
  const IbuprofenSpan = document.querySelector(".IbuprofenDose");
  const MorphineAdultDoseSpan = document.querySelector(".MorphineAdultDose");
  const MorphineGeriDoseSpan = document.querySelector(".MorphineGeriDose");
  const FentanylAdultInitialDoseSpan = document.querySelector(".fentAdultInitialDose");
  const FentanylAdultRepeatDoseSpan = document.querySelector(".fentAdultRepeatDose");
  const FentanylGeriInitialDoseSpan = document.querySelector(".fentGeriInitialDose");
  const FentanylGeriRepeatDoseSpan = document.querySelector(".fentGeriRepeatDose");
  const IVIOIMKetIntDoseSpan = document.querySelector(".IVIOIMKetIntDose");
  const INKetIntDoseSpan = document.querySelector(".INKetIntDose");

  function updateAll(weightLbs) {
    if (!weightLbs || isNaN(weightLbs)) {
      ketamineSpan.textContent = "";
      fentanylSpan.textContent = "";
      AcetaminophenSpan.textContent = "";
      IbuprofenSpan.textContent = "";
      weightSelectedSpan.textContent = "";
      MorphineAdultDoseSpan.textContent = "";
      MorphineGeriDoseSpan.textContent = "";
      FentanylAdultInitialDoseSpan.textContent = "";
      FentanylAdultRepeatDoseSpan.textContent = "";
      FentanylGeriInitialDoseSpan.textContent = "";
      FentanylGeriRepeatDoseSpan.textContent = "";
      return;
    }

    const kg = weightLbs * 0.45359237;

    weightSelectedSpan.textContent = `Selected Weight: ${weightLbs} lbs (${kg.toFixed(
      1
    )} kgs)`;

    // Acetaminophen: 15 mg/kg (max 1000 mg) 
    let aceDose = kg * 15;
    if (aceDose > 1000) aceDose = 1000;
    AcetaminophenSpan.textContent = `≈ ${aceDose.toFixed(1)} mg `;

    //Ibuprofen: 10 mg/kg (max 800 mg)
    let ibuDose = kg * 10;
    if (ibuDose > 800) ibuDose = 800;
    IbuprofenSpan.textContent = `≈ ${ibuDose.toFixed(1)} mg `;

    //Morphine Adult Dose: 0.1 mg/kg (max 8mg)
    let morphDose = kg * 0.1;
    if (morphDose > 8) morphDose = 8;
    let morphVol = morphDose / 4;
    MorphineAdultDoseSpan.textContent = `≈ ${morphDose.toFixed(1)} mg (${morphVol.toFixed(1)} mL at 4 mg/mL)`;

    //Morphine Geri Dose: 0.05 mg/kg (max 8mg)
    let morphGeriDose = kg * 0.05;
    if (morphGeriDose > 8) morphGeriDose = 8;
    let morphGeriVol = morphGeriDose / 4;
    MorphineGeriDoseSpan.textContent = `≈ ${morphGeriDose.toFixed(1)} mg (${morphGeriVol.toFixed(1)} mL at 4 mg/mL)`;

    // Fentanyl Adult: initial 1 mcg/kg (max 100), repeat 0.5 mcg/kg (max 50) @ 50 mcg/mL
    let fentInit = kg * 1;
    if (fentInit > 100) fentInit = 100;
    const fentInitVol = fentInit / 50;
    FentanylAdultInitialDoseSpan.textContent =
      `≈ ${fentInit.toFixed(2)} mcg (${fentInitVol.toFixed(
        2
      )} mL at 50 mcg/mL) initial, ` 
    
    let fentRep = kg * 0.5;
    if (fentRep > 50) fentRep = 50;
    const fentRepVol = fentRep / 50;
    FentanylAdultRepeatDoseSpan.textContent =
      `repeat ≈ ${fentRep.toFixed(2)} mcg (${fentRepVol.toFixed(2)} mL at 50 mcg/mL)`;

    // Fentanyl Geri: initial 0.5 mcg/kg (max 50), repeat 0.5 mcg/kg (max 25) @ 50 mcg/mL
    let fentGeriInit = kg * 0.5;
    if (fentGeriInit > 50) fentGeriInit = 50;
    const fentGeriInitVol = fentGeriInit / 50;
    FentanylGeriInitialDoseSpan.textContent =
      `≈ ${fentGeriInit.toFixed(2)} mcg (${fentGeriInitVol.toFixed(
        1
      )} mL at 50 mcg/mL) initial, `
    let fentGeriRep = kg * 0.5;
    if (fentGeriRep > 25) fentGeriRep = 25;
    const fentGeriRepVol = fentGeriRep / 50;
    FentanylGeriRepeatDoseSpan.textContent =
      `repeat ≈ ${fentGeriRep.toFixed(2)} mcg (${fentGeriRepVol.toFixed(2)} mL at 50 mcg/mL)`;
    
    // Ketamine Initial: 0.2 mg/kg slow IV/IO/IM or 0.5 mg/kg IN, max single dose 20 mg, may repeat x3 for a max total dose 50 mg
    let ketIntIVIOIM = kg * 0.2;
    if (ketIntIVIOIM > 20) ketIntIVIOIM = 20;
    let ketIntIN = kg * 0.5;
    if (ketIntIN > 20) ketIntIN = 20;
    let ketIntIVIOIMVol = ketIntIVIOIM / 50;
    let ketIntINVol = ketIntIN / 50;
    
    IVIOIMKetIntDoseSpan.textContent = `≈ ${ketIntIVIOIM.toFixed(2)} mg IV/IO/IM (${ketIntIVIOIMVol.toFixed(2)} mL at 50 mg/mL)`;
    INKetIntDoseSpan.textContent = `≈ ${ketIntIN.toFixed(2)} mg IN (${ketIntINVol.toFixed(2)} mL at 50 mg/mL)`;

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
