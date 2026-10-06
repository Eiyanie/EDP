// ITP10 - Event-Driven Programming | Midterm Laboratory Exam
// Student Registration - script.js

// ---------------------------------------------------------------
// PART B - Pure validation function (no DOM access)
// ---------------------------------------------------------------
const STUDENT_NUMBER_PATTERN = /^\d{2}-\d{4}-\d{3}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidName(name) {
  if (typeof name !== "string") return false;
  const trimmed = name.trim();
  if (trimmed.length < 3) return false; // also rejects spaces-only
  if (/\d/.test(trimmed)) return false; // no numbers allowed
  return true;
}

function isValidStudentNumber(studentNumber) {
  return typeof studentNumber === "string" && STUDENT_NUMBER_PATTERN.test(studentNumber);
}

function isValidEmail(email) {
  return typeof email === "string" && EMAIL_PATTERN.test(email);
}

function validateStudentInfo(name, studentNumber, email) {
  return (
    isValidName(name) &&
    isValidStudentNumber(studentNumber) &&
    isValidEmail(email)
  );
}

// ---------------------------------------------------------------
// Browser-only code (skipped safely when run in Node tests)
// ---------------------------------------------------------------
function initRegistrationForm() {
  // PART A - DOM element selection
  const form = document.getElementById("registrationForm");
  const studentName = document.getElementById("studentName");
  const studentNumber = document.getElementById("studentNumber");
  const email = document.getElementById("email");
  const workshop = document.getElementById("workshop");
  const terms = document.getElementById("terms");

  const nameError = document.getElementById("nameError");
  const studentNumberError = document.getElementById("studentNumberError");
  const emailError = document.getElementById("emailError");
  const workshopError = document.getElementById("workshopError");
  const termsError = document.getElementById("termsError");

  const clearBtn = document.getElementById("clearBtn");
  const registrationResult = document.getElementById("registrationResult");
  const summaryName = document.getElementById("summaryName");
  const summaryStudentNumber = document.getElementById("summaryStudentNumber");
  const summaryEmail = document.getElementById("summaryEmail");
  const summaryWorkshop = document.getElementById("summaryWorkshop");

  if (!form) return;

  const allErrors = [nameError, studentNumberError, emailError, workshopError, termsError];

  function hideResult() {
    registrationResult.style.display = "none";
  }

  function showResult() {
    registrationResult.style.display = "block";
  }

  function clearErrors() {
    allErrors.forEach(function (el) {
      el.textContent = "";
    });
  }

  // Initial state: result hidden
  hideResult();

  // PART C & D - Submit handling
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent page reload

    clearErrors();
    hideResult();

    const nameValue = studentName.value;
    const numberValue = studentNumber.value;
    const emailValue = email.value;
    const workshopValue = workshop.value;

    let allValid = true;

    if (!isValidName(nameValue)) {
      nameError.textContent = "Enter a valid student name.";
      allValid = false;
    }

    if (!isValidStudentNumber(numberValue)) {
      studentNumberError.textContent = "Enter a valid student number.";
      allValid = false;
    }

    if (!isValidEmail(emailValue)) {
      emailError.textContent = "Enter a valid email address.";
      allValid = false;
    }

    if (!workshopValue || workshop.selectedIndex <= 0) {
      workshopError.textContent = "Please select a workshop.";
      allValid = false;
    }

    if (!terms.checked) {
      termsError.textContent = "You must accept the Terms and Conditions.";
      allValid = false;
    }

    // Keep the pure function as the source of truth for the three text fields
    if (!validateStudentInfo(nameValue, numberValue, emailValue)) {
      allValid = false;
    }

    if (!allValid) return;

    // PART D - Summary (textContent only, never innerHTML)
    const selectedOption = workshop.options[workshop.selectedIndex];
    summaryName.textContent = nameValue.trim();
    summaryStudentNumber.textContent = numberValue;
    summaryEmail.textContent = emailValue;
    summaryWorkshop.textContent = selectedOption.textContent.trim();

    showResult();
  });

  // PART E - Clear button / complete reset
  clearBtn.addEventListener("click", function () {
    studentName.value = "";
    studentNumber.value = "";
    email.value = "";
    workshop.selectedIndex = 0; // default "Select Workshop" option
    terms.checked = false;

    clearErrors();

    summaryName.textContent = "";
    summaryStudentNumber.textContent = "";
    summaryEmail.textContent = "";
    summaryWorkshop.textContent = "";

    hideResult();
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRegistrationForm);
  } else {
    initRegistrationForm();
  }
}

// Allow Node-based function tests to import the validator
if (typeof module !== "undefined" && module.exports) {
  module.exports = { validateStudentInfo };
}