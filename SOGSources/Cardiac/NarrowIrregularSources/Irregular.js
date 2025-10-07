$(function () {
  $("body").hide().fadeIn(750);

  const weightInput = document.getElementById("weightSelect");
  const weightSelectedSpan = document.getElementById("weightSelected");
  const etomidateSpan = document.getElementById("etomidateSpot");
  const diltiazemAdultSpan = document.getElementById("diltiazemAdult");
  const diltiazemGeriSpan = document.getElementById("diltiazemGeri");

  function updateAll(weightLbs) {
    if (!weightLbs || isNaN(weightLbs)) {
      weightSelectedSpan.textContent = "";
      etomidateSpan.textContent = "";
      diltiazemAdultSpan.textContent = "";
      diltiazemGeriSpan.textContent = "";
      return;
    }

    const kg = weightLbs * 0.45359237;

    weightSelectedSpan.textContent = `Selected Weight: ${weightLbs} lbs (${kg.toFixed(
      1
    )} kgs)`;

    //Etomidate Dose
    let etomidate = kg * 0.1;
    if (etomidate > 10) etomidate = 10;
    etomidateVol = etomidate / 2;
    etomidateSpan.textContent = ` ≈ (${etomidate.toFixed(
      2
    )}mg ${etomidateVol.toFixed(2)}ml )`;

    //Diltiazem Adult Dose
    let diltiazemAdult = kg * 0.25;
    if (diltiazemAdult > 25) diltiazemAdult = 25;
    diltiazemAdultSpan.textContent = `≈ (${diltiazemAdult.toFixed(
      2
    )}mg over 2-5 minutes)`;

    //Diltiazem Geri Dose
    let diltiazemGeri = kg * 0.1;
    if (diltiazemGeri > 10) diltiazemGeri = 10;
    diltiazemGeriSpan.textContent = `≈ (${diltiazemGeri.toFixed(
      2
    )}mg over 2-5 minutes)`;
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
