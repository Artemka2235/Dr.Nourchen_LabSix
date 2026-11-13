const PROJECT = {
  // Replace these two values with your own details before submission.
  studentName: "Artyom",
  enrolmentNumber: "5831",
  threshold: 75
};

const values = PROJECT.enrolmentNumber.padStart(4, "0").slice(-4).split("").map(Number);
const [D1, D2, D3, D4] = values;
const formulaValue = D1 * 10 + D2 + D3 * 5 + D4;

console.log("Project values:", { D1, D2, D3, D4, formulaValue });

function grade(marks) {
  if (marks < 0 || marks > 100) return "Invalid";
  if (marks < 50) return "Fail";
  if (marks < PROJECT.threshold) return "Pass";
  return "Distinction";
}

function validate(form) {
  const data = new FormData(form);
  const fields = Object.fromEntries(data.entries());
  const errors = {};

  if (!fields.fullName.trim()) errors.fullName = "Full name is required.";
  if (!fields.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!/^\d{9}$/.test(fields.phone.trim())) {
    errors.phone = "Phone must contain exactly 9 digits.";
  }

  if (!fields.city) errors.city = "Please choose a city.";

  if (fields.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return { fields, errors };
}

function showErrors(errors) {
  document.querySelectorAll(".error").forEach(el => { el.textContent = ""; });
  document.querySelectorAll("input, select").forEach(el => el.classList.remove("invalid"));

  Object.entries(errors).forEach(([name, message]) => {
    const input = document.getElementById(name);
    const error = document.getElementById(`${name}Error`);
    if (input) input.classList.add("invalid");
    if (error) error.textContent = message;
  });
}

function initRegistration() {
  const form = document.getElementById("registrationForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const { fields, errors } = validate(form);
    showErrors(errors);

    const message = document.getElementById("formMessage");

    if (Object.keys(errors).length > 0) {
      message.textContent = "Please correct the highlighted fields.";
      message.className = "form-message failure";
      return;
    }

    console.log("Registration submitted:", {
      name: fields.fullName,
      email: fields.email,
      phone: fields.phone,
      city: fields.city
    });

    const encodedName = encodeURIComponent(fields.fullName);
    const confirmed = confirm(`Register ${fields.fullName}?`);

    if (confirmed) {
      window.location.href = `board.html?name=${encodedName}`;
    }
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      showErrors({});
      const message = document.getElementById("formMessage");
      message.textContent = "";
      message.className = "form-message";
    }, 0);
  });
}

async function loadStudents() {
  const response = await fetch("students.json");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function renderStudents(students) {
  const tbody = document.querySelector("#marksTable tbody");
  tbody.textContent = "";

  students.forEach(student => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = student.name;

    const cityCell = document.createElement("td");
    cityCell.textContent = student.city;

    const marksCell = document.createElement("td");
    marksCell.textContent = String(student.marks);

    const gradeCell = document.createElement("td");
    gradeCell.textContent = grade(student.marks);

    row.append(nameCell, cityCell, marksCell, gradeCell);
    tbody.appendChild(row);
  });
}

function initBoard() {
  const table = document.getElementById("marksTable");
  if (!table) return;

  const name = new URLSearchParams(window.location.search).get("name");
  const welcome = document.getElementById("welcome");
  const boardMessage = document.getElementById("boardMessage");

  welcome.textContent = name ? `Welcome, ${name}` : "Welcome";

  document.getElementById("backButton").addEventListener("click", () => {
    window.history.back();
  });

  loadStudents()
    .then(students => {
      renderStudents(students);
      boardMessage.textContent = `${students.length} students loaded from students.json.`;
      boardMessage.className = "form-message success";
    })
    .catch(error => {
      console.error("Could not load students:", error);
      boardMessage.textContent = "Could not load the student data. Run the project through a local HTTP server.";
      boardMessage.className = "form-message failure";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  initRegistration();
  initBoard();
});
