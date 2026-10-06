// ITP10 Midterm Laboratory Exam - Student Registration
// ================= PURE FUNCTIONS (no DOM access) =================
const STUDENT_NUMBER_REGEX = /^\d{2}-\d{4}-\d{3}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidName(value) {
  if (typeof value !== "string") return false;
  const name = value.trim();
  return name.length >= 3 && !/\d/.test(name);
}

function isValidStudentNumber(value) {
  return typeof value === "string" && STUDENT_NUMBER_REGEX.test(value);
}

function isValidEmail(value) {
  return typeof value === "string" && EMAIL_REGEX.test(value);
}

function getCourseFee(courseValue) {
  switch (courseValue) {
    case "networking": return 700;
    case "webdesign":  return 600;
    case "database":   return 800;
    default:           return 0;
  }
}

function calculatePayment(courseValue, categoryValue) {
  const baseFee = getCourseFee(courseValue);
  const discount = categoryValue === "early" ? Math.round(baseFee * 0.15 * 100) / 100 : 0;
  const finalPayment = baseFee - discount;
  return { baseFee, discount, finalPayment };
}

// ================= BROWSER-ONLY CODE =================
if (typeof document !== "undefined") {
  // ---- PART A: DOM initialization ----
  const form = document.getElementById("enrollmentForm");
  const fullName = document.getElementById("fullName");
  const studentNumber = document.getElementById("studentNumber");
  const email = document.getElementById("email");
  const trainingCourse = document.getElementById("trainingCourse");
  const regularRadio = document.getElementById("regular");
  const earlyRadio = document.getElementById("early");
  const agreement = document.getElementById("agreement");

  const courseFeeDisplay = document.getElementById("courseFee");
  const discountDisplay = document.getElementById("discountAmount");
  const finalPaymentDisplay = document.getElementById("finalPayment");

  const enrollBtn = document.getElementById("enrollBtn");
  const clearBtn = document.getElementById("clearBtn");

  const resultSection = document.getElementById("resultSection");
  const resultHeading = document.getElementById("resultHeading");
  const resultDetails = document.getElementById("resultDetails");

  const errors = {
    fullName: document.getElementById("fullNameError"),
    studentNumber: document.getElementById("studentNumberError"),
    email: document.getElementById("emailError"),
    trainingCourse: document.getElementById("trainingCourseError"),
    enrollmentCategory: document.getElementById("enrollmentCategoryError"),
    agreement: document.getElementById("agreementError"),
  };

  function formatPeso(amount) {
    return "₱" + Number(amount).toLocaleString("en-PH", { maximumFractionDigits: 2 });
  }

  function getSelectedCategory() {
    const checked = document.querySelector('input[name="enrollmentCategory"]:checked');
    return checked ? checked.value : "";
  }

  function setError(key, message) { errors[key].textContent = message; }
  function clearError(key) { errors[key].textContent = ""; }
  function clearAllErrors() { Object.keys(errors).forEach(clearError); }

  function updatePaymentDisplay() {
    const p = calculatePayment(trainingCourse.value, getSelectedCategory());
    courseFeeDisplay.textContent = formatPeso(p.baseFee);
    discountDisplay.textContent = formatPeso(p.discount);
    finalPaymentDisplay.textContent = formatPeso(p.finalPayment);
  }

  function hideResult() {
    resultSection.style.display = "none";
    resultHeading.textContent = "";
    resultDetails.textContent = "";
  }

  // Startup state
  hideResult();
  updatePaymentDisplay();

  // ---- PART F: live error removal & dynamic updates ----
  fullName.addEventListener("input", () => {
    if (isValidName(fullName.value)) clearError("fullName");
  });
  studentNumber.addEventListener("input", () => {
    if (isValidStudentNumber(studentNumber.value.trim())) clearError("studentNumber");
  });
  email.addEventListener("input", () => {
    if (isValidEmail(email.value.trim())) clearError("email");
  });
  trainingCourse.addEventListener("change", () => {
    updatePaymentDisplay();
    if (getCourseFee(trainingCourse.value) > 0) clearError("trainingCourse");
  });
  [regularRadio, earlyRadio].forEach((radio) => {
    radio.addEventListener("change", () => {
      updatePaymentDisplay();
      if (getSelectedCategory()) clearError("enrollmentCategory");
    });
  });
  agreement.addEventListener("change", () => {
    if (agreement.checked) clearError("agreement");
  });

  // ---- Submission: validate everything ----
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearAllErrors();
    let valid = true;

    const nameVal = fullName.value.trim();
    const numVal = studentNumber.value.trim();
    const emailVal = email.value.trim();
    const courseVal = trainingCourse.value;
    const categoryVal = getSelectedCategory();

    if (!isValidName(nameVal)) { setError("fullName", "Enter a valid name."); valid = false; }
    if (!isValidStudentNumber(numVal)) { setError("studentNumber", "Enter a valid student number."); valid = false; }
    if (!isValidEmail(emailVal)) { setError("email", "Enter a valid email address."); valid = false; }
    if (getCourseFee(courseVal) === 0) { setError("trainingCourse", "Select a training course."); valid = false; }
    if (!categoryVal) { setError("enrollmentCategory", "Select an enrollment category."); valid = false; }
    if (!agreement.checked) { setError("agreement", "You must accept the enrollment agreement."); valid = false; }

    if (!valid) { hideResult(); return; }

    // ---- PART G: successful summary (textContent only) ----
    const p = calculatePayment(courseVal, categoryVal);
    const courseText = trainingCourse.options[trainingCourse.selectedIndex].textContent;
    const categoryText = categoryVal === "early" ? "Early Registrant" : "Regular";

    resultHeading.textContent = "Enrollment Successful";
    resultDetails.textContent = "";
    const lines = [
      ["Name", nameVal],
      ["Student Number", numVal],
      ["Email", emailVal],
      ["Training Course", courseText],
      ["Enrollment Category", categoryText],
      ["Course Fee", formatPeso(p.baseFee)],
      ["Discount", formatPeso(p.discount)],
      ["Final Payment", formatPeso(p.finalPayment)],
    ];
    lines.forEach(([label, value]) => {
      const row = document.createElement("p");
      row.textContent = label + ": " + value;
      resultDetails.appendChild(row);
    });
    resultSection.style.display = "block";
  });

  // ---- Clear button: restore initial state ----
  clearBtn.addEventListener("click", () => {
    form.reset();
    fullName.value = "";
    studentNumber.value = "";
    email.value = "";
    trainingCourse.selectedIndex = 0;
    regularRadio.checked = false;
    earlyRadio.checked = false;
    agreement.checked = false;
    clearAllErrors();
    updatePaymentDisplay();
    hideResult();
  });
}

// Make pure functions available to the autograder (Node)
if (typeof module !== "undefined" && module.exports) {
  module.exports = { isValidName, isValidStudentNumber, isValidEmail, getCourseFee, calculatePayment };
}