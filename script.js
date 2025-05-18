// Improved Time Calculation
function getDateDiff(start, end) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function updateTime() {
  const startDate = new Date(2023, 9, 17);
  const now = new Date();
  const diff = now - startDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const hourPart = hours % 24;
  const minutePart = minutes % 60;
  const secondPart = seconds % 60;

  const { years, months, days } = getDateDiff(startDate, now);

  document.getElementById("datePart").textContent = 
    `${years} ปี ${months} เดือน ${days} วัน`;
  
  document.getElementById("timePart").textContent = 
    `${hourPart.toString().padStart(2, '0')} : ${minutePart.toString().padStart(2, '0')} : ${secondPart.toString().padStart(2, '0')}`;
  
  if (Math.random() < 0.01) {
    createHeartEffect();
  }
}

function toggleTheme() {
  const body = document.body;
  const isLight = body.classList.contains("light");
  
  body.classList.toggle("light", !isLight);
  const nextTheme = isLight ? "dark" : "light";
  
  localStorage.setItem("theme", nextTheme);
  document.getElementById("themeToggle").textContent = nextTheme === "dark" ? "🌙" : "🌞";
  
  updateCanvasBackground();
}

function loadTheme() {
  const hour = new Date().getHours();
  const defaultTheme = hour >= 6 && hour < 18 ? "light" : "dark";
  const savedTheme = localStorage.getItem("theme") || defaultTheme;
  
  document.body.classList.toggle("light", savedTheme === "light");
  document.getElementById("themeToggle").textContent = savedTheme === "dark" ? "🌙" : "🌞";
  
  updateCanvasBackground();
}

function initParticles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  const resizeCanvas = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  };
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  const particleCount = Math.floor(width * height / 1000);
  const particles = [];
  
  const heartShape = [];
  for (let i = 0; i < 100; i++) {
    const t = i / 100 * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
    heartShape.push({x, y});
  }
  

  for (let i = 0; i < particleCount; i++) {
    const isHeartParticle = i % 20 === 0; 
    const heartPos = heartShape[i % heartShape.length];
    
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      color: `hsl(${Math.random() * 60 + 180}, 100%, ${Math.random() * 30 + 50}%)`,
      isHeartParticle,
      heartPos,
      angle: Math.random() * Math.PI * 2,
      orbitRadius: Math.random() * 50 + 20
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      if (p.isHeartParticle) {
        p.angle += 0.005;
        const heartScale = 8;
        p.x = centerX + (p.heartPos.x * heartScale) * Math.cos(p.angle) - (p.heartPos.y * heartScale) * Math.sin(p.angle);
        p.y = centerY + (p.heartPos.x * heartScale) * Math.sin(p.angle) + (p.heartPos.y * heartScale) * Math.cos(p.angle);
      } else {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;
        
        if (Math.random() < 0.01) {
          p.speedX += (centerX - p.x) * 0.0002;
          p.speedY += (centerY - p.y) * 0.0002;
        }
      }
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.6;
      ctx.fill();
    }
    
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  
  animate();
}

function createHeartEffect() {
  const heart = document.createElement('div');
  heart.style.position = 'fixed';
  heart.style.fontSize = `${Math.random() * 30 + 20}px`;
  heart.style.color = `hsl(${Math.random() * 60 + 330}, 100%, 70%)`;
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '0';
  heart.style.left = `${Math.random() * 80 + 10}%`;
  heart.style.top = `${Math.random() * 80 + 10}%`;
  heart.style.opacity = '0';
  heart.style.transform = 'translate(-50%, -50%) scale(0)';
  heart.style.transition = 'all 1s ease-out';
  heart.textContent = '❤️';
  
  document.getElementById('heartEffect').appendChild(heart);
  
  setTimeout(() => {
    heart.style.opacity = '1';
    heart.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 10);
  
  setTimeout(() => {
    heart.style.opacity = '0';
    heart.style.transform = 'translate(-50%, -50%) scale(0) translateY(-100px)';
  }, 1000);
  
  setTimeout(() => {
    heart.remove();
  }, 2000);
}

function updateCanvasBackground() {
  const canvas = document.getElementById("background");
  const ctx = canvas.getContext("2d");
  const isLight = document.body.classList.contains("light");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const gradient = ctx.createRadialGradient(
    canvas.width / 2, 
    canvas.height / 2, 
    0, 
    canvas.width / 2, 
    canvas.height / 2, 
    Math.max(canvas.width, canvas.height) / 2
  );
  
  if (isLight) {
    gradient.addColorStop(0, '#e0f7ff');
    gradient.addColorStop(0.5, '#cceeff');
    gradient.addColorStop(1, '#a0dfff');
  } else {
    gradient.addColorStop(0, '#000015');
    gradient.addColorStop(0.7, '#000010');
    gradient.addColorStop(1, '#000005');
  }
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function init() {
  loadTheme();
  updateCanvasBackground();
  initParticles();
  setInterval(updateTime, 1000);
  updateTime();
  
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  
  for (let i = 0; i < 5; i++) {
    setTimeout(createHeartEffect, i * 300);
  }
}

init();