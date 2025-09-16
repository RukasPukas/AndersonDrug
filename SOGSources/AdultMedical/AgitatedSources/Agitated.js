$(function () {
  $("body").hide().fadeIn(750);


  const weightInput = document.getElementById("weightSelect");
  const weightSelectedSpan = document.getElementById("weightSelected");
  const ketamineSpan = document.querySelector(".KetamineDose");


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

    let ketamineDosage = kg * 4;
    if (ketamineDosage > 400) ketamineDosage = 400;
    let ketamineVolume = ketamineDosage / 50;

ketamineSpan.textContent = `≈ ${ketamineDosage.toFixed(2)} mg IM (${ketamineVolume.toFixed(2)} mL at 50 mg/mL)`;
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
