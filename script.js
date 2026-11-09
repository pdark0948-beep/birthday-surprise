/**
 * Surprise Birthday Web - Interactive Logic & Google Sheets Integration
 * Handcrafted with zero AI slop, accessible, and resilient.
 */

// ============================================================================
// CONFIGURATION (Ganti URL ini dengan URL Google Apps Script Web App kamu)
// ============================================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxD5dPcoERHkCfKSGcOHJ9ic7EDo7wzYlttBlcxBmQOvlIC_7PAz_Z2DyL9d2NLbv3E7g/exec";

// ============================================================================
// 1. BACKGROUND MUSIC: YOUTUBE (TAYLOR SWIFT - LOVE STORY) + FALLBACK
// ============================================================================
const audioEl = document.getElementById("bgAudio");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicLabel = document.getElementById("musicLabel");

let isMusicPlaying = false;
let audioCtx = null;
let synthInterval = null;
let ytPlayer = null;
let ytReady = false;

// YouTube Iframe API Callback
window.onYouTubeIframeAPIReady = function() {
  try {
    ytPlayer = new YT.Player('ytPlayer', {
      height: '1',
      width: '1',
      videoId: 'CxcEqhy4yKg', // Taylor Swift - Love Story
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: 'CxcEqhy4yKg',
        playsinline: 1
      },
      events: {
        onReady: () => {
          ytReady = true;
        },
        onStateChange: (event) => {
          if (event.data === 1) { // Playing
            isMusicPlaying = true;
            musicToggleBtn.setAttribute("aria-pressed", "true");
            musicLabel.textContent = "Love Story • Taylor Swift 🎵";
          } else if (event.data === 2) { // Paused
            isMusicPlaying = false;
            musicToggleBtn.setAttribute("aria-pressed", "false");
            musicLabel.textContent = "Putar Musik 🎵";
          }
        }
      }
    });
  } catch (err) {
    console.warn("YouTube Player initialization error:", err);
  }
};

// Fallback Romantic Melodic Chords (Web Audio API)
function playRomanticSynth() {
  if (synthInterval) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 523.25, 392.00];
    let noteIdx = 0;

    synthInterval = setInterval(() => {
      if (!isMusicPlaying) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(notes[noteIdx % notes.length], audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 1.25);
      noteIdx++;
    }, 700);
  } catch (err) {
    console.warn("Web Audio API not supported", err);
  }
}

function stopRomanticSynth() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
}

function toggleMusic() {
  if (isMusicPlaying) {
    if (ytReady && ytPlayer && typeof ytPlayer.pauseVideo === "function") {
      ytPlayer.pauseVideo();
    }
    audioEl.pause();
    stopRomanticSynth();
    isMusicPlaying = false;
    musicToggleBtn.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "Putar Musik 🎵";
  } else {
    isMusicPlaying = true;
    musicToggleBtn.setAttribute("aria-pressed", "true");
    musicLabel.textContent = "Love Story • Taylor Swift 🎵";

    if (ytReady && ytPlayer && typeof ytPlayer.playVideo === "function") {
      ytPlayer.playVideo();
    } else {
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          playRomanticSynth();
        });
      } else {
        playRomanticSynth();
      }
    }
  }
}

musicToggleBtn.addEventListener("click", toggleMusic);

// ============================================================================
// 2. STEP NAVIGATION & DYNAMIC WALLPAPER
// ============================================================================
let currentStep = 1;
const totalSteps = 5;

const stepWallpapers = {
  1: 'kolase.jpg',
  2: 'foto1.jpg',
  3: 'foto2.jpg',
  4: 'foto3.jpg',
  5: 'foto4.jpg'
};

function goToStep(stepNumber) {
  // Update full-screen wallpaper to current step's photo
  const wallpaperEl = document.getElementById("bgWallpaper");
  if (wallpaperEl && stepWallpapers[stepNumber]) {
    wallpaperEl.style.backgroundImage = `url('${stepWallpapers[stepNumber]}')`;
  }

  // Hide all steps
  for (let i = 1; i <= totalSteps; i++) {
    const card = document.getElementById(`step${i}`);
    if (card) {
      card.classList.remove("active");
    }
  }

  // Show target step
  const targetCard = document.getElementById(`step${stepNumber}`);
  if (targetCard) {
    targetCard.classList.add("active");
    currentStep = stepNumber;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Autoplay music on first user interaction if not already playing
  if (stepNumber === 2 && !isMusicPlaying) {
    toggleMusic();
  }
}

// ============================================================================
// 3. MINI GAME (ROMANTIC QUIZ: KAPAN HARI JADI KITA)
// ============================================================================
const quizData = [
  {
    question: "Kapan hari jadi kita? 💖",
    options: [
      { text: "4 Oktober 2026", correct: false, hint: "Eits, bulannya beda sedikit! Coba ingat-ingat lagi sayang 🤭" },
      { text: "4 November 2026", correct: true, hint: "100% Benar! 4 November 2026, tanggal paling bersejarah buat kita berdua 🥰" },
      { text: "14 November 2026", correct: false, hint: "Kurang tepat nih, angkanya kelebihan! Ayo coba lagi 😋" },
      { text: "4 Desember 2026", correct: false, hint: "Wah selisih sebulan tuh, yuk pilih yang benar ❤️" }
    ]
  }
];

let currentQuizIdx = 0;
let quizAnsweredCorrectly = false;

function renderQuiz() {
  const current = quizData[currentQuizIdx];
  const questionEl = document.getElementById("quizQuestionText");
  const optionsContainer = document.getElementById("quizOptionsContainer");
  const feedbackEl = document.getElementById("quizFeedback");
  const counterEl = document.getElementById("quizCounter");
  const nextBtn = document.getElementById("quizNextBtn");

  counterEl.textContent = "Pertanyaan Cinta 💕";
  questionEl.textContent = current.question;
  optionsContainer.innerHTML = "";
  feedbackEl.className = "quiz-feedback";
  feedbackEl.textContent = "";
  nextBtn.disabled = true;
  quizAnsweredCorrectly = false;

  current.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-opt-btn";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.innerHTML = `<span><strong>${String.fromCharCode(65 + idx)}.</strong> ${opt.text}</span>`;
    
    btn.onclick = () => selectQuizOption(btn, opt);
    optionsContainer.appendChild(btn);
  });
}

function selectQuizOption(btnEl, option) {
  const optionsContainer = document.getElementById("quizOptionsContainer");
  const feedbackEl = document.getElementById("quizFeedback");
  const nextBtn = document.getElementById("quizNextBtn");
  const allBtns = optionsContainer.querySelectorAll(".quiz-opt-btn");

  allBtns.forEach(b => {
    b.classList.remove("correct", "wrong");
    b.setAttribute("aria-checked", "false");
  });

  btnEl.setAttribute("aria-checked", "true");

  if (option.correct) {
    btnEl.classList.add("correct");
    feedbackEl.className = "quiz-feedback show-correct";
    feedbackEl.innerHTML = `🎉 <strong>Benar!</strong> ${option.hint}`;
    quizAnsweredCorrectly = true;
    nextBtn.disabled = false;

    // Small celebratory confetti burst for correct answer
    if (typeof confetti === "function") {
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.7 }
      });
    }
  } else {
    btnEl.classList.add("wrong");
    feedbackEl.className = "quiz-feedback show-wrong";
    feedbackEl.innerHTML = `🤔 <strong>Coba lagi:</strong> ${option.hint}`;
    quizAnsweredCorrectly = false;
    nextBtn.disabled = true;
  }
}

function handleQuizNext() {
  if (currentQuizIdx < quizData.length - 1) {
    currentQuizIdx++;
    renderQuiz();
  } else {
    // Selesai kuis, lanjut ke kue ulang tahun
    goToStep(3);
  }
}

// Inisialisasi Kuis saat dokumen siap
renderQuiz();

// ============================================================================
// 4. VIRTUAL BIRTHDAY CAKE & TIUP LILIN
// ============================================================================
let isCandleBlown = false;

function blowCandle() {
  if (isCandleBlown) return;

  const flame = document.getElementById("candleFlame");
  const smoke = document.getElementById("candleSmoke");
  const blowBtn = document.getElementById("blowBtn");
  const proceedBtn = document.getElementById("cakeProceedBtn");
  const hintText = document.getElementById("cakeHintText");

  // Extinguish flame and show rising smoke
  flame.classList.add("extinguished");
  smoke.style.display = "block";
  isCandleBlown = true;

  hintText.textContent = "🎉 Harapanmu telah dipanjatkan ke langit!";
  hintText.style.color = "#15803D";

  // Hide blow button, show proceed button
  blowBtn.classList.add("hidden");
  proceedBtn.classList.remove("hidden");

  // Confetti explosion
  if (typeof confetti === "function") {
    // Multi-shot confetti for grandeur celebration
    const end = Date.now() + 1500;
    const colors = ["#E11D48", "#FDA4AF", "#F59E0B", "#10B981", "#6366F1"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}

// Support keyboard 'Enter' or 'Space' on cake stage
document.getElementById("cakeStage").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    blowCandle();
  }
});

// ============================================================================
// 5. WISH FORM & GOOGLE SHEETS INTEGRATION
// ============================================================================
async function handleWishSubmit(e) {
  e.preventDefault();

  const wishMainInput = document.getElementById("wishMain");
  const wishSecretInput = document.getElementById("wishSecret");
  const mainErrorEl = document.getElementById("wishMainError");
  const statusAlertEl = document.getElementById("formStatusAlert");
  const submitBtn = document.getElementById("submitWishBtn");
  const submitBtnText = document.getElementById("submitBtnText");
  const submitSpinner = document.getElementById("submitSpinner");
  const formEl = document.getElementById("wishForm");
  const successViewEl = document.getElementById("wishSuccessView");

  // Reset errors
  mainErrorEl.textContent = "";
  statusAlertEl.className = "form-status-alert hidden";
  statusAlertEl.textContent = "";

  const wishMain = wishMainInput.value.trim();
  const wishSecret = wishSecretInput.value.trim();

  // Validate required field (R-27)
  if (!wishMain) {
    mainErrorEl.textContent = "Mohon tuliskan minimal satu harapan atau doa ya!";
    wishMainInput.focus();
    return;
  }

  // Payload data
  const payload = {
    timestamp: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    wishMain: wishMain,
    wishSecret: wishSecret || "-"
  };

  // 1. Always save locally first (Offline Resilience)
  try {
    const existingWishes = JSON.parse(localStorage.getItem("birthday_wishes") || "[]");
    existingWishes.push(payload);
    localStorage.setItem("birthday_wishes", JSON.stringify(existingWishes));
  } catch (err) {
    console.warn("Local storage write failed", err);
  }

  // 2. Set UI to Loading State (R-27)
  submitBtn.disabled = true;
  submitBtnText.textContent = "Menyimpan harapanmu...";
  submitSpinner.classList.remove("hidden");
  statusAlertEl.className = "form-status-alert status-loading";
  statusAlertEl.textContent = "Menyimpan harapanmu ke catatan rahasia...";

  // 3. Send to Google Sheets if URL is configured
  if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
    try {
      // Menggunakan mode 'no-cors' agar request Google Apps Script tidak terblokir CORS
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      // Show Success View
      showWishSuccess();
    } catch (error) {
      console.error("Gagal mengirim ke Google Sheets:", error);
      // Fallback: Data is already safe in localStorage
      showWishSuccess();
    }
  } else {
    // Belum dikonfigurasi URL Google Apps Script: simulasi jeda 1 detik lalu sukses
    setTimeout(() => {
      showWishSuccess();
    }, 800);
  }
}

function showWishSuccess() {
  const formEl = document.getElementById("wishForm");
  const successViewEl = document.getElementById("wishSuccessView");

  formEl.classList.add("hidden");
  successViewEl.classList.remove("hidden");

  // Grand celebration confetti
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// Restart surprise function
function restartSurprise() {
  // Reset form
  const formEl = document.getElementById("wishForm");
  const successViewEl = document.getElementById("wishSuccessView");
  const submitBtn = document.getElementById("submitWishBtn");
  const submitBtnText = document.getElementById("submitBtnText");
  const submitSpinner = document.getElementById("submitSpinner");

  formEl.reset();
  formEl.classList.remove("hidden");
  successViewEl.classList.add("hidden");
  submitBtn.disabled = false;
  submitBtnText.textContent = "Kirim Harapan ke Catatan Rahasia 💖";
  submitSpinner.classList.add("hidden");

  // Reset candle
  const flame = document.getElementById("candleFlame");
  const smoke = document.getElementById("candleSmoke");
  const blowBtn = document.getElementById("blowBtn");
  const proceedBtn = document.getElementById("cakeProceedBtn");
  const hintText = document.getElementById("cakeHintText");

  flame.classList.remove("extinguished");
  smoke.style.display = "none";
  isCandleBlown = false;
  hintText.textContent = "Ketuk kue atau tekan tombol untuk meniup!";
  hintText.style.color = "var(--primary)";
  blowBtn.classList.remove("hidden");
  proceedBtn.classList.add("hidden");

  // Reset quiz
  currentQuizIdx = 0;
  renderQuiz();

  // Back to step 1
  goToStep(1);
}

