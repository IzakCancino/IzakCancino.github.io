//
// GENERATOR SECTION
//

/**
 * `Generator` section in the site
 * @type {HTMLDivElement}
 */
let sectionGenerator = document.getElementById("generator");

/**
 * Form with the number system info: base and digits
 * @type {HTMLFormElement}
 */
let formNumSys = document.getElementById("numericSystemCreator");

/**
 * Div with all the *digits selectors* in the generator
 * @type {HTMLDivElement}
 */
let divGenDigits = document.getElementById("gen-digits");

/**
 * Numeric input with the numeric base selected
 * @type {HTMLInputElement}
 */
let inputBase = document.getElementById("base");

/**
 * Contains all the labels for digit inputs
 * @type {HTMLLabelElement[]}
 */
let labelsDigits = Array.from(document.getElementsByClassName("label-digit"));

/**
 * Contains all the digit inputs
 * @type {HTMLInputElement[]}
 */
let inputsDigits = Array.from(document.getElementsByClassName("digits"));

/**
 * Contains all the buttons for delete digit inputs
 * @type {HTMLButtonElement[]}
 */
let btnsDeleteDigit = Array.from(document.getElementsByClassName("btn-delete-digit"));

/**
 * Button in `Generator` section for generate the system
 * @type {HTMLButtonElement}
 */
let btnGenerateSystem = document.getElementById("btn-generate-system");

/**
 * Sub-section with the preset number systems
 * @type {HTMLDivElement}
 */
let sectionPresets = document.getElementById("presets");

/**
 * Array with the buttons in `sectionPresets` to load presets number systems
 * @type {HTMLButtonElement[]}
 */
let btnsPresets = Array.from(document.getElementsByClassName("btn-presets"));

/**
 * Object with the base and digits from the number systems presets: `binary`, `hexadecimal`, and `octal`
 */
let presets = {
  "binary": {
    base: 2,
    digits: ["0", "1"]
  },
  "hex": {
    base: 16,
    digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
  },
  "octal": {
    base: 8,
    digits: ["0", "1", "2", "3", "4", "5", "6", "7"]
  },
  "emoji": {
    base: 10,
    digits: ["🧙‍♂️", "🐶", "😀", "🎋", "🎈", "🐀", "🎍", "🥪", "✨", "🥳"]
  }
};



//
// BOTH SECTIONS
//

/**
 * The numeric base in use. It has the same value than `inputBase.value`
 * @type {Number}
 */
let base = 2;

/**
 * Number used to count every time the base is added by 1, it doesn't decrease
 * @type {Number}
 */
let auxNumber = base;

/**
 * Array with all the digits of the current number system
 * @type {String[]}
 */
let digits = [];



//
// CALCULATOR SECTION
//

/**
 * Array with the titles that show the current numeric base
 * @type {HTMLSpanElement[]}
 */
let titleBase = Array.from(document.getElementsByClassName("title-base"));

/**
 * `Calculator` section in the site
 * @type {HTMLDivElement}
 */
let sectionCalculator = document.getElementById("calculator");

/**
 * Button for return from `Calculator` to `Generator` section in the site
 * @type {HTMLButtonElement}
 */
let btnReturnGenerator = document.getElementById("return-generator");

/**
 * Array with the title, label, input, button and result of the calculator from decimal to generated system
 * @type {HTMLElement[]}
 */
let calDecimalToSystem = document.getElementById("cal-dec-to-sys").children;

/**
 * Array with the title, label, input, button and result of the calculator from generated system to decimal
 * @type {HTMLElement[]}
 */
let calSystemToDecimal = document.getElementById("cal-sys-to-dec").children;

/**
 * RegEx used to validate the input in `calSystemToDecimal`. It has the form: `/^[DIGITS]+$/`; where `DIGITS` refers to a string with all the digits in the current number system
 * @type {RegExp}
 */
let regexValidation;

/**
 * RegEx used to convert the value in `calSystemToDecimal`. It has the form: `/DIGIT_A{1}|DIGIT_B{1}|...|DIGIT_N{1}/g`; where `DIGIT_X` refers to each digit
 * @type {RegExp}
 */
let regexSplit;