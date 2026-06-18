// Typewriter Effect for Hero Section
const typewriterWords = [
    "AWS & DevOps Infrastructures",
    "CI/CD Build Pipelines",
    "Infrastructure as Code",
    "Kubernetes Deployments",
    "Containerized Microservices"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function type() {
    const currentWord = typewriterWords[wordIndex];
    
    if (isDeleting) {
        // Remove characters
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Add characters
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
        // Pause at the end of the word
        typeSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typewriterWords.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Mobile Menu Navigation
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileCloseBtn = document.getElementById("mobile-close-btn");
const mobileNavDrawer = document.getElementById("mobile-nav-drawer");
const mobileLinks = document.querySelectorAll(".mobile-link");

if (mobileMenuBtn && mobileCloseBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener("click", () => {
        mobileNavDrawer.classList.add("open");
    });

    mobileCloseBtn.addEventListener("click", () => {
        mobileNavDrawer.classList.remove("open");
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileNavDrawer.classList.remove("open");
        });
    });
}

// Active Nav link highlight on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === current) {
            link.classList.add("active");
        }
    });
});

// Interactive Terminal CLI Logic
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");

const helpText = `
Available commands:
  <span class="text-info">about</span>       - Brief professional summary of Sai Kumar
  <span class="text-info">skills</span>      - Technical skill metrics & strengths
  <span class="text-info">projects</span>    - Showcase of DevOps & Cloud projects
  <span class="text-info">education</span>   - Educational background details
  <span class="text-info">contact</span>     - Display phone, email, github, and linkedin links
  <span class="text-info">clear</span>       - Clear the terminal screen
  <span class="text-info">sudo rm -rf /</span>- Run system administrator actions
`;

const aboutText = `
Sai Kumar Bathala - Aspiring AWS & DevOps Engineer.
Passionately designs and deploys scalable cloud infrastructures using AWS.
Active DevOps skills:
  - Proficient in Docker, Kubernetes, Jenkins, Terraform, Linux, Git.
  - Passionate about automation, CI/CD pipelines, and cloud-native architecture.
  - Seeking opportunities to automate developer workloads and manage clusters.
`;

const skillsText = `
Retrieving system technical benchmarks...
[========================================>] 100%

<span class="text-warning">Cloud (AWS):</span>                  [■■■■■■■■■□] 90%
<span class="text-warning">Containers (Docker):</span>          [■■■■■■■■■□] 85%
<span class="text-warning">Orchestration (Kubernetes):</span>   [■■■■■■■■□□] 80%
<span class="text-warning">CI/CD (Jenkins):</span>              [■■■■■■■■□□] 80%
<span class="text-warning">IaC (Terraform):</span>              [■■■■■■■■□□] 82%
<span class="text-warning">Operating System (Linux):</span>     [■■■■■■■■■□] 88%
<span class="text-warning">Web Servers (NGINX/Tomcat):</span>   [■■■■■■■■□□] 80%
<span class="text-warning">Version Control (Git/GitHub):</span> [■■■■■■■■■□] 90%
`;

const projectsText = `
Active Deployed Projects:

1. <span class="text-warning">AWS 3-Tier Architecture Deployment</span>
   - Designed 3-tier architecture (Web, App, DB) in AWS.
   - Built custom VPC, Subnets, Route Tables, IGW, and Security Groups.
   - Run workloads on Linux EC2 instances.

2. <span class="text-warning">Dockerized Application Deployment</span>
   - Containerized legacy systems into multi-stage Docker builds.
   - Managed Docker images, networking, and volume bindings.

3. <span class="text-warning">Infrastructure Automation using Terraform</span>
   - Created Terraform modules for provisioning AWS structures.
   - Managed state lifecycle safely using apply and destroy cycles.

4. <span class="text-warning">Kubernetes Cluster Deployment</span>
   - Handled Pod manifests, Deployments, Services, and scaling.
   - Managed cluster resources using kubectl commands.
`;

const educationText = `
Educational Record:

- <span class="text-warning">B.Tech in Computer Science (AI)</span> (2023 - 2026)
  Siddharth Institute of Engineering and Technology | CGPA: 7.3

- <span class="text-warning">Diploma in Electronics & Communication</span> (2019 - 2023)
  C.R Polytechnic College | Percentage: 69.9%

- <span class="text-warning">SSC</span> (2018 - 2019)
  ZP High School | CGPA: 8.3
`;

const contactText = `
Direct Connections:

- <span class="text-warning">Email:</span>    saikumarbathala2@gmail.com
- <span class="text-warning">LinkedIn:</span> linkedin.com/in/saikumar-bathala
- <span class="text-warning">GitHub:</span>   github.com/saikumarbathala
- <span class="text-warning">Phone:</span>    +91-9390194950
`;

if (terminalInput && terminalOutput) {
    terminalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const commandInput = terminalInput.value.trim();
            const commandLower = commandInput.toLowerCase();
            
            // Print original command line in output
            const promptLine = document.createElement("div");
            promptLine.className = "terminal-line";
            promptLine.innerHTML = `<span class="prompt-user">guest@sai-devops:~$</span> ${commandInput}`;
            terminalOutput.appendChild(promptLine);

            // Command router
            if (commandInput !== "") {
                const responseLine = document.createElement("div");
                responseLine.className = "terminal-line";
                
                switch (commandLower) {
                    case "help":
                        responseLine.innerHTML = helpText;
                        break;
                    case "about":
                        responseLine.innerHTML = aboutText;
                        break;
                    case "skills":
                        responseLine.innerHTML = skillsText;
                        break;
                    case "projects":
                        responseLine.innerHTML = projectsText;
                        break;
                    case "education":
                        responseLine.innerHTML = educationText;
                        break;
                    case "contact":
                        responseLine.innerHTML = contactText;
                        break;
                    case "clear":
                        terminalOutput.innerHTML = "";
                        break;
                    case "sudo rm -rf /":
                        responseLine.innerHTML = `
<span class="text-error">WARNING: Initiating root file system wipe...</span>
Wiping AWS configuration files...
Deleting EC2 instances...
Wiping VPC configurations...
Destroying Kubernetes nodes...
...
<span class="text-error">CRITICAL ERROR: Permission Denied.</span>
Sai Kumar's infrastructure is protected by AWS Identity and Access Management (IAM) and AWS Shield!
Nice try though! 😉
`;
                        break;
                    default:
                        responseLine.innerHTML = `Command not found: <span class="text-error">${commandInput}</span>. Type <span class="text-info">help</span> for a list of commands.`;
                }
                
                if (commandLower !== "clear") {
                    terminalOutput.appendChild(responseLine);
                }
            }

            // Clear input field
            terminalInput.value = "";
            
            // Scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    // Also focus input on terminal window click
    document.querySelector(".terminal-window").addEventListener("click", () => {
        terminalInput.focus();
    });
}

// Initialize scripts
window.addEventListener("DOMContentLoaded", () => {
    // Start typing effect
    if (typewriterElement) {
        setTimeout(type, 1000);
    }
});
