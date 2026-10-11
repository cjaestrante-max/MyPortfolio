
let isAdmin = false;
let currentType = "";
let currentExam = "";
let currentOutput = null;


const defaultProjects = [
    {
        id: 1001,
        title: "Smart Parking System",
        category: "Hardware",
        tech: ["Arduino Uno", "IR Sensors", "Servo Motor", "LCD", "HC-05 Bluetooth"],
        description: "An automated embedded parking system that detects slot availability and operates barrier gates using sensor feedback."
    },
    {
        id: 1002,
        title: "Barangay Facility and Equipment Reservation Management System",
        category: "Web",
        tech: ["React", "Bootstrap", "Figma"],
        description: "A web platform enabling local community residents to seamlessly request and reserve barangay facilities and tools online."
    },
    {
        id: 1003,
        title: "Coffee Joy Website",
        category: "Web",
        tech: ["HTML", "CSS", "JavaScript"],
        description: "A modern, responsive landing page and product presentation for a local coffee brand concept."
    },
    {
        id: 1004,
        title: "Personal Portfolio Website",
        category: "Web",
        tech: ["HTML", "CSS", "JavaScript"],
        description: "Interactive academic and project showcase platform built to manage coursework, quizzes, labs, and system outputs."
    },
    {
        id: 1005,
        title: "Student Record Processor",
        category: "Desktop",
        tech: ["C#", ".NET"],
        description: "Desktop utility designed to handle, validate, calculate grades, and structure student records efficiently."
    },
    {
        id: 1006,
        title: "Point of Sale System",
        category: "Desktop",
        tech: ["C#", "Windows Forms", "MySQL"],
        description: "Complete POS system supporting inventory management, real-time transaction processing, and automated sales recording."
    },
    {
        id: 1007,
        title: "Coffee Roaster App UI",
        category: "UI/UX",
        tech: ["Figma"],
        description: "Mobile user interface prototype designed for coffee roasting control and roast profiling monitoring."
    },
    {
        id: 1008,
        title: "Bootstrap Activity",
        category: "Web",
        tech: ["HTML", "Bootstrap"],
        description: "Responsive web design activity demonstrating fluid grid layouts, components, and Bootstrap utility classes."
    }
];



let defaultQuizzes = [
    {
        id: 1,
        title: "Quiz 1",
        course: "Cloud Computing",
        date: "2026-08-24",
        score: "17/20",
        description: "Quiz 1 assessment for Cloud Computing.",
        image: "images/quiz1.png"
    },
    {
        id: 2,
        title: "Quiz 2",
        course: "Cloud Computing",
        date: "2026-08-31",
        score: "19/20",
        description: "Quiz 2 assessment for Cloud Computing.",
        image: "images/quiz2.png"
    },
    {
        id: 3,
        title: "Quiz 3",
        course: "Cloud Computing",
        date: "2026-09-07",
        score: "20/20",
        description: "Quiz 3 assessment for Cloud Computing.",
        image: "images/quiz3.png"
    },
    {
        id: 4,
        title: "Quiz 4",
        course: "Cloud Computing",
        date: "2026-10-07",
        score: "14/25",
        description: "Quiz 4 assessment for Cloud Computing.",
        image: "images/quiz4.png"
    },
    {
        id: 5,
        title: "Quiz 5",
        course: "Cloud Computing",
        date: "2026-10-07",
        score: "/35",
        description: "Quiz 4 assessment for Cloud Computing. Naka record kay sir yung score hehe",
        image: "images/quiz5.png"
    },
    {
        id: 6,
        title: "Long Quiz",
        course: "Cloud Computing",
        date: "2026-09-14",
        score: "37/40",
        description: "Long Quiz assessment covering initial modules.",
        image: "images/longquiz.png"
    }
];

let defaultLaboratories = [
    {
        id: 101,
        title: "Laboratory Activity 1",
        course: "Cloud Computing",
        date: "2026-08-25",
        score: "75/100",
        description: "Overview and documentation for Laboratory Activity 1.",
        image: "images/lab1.png",
        pdfUrl: "files/Estrante Labaratory.pdf"
    },
    {
        id: 102,
        title: "Laboratory Activity 2",
        course: "Cloud Computing",
        date: "2026-09-01",
        score: "90/100",
        description: "Overview and documentation for Laboratory Activity 2.",
        image: "images/lab2.png",
        pdfUrl: "files/lab-Estrante(2).pdf"
    },
    {
        id: 103,
        title: "Laboratory Activity 3",
        course: "Cloud Computing",
        date: "2026-09-08",
        score: "95/100",
        description: "Screenshot output for Laboratory Activity 3.",
        image: "images/lab3.png"
    }
];

let defaultExams = {
    Prelims: [
        {
            id: 201,
            title: "Prelims Examination",
            course: "Cloud Computing",
            date: "2026-09-23",
            score: "86",
            description: "Prelims Examination Output",
            image: "images/prelims.png"
        }
    ],
    Midterm: [],
    Finals: []
};

// SAFE LOCAL STORAGE CHECK
let savedQuizzes = JSON.parse(localStorage.getItem("quizzes"));
let quizzes = (savedQuizzes && savedQuizzes.length > 0 && savedQuizzes[0].image) ? savedQuizzes : defaultQuizzes;

let savedLabs = JSON.parse(localStorage.getItem("laboratories"));
let laboratories = (savedLabs && savedLabs.length > 0 && savedLabs[0].image) ? savedLabs : defaultLaboratories;

let savedExams = JSON.parse(localStorage.getItem("exams"));
let exams = (savedExams && savedExams.Prelims && savedExams.Prelims.length > 0 && savedExams.Prelims[0].image) ? savedExams : defaultExams;

const ADMIN_PASSWORD = "CJ2026";

/* =========================
   INITIALIZATION
   ========================= */

document.addEventListener("DOMContentLoaded", function () {
    // 3-Second High-Tech Glassmorphism Splash Screen Loader & Percentage Counter
    let percentCounter = 0;
    const percentEl = document.getElementById("splashPercent");
    const percentInterval = setInterval(() => {
        if (percentCounter < 100) {
            percentCounter += 2;
            if (percentEl) percentEl.innerText = percentCounter + "%";
        } else {
            clearInterval(percentInterval);
        }
    }, 50);

    setTimeout(() => {
        const splash = document.getElementById("splashScreen");
        if (splash) {
            splash.style.opacity = "0";
            splash.style.visibility = "hidden";
        }
    }, 3000);

    renderProjects(defaultProjects);
    renderQuizzes();
    renderLaboratories();
    updateAdminView();
    initTypewriter();
    initCursorGlow();
});

/* =========================
   GIMIK #1: MOUSE CURSOR GLOW
   ========================= */

function initCursorGlow() {
    const glow = document.getElementById("cursorGlow");
    if (!glow) return;

    document.addEventListener("mousemove", (e) => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
    });
}



function initTypewriter() {
    const typewriterEl = document.getElementById("typewriterText");
    if (!typewriterEl) return;

    const phrases = ["BSIT 3B Student", "Software Developer", "IoT Hardware Builder", "UI/UX Designer"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.innerText = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.innerText = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}



function copyProjectTechStack() {
    const title = document.getElementById("detailTitle").innerText;
    const tech = document.getElementById("detailScore").innerText;
    const textToCopy = `Project: ${title} | Tech Stack: ${tech}`;

    navigator.clipboard.writeText(textToCopy);
    showToast("📋 Specs & Tech Stack copied to clipboard!");
}




function renderProjects(data) {
    const container = document.getElementById("projectsList");
    if (!container) return;

    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = `<div class="empty-message">No matching projects found.</div>`;
        return;
    }

    data.forEach((p) => {
        const card = document.createElement("div");
        card.className = "output-card";
        card.onclick = () => openProjectDetails(p);

        const techBadges = p.tech
            .map(
                (t) =>
                    `<span style="background:#111; color:#fff; font-size:10px; padding:3px 7px; margin-right:4px; display:inline-block; margin-top:8px;">${t}</span>`
            )
            .join("");

        card.innerHTML = `
            <div class="output-info" style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
                <div>
                    <p style="font-size:10px; letter-spacing:1px; color:#777; text-transform:uppercase; font-weight:bold;">${p.category}</p>
                    <h3 style="margin:8px 0; font-size:18px;">${escapeHTML(p.title)}</h3>
                    <p style="color:#555; font-size:12px; margin-bottom:10px; line-height:1.5;">${escapeHTML(p.description)}</p>
                </div>
                <div>${techBadges}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterProjects() {
    const searchInput = document.getElementById("projectSearch");
    const categorySelect = document.getElementById("projectCategory");

    if (!searchInput || !categorySelect) return;

    const search = searchInput.value.toLowerCase().trim();
    const cat = categorySelect.value;

    const filtered = defaultProjects.filter((p) => {
        const matchesCategory = cat === "ALL" || p.category.toLowerCase() === cat.toLowerCase();
        const matchesSearch =
            p.title.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search) ||
            p.tech.some((t) => t.toLowerCase().includes(search));

        return matchesCategory && matchesSearch;
    });

    renderProjects(filtered);
}

function openProjectDetails(p) {
    currentOutput = null;

    document.getElementById("detailType").innerText = "PROJECT";
    document.getElementById("detailTitle").innerText = p.title;
    document.getElementById("detailCourse").innerText = p.category;
    document.getElementById("detailDate").innerText = "N/A";
    document.getElementById("detailScore").innerText = p.tech.join(", ");
    document.getElementById("detailDescription").innerText = p.description;

    document.getElementById("detailImageContainer").innerHTML = `
        <div class="detail-no-image">NO PICTURE ATTACHED</div>
    `;

    const pdfContainer = document.getElementById("detailPdfContainer");
    pdfContainer.style.display = "none";
    pdfContainer.innerHTML = "";

    const removeBtn = document.getElementById("detailRemove");
    if (removeBtn) removeBtn.style.display = "none";

    document.getElementById("detailModal").classList.add("show");
}



window.addEventListener("scroll", () => {
    const progress = document.getElementById("scrollProgressBar");
    if (!progress) return;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progress.style.width = scrolled + "%";
});



function showToast(msg) {
    const toast = document.getElementById("toastNotification");
    if (!toast) return;
    toast.innerText = msg;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}

function copyEmail(e) {
    e.preventDefault();
    const email = "chrisjosephestrante@gmail.com";
    navigator.clipboard.writeText(email);
    showToast("Email address copied to clipboard!");
}



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
        showToast("Admin mode enabled.");
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

    if (isAdmin && quizList && labList) {
        addAdminCard(quizList, "quiz");
        addAdminCard(labList, "lab");
    }
}

function addAdminCard(list, type) {
    let oldCard = document.getElementById(type === "quiz" ? "addQuizCard" : "addLabCard");
    if (oldCard) oldCard.remove();

    let card = document.createElement("div");
    card.className = "add-card admin-only";
    card.id = type === "quiz" ? "addQuizCard" : "addLabCard";

    card.onclick = function () {
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
    if (!isAdmin) return;

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
    if (!isAdmin) return;

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
        reader.onload = function (event) {
            saveOutput(title, course, date, score, description, event.target.result);
        };
        reader.readAsDataURL(file);
    } else {
        saveOutput(title, course, date, score, description, "");
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
    if (!list) return;

    list.innerHTML = "";

    if (quizzes.length === 0) {
        let empty = document.createElement("div");
        empty.className = "empty-message";
        empty.innerText = "There are no quiz activities added yet.";
        list.appendChild(empty);
    } else {
        quizzes.forEach(function (item) {
            list.appendChild(createOutputCard(item, "QUIZ"));
        });
    }

    if (isAdmin) {
        addAdminCard(list, "quiz");
    }
}

function renderLaboratories() {
    let list = document.getElementById("labList");
    if (!list) return;

    list.innerHTML = "";

    if (laboratories.length === 0) {
        let empty = document.createElement("div");
        empty.className = "empty-message";
        empty.innerText = "There are no laboratory activities added yet.";
        list.appendChild(empty);
    } else {
        laboratories.forEach(function (item) {
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
    card.onclick = function () {
        openDetails(item, type);
    };

    let image = item.image
        ? `<img src="${item.image}" alt="${escapeHTML(item.title)}">`
        : `<div class="no-picture">NO PICTURE</div>`;

    let pdfBtn =
        type === "LABORATORY" && item.pdfUrl
            ? `<div style="margin-top: 12px;">
                <a href="${item.pdfUrl}" target="_blank" class="button" style="padding: 6px 12px; font-size: 11px; display: inline-block;" onclick="event.stopPropagation();">
                  Open Laboratory PDF ↗
                </a>
               </div>`
            : "";

    card.innerHTML = `
        ${image}
        <div class="output-info">
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.course)}</p>
            <div class="output-meta">
                Date: ${formatDate(item.date)} <br>
                Score: ${escapeHTML(item.score)}
            </div>
            ${pdfBtn}
        </div>
    `;

    return card;
}



function openDetails(item, type) {
    currentOutput = { item: item, type: type };

    document.getElementById("detailType").innerText = type;
    document.getElementById("detailTitle").innerText = item.title;
    document.getElementById("detailCourse").innerText = item.course;
    document.getElementById("detailDate").innerText = formatDate(item.date);
    document.getElementById("detailScore").innerText = item.score;
    document.getElementById("detailDescription").innerText = item.description || "No overview was added.";

    let pdfContainer = document.getElementById("detailPdfContainer");

    if (type === "LABORATORY" && item.pdfUrl) {
        pdfContainer.style.display = "block";
        pdfContainer.innerHTML = `
            <b>PDF File:</b>
            <a href="${item.pdfUrl}" target="_blank" style="color: #111; text-decoration: underline;">
                View Attached PDF ↗
            </a>
        `;
    } else {
        pdfContainer.style.display = "none";
        pdfContainer.innerHTML = "";
    }

    let imageContainer = document.getElementById("detailImageContainer");

    if (item.image) {
        imageContainer.innerHTML = `
            <img class="detail-image" src="${item.image}" alt="${escapeHTML(item.title)}">
        `;
        imageContainer.querySelector("img").onclick = function () {
            openImage(item.image);
        };
    } else {
        imageContainer.innerHTML = `<div class="detail-no-image">NO SCREENSHOT</div>`;
    }

    let removeButton = document.getElementById("detailRemove");
    if (removeButton) {
        removeButton.style.display = isAdmin ? "block" : "none";
    }

    document.getElementById("detailModal").classList.add("show");
}

function closeDetails() {
    document.getElementById("detailModal").classList.remove("show");
    currentOutput = null;
}

function deleteCurrentOutput() {
    if (!isAdmin || !currentOutput) return;

    if (!confirm("Remove this output?")) return;

    let id = currentOutput.item.id;

    if (currentOutput.type === "QUIZ") {
        quizzes = quizzes.filter((item) => item.id !== id);
        localStorage.setItem("quizzes", JSON.stringify(quizzes));
        renderQuizzes();
    }

    if (currentOutput.type === "LABORATORY") {
        laboratories = laboratories.filter((item) => item.id !== id);
        localStorage.setItem("laboratories", JSON.stringify(laboratories));
        renderLaboratories();
    }

    closeDetails();
}



function openExam(exam) {
    currentExam = exam;
    document.getElementById("examTitle").innerText = exam.toUpperCase();
    document.getElementById("examForm").classList.add("show");
    showExams();
}

function closeExam() {
    document.getElementById("examForm").classList.remove("show");
}

function addExam() {
    if (!isAdmin) return;

    let title = prompt("Exam output title:");
    if (!title) return;

    let course = prompt("Course:");
    if (!course) return;

    let date = prompt("Date submitted:");
    if (!date) return;

    let score = prompt("Score:");
    if (!score) return;

    let description = prompt("Overview:") || "";

    let input = document.getElementById("examPicture");
    input.value = "";

    input.onchange = function () {
        let file = input.files[0];
        if (!file) {
            saveExam(title, course, date, score, description, "");
            return;
        }

        let reader = new FileReader();
        reader.onload = function (event) {
            saveExam(title, course, date, score, description, event.target.result);
        };
        reader.readAsDataURL(file);
    };

    input.click();
}

function saveExam(title, course, date, score, description, image) {
    if (!exams[currentExam]) {
        exams[currentExam] = [];
    }

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
    if (!list) return;

    list.innerHTML = "";
    let outputs = exams[currentExam] || [];

    if (outputs.length === 0) {
        list.innerHTML = `<div class="empty-message">There are no ${currentExam.toLowerCase()} exam outputs added yet.</div>`;
        if (isAdmin) addExamButton();
        return;
    }

    outputs.forEach(function (item) {
        let box = document.createElement("div");
        box.className = "exam-output";

        let imgMarkup = item.image
            ? `<img src="${item.image}" alt="${escapeHTML(item.title)}">`
            : `<div class="exam-no-picture">NO SCREENSHOT</div>`;

        box.innerHTML = `
            ${imgMarkup}
            <h4>${escapeHTML(item.title)}</h4>
            <p>${escapeHTML(item.course)} | ${formatDate(item.date)} | Score: ${escapeHTML(item.score)}</p>
        `;

        box.onclick = function () {
            openDetails(item, currentExam.toUpperCase());
        };

        if (isAdmin) {
            let remove = document.createElement("button");
            remove.className = "exam-remove";
            remove.innerText = "REMOVE";
            remove.onclick = function (event) {
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
    if (!isAdmin) return;

    if (!confirm("Remove this exam output?")) return;

    exams[currentExam] = exams[currentExam].filter((item) => item.id !== id);
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
    if (!date) return "Not specified";
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



const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let konamiIndex = 0;

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeImage();
        closeForm();
        closeExam();
        closeDetails();
        closeLogin();
        closeTerminal();
    }

    
    if (document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        const k = event.key.toLowerCase();
        if (k === "p") document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        if (k === "q") document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
        if (k === "l") document.getElementById("laboratory")?.scrollIntoView({ behavior: "smooth" });
        if (k === "e") document.getElementById("exam")?.scrollIntoView({ behavior: "smooth" });
        if (k === "h") document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    }

    // Konami Code Tracker
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (key === konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            if (typeof confetti === "function") {
                confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
            }
            showToast("🎉 Konami Code Unlocked! Secret achievement granted!");
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function openTerminal() {
    document.getElementById("terminalModal").classList.add("show");
}

function closeTerminal() {
    document.getElementById("terminalModal").classList.remove("show");
}

function handleTerminalCommand(e) {
    if (e.key === "Enter") {
        const input = document.getElementById("terminalInput");
        const cmd = input.value.trim().toLowerCase();
        const output = document.getElementById("terminalOutput");

        let response = "";
        if (cmd === "help") {
            response = "Available commands: projects, skills, contact, clear, owner, game";
        } else if (cmd === "projects") {
            response = "8 Projects Loaded: Smart Parking System, Barangay Reservation, POS System, Coffee Joy, and more!";
        } else if (cmd === "skills") {
            response = "Tech Stack: React, C#, .NET, Arduino, MySQL, Bootstrap, Figma, HTML, CSS, JS";
        } else if (cmd === "contact") {
            response = "Email: chrisjosephestrante@gmail.com | FB: Chris Joseph Añonuevo";
        } else if (cmd === "owner") {
            response = "Chris Joseph A. Estrante - BSIT 3B Student";
        } else if (cmd === "game") {
            response = "🕹️ Secret Minigame: Type 'play' to unleash confetti or press P, Q, L, E on keyboard for fast navigation!";
        } else if (cmd === "play") {
            if (typeof confetti === "function") confetti({ particleCount: 100, spread: 70 });
            response = "🎉 Level Up! You triggered developer magic!";
        } else if (cmd === "clear") {
            output.innerHTML = "";
            input.value = "";
            return;
        } else {
            response = `Command not recognized: '${cmd}'. Type 'help' for options.`;
        }

        output.innerHTML += `<div><span style="color:#fff;">$ ${cmd}</span><br>${response}</div><br>`;
        output.scrollTop = output.scrollHeight;
        input.value = "";
    }
}