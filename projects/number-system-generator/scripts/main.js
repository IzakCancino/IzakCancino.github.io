/**
 * This file makes all the processes to calculate, generate and manage 
 * all the functionalities about the `Generator` and the `Calculator` section
 */


/**
 * GENERATOR SECTION
 */


updateDeleteBtns();

// Detect when the selected numeric base in `inputBase` changes
inputBase.addEventListener("change", onInputBaseChange);

// Adding to digit inputs validation of any character
inputsDigits.forEach(input => {
  input.addEventListener("change", addDigitInputValidation);
});

// Detect when the new number system is being generated
formNumSys.addEventListener("submit", e => {
  e.preventDefault();

  if (confirm("Note:\nYou will not be able to modify the actual number system (digits or base), at this moment. To do it, you need to click the return button in the calculator section.")) {
    // Prepare and show the `Calculator` section and move to it
    sectionPresets.style.display = "none";

    titleBase.forEach(element => {
      element.innerText = base;
    });

    sectionCalculator.style.display = "flex";
    toggleInputsOnGenerate(true);
    sectionCalculator.scrollIntoView({ behavior: "smooth" });

    digits = inputsDigits.map(input => input.value);
    regexValidation = new RegExp("^[" + digits.join("") + "]+$");
    regexSplit = new RegExp(digits.join("{1}|") + "{1}", "g");
  }
});

// Apply a preset number system to use it
btnsPresets.forEach(btn => {
  btn.addEventListener("click", () => {
    let preset = presets[btn.id];
    inputBase.value = preset.base;
    onInputBaseChange();

    inputsDigits.forEach((input, i) => {
      input.value = preset.digits[i];
      input.addEventListener("change", addDigitInputValidation);
    })

    sectionGenerator.scrollIntoView({ behavior: "smooth" });

    window.alert("Preset applied successfully. Press the generate button to use it.");
  });
})



/**
 * CALCULATOR SECTION
 */


// Return to `Generator` section, move to it, and hide the `Calculator` section
btnReturnGenerator.addEventListener("click", () => {
  sectionPresets.style.display = "block";
  sectionCalculator.style.display = "none";
  toggleInputsOnGenerate(false);
  calDecimalToSystem["input-decimal"].value = "";
  calDecimalToSystem["converted-system"].innerText = "--";
  calSystemToDecimal["input-system"].value = "";
  calSystemToDecimal["converted-decimal"].innerText = "--";
  sectionGenerator.scrollIntoView({ behavior: "smooth" });
});

// Convert decimals numbers to system created numbers
calDecimalToSystem["input-decimal"].addEventListener("change", () => {
  let numDecimal = calDecimalToSystem["input-decimal"].value;

  // Only allow positive integers
  if (numDecimal < 0 || !/^[0-9]+$/.test(numDecimal)) {
    calDecimalToSystem["input-decimal"].value = 0;
    return;
  }

  calDecimalToSystem["converted-system"].innerText = convertDecimalToSystem(Number(numDecimal));
});

// Convert system created numbers to decimal numbers
calSystemToDecimal["input-system"].addEventListener("change", () => {
  let numSystem = calSystemToDecimal["input-system"].value;

  if (!regexValidation.test(numSystem)) {
    calSystemToDecimal["input-system"].value = digits[0];
    return;
  }

  calSystemToDecimal["converted-decimal"].innerText = convertSystemToDecimal(numSystem);
});