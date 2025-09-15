$(function () {
  $("body").hide().fadeIn(750);

  const weightInput = document.getElementById("weightSelect");
  const etomidateSpan = document.querySelector(".EtomidateDose");
  const ketamineSpan = document.querySelector(".KetamineDose");
  const fentanylSpan = document.querySelector(".FentanylDose");
  const midazolamSpan = document.querySelector(".MidazolamDose");
  const postKetSpan = document.querySelector(".PostKetamineDose");
  const weightSelectedSpan = document.getElementById("weightSelected");

  function updateAll(weightLbs) {
    if (!weightLbs || isNaN(weightLbs)) {
      etomidateSpan.textContent = "";
      ketamineSpan.textContent = "";
      fentanylSpan.textContent = "";
      midazolamSpan.textContent = "";
      postKetSpan.textContent = "";
      weightSelectedSpan.textContent = "";
      return;
    }

    const kg = weightLbs * 0.45359237;

    weightSelectedSpan.textContent = `Selected Weight: ${weightLbs} lbs (${kg.toFixed(
      1
    )} kgs)`;

    // Etomidate: 0.3 mg/kg @ 2 mg/mL
    const etomidateDose = +(kg * 0.3).toFixed(1);
    const etomidateVol = +(etomidateDose / 2).toFixed(2);
    etomidateSpan.textContent = `≈ ${etomidateDose} mg (${etomidateVol} mL at 2 mg/mL)`;

    // Ketamine 2 mg/kg (max 200 mg) @ 50 mg/mL
    let ketDose = kg * 2;
    if (ketDose > 200) ketDose = 200;
    const ketVol = ketDose / 50;
    ketamineSpan.textContent = `≈ ${ketDose.toFixed(1)} mg (${ketVol.toFixed(
      1
    )} mL at 50 mg/mL)`;

    // Fentanyl: initial 1 mcg/kg (max 100), repeat 0.5 mcg/kg (max 50) @ 50 mcg/mL
    let fentInit = kg * 1;
    if (fentInit > 100) fentInit = 100;
    let fentRep = kg * 0.5;
    if (fentRep > 50) fentRep = 50;
    const fentInitVol = fentInit / 50;
    const fentRepVol = fentRep / 50;
    fentanylSpan.textContent =
      `≈ ${fentInit.toFixed(1)} mcg (${fentInitVol.toFixed(
        1
      )} mL at 50 mcg/mL) initial, ` +
      `repeat ≈ ${fentRep.toFixed(1)} mcg (${fentRepVol.toFixed(
        1
      )} mL at 50 mcg/mL)`;

    // Midazolam: 0.05 mg/kg per dose (max 10 mg total) @ 1 mg/mL
    let midazDose = kg * 0.05;
    if (midazDose > 10) midazDose = 10;
    midazolamSpan.textContent =
      `≈ ${midazDose.toFixed(2)} mg per dose (max 10 mg total) ` +
      `(${midazDose.toFixed(2)} mL at 1 mg/mL)`;

    // Post-intubation Ketamine: 1 mg/kg; may repeat x1; max combined 200 mg @ 50 mg/mL
    let postInit = kg * 1;
    if (postInit > 200) postInit = 200;
    let postRep = kg * 1;
    if (postRep > 200 - postInit) postRep = 200 - postInit;
    const postInitVol = postInit / 50;
    const postRepVol = postRep / 50;
    postKetSpan.textContent =
      `≈ ${postInit.toFixed(1)} mg (${postInitVol.toFixed(2)} mL) initial, ` +
      `may repeat ≈ ${postRep.toFixed(1)} mg (${postRepVol.toFixed(
        2
      )} mL at 50 mg/mL) ` +
      `(max combined 200 mg)`;
  }

  // enforce digits-only + max 3 chars, then update
  weightInput.addEventListener("input", function () {
    // keep only digits
    this.value = this.value.replace(/\D/g, "");
    // limit to 3 chars
    if (this.value.length > 3) this.value = this.value.slice(0, 3);
    // update outputs
    const lbs = this.value ? parseInt(this.value, 10) : NaN;
    updateAll(lbs);
  });

  // initialize if there’s a prefilled value
  const init = weightInput.value
    ? parseInt(weightInput.value.replace(/\D/g, ""), 10)
    : NaN;
  if (!isNaN(init)) updateAll(init);
});
