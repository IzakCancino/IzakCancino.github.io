/**
 * This file makes all the processes to calculate, generate and manage 
 * all the functionalities about the `Generator` and the `Calculator` section
 */


/**
 * GENERATOR SECTION
 */


updateDeleteBtns();

// Detect when the selected numeric base in `inputBase` changes
inputBase.addEventListener("change", () => {
  if (base > inputBase.value) {
    // The base decreased. Remove the number selected of digits selector 

    while (base > inputBase.value) {
      base--;
      divGenDigits.removeChild(divGenDigits.lastElementChild);
    }

  } else if (base < inputBase.value) {
    // The base increased. Add the number selected of digits selector 
    while (base < inputBase.value) {
      base++;
      auxNumber++;

      let templateGenDigits = document.createElement("div");
      templateGenDigits.innerHTML = `
                <label for="digit-${auxNumber}" class="label-digit">Digit #${base}</label>
                <input type="text" name="digit-${auxNumber}" class="digits" id="digit-${auxNumber}" maxlength="2" required>
                <button type="button" class="btn-delete-digit">Delete</button>
              `;
      divGenDigits.append(templateGenDigits);
    }
  }

  btnsDeleteDigit = Array.from(document.getElementsByClassName("btn-delete-digit"));
  updateDeleteBtns();

  updateDigitsInfo();
  inputsDigits[inputsDigits.length - 1].addEventListener("change", addDigitInputValidation);
});

// Adding to digit inputs validation of any character
inputsDigits.forEach(input => {
  input.addEventListener("change", addDigitInputValidation)
});

// Generate the array with all the digits
formNumSys.addEventListener("submit", e => {
  e.preventDefault();
  digits = inputsDigits.map(input => input.value);

  if (confirm("Note:\nYou will not be able to modify the actual number system (digits or base), at this moment. To do it, you need to click the return button in the calculator section.")) {
    // Prepare and show the `Calculator` section and move to it
    titleBase.forEach(element => {
      element.innerText = base;
    });

    sectionCalculator.style.display = "flex";
    toggleInputsOnGenerate(true);
    sectionCalculator.scrollIntoView({ behavior: "smooth" });
  }

});


/**
 * CALCULATOR SECTION
 */


// Return to `Generator` section, move to it, and hide the `Calculator` section
btnReturnGenerator.addEventListener("click", () => {
  sectionCalculator.style.display = "none";
  toggleInputsOnGenerate(false);
  calDecimalToSystem["input-decimal"].value = "";
  calDecimalToSystem["converted-system"].innerText = "--";
  calSystemToDecimal["input-system"].value = "";
  calSystemToDecimal["converted-decimal"].innerText = "--";
  sectionGenerator.scrollIntoView({ behavior: "smooth" });

})

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
  let re = new RegExp("^[" + digits.join("") + "]+$");
  let numSystem = calSystemToDecimal["input-system"].value;

  if (!re.test(numSystem)) {
    calSystemToDecimal["input-system"].value = digits[0];
    return;
  }

  calSystemToDecimal["converted-decimal"].innerText = convertSystemToDecimal(numSystem);
});