$(document).ready(function () {
  $("body").fadeIn(750);
});

const weightSelect = document.getElementById("weightSelect");
for (let i = 0; i <= 500; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = i + " lbs";
  weightSelect.appendChild(opt);
}
//Etomidate
const outputSpan = document.querySelector(".EtomidateDose");
weightSelect.addEventListener("change", function () {
  const weightLbs = parseInt(this.value, 10);
  const weightKg = weightLbs * 0.453592;
  const dose = (weightKg * 0.3).toFixed(1);
  const volume = (dose / 2).toFixed(2);
  outputSpan.textContent = `≈ ${dose} mg (${volume} mL at 2 mg/mL)`;
});
//Ketamine
const ketamineSpan = document.querySelector(".KetamineDose");
weightSelect.addEventListener("change", function () {
  const weightLbs = parseInt(this.value, 10);
  const weightKg = weightLbs * 0.453592;
  let dose = weightKg * 2;
  if (dose > 200) dose = 200;
  const concentration = 50; 
  const volume = dose / concentration;
  ketamineSpan.textContent = `≈ ${dose.toFixed(1)} mg (${volume.toFixed(1)} mL at 50mg/mL)`;
});

//Fentanyl
const fentanylSpan = document.querySelector(".FentanylDose");
weightSelect.addEventListener("change", function () {
  const weightLbs = parseInt(this.value, 10);
  const weightKg = weightLbs * 0.453592;
  let initialDose = weightKg * 1; 
  if (initialDose > 100) initialDose = 100; 
  let repeatDose = weightKg * 0.5; 
  if (repeatDose > 50) repeatDose = 50; 
  intVolume = initialDose / 50; 
  repVolume = repeatDose / 50;
  fentanylSpan.textContent = 
    `≈ ${initialDose.toFixed(1)} mcg (${intVolume.toFixed(1)} ml at 50mcg/mL) initial, repeat ≈ ${repeatDose.toFixed(2)} mcg (${repVolume.toFixed(2)} ml at 50mcg/mL)`;
});

//Midazolam
const midazolamSpan = document.querySelector(".MidazolamDose");
weightSelect.addEventListener("change", function () {
  const weightLbs = parseInt(this.value, 10);
  const weightKg = weightLbs * 0.453592;
  let dose = weightKg * 0.05; 
  if (dose > 10) dose = 10;  
  midazolamSpan.textContent = `≈ ${dose.toFixed(2)} mg per dose (max 10 mg total) (${dose.toFixed(2)} mL at 1 mg/mL)`;
});

//postIntubationKetamine 
const postKetamineSpan = document.querySelector(".PostKetamineDose");
weightSelect.addEventListener("change", function () {
  const weightLbs = parseInt(this.value, 10);
  if (isNaN(weightLbs)) return; // guard
  const weightKg = weightLbs * 0.453592;
  let initialDose = weightKg * 1;
  if (initialDose > 200) initialDose = 200;
  let repeatDose = weightKg * 1;
  if (repeatDose > 200 - initialDose) repeatDose = 200 - initialDose;
  const concentration = 50;
  const initialVolume = initialDose / concentration;
  const repeatVolume  = repeatDose  / concentration;
  postKetamineSpan.textContent =
    `≈ ${initialDose.toFixed(1)} mg (${initialVolume.toFixed(2)} mL) initial, ` +
    `may repeat ≈ ${repeatDose.toFixed(1)} mg (${repeatVolume.toFixed(2)} mL at 50mg / ml) ` +
    `(max combined 200 mg)`;
});
weightSelect.dispatchEvent(new Event('change'));
