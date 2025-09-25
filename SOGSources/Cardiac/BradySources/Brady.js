$(function () {
  $("body").hide().fadeIn(750);

  const weightInput = document.getElementById("weightSelect");
  const weightSelectedSpan = document.getElementById("weightSelected");
  const ketamineSpan = document.querySelector(".KetamineDose");

  const IVIOIMKetIntDoseSpan = document.querySelector(".IVIOIMKetIntDose");
  const INKetIntDoseSpan = document.querySelector(".INKetIntDose");

  function updateAll(weightLbs) {
    if (!weightLbs || isNaN(weightLbs)) {
      ketamineSpan.textContent = "";
      weightSelectedSpan.textContent = "";

      return;
    }

    const kg = weightLbs * 0.45359237;

    weightSelectedSpan.textContent = `Selected Weight: ${weightLbs} lbs (${kg.toFixed(
      1
    )} kgs)`;

    // Ketamine Initial: 0.2 mg/kg slow IV/IO/IM or 0.5 mg/kg IN, max single dose 20 mg, may repeat x3 for a max total dose 50 mg
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

    ketamineRepeatDoseIVIOIM = 50 - ketIntIVIOIM;
    if (ketamineRepeatDoseIVIOIM <= 0) {
      ketamineRepeatDoseIVIOIM = "No Repeat Dose Max Reached";
    }
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
