"use strict";

// PathPilot AI — Career roadmap generator
const STORAGE_KEY = "pathpilotAI";
const $ = (selector) => document.querySelector(selector);

const careers = {
  software: {
    title: "Software Developer",
    icon: "⌘",
    color: "#eee8ff",
    description: "Build applications and solve problems with code.",
    phases: [
      {
        title: "Build your foundations",
        description: "Learn the fundamentals of programming.",
        tasks: [
          ["Learn programming basics", "Practice variables, conditions, loops and functions.", "1 week"],
          ["Practice arrays and strings", "Solve beginner problems and understand your solutions.", "2 weeks"],
          ["Learn Git and GitHub", "Create a repository and practise making commits.", "1 week"]
        ]
      },
      {
        title: "Master core concepts",
        description: "Strengthen your problem-solving skills.",
        tasks: [
          ["Study data structures", "Learn arrays, linked lists, stacks and queues.", "2 weeks"],
          ["Practise coding problems", "Solve beginner problems and review your mistakes.", "2 weeks"],
          ["Build a mini-project", "Create a task manager or expense tracker.", "2 weeks"]
        ]
      },
      {
        title: "Prepare for opportunities",
        description: "Turn your knowledge into a portfolio.",
        tasks: [
          ["Build a portfolio project", "Create a useful project and document its features.", "2 weeks"],
          ["Learn debugging and testing", "Test edge cases and fix errors.", "1 week"],
          ["Prepare for interviews", "Practise coding questions and explain your projects.", "2 weeks"]
        ]
      }
    ]
  },

  web: {
    title: "Web Developer",
    icon: "◈",
    color: "#e2f7f0",
    description: "Create attractive and interactive websites.",
    phases: [
      {
        title: "Learn web foundations",
        description: "Understand the building blocks of websites.",
        tasks: [
          ["Learn HTML", "Build pages with headings, sections, links and forms.", "1 week"],
          ["Learn CSS", "Practise colours, layouts, Flexbox and Grid.", "2 weeks"],
          ["Learn JavaScript basics", "Understand variables, functions, arrays and objects.", "2 weeks"]
        ]
      },
      {
        title: "Build interactive websites",
        description: "Make websites respond to user actions.",
        tasks: [
          ["Learn DOM manipulation", "Update page content using JavaScript.", "1 week"],
          ["Handle forms and events", "Build validated forms and interactive buttons.", "1 week"],
          ["Save browser data", "Use localStorage to save user preferences and progress.", "1 week"]
        ]
      },
      {
        title: "Create your portfolio",
        description: "Build, test and publish real projects.",
        tasks: [
          ["Build a complete website", "Create a responsive website with multiple features.", "2 weeks"],
          ["Test on mobile devices", "Check navigation, forms and accessibility.", "1 week"],
          ["Publish your portfolio", "Use GitHub and deploy your website.", "1 week"]
        ]
      }
    ]
  },

  data: {
    title: "Data Analyst",
    icon: "▥",
    color: "#fff0d9",
    description: "Turn data into useful insights and decisions.",
    phases: [
      {
        title: "Understand data basics",
        description: "Learn how to organise and explore information.",
        tasks: [
          ["Learn spreadsheet skills", "Practise formulas, sorting, filters and pivot tables.", "1 week"],
          ["Study basic statistics", "Understand averages, distributions and outliers.", "2 weeks"],
          ["Learn SQL fundamentals", "Practise SELECT, WHERE, GROUP BY and ORDER BY.", "2 weeks"]
        ]
      },
      {
        title: "Analyse datasets",
        description: "Clean information and find meaningful patterns.",
        tasks: [
          ["Practise data cleaning", "Handle missing values and duplicate records.", "1 week"],
          ["Learn SQL joins", "Combine information from multiple tables.", "2 weeks"],
          ["Create charts and dashboards", "Present trends with clear visualisations.", "2 weeks"]
        ]
      },
      {
        title: "Build an analysis portfolio",
        description: "Present your findings clearly.",
        tasks: [
          ["Choose a public dataset", "Select a dataset and define a useful question.", "1 week"],
          ["Complete a data project", "Clean, analyse and visualise the dataset.", "2 weeks"],
          ["Write a project report", "Explain your methods, findings and limitations.", "1 week"]
        ]
      }
    ]
  },

  ai: {
    title: "AI / ML Engineer",
    icon: "✳",
    color: "#e7edff",
    description: "Build intelligent applications using data and models.",
    phases: [
      {
        title: "Build technical foundations",
        description: "Develop your programming and mathematics skills.",
        tasks: [
          ["Learn Python fundamentals", "Practise functions, lists, dictionaries and files.", "2 weeks"],
          ["Study essential mathematics", "Review vectors, matrices, probability and statistics.", "2 weeks"],
          ["Explore data with Python", "Work with small datasets and notebooks.", "1 week"]
        ]
      },
      {
        title: "Explore machine learning",
        description: "Understand how models learn from data.",
        tasks: [
          ["Learn data preparation", "Clean datasets and prepare training examples.", "1 week"],
          ["Study machine learning basics", "Explore regression, classification and evaluation.", "2 weeks"],
          ["Build a beginner ML project", "Train a simple model and evaluate its results.", "2 weeks"]
        ]
      },
      {
        title: "Build and present a project",
        description: "Make your work understandable and reproducible.",
        tasks: [
          ["Evaluate your model", "Compare results using suitable evaluation metrics.", "1 week"],
          ["Create a simple demo", "Show model inputs, outputs and limitations.", "2 weeks"],
          ["Document your project", "Explain your code, data sources and results.", "1 week"]
        ]
      }
    ]
  },

  cyber: {
    title: "Cybersecurity Analyst",
    icon: "⬡",
    color: "#ffe8ed",
    description: "Learn to protect systems and investigate security events.",
    phases: [
      {
        title: "Learn security foundations",
        description: "Understand computers, networks and security principles.",
        tasks: [
          ["Study networking basics", "Learn IP addresses, DNS, ports and protocols.", "2 weeks"],
          ["Practise Linux commands", "Explore files, permissions and processes in a safe environment.", "1 week"],
          ["Learn security fundamentals", "Understand access control and common threats.", "1 week"]
        ]
      },
      {
        title: "Practise defensive security",
        description: "Learn how to investigate and respond to alerts.",
        tasks: [
          ["Understand system logs", "Explore sample logs and identify unusual activity.", "2 weeks"],
          ["Learn incident response", "Study investigation, documentation and escalation.", "1 week"],
          ["Complete a safe lab", "Use a beginner lab you are authorised to access.", "2 weeks"]
        ]
      },
      {
        title: "Build a security portfolio",
        description: "Demonstrate your investigation and reasoning skills.",
        tasks: [
          ["Write an incident report", "Document evidence, impact and recommendations.", "1 week"],
          ["Practise security concepts", "Review threats, defensive controls and safe exercises.", "2 weeks"],
          ["Publish a lab write-up", "Explain the setup, findings and lessons learned.", "1 week"]
        ]
      }
    ]
  }
};

let appData = loadData();
let toastTimer;

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      roadmap: null
    };
  } catch (error) {
    console.error("Could not load saved data:", error);
    return { roadmap: null };
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  } catch (error) {
    console.error("Could not save data:", error);
    showToast("Unable to save. Check your browser storage settings.");
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// Create the career cards.
function renderCareers() {
  $("#careerGrid").innerHTML = Object.entries(careers).map(([key, career]) => `
    <article class="career-card">
      <div class="career-icon"
           style="background:${career.color};color:#7657e8">
        ${career.icon}
      </div>
      <h3>${career.title}</h3>
      <p>${career.description}</p>
      <button type="button" data-career="${key}">
        Explore this career →
      </button>
    </article>
  `).join("");
}

// Create a roadmap from the selected career and assessment answers.
function createRoadmap(answers) {
  const career = careers[answers.career];

  return {
    careerKey: answers.career,
    careerTitle: career.title,
    education: answers.education,
    experience: answers.experience,
    skills: answers.skills,
    hours: Number(answers.hours),
    timeline: Number(answers.timeline),
    learningStyle: answers.learningStyle,
    createdAt: new Date().toISOString(),

    phases: career.phases.map((phase, phaseIndex) => ({
      title: phase.title,
      description: phase.description,

      tasks: phase.tasks.map((task, taskIndex) => ({
        id: `${phaseIndex}-${taskIndex}`,
        title: task[0],
        description: task[1],
        duration: task[2],
        completed: false
      }))
    }))
  };
}

function getTasks() {
  if (!appData.roadmap) return [];

  return appData.roadmap.phases.flatMap(phase => phase.tasks);
}

function getProgress() {
  const tasks = getTasks();
  const completed = tasks.filter(task => task.completed).length;
  const total = tasks.length;

  return {
    completed,
    total,
    percent: total ? Math.round(completed / total * 100) : 0
  };
}

// Display the roadmap summary and its learning phases.
function renderRoadmap() {
  const roadmap = appData.roadmap;

  if (!roadmap) {
    $("#roadmap").classList.add("hidden");
    renderDashboard();
    return;
  }

  $("#roadmap").classList.remove("hidden");

  $("#roadmapSubtitle").textContent =
    `A ${roadmap.timeline}-month learning plan for your ${roadmap.careerTitle} goal.`;

  const progress = getProgress();

  $("#roadmapSummary").innerHTML = `
    <div class="summary-card">
      <small>TARGET CAREER</small>
      <strong>${roadmap.careerTitle}</strong>
      <small>${roadmap.experience} · ${roadmap.education}</small>
    </div>
    <div class="summary-card">
      <small>TARGET TIMELINE</small>
      <strong>${roadmap.timeline} months</strong>
      <small>Your learning journey</small>
    </div>
    <div class="summary-card">
      <small>STUDY COMMITMENT</small>
      <strong>${roadmap.hours} hrs/week</strong>
      <small>Consistency matters</small>
    </div>
  `;

  $("#phaseList").innerHTML = roadmap.phases.map((phase, index) => `
    <article class="phase">
      <h4>0${index + 1}. ${phase.title}</h4>
      <p>${phase.description}</p>

      ${phase.tasks.map(task => `
        <label class="task ${task.completed ? "completed" : ""}">
          <input
            type="checkbox"
            data-task-id="${task.id}"
            ${task.completed ? "checked" : ""}
          >
          <span>
            ${task.title}
            <small>${task.description}</small>
            <small>Estimated time: ${task.duration}</small>
          </span>
        </label>
      `).join("")}
    </article>
  `).join("");

  $("#progressNumber").textContent = `${progress.percent}%`;

  $("#progressCircle").style.background =
    `conic-gradient(#7657e8 ${progress.percent * 3.6}deg, #eeeaf7 0deg)`;

  $("#completedCount").textContent =
    `${progress.completed} / ${progress.total}`;

  $("#studyCommitment").textContent =
    `${roadmap.hours} hrs/week`;

  if (progress.percent === 100) {
    $("#progressMessage").textContent =
      "Amazing work! You completed every task.";
  } else if (progress.percent > 0) {
    $("#progressMessage").textContent =
      "Great start! Keep building your momentum.";
  } else {
    $("#progressMessage").textContent =
      "Every small step counts. Start with one task.";
  }

  renderDashboard();
}

// Save a new roadmap when the form is submitted.
$("#roadmapForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const answers = {
    career: $("#careerGoal").value,
    education: $("#education").value,
    experience: $("#experience").value,
    skills: $("#skills").value.trim(),
    hours: $("#hours").value,
    timeline: $("#timeline").value,
    learningStyle: $("#learningStyle").value
  };

  if (!careers[answers.career]) {
    showToast("Please select a career.");
    return;
  }

  const button = $("#generateBtn");
  button.disabled = true;
  button.textContent = "Creating your roadmap...";

  // Small delay to display feedback while the local roadmap is created.
  setTimeout(() => {
    appData.roadmap = createRoadmap(answers);
    saveData();
    renderRoadmap();

    button.disabled = false;
    button.textContent = "Generate my roadmap ✦";

    scrollToSection("roadmap");
    showToast("Your demo roadmap is ready!");
  }, 350);
});

// Clicking a career card selects it in the assessment form.
$("#careerGrid").addEventListener("click", function (event) {
  const button = event.target.closest("[data-career]");
  if (!button) return;

  $("#careerGoal").value = button.dataset.career;
  scrollToSection("assessment");
});

// Update task status, then immediately refresh progress.
$("#phaseList").addEventListener("change", function (event) {
  const checkbox = event.target.closest("[data-task-id]");
  if (!checkbox || !appData.roadmap) return;

  const task = getTasks().find(
    item => item.id === checkbox.dataset.taskId
  );

  if (!task) return;

  task.completed = checkbox.checked;

  saveData();
  renderRoadmap();

  showToast(task.completed
    ? "Task completed. Nice work!"
    : "Task marked incomplete.");
});

// Render the dashboard.
function renderDashboard() {
  const container = $("#dashboardContent");
  const roadmap = appData.roadmap;

  if (!roadmap) {
    container.innerHTML = `
      <div class="dashboard-stat">
        <small>Roadmaps created</small>
        <strong>0</strong>
      </div>
      <div class="dashboard-stat">
        <small>Tasks completed</small>
        <strong>0</strong>
      </div>
      <div class="dashboard-stat">
        <small>Current progress</small>
        <strong>0%</strong>
      </div>
      <div class="dashboard-empty">
        <h3>Your journey is waiting!</h3>
        <p>Create your first career roadmap to see your progress here.</p>
        <button class="btn" id="createFirstRoadmap" type="button">
          Create my roadmap →
        </button>
      </div>
    `;

    $("#createFirstRoadmap").addEventListener("click", () => {
      scrollToSection("assessment");
    });

    return;
  }

  const progress = getProgress();

  container.innerHTML = `
    <div class="dashboard-stat">
      <small>Roadmaps created</small>
      <strong>1</strong>
    </div>
    <div class="dashboard-stat">
      <small>Tasks completed</small>
      <strong>${progress.completed}</strong>
    </div>
    <div class="dashboard-stat">
      <small>Current progress</small>
      <strong>${progress.percent}%</strong>
    </div>

    <div class="dashboard-roadmap">
      <p class="eyebrow">YOUR ACTIVE ROADMAP</p>
      <h3>${roadmap.careerTitle}</h3>
      <p>
        ${progress.total} tasks · ${roadmap.timeline} months ·
        ${roadmap.hours} study hours/week
      </p>
      <div class="progress">
        <span style="width:${progress.percent}%"></span>
      </div>
      <button class="btn" id="viewRoadmap" type="button">
        View roadmap →
      </button>
    </div>
  `;

  $("#viewRoadmap").addEventListener("click", () => {
    scrollToSection("roadmap");
  });
}

// Reset all task checkboxes after confirmation.
$("#resetProgressBtn").addEventListener("click", function () {
  if (!appData.roadmap) return;

  const confirmed = confirm("Reset all completed tasks?");

  if (!confirmed) return;

  getTasks().forEach(task => {
    task.completed = false;
  });

  saveData();
  renderRoadmap();
  showToast("Progress reset successfully.");
});

// Start another roadmap by returning to the assessment form.
$("#newRoadmapBtn").addEventListener("click", () => {
  $("#roadmapForm").reset();
  scrollToSection("assessment");
});

// Initialize the application.
renderCareers();
renderRoadmap();

$("#year").textContent = new Date().getFullYear();