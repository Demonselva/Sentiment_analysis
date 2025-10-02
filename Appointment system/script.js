// Register User
function register() {
  let user = document.getElementById("regUser").value;
  let pass = document.getElementById("regPass").value;

  if (!user || !pass) {
    alert("Enter username and password");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.username === user)) {
    alert("User already exists");
    return;
  }

  users.push({ username: user, password: pass });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful!");
}

// Login User
function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (user === "admin" && pass === "admin") {
    localStorage.setItem("loggedIn", "admin");
    window.location.href = "admin.html";
    return;
  }

  let valid = users.find(u => u.username === user && u.password === pass);
  if (valid) {
    localStorage.setItem("loggedIn", user);
    window.location.href = "user.html";
  } else {
    alert("Invalid login");
  }
}

// Logout
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// Book Appointment
function bookAppointment() {
  let service = document.getElementById("service").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;
  let user = localStorage.getItem("loggedIn");

  if (!service || !date || !time) {
    alert("Fill all fields!");
    return;
  }

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push({ user, service, date, time });
  localStorage.setItem("appointments", JSON.stringify(appointments));
  alert("Appointment booked!");
  location.reload();
}

// Load User Appointments
if (document.getElementById("userAppointments")) {
  let user = localStorage.getItem("loggedIn");
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  let table = document.getElementById("userAppointments");

  appointments.filter(a => a.user === user).forEach(a => {
    let row = table.insertRow();
    row.insertCell(0).innerText = a.service;
    row.insertCell(1).innerText = a.date;
    row.insertCell(2).innerText = a.time;
  });
}

// Manage User Appointments
if (document.getElementById("manageTable")) {
  let user = localStorage.getItem("loggedIn");
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  let table = document.getElementById("manageTable");

  appointments.filter(a => a.user === user).forEach((a, i) => {
    let row = table.insertRow();
    row.insertCell(0).innerText = a.service;
    row.insertCell(1).innerText = a.date;
    row.insertCell(2).innerText = a.time;
    let btn = document.createElement("button");
    btn.innerText = "Cancel";
    btn.onclick = () => {
      appointments.splice(i, 1);
      localStorage.setItem("appointments", JSON.stringify(appointments));
      location.reload();
    };
    row.insertCell(3).appendChild(btn);
  });
}

// Admin - Show Users
if (document.getElementById("allUsers")) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let table = document.getElementById("allUsers");
  users.forEach(u => {
    let row = table.insertRow();
    row.insertCell(0).innerText = u.username;
  });
}

// Admin - Show Appointments
if (document.getElementById("allAppointments")) {
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  let table = document.getElementById("allAppointments");

  appointments.forEach((a, i) => {
    let row = table.insertRow();
    row.insertCell(0).innerText = a.user;
    row.insertCell(1).innerText = a.service;
    row.insertCell(2).innerText = a.date;
    row.insertCell(3).innerText = a.time;

    let btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.onclick = () => {
      appointments.splice(i, 1);
      localStorage.setItem("appointments", JSON.stringify(appointments));
      location.reload();
    };
    row.insertCell(4).appendChild(btn);
  });
}
