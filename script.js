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

  const particles = [];
  const heartShape = [];

  // สร้างจุดของรูปหัวใจ
  for (let i = 0; i < 200; i++) {
    const t = i / 200 * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    heartShape.push({ x, y });
  }

  const centerX = width / 2;
  const centerY = height / 2;
  const heartScale = 12;

  // สร้างอนุภาคที่เคลื่อนที่มารวมกันเป็นรูปหัวใจ
  for (let i = 0; i < heartShape.length; i++) {
    const point = heartShape[i];
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      targetX: centerX + point.x * heartScale,
      targetY: centerY + point.y * heartScale,
      size: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 30 + 340}, 100%, ${Math.random() * 30 + 60}%)`
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += (p.targetX - p.x) * 0.02;
      p.y += (p.targetY - p.y) * 0.02;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.7;
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
  heart.style.color = `hsl(${Math.random() * 30 + 340}, 100%, 70%)`;
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '0';
  heart.style.left = `${Math.random() * 80 + 10}%`;
  heart.style.top = `${Math.random() * 80 + 10}%`;
  heart.style.opacity = '0';
  heart.style.transform = 'translate(-50%, -50%) scale(0)';
  heart.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
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
    gradient.addColorStop(0, '#fff0f3');
    gradient.addColorStop(0.5, '#ffdde4');
    gradient.addColorStop(1, '#ffb3c1');
  } else {
    gradient.addColorStop(0, '#1a0a14');
    gradient.addColorStop(0.7, '#0d0509');
    gradient.addColorStop(1, '#050103');
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawHeartAnimation() {
  const canvas = document.getElementById("heartDrawing");
  const ctx = canvas.getContext("2d");
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = 15;
  const points = [];
  
  // สร้างจุดของหัวใจ
  for (let i = 0; i < 100; i++) {
    const t = i / 100 * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    points.push({ x, y });
  }
  
  let currentIndex = 0;
  const isLight = document.body.classList.contains("light");
  const heartColor = isLight ? '#ff4d6d' : '#ff758f';
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.strokeStyle = heartColor;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.shadowBlur = 15;
    ctx.shadowColor = heartColor;
    
    // วาดเส้นตามจุดต่างๆ
    for (let i = 0; i < currentIndex; i++) {
      const p = points[i];
      const x = centerX + p.x * scale;
      const y = centerY + p.y * scale;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    currentIndex++;
    if (currentIndex <= points.length) {
      requestAnimationFrame(draw);
    } else {
      // เมื่อวาดเสร็จ ให้เริ่มใหม่หลังจากหายไป
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
          currentIndex = 0;
          draw();
        }, 2000);
      }, 1000);
    }
  }
  
  draw();
}

function typeWriter(elementId, text, speed) {
  const element = document.getElementById(elementId);
  let i = 0;

  element.innerHTML = '';

  function addCharacter() {
    if (i < text.length) {
      const span = document.createElement('span');
      span.textContent = text.charAt(i);
      element.appendChild(span);
      i++;

      setTimeout(addCharacter, speed);
    }
  }

  addCharacter();
}

window.onload = function() {
  typeWriter('footerText', 'rak fahsai', 120);
};

const audio = document.getElementById("audio");
const musicToggle = document.getElementById("musicToggle");
const songList = document.getElementById("songList");
const songTitle = document.getElementById("songTitle");
const musicTime = document.getElementById("musicTime");
const volumeSlider = document.getElementById("volumeSlider");
const volumePercent = document.getElementById("volumePercent");

// ตั้งค่าเริ่มต้น
audio.volume = 1.0;
volumePercent.textContent = `${volumeSlider.value}%`;

// ฟังก์ชั่นในการเล่น/หยุดเพลง
musicToggle.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    musicToggle.textContent = "⏸️ หยุดเพลง";
  } else {
    audio.pause();
    musicToggle.textContent = "🎵 เล่นเพลง";
  }
});

// ฟังก์ชั่นในการปรับระดับเสียง
volumeSlider.addEventListener("input", () => {
  const value = volumeSlider.value;
  const volume = value / 100;
  audio.volume = volume;
  volumePercent.textContent = `${value}%`;
});

// ฟังก์ชั่นในการแสดงเวลาเพลง
audio.addEventListener("timeupdate", () => {
  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };
  musicTime.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;
});

// ฟังก์ชั่นในการเปลี่ยนเพลง
songList.addEventListener("change", () => {
  const selectedSong = songList.value;
  audio.src = selectedSong;
  songTitle.textContent = `ชื่อเพลง: ${songList.options[songList.selectedIndex].text}`;
  audio.play();
  musicToggle.textContent = "⏸️ หยุดเพลง";
});


// ฟังก์ชั่นในการอัปเดตข้อมูลเพลง
function updateSongInfo() {
  songTitle.textContent = `ชื่อเพลง: ${songList.options[songList.selectedIndex].text}`;
}

updateSongInfo();





function init() {
  loadTheme();
  updateCanvasBackground();
  initParticles();
  drawHeartAnimation();
  setInterval(updateTime, 1000);
  updateTime();

  document.getElementById("themeToggle").addEventListener("click", toggleTheme);

  for (let i = 0; i < 5; i++) {
    setTimeout(createHeartEffect, i * 300);
  }
}

init();