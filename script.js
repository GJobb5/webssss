function updateTime() {
  const startDate = new Date(2023, 9, 17);
  const now = new Date();
  const diff = now - startDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const years = Math.floor(days / 365.25);
  const months = Math.floor((days % 365.25) / 30.44);
  const remainingDays = Math.floor((days % 365.25) % 30.44);

  const hourPart = hours % 24;
  const minutePart = minutes % 60;
  const secondPart = seconds % 60;

  document.getElementById("output").innerHTML = `
    <div>ผ่านไปแล้ว</div>
    <div class="time">${years} ปี ${months} เดือน ${remainingDays} วัน</div>
    <div class="time">${hourPart.toString().padStart(2, '0')} : 
                     ${minutePart.toString().padStart(2, '0')} : 
                     ${secondPart.toString().padStart(2, '0')}</div>
  `;
}

function toggleTheme() {
  const body = document.body;
  const isLight = body.classList.contains("light");

  body.classList.toggle("light", !isLight);
  const nextTheme = isLight ? "dark" : "light";

  localStorage.setItem("theme", nextTheme);
  document.getElementById("themeToggle").textContent = nextTheme === "dark" ? "🌙" : "🌞";

  applyCreditTheme();
  updateCanvasBackground();
}

function loadTheme() {
  const hour = new Date().getHours();
  const defaultTheme = hour >= 6 && hour < 18 ? "light" : "dark";
  const savedTheme = localStorage.getItem("theme") || defaultTheme;

  document.body.classList.remove("light");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  document.getElementById("themeToggle").textContent = savedTheme === "dark" ? "🌙" : "🌞";

  updateCanvasBackground();
}


function animateParticles() {
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");

  // ปรับขนาดของ canvas ให้เต็มหน้าจอ
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const width = canvas.width;
  const height = canvas.height;

  const maxRadius = 250; // ขนาดของโลก

  const particles = [];

  // particles
  for (let i = 0; i < 600; i++) {
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = maxRadius * Math.sin(phi) * Math.cos(theta);
    const y = maxRadius * Math.sin(phi) * Math.sin(theta);
    const z = maxRadius * Math.cos(phi);

    particles.push({ x, y, z });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const angleY = 0.005;
    const angleX = 0.003;

    // หมุน particles
    for (let i = 0; i < particles.length; i++) {
      particles[i] = rotateY(particles[i], angleY);
      particles[i] = rotateX(particles[i], angleX);
    }

    // จัดเรียง particles
    particles.sort((a, b) => b.z - a.z);

    // particles
    for (const p of particles) {
      const scale = maxRadius / (maxRadius + p.z + 200);
      const x2d = p.x * scale + width / 2;
      const y2d = p.y * scale + height / 2;

      const radius = 2 * scale;
      const glowColor = `rgba(0, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${scale})`;

      ctx.beginPath();
      ctx.arc(x2d, y2d, radius, 0, Math.PI * 2);
      ctx.fillStyle = glowColor;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 20 * scale;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(draw);
  }

  function rotateY(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = point.x * cos - point.z * sin;
    const z = point.z * cos + point.x * sin;
    return { ...point, x, z };
  }

  function rotateX(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const y = point.y * cos - point.z * sin;
    const z = point.z * cos + point.y * sin;
    return { ...point, y, z };
  }

  draw();
}



function addCredit() {
  const credit = document.createElement("div");
  credit.id = "creditTag";
  credit.textContent = "Rak Fahsai";
  document.body.appendChild(credit);
  applyCreditTheme();
}

function applyCreditTheme() {
  const credit = document.getElementById("creditTag");
  if (!credit) return;

  const isLight = document.body.classList.contains("light");

  credit.style.color = isLight
    ? "rgba(25, 118, 210, 0.5)" // สีเข้มขึ้นสำหรับธีมสว่าง
    : "rgba(0, 255, 255, 0.6)"; // สีฟ้าเรืองสำหรับธีมมืด

  credit.style.textShadow = isLight
    ? "0 0 6px rgba(25, 118, 210, 0.2)"
    : "0 0 10px rgba(0, 255, 255, 0.3)";
}

function updateCanvasBackground() {
  const canvas = document.getElementById("background");
  const isLight = document.body.classList.contains("light");

  canvas.style.background = isLight
    ? "radial-gradient(ellipse at center, #e0f7ff, #b3e5fc)" // สีฟ้าอ่อน
    : "radial-gradient(ellipse at center, #000015, #000010)"; // ดั้งเดิม
}




document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  animateParticles();
  updateTime();
  setInterval(updateTime, 100);
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  addCredit();
});