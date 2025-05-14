$(document).ready(function () {
  $("body").fadeIn(750);

  $("#calculateDosage").on("click", function () {
    const initialInput = $("#weightInput").val();
    console.log("Initial input:", initialInput);

    let weightInput = parseFloat(initialInput);
    console.log("Parsed weight input:", weightInput);

    if (isNaN(weightInput) || weightInput <= 0) {
      alert("Please enter a valid weight.");
      return;
    }

    const unit = $('input[name="unit"]:checked').val();
    console.log("Selected unit:", unit);

    if (unit === "lbs") {
      weightInput = weightInput / 2.20462;
      weightInput = parseFloat(weightInput.toFixed(2));
      console.log("Converted weight to kg:", weightInput);
    }

   const protocolSelected = $('input[name="protocol"]:checked').val();
   console.log("Selected protocol:", protocolSelected);


   if(protocolSelected === "Behavioral"){
    
    let agitatedDose = weightInput * 4;
    console.log("Agitated dose:", agitatedDose);
    if(agitatedDose > 400){
        agitatedDose = 400;
        console.log("Agitated dose capped at 400:", agitatedDose);
    }

    agitatedVolume = agitatedDose / 50;
    console.log("Agitated volume:", agitatedVolume);

    $("#result")
      .html(
        `
        <h2>Agitated or Violent Patient/Behavioral Emergencies:</h2>
        <p> <strong>Suggested Dosage:</strong> ${agitatedDose.toFixed(2)}mg
        <br>
        <small>(Method: 4mg x ${weightInput.toFixed(2)}kg MAX: 400mg)</small>
        <br>
        <br>
        <strong>Suggested Volume:</strong> ${agitatedVolume.toFixed(2)}ml
        <br><small>(For Concentrations of 50mg per ml)
        <br>
        <small>NOTE: DO NOT EXCEED <strong>5ml</strong> PER IM INJECTION SITE</small>
        <br>
        <br>
        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.</small></i>
         </p>
            
        `
      )
      .fadeIn(200);
    }
if(protocolSelected === "Pain"){
    let painIN = weightInput * .5;
    console.log("Pain IN dose:", painIN);
    if(painIN > 20){
        painIN = 20;
        console.log("Pain IN dose capped at 20:", painIN);
    }
    let painIV = weightInput * .2;
    console.log("Pain IV dose:", painIV);
    if(painIV > 20){
        painIV = 20;
        console.log("Pain IV dose capped at 20:", painIV);
    }
    let painVolumeIV = painIV / 50;
    console.log("Pain IV volume:", painVolumeIV);
    let painVolumeIN = painIN / 50;
    console.log("Pain IN volume:", painVolumeIN);
    $("#result")
      .html(
        `
        <h2>Acute Pain Management:</h2>
        <p><strong><u>Intravenous</u>
        <br>Suggested Dosage:</strong> ${painIV.toFixed(2)}mg IV
        <br>
        <small>(Method: 0.2mg x ${weightInput.toFixed(2)}kg MAX: 20mg)</small>
        <br>
        <br>
        <strong>Suggested Volume:</strong> ${painVolumeIV.toFixed(2)}ml IV
        <br><small>(For Concentrations of 50mg per ml)</small>
        <br>
        <br>
        <strong><u>Intranasal</u>
        <br>
        Suggested Dosage:</strong> ${painIN.toFixed(2)}mg IN
        <br>
        <small>(Method: 0.5mg x ${weightInput.toFixed(2)}kg MAX: 20mg)</small>
        <br>
        <br>
        <strong>Suggested Volume:</strong> ${painVolumeIN.toFixed(2)}ml IN
        <br><small>(For Concentrations of 50mg per ml)
        <br>
        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.</small></i>
        
         </p>
            
        `
      )
      .fadeIn(200);
    }

if(protocolSelected === "Intubation"){
assistedIntubationDose = weightInput * 2;
    console.log("Assisted intubation dose:", assistedIntubationDose);
    if(assistedIntubationDose > 200){
        assistedIntubationDose = 200;
        console.log("Assisted intubation dose capped at 200:", assistedIntubationDose);
    }
    let assistedIntubationVolume = assistedIntubationDose / 50;
    console.log("Assisted intubation volume:", assistedIntubationVolume);

    $("#result")
      .html(
        `
        <h2>Assisted Intubation:</h2>
        <p><strong>Suggested Dosage IV/IO:</strong> ${assistedIntubationDose.toFixed(2)}mg
        <br>
        <small>(Method: 2mg x ${weightInput.toFixed(2)}kg MAX: 200mg)</small>
        <br>
        <br>
        <strong>Suggested Volume:</strong> ${assistedIntubationVolume.toFixed(2)}ml
        <br><small>(For Concentrations of 50mg per ml)
        <br>
        <small><i>Note: Always ensure amounts are accurate prior to administration. 
        Consult Anderson Protocols or Medical Control if uncertainty exists.</small></i>
         </p>
            
        `
      )
      .fadeIn(200);
    }
    if(protocolSelected === "postIntubation"){
        let postIntubationDose = weightInput * 1;
        console.log("Post Intubation dose:", postIntubationDose);
        if(postIntubationDose > 200){
            postIntubationDose = 200;
            console.log("Post intubation dose capped at 200:", postIntubationDose);
        }
        let sedationVolume = postIntubationDose / 50;
        console.log("Post intubation volume:", postIntubationDose);
        $("#result")
          .html(
            `
            <h2>Post Intubation Sedation:</h2>
            <p><strong>Suggested Dosage IV/IO:</strong> ${postIntubationDose.toFixed(2)}mg
            <br>
            <small>(Method: 1mg x ${weightInput.toFixed(2)}kg MAX: 200mg)</small>
            <br>
            <br>
            <strong>Suggested Volume:</strong> ${sedationVolume.toFixed(2)}ml
            <br><small>(For Concentrations of 50mg per ml)
            <br>
            <br>
            <strong>NOTE:</strong> After 15 min. may repeat dose x1 from either route for a
            maximum combined dose of 200 mg.
            <br>
            <br>
            <small><i>Note: Always ensure amounts are accurate prior to administration. 
            Consult Anderson Protocols or Medical Control if uncertainty exists.</small></i>
             </p>
                
            `
          )
          .fadeIn(200);
        }


  });
  
});
