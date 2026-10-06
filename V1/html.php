<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IT Seminar Student Registration</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="container">
    <h1>IT Seminar Student Registration</h1>

    <form id="registrationForm" novalidate>
      <div class="field">
        <label for="studentName">Student Name</label>
        <input type="text" id="studentName" name="studentName" placeholder="Juan Dela Cruz">
        <span id="nameError" class="error"></span>
      </div>

      <div class="field">
        <label for="studentNumber">Student Number</label>
        <input type="text" id="studentNumber" name="studentNumber" placeholder="00-0000-000">
        <span id="studentNumberError" class="error"></span>
      </div>

      <div class="field">
        <label for="email">Email Address</label>
        <input type="text" id="email" name="email" placeholder="name@example.com">
        <span id="emailError" class="error"></span>
      </div>

      <div class="field">
        <label for="workshop">Workshop</label>
        <select id="workshop" name="workshop">
          <option value="">Select Workshop</option>
          <option value="Web Development">Web Development</option>
          <option value="Cybersecurity Basics">Cybersecurity Basics</option>
          <option value="Data Analytics">Data Analytics</option>
          <option value="Mobile App Development">Mobile App Development</option>
        </select>
        <span id="workshopError" class="error"></span>
      </div>

      <div class="field checkbox">
        <input type="checkbox" id="terms" name="terms">
        <label for="terms">I accept the Terms and Conditions</label>
        <span id="termsError" class="error"></span>
      </div>

      <div class="buttons">
        <button type="submit" id="registerBtn">Register</button>
        <button type="button" id="clearBtn">Clear</button>
      </div>
    </form>

    <section id="registrationResult">
      <h2>Registration Summary</h2>
      <p><strong>Name:</strong> <span id="summaryName"></span></p>
      <p><strong>Student Number:</strong> <span id="summaryStudentNumber"></span></p>
      <p><strong>Email:</strong> <span id="summaryEmail"></span></p>
      <p><strong>Workshop:</strong> <span id="summaryWorkshop"></span></p>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>