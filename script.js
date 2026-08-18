let type = "";
let currentExam = "";

let exams = {
  Prelims: [],
  Midterm: [],
  Finals: []
};


function openForm(x) {

  type = x;

  document.getElementById("form")
  .classList.add("show");


  if (x == "quiz") {

    document.getElementById("formType")
    .innerText = "QUIZ";

    document.getElementById("formTitle")
    .innerText = "Add Quiz";

  } else {

    document.getElementById("formType")
    .innerText = "LABORATORY";

    document.getElementById("formTitle")
    .innerText = "Add Laboratory";

  }

}


function closeForm() {

  document.getElementById("form")
  .classList.remove("show");

}


function addOutput() {

  let title =
    document.getElementById("title").value;

  let description =
    document.getElementById("description").value;

  let file =
    document.getElementById("picture").files[0];


  if (title == "" || description == "") {

    alert("Please complete the title and description.");

    return;
  }


  let card =
    document.createElement("div");

  card.className = "output-card";


  if (file) {

    let image =
      URL.createObjectURL(file);


    card.innerHTML = `

      <img src="${image}"
      alt="Output"
      onclick="openImage('${image}')">

      <div class="output-info">

        <h3>${title}</h3>

        <p>${description}</p>

      </div>

      <button
      class="remove"
      onclick="removeOutput(this)">

        REMOVE

      </button>

    `;

  } else {

    card.innerHTML = `

      <div class="no-picture">
        NO PICTURE
      </div>

      <div class="output-info">

        <h3>${title}</h3>

        <p>${description}</p>

      </div>

      <button
      class="remove"
      onclick="removeOutput(this)">

        REMOVE

      </button>

    `;
  }


  if (type == "quiz") {

    document
    .getElementById("quizList")
    .appendChild(card);

  } else {

    document
    .getElementById("labList")
    .appendChild(card);

  }


  document.getElementById("title").value = "";

  document.getElementById("description").value = "";

  document.getElementById("picture").value = "";


  closeForm();

}


function removeOutput(button) {

  if (confirm("Remove this output?")) {

    button.parentElement.remove();

  }

}


/* EXAM */

function openExam(exam) {

  currentExam = exam;

  document.getElementById("examTitle")
  .innerText = exam.toUpperCase();

  document.getElementById("examForm")
  .classList.add("show");

  showExams();

}


function closeExam() {

  document.getElementById("examForm")
  .classList.remove("show");

}


function addExam() {

  let input =
    document.getElementById("examPicture");


  input.value = "";

  input.click();


  input.onchange = function() {

    let file = input.files[0];


    if (file) {

      let image =
        URL.createObjectURL(file);

      exams[currentExam].push(image);

      showExams();

    }

  };

}


function showExams() {

  let list =
    document.getElementById("examList");

  list.innerHTML = "";


  if (exams[currentExam].length == 0) {

    list.innerHTML =
      "<p>No exam output yet.</p>";

    return;

  }


  exams[currentExam].forEach(
    function(image, index) {

      let box =
        document.createElement("div");

      box.className =
        "exam-output";


      box.innerHTML = `

        <img
        src="${image}"
        alt="Exam Output"
        onclick="openImage('${image}')">

        <button
        class="exam-remove"
        onclick="removeExam(${index})">

          REMOVE

        </button>

      `;


      list.appendChild(box);

    }
  );

}


function removeExam(index) {

  if (confirm("Remove this exam output?")) {

    exams[currentExam]
    .splice(index, 1);

    showExams();

  }

}


/* BIG IMAGE */

function openImage(image) {

  document.getElementById("bigImage")
  .src = image;

  document.getElementById("imageViewer")
  .classList.add("show");

}


function closeImage() {

  document.getElementById("imageViewer")
  .classList.remove("show");

  document.getElementById("bigImage")
  .src = "";

}


/* CLOSE WITH ESC */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key == "Escape") {

      closeImage();
      closeForm();
      closeExam();

    }

  }
);
