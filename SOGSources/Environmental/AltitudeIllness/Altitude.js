$(function () {
  $("body").hide().fadeIn(750);

  const weightInput = document.getElementById("weightSelect");
  const weightSelectedSpan = document.getElementById("weightSelected");
  const ibuprofenSpan = document.getElementById("IbuprofenDoseSpan");
  const acetaminophenSpan = document.getElementById("AcetaminophenDoseSpan");

  function updateAll(weightLbs) {
    if (!weightLbs || isNaN(weightLbs)) {
      weightSelectedSpan.textContent = "";
      ibuprofenSpan.textContent = "";
      acetaminophenSpan.textContent = "";

      return;
    }

    const kg = weightLbs * 0.45359237;

    weightSelectedSpan.textContent = `Selected Weight: ${weightLbs} lbs (${kg.toFixed(
      1
    )} kgs)`;

    //Ibuprofen Dosaging Section

    ibuprofenDose = 10 * kg;
    if (ibuprofenDose > 800) ibuprofenDose = 800;
    ibuprofenSpan.textContent = ` (≈ ${ibuprofenDose.toFixed(0)} mg)`;

    //Acetaminophen Dosaging Section

    acetaminophenDose = 15 * kg;
    if (acetaminophenDose > 1000) acetaminophenDose = 1000;
    acetaminophenSpan.textContent = ` (≈ ${acetaminophenDose.toFixed(0)} mg)`;
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
