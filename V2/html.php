<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Student Registration</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="card">
    <h1>Training Course Enrollment</h1>
    <form id="enrollmentForm" novalidate>
      <label for="fullName">Full Name</label>
      <input type="text" id="fullName" name="fullName">
      <span class="error" id="fullNameError"></span>

      <label for="studentNumber">Student Number (00-0000-000)</label>
      <input type="text" id="studentNumber" name="studentNumber">
      <span class="error" id="studentNumberError"></span>

      <label for="email">Email</label>
      <input type="text" id="email" name="email">
      <span class="error" id="emailError"></span>

      <label for="trainingCourse">Training Course</label>
      <select id="trainingCourse" name="trainingCourse">
        <option value="">Select a course</option>
        <option value="networking">Basic Networking</option>
        <option value="webdesign">Web Design</option>
        <option value="database">Database Fundamentals</option>
      </select>
      <span class="error" id="trainingCourseError"></span>

      <fieldset>
        <legend>Enrollment Category</legend>
        <label id="regularCategory"><input type="radio" id="regular" name="enrollmentCategory" value="regular"> Regular</label>
        <label id="earlyCategory"><input type="radio" id="early" name="enrollmentCategory" value="early"> Early Registrant</label>
      </fieldset>
      <span class="error" id="enrollmentCategoryError"></span>

      <label class="check"><input type="checkbox" id="agreement" name="agreement"> I accept the enrollment agreement.</label>
      <span class="error" id="agreementError"></span>

      <div class="payment">
        <p>Course Fee: <strong id="courseFee">₱0</strong></p>
        <p>Discount: <strong id="discountAmount">₱0</strong></p>
        <p>Final Payment: <strong id="finalPayment">₱0</strong></p>
      </div>

      <div class="buttons">
        <button type="submit" id="enrollBtn">Enroll</button>
        <button type="button" id="clearBtn">Clear</button>
      </div>
    </form>

    <section id="resultSection">
      <h2 id="resultHeading"></h2>
      <div id="resultDetails"></div>
    </section>
  </main>
  <script src="script.js"></script>
</body>
</html>