$(function () {
  $("body").hide().fadeIn(750);

  const weightInput = document.getElementById("weightSelect");
  const lidocaineSpan = document.querySelector(".LidocaineDose");
  const weightSelectedSpan = document.getElementById("weightSelected");
  const lidocaineRepeatSpan = document.querySelector(".lidocaineRepeat");

  function updateAll(weightLbs) {
    if (!weightLbs || isNaN(weightLbs)) {
      etomidateSpan.textContent = "";
      lidocaineSpan.textContent = "";
      weightSelectedSpan.textContent = "";
      lidocaineRepeatSpan.textContent = "";

      return;
    }

    const kg = weightLbs * 0.45359237;
    weightSelectedSpan.textContent = `Selected Weight: ${weightLbs} lbs (${kg.toFixed(
      1
    )} kgs)`;

    // Lidocaine initial 1-1.5 mg/kg
    const lidocaineDoseLow = +(kg * 1).toFixed(1);
    const lidocaineDoseHigh = +(kg * 1.5).toFixed(1);
    lidocaineSpan.textContent = `≈ ${lidocaineDoseLow}mg - ${lidocaineDoseHigh}mg`;

    // Lidocaine repeat 0.75 mg/kg
    const lidocaineRepeatDose = +(kg * 0.75).toFixed(1);
    lidocaineRepeatSpan.textContent = `≈ ${lidocaineRepeatDose}mg`;
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
