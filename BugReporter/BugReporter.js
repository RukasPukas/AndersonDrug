$(function () {
  $("body").hide().fadeIn(750);

  const subsectionData = {
    Medications: [
      "Acetaminophen",
      "Adensoine",
      "Albuterol",
      "Amiodarone",
      "Aspirin",
      "Atropine",
      "Calcium Chloride",
      "Dextrose 10%",
      "Dextrose 50%",
      "Diazepam",
      "Diltiazem",
      "Diphenhydramine",
      "Dopamine",
      "DuoNeb",
      "Epinephrine 1:1,000",
      "Epinephrine 1:10,000",
      "Epinephrine 1:100,000",
      "Epinephrine Racemic",
      "Etomidate",
      "Fentanyl",
      "Glucagon",
      "Haloperidol",
      "Hydralazine",
      "Ibuprofen",
      "Ketamine",
      "Ketorolac",
      "Labetalol",
      "Lidocaine",
      "Lorazepam",
      "Magnesium Sulfate",
      "Methylprednisolone",
      "Metroprolol",
      "Midazolam",
      "Morphine",
      "Naloxone",
      "Nitroglycerin",
      "Norepinephrine",
      "Ondansetron",
      "Oral Glucose",
      "Sodium Bicarbonate",
      "Thaimine",
      "TXA",
    ],
    Reference: [
      "APGAR",
      "BIAD",
      "Capnography",
      "CPAP",
      "Cricothhyrotomy",
      "Defibrillation",
      "EKG",
      "Fast ED",
      "Fire Rehabilitation",
      "Glasgow Coma Scale",
      "Glascow Coma Scale Pediatric",
      "Hemorrhage Control",
      "Ideal Body Weight",
      "Intubation",
      "Needle Decompression",
      "Pediatric Vital Signs",
      "Restraints",
      "Richmond Agitation Scale",
      "Rule of Nines",
      "Synchronized Cardioversion",
      "Transcutaneous Pacing",
    ],
    SOGs: [
      "General: Abuse & Neglect",
      "General: Airway Management",
      "General: Assisted Intubation",
      "General: Human Trafficking",
      "General: Intercept Criteria",
      "General: Pain Management",
      "General: Radio Report",
      "General: Refusal of Care",
      "General: Special Need Population",
      "General: Termination of Resuscitattive Efforts",
      "General: Universal Patient Care",
      "General: Withholding of Reuscitative Efforts",
      "Medical: Abdominal Pain",
      "Medical: Agitated / Combative Patients",
      "Medical: Airway Obstruction",
      "Medical: Allergic Reatction",
      "Medical: Altered Mental Status",
      "Medical: Asthma / COPD / Restrictive Airway Disease",
      "Medical: Hyperglycemia",
      "Medical: Hypoglycemia",
      "Medical: Nausea / Vomiting",
      "Medical: Seizure",
      "Medical: Sepsis",
      "Medical: Shock",
      "Medical: Stroke / CVA",
      "Medical: Tracheostomy",
      "Cardiac: Asystole / PEA",
      "Cardiac: Bradycardia",
      "Cardiac: Cardiac Arrest General",
      "Cardiac: Cardiac Arrest Overview",
      "Cardiac: CHF / Pulmonary Edema",
      "Cardiac: LVAD",
      "Cardiac: Narrow Complex Irregular Tachycardia",
      "Cardiac: Narrow Complex Regular Tachycardia",
      "Cardiac: Pulseless Ventricul Tachycardia",
      "Cardiac: ROSC",
      "Cardiac: STEMI",
      "Cardiac: Syncope",
      "Cardiac: Tachycardia Overview",
      "Cardiac: Wide Complex Tachycardia With A Pulse",
      "OB: Abortion",
      "OB: Child Delivery",
      "OB: Eclampsia / Preeclampsia",
      "OB: Newborn Resuscitation",
      "Trauma: Abdominal Injuries",
      "Trauma: Blast Injuries",
      "Trauma: Burn Injuries",
      "Trauma: Chest Injuries",
      "Trauma: Crush Injuries",
      "Trauma: Extremity Injurie",
      "Trauma: Facial Trauma",
      "Trauma: Head Injuries",
      "Trauma: Initial Trauma Care",
      "Trauma: Neck Injuries",
      "Trauma: Spinal Motion Restriction",
      "Trauma: Taser Injuries",
      "Trauma: Traumatic Arrest",
      "Trauma: Trauma Triage Algorithm",
      "Trauma: TXA",
      "Environmental: Altitiude Illness",
      "Environmental: CO Exposure",
      "Environmental: Cyanize Poisoning",
      "Environmental: Dive Injuries",
      "Environmental: Drowning",
      "Environmental: Hypertghermia",
      "Environmental: Hypothermia",
      "Environmental: Lightning Strike",
      "Environmental: Oganophosphate Poisoning",
      "Environmental: Overdose / Poisoning",
      "Environmental: Radiation Exposure",
    ],
  };

  $("#section-select").on("change", function () {
    const selectedSection = $(this).val();
    const $wrapper = $("#subsection-wrapper");
    const $subsection = $("#subsection-select");

    $subsection
      .empty()
      .append(
        `<option value="" disabled selected hidden>Select Subsection</option>`
      );

    $wrapper.hide();

    if (subsectionData[selectedSection]) {
      subsectionData[selectedSection].forEach((item) => {
        $("<option>", { value: item, text: item }).appendTo($subsection);
      });

      $wrapper.show();
    }
  });

  $("#bug-report-form").on("submit", function (e) {
    e.preventDefault();
    const section = $("#section-select").val();
    const subsectionVisible = $("#subsection-wrapper").is(":visible");
    const subsection = $("#subsection-select").val();
    const description = $("#bug-description").val().trim();

    if (!section) {
      alert("Please select a section.");

      return;
    }

    if (subsectionVisible && !subsection) {
      alert("Please select a subsection.");

      return;
    }

    if (description.length < 20) {
      alert(
        "Please provide a more detailed description (at least 20 characters)."
      );

      return;
    }

    console.log(
      "Bug Report: \n\n Section: " +
        section +
        "\n\n Subsection: " +
        subsection +
        "\n\n Description: " +
        description
    );

    const EmailTo = "AndersonPocketMedic@gmail.com";
    const subject = `Bug Report - ${section}${
      subsectionVisible ? " - " + subsection : ""
    }`;

    const body = [
      "Anderson EMS Pocket Medic - Bug Report",
      "------------------------------------",
      `Section: ${section}`,
      `Subsection: ${subsectionVisible ? subsection : "(none)"}`,
      "",
      "Description:",
      description,
      "",
      `Submitted: ${new Date().toLocaleString()}`,
    ].join("\n");

    const mailtoUrl =
      `mailto:${encodeURIComponent(EmailTo)}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    alert(
      "Your email app should open with the bug report pre-filled. Please press Send to submit."
    );

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 800);
  });
});
