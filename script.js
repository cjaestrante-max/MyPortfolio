let isAdmin = false;
let currentType = "";
let currentExam = "";
let currentOutput = null;

let quizzes = JSON.parse(localStorage.getItem("quizzes")) || [
  {
    id: 1,
    title: "Quiz 1",
    course: "Cloud Computing",
    date: "2026-08-24",
    score: "17/20",
    description: "Quiz 1 assessment for Cloud Computing.",
    image: "images/quiz1.png"
  }
];

let laboratories = JSON.parse(localStorage.getItem("laboratories")) || [];

let exams = JSON.parse(localStorage.getItem("exams")) || {
  Prelims: [],
  Midterm: [],
  Finals: []
};

const ADMIN_PASSWORD = "CJ2026";

document.addEventListener("DOMContentLoaded", function() {
  renderQuizzes();
  renderLaboratories();
  updateAdminView();
});

function openLogin() {
  document.getElementById("loginModal").classList.add("show");
  document.getElementById("adminPassword").value = "";
  document.getElementById("adminPassword").focus();
}

function closeLogin() {
  document.getElementById("loginModal").classList.remove("show");
}

function loginAdmin() {
  let password = document.getElementById("adminPassword").value;

  if (password === ADMIN_PASSWORD) {
    isAdmin = true;
    document.body.classList.add("admin-mode");
    closeLogin();
    updateAdminView();
    renderQuizzes();
    renderLaboratories();
    alert("Admin mode enabled.");
  } else {
    alert("Incorrect password.");
  }
}

function logoutAdmin() {
  isAdmin = false;
  document.body.classList.remove("admin-mode");
  updateAdminView();
  renderQuizzes();
  renderLaboratories();
}

function updateAdminView() {
  let quizList = document.getElementById("quizList");
  let labList = document.getElementById("labList");

  if (isAdmin) {
    addAdminCard(quizList, "quiz");
    addAdminCard(labList, "lab");
  }
}

function addAdminCard(list, type) {
  let oldCard = document.getElementById(
    type === "quiz" ? "addQuizCard" : "addLabCard"
  );

  if (oldCard) {
    oldCard.remove();
  }

  let card = document.createElement("div");
  card.className = "add-card admin-only";
  card.id = type === "quiz" ? "addQuizCard" : "addLabCard";

  card.onclick = function() {
    openForm(type);
  };

  card.innerHTML = `
    <div class="plus">+</div>
    <h3>${type === "quiz" ? "ADD QUIZ" : "ADD OUTPUT"}</h3>
    <p>${type === "quiz" ? "Add your quiz output here." : "Add your laboratory output here."}</p>
  `;

  list.appendChild(card);
}

function openForm(type) {
  if (!isAdmin) {
    return;
  }

  currentType = type;

  document.getElementById("form").classList.add("show");

  if (type === "quiz") {
    document.getElementById("formType").innerText = "QUIZ";
    document.getElementById("formTitle").innerText = "Add Quiz";
  } else {
    document.getElementById("formType").innerText = "LABORATORY";
    document.getElementById("formTitle").innerText = "Add Laboratory";
  }
}

function closeForm() {
  document.getElementById("form").classList.remove("show");
}

function addOutput() {
  if (!isAdmin) {
    return;
  }

  let title = document.getElementById("title").value.trim();
  let course = document.getElementById("course").value.trim();
  let date = document.getElementById("submissionDate").value;
  let score = document.getElementById("score").value.trim();
  let description = document.getElementById("description").value.trim();
  let file = document.getElementById("picture").files[0];

  if (title === "" || course === "" || date === "" || score === "") {
    alert("Please complete the title, course, date and score.");
    return;
  }

  if (file) {
    let reader = new FileReader();

    reader.onload = function(event) {
      saveOutput(
        title,
        course,
        date,
        score,
        description,
        event.target.result
      );
    };

    reader.readAsDataURL(file);
  } else {
    saveOutput(
      title,
      course,
      date,
      score,
      description,
      ""
    );
  }
}

function saveOutput(title, course, date, score, description, image) {
  let output = {
    id: Date.now(),
    title: title,
    course: course,
    date: date,
    score: score,
    description: description,
    image: image
  };

  if (currentType === "quiz") {
    quizzes.push(output);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    renderQuizzes();
  } else {
    laboratories.push(output);
    localStorage.setItem("laboratories", JSON.stringify(laboratories));
    renderLaboratories();
  }

  clearForm();
  closeForm();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("course").value = "";
  document.getElementById("submissionDate").value = "";
  document.getElementById("score").value = "";
  document.getElementById("description").value = "";
  document.getElementById("picture").value = "";
}

function renderQuizzes() {
  let list = document.getElementById("quizList");
  list.innerHTML = "";

  if (quizzes.length === 0) {
    let empty = document.createElement("div");
    empty.className = "empty-message";
    empty.innerText = "There are no quiz activities added yet.";
    list.appendChild(empty);
  } else {
    quizzes.forEach(function(item) {
      list.appendChild(createOutputCard(item, "QUIZ"));
    });
  }

  if (isAdmin) {
    addAdminCard(list, "quiz");
  }
}

function renderLaboratories() {
  let list = document.getElementById("labList");
  list.innerHTML = "";

  if (laboratories.length === 0) {
    let empty = document.createElement("div");
    empty.className = "empty-message";
    empty.innerText = "There are no laboratory activities added yet.";
    list.appendChild(empty);
  } else {
    laboratories.forEach(function(item) {
      list.appendChild(createOutputCard(item, "LABORATORY"));
    });
  }

  if (isAdmin) {
    addAdminCard(list, "lab");
  }
}

function createOutputCard(item, type) {
  let card = document.createElement("div");
  card.className = "output-card";

  card.onclick = function() {
    openDetails(item, type);
  };

  let image = "";

  if (item.image) {
    image = `<img src="${item.image}" alt="${item.title}">`;
  } else {
    image = `<div class="no-picture">NO PICTURE</div>`;
  }

  card.innerHTML = `
    ${image}
    <div class="output-info">
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.course)}</p>
      <div class="output-meta">
        Date: ${formatDate(item.date)}<br>
        Score: ${escapeHTML(item.score)}
      </div>
    </div>
  `;

  return card;
}

function openDetails(item, type) {
  currentOutput = {
    item: item,
    type: type
  };

  document.getElementById("detailType").innerText = type;
  document.getElementById("detailTitle").innerText = item.title;
  document.getElementById("detailCourse").innerText = item.course;
  document.getElementById("detailDate").innerText = formatDate(item.date);
  document.getElementById("detailScore").innerText = item.score;
  document.getElementById("detailDescription").innerText =
    item.description || "No overview was added.";

  let imageContainer = document.getElementById("detailImageContainer");

  if (item.image) {
    imageContainer.innerHTML = `
      <img class="detail-image" src="${item.image}" alt="${item.title}">
    `;

    imageContainer.querySelector("img").onclick = function() {
      openImage(item.image);
    };
  } else {
    imageContainer.innerHTML = `
      <div class="detail-no-image">NO SCREENSHOT</div>
    `;
  }

  let removeButton = document.getElementById("detailRemove");

  if (isAdmin) {
    removeButton.style.display = "block";
  } else {
    removeButton.style.display = "none";
  }

  document.getElementById("detailModal").classList.add("show");
}

function closeDetails() {
  document.getElementById("detailModal").classList.remove("show");
  currentOutput = null;
}

function deleteCurrentOutput() {
  if (!isAdmin || !currentOutput) {
    return;
  }

  if (!confirm("Remove this output?")) {
    return;
  }

  let id = currentOutput.item.id;

  if (currentOutput.type === "QUIZ") {
    quizzes = quizzes.filter(function(item) {
      return item.id !== id;
    });

    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    renderQuizzes();
  }

  if (currentOutput.type === "LABORATORY") {
    laboratories = laboratories.filter(function(item) {
      return item.id !== id;
    });

    localStorage.setItem("laboratories", JSON.stringify(laboratories));
    renderLaboratories();
  }

  closeDetails();
}

function openExam(exam) {
  currentExam = exam;

  document.getElementById("examTitle").innerText =
    exam.toUpperCase();

  document.getElementById("examForm").classList.add("show");

  showExams();
}

function closeExam() {
  document.getElementById("examForm").classList.remove("show");
}

function addExam() {
  if (!isAdmin) {
    return;
  }

  let title = prompt("Exam output title:");

  if (!title) {
    return;
  }

  let course = prompt("Course:");

  if (!course) {
    return;
  }

  let date = prompt("Date submitted:");

  if (!date) {
    return;
  }

  let score = prompt("Score:");

  if (!score) {
    return;
  }

  let description = prompt("Overview:") || "";

  let input = document.getElementById("examPicture");

  input.value = "";

  input.onchange = function() {
    let file = input.files[0];

    if (!file) {
      saveExam(title, course, date, score, description, "");
      return;
    }

    let reader = new FileReader();

    reader.onload = function(event) {
      saveExam(
        title,
        course,
        date,
        score,
        description,
        event.target.result
      );
    };

    reader.readAsDataURL(file);
  };

  input.click();
}

function saveExam(title, course, date, score, description, image) {
  exams[currentExam].push({
    id: Date.now(),
    title: title,
    course: course,
    date: date,
    score: score,
    description: description,
    image: image
  });

  localStorage.setItem("exams", JSON.stringify(exams));

  showExams();
}

function showExams() {
  let list = document.getElementById("examList");
  list.innerHTML = "";

  let outputs = exams[currentExam] || [];

  if (outputs.length === 0) {
    list.innerHTML = `
      <div class="empty-message">
        There are no ${currentExam.toLowerCase()} exam outputs added yet.
      </div>
    `;

    if (isAdmin) {
      addExamButton();
    }

    return;
  }

  outputs.forEach(function(item) {
    let box = document.createElement("div");
    box.className = "exam-output";

    if (item.image) {
      box.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h4>${escapeHTML(item.title)}</h4>
        <p>
          ${escapeHTML(item.course)} |
          ${formatDate(item.date)} |
          Score: ${escapeHTML(item.score)}
        </p>
      `;
    } else {
      box.innerHTML = `
        <div class="exam-no-picture">NO SCREENSHOT</div>
        <h4>${escapeHTML(item.title)}</h4>
        <p>
          ${escapeHTML(item.course)} |
          ${formatDate(item.date)} |
          Score: ${escapeHTML(item.score)}
        </p>
      `;
    }

    box.onclick = function() {
      openDetails(item, currentExam.toUpperCase());
    };

    if (isAdmin) {
      let remove = document.createElement("button");
      remove.className = "exam-remove";
      remove.innerText = "REMOVE";

      remove.onclick = function(event) {
        event.stopPropagation();
        removeExam(item.id);
      };

      box.appendChild(remove);
    }

    list.appendChild(box);
  });

  if (isAdmin) {
    addExamButton();
  }
}

function addExamButton() {
  let button = document.createElement("button");

  button.className = "add-btn";
  button.innerText = "+ ADD EXAM OUTPUT";
  button.onclick = addExam;

  document.getElementById("examList").appendChild(button);
}

function removeExam(id) {
  if (!isAdmin) {
    return;
  }

  if (!confirm("Remove this exam output?")) {
    return;
  }

  exams[currentExam] = exams[currentExam].filter(function(item) {
    return item.id !== id;
  });

  localStorage.setItem("exams", JSON.stringify(exams));

  showExams();
}

function openImage(image) {
  document.getElementById("bigImage").src = image;
  document.getElementById("imageViewer").classList.add("show");
}

function closeImage() {
  document.getElementById("imageViewer").classList.remove("show");
  document.getElementById("bigImage").src = "";
}

function formatDate(date) {
  if (!date) {
    return "Not specified";
  }

  let d = new Date(date + "T00:00:00");

  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function escapeHTML(text) {
  let div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML;
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeImage();
    closeForm();
    closeExam();
    closeDetails();
    closeLogin();
  }
});