const state = {
  currentScreen: 'desktop',
  playlist: [],
  activeTrack: 0,
  settings: {
    theme: 'dark',
    accent: '#54b0ff',
    animations: true,
    fontSize: 16,
  },
  photos: [],
  files: [],
  history: [],
  timer: {
    running: false,
    startTime: 0,
    elapsed: 0,
    interval: null,
  },
  draw: {
    tool: 'brush',
    color: '#54b0ff',
    size: 4,
    undoStack: [],
    redoStack: [],
  },
  ai: {
    apiKey: '',
    model: 'gemini-2.0-flash',
  },
};

const elements = {
  screens: document.querySelectorAll('.screen'),
  navButtons: document.querySelectorAll('.nav-button'),
  appCards: document.querySelectorAll('.app-card'),
  backButtons: document.querySelectorAll('[data-back]'),
  clock: document.getElementById('clock'),
  date: document.getElementById('date'),
  appShell: document.getElementById('appShell'),
  themeLight: document.getElementById('themeLight'),
  themeDark: document.getElementById('themeDark'),
  accentColor: document.getElementById('accentColor'),
  toggleAnimations: document.getElementById('toggleAnimations'),
  fontSize: document.getElementById('fontSize'),
  deviceInfo: document.getElementById('deviceInfo'),
  browserInfo: document.getElementById('browserInfo'),
  calendar: document.getElementById('calendar'),
  hexInput: document.getElementById('hexInput'),
  rgbInput: document.getElementById('rgbInput'),
  hexConvert: document.getElementById('hexConvert'),
  rgbConvert: document.getElementById('rgbConvert'),
  converterResult: document.getElementById('converterResult'),
  notifyButton: document.getElementById('notifyButton'),
  toggleSounds: document.getElementById('toggleSounds'),
  noteTextarea: document.getElementById('noteTextarea'),
  noteCount: document.getElementById('noteCount'),
  clearNotes: document.getElementById('clearNotes'),
  fileSearch: document.getElementById('fileSearch'),
  fileHistory: document.getElementById('fileHistory'),
  fileName: document.getElementById('fileName'),
  fileContent: document.getElementById('fileContent'),
  saveFile: document.getElementById('saveFile'),
  renameFile: document.getElementById('renameFile'),
  deleteFile: document.getElementById('deleteFile'),
  musicUpload: document.getElementById('musicUpload'),
  musicLink: document.getElementById('musicLink'),
  musicDownload: document.getElementById('musicDownload'),
  playlist: document.getElementById('playlist'),
  prevTrack: document.getElementById('prevTrack'),
  nextTrack: document.getElementById('nextTrack'),
  togglePlay: document.getElementById('togglePlay'),
  musicProgress: document.getElementById('musicProgress'),
  currentTime: document.getElementById('currentTime'),
  durationTime: document.getElementById('durationTime'),
  musicVolume: document.getElementById('musicVolume'),
  repeatToggle: document.getElementById('repeatToggle'),
  shuffleToggle: document.getElementById('shuffleToggle'),
  trackTitle: document.getElementById('trackTitle'),
  trackArtist: document.getElementById('trackArtist'),
  musicCover: document.getElementById('musicCover'),
  videoUpload: document.getElementById('videoUpload'),
  videoLink: document.getElementById('videoLink'),
  videoDownload: document.getElementById('videoDownload'),
  videoPlayer: document.getElementById('videoPlayer'),
  videoThumbs: document.getElementById('videoThumbs'),
  videoFullscreen: document.getElementById('videoFullscreen'),
  photoUpload: document.getElementById('photoUpload'),
  photoGrid: document.getElementById('photoGrid'),
  photoPreviewPanel: document.getElementById('photoPreviewPanel'),
  photoPreview: document.getElementById('photoPreview'),
  photoZoomIn: document.getElementById('photoZoomIn'),
  photoZoomOut: document.getElementById('photoZoomOut'),
  photoRemove: document.getElementById('photoRemove'),
  photoDownload: document.getElementById('photoDownload'),
  drawCanvas: document.getElementById('drawCanvas'),
  toolButtons: document.querySelectorAll('.tool-button'),
  drawColor: document.getElementById('drawColor'),
  drawSize: document.getElementById('drawSize'),
  undoDraw: document.getElementById('undoDraw'),
  redoDraw: document.getElementById('redoDraw'),
  clearDraw: document.getElementById('clearDraw'),
  savePng: document.getElementById('savePng'),
  saveJpg: document.getElementById('saveJpg'),
  calcDisplay: document.getElementById('calcDisplay'),
  calcButtons: document.querySelectorAll('.calc-buttons button'),
  calcHistory: document.getElementById('calcHistory'),
  clearCalcHistory: document.getElementById('clearCalcHistory'),
  timerDisplay: document.getElementById('timerDisplay'),
  timerStart: document.getElementById('timerStart'),
  timerPause: document.getElementById('timerPause'),
  timerReset: document.getElementById('timerReset'),
  timerLap: document.getElementById('timerLap'),
  timerLaps: document.getElementById('timerLaps'),
  passLength: document.getElementById('passLength'),
  passLetters: document.getElementById('passLetters'),
  passNumbers: document.getElementById('passNumbers'),
  passSymbols: document.getElementById('passSymbols'),
  passOutput: document.getElementById('passOutput'),
  generatePass: document.getElementById('generatePass'),
  copyPass: document.getElementById('copyPass'),
  playlistSection: document.getElementById('playlist'),
  audioCanvas: document.getElementById('audioCanvas'),
};

const {
  noteTextarea,
  noteCount,
  fileSearch,
  fileHistory,
  fileName,
  fileContent,
  saveFile: saveFileBtn,
  renameFile: renameFileBtn,
  deleteFile: deleteFileBtn,
  musicUpload,
  musicLink,
  musicDownload,
  playlist,
  prevTrack,
  nextTrack,
  togglePlay,
  musicProgress,
  currentTime,
  durationTime,
  musicVolume,
  repeatToggle,
  shuffleToggle,
  trackTitle,
  trackArtist,
  musicCover,
  videoUpload,
  videoLink,
  videoDownload,
  videoPlayer,
  videoThumbs,
  videoFullscreen,
  photoUpload,
  photoGrid,
  photoPreviewPanel,
  photoPreview,
  photoZoomIn,
  photoZoomOut,
  photoRemove,
  photoDownload,
  drawCanvas,
  toolButtons,
  drawColor,
  drawSize,
  undoDraw: undoDrawBtn,
  redoDraw: redoDrawBtn,
  clearDraw: clearDrawBtn,
  savePng: savePngBtn,
  saveJpg: saveJpgBtn,
  calcDisplay,
  calcButtons,
  calcHistory,
  clearCalcHistory,
  timerDisplay,
  timerStart,
  timerPause,
  timerReset,
  timerLap,
  timerLaps,
  passLength,
  passLetters,
  passNumbers,
  passSymbols,
  passOutput,
  generatePass,
  copyPass,
  hexInput,
  rgbInput,
  hexConvert,
  rgbConvert,
  converterResult,
  notifyButton,
  toggleAnimations,
  accentColor,
  themeLight,
  themeDark,
  audioCanvas,
} = elements;

const audio = new Audio();
let audioContext, analyser, sourceNode;

function saveStorage() {
  localStorage.setItem('davidHub-settings', JSON.stringify(state.settings));
  localStorage.setItem('davidHub-notes', noteTextarea.value);
  localStorage.setItem('davidHub-files', JSON.stringify(state.files));
  localStorage.setItem('davidHub-photos', JSON.stringify(state.photos));
  localStorage.setItem('davidHub-playlist', JSON.stringify(state.playlist));
  localStorage.setItem('davidHub-calc-history', JSON.stringify(state.history));
}

function safeParse(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null');
  } catch (error) {
    console.warn(`Error parsing ${key}:`, error);
    return null;
  }
}

function loadStorage() {
  const savedSettings = safeParse('davidHub-settings');
  const savedNotes = localStorage.getItem('davidHub-notes');
  const savedFiles = safeParse('davidHub-files');
  const savedPhotos = safeParse('davidHub-photos');
  const savedHistory = safeParse('davidHub-calc-history');
  const savedPlaylist = safeParse('davidHub-playlist');

  if (savedSettings) {
    state.settings = Object.assign(state.settings, savedSettings);
  }

  if (savedNotes) {
    noteTextarea.value = savedNotes;
    updateNoteCount();
  }

  if (savedFiles) {
    state.files = savedFiles;
  }

  if (savedPhotos) {
    state.photos = savedPhotos;
  }

  if (savedHistory) {
    state.history = savedHistory;
  }

  if (savedPlaylist) {
    state.playlist = savedPlaylist;
  }

  applySettings();
  renderFiles();
  renderPhotos();
  renderHistory();
}

function applySettings() {
  document.documentElement.style.setProperty('--accent', state.settings.accent);
  document.documentElement.style.setProperty('--accent-soft', `${hexToRGBA(state.settings.accent, 0.18)}`);
  document.documentElement.style.setProperty('--text', state.settings.theme === 'light' ? '#152033' : '#e9eef7');
  document.documentElement.style.setProperty('--bg', state.settings.theme === 'light' ? '#f5f8ff' : '#11131a');
  document.documentElement.style.setProperty('--surface', state.settings.theme === 'light' ? 'rgba(255,255,255,0.92)' : 'rgba(18, 24, 39, 0.72)');
  document.documentElement.style.setProperty('--border', state.settings.theme === 'light' ? 'rgba(21, 32, 51, 0.1)' : 'rgba(255,255,255,0.12)');
  document.body.classList.toggle('light', state.settings.theme === 'light');
  document.body.style.fontSize = `${state.settings.fontSize}px`;
  toggleAnimations.checked = state.settings.animations;
  accentColor.value = state.settings.accent;
  if (state.settings.theme === 'light') {
    themeLight.classList.add('active');
    themeDark.classList.remove('active');
  } else {
    themeDark.classList.add('active');
    themeLight.classList.remove('active');
  }
}

function hexToRGBA(hex, alpha = 1) {
  const sanitized = hex.replace('#', '');
  const r = parseInt(sanitized.substring(0, 2), 16);
  const g = parseInt(sanitized.substring(2, 4), 16);
  const b = parseInt(sanitized.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function showScreen(screenId) {
  elements.screens.forEach(screen => screen.classList.toggle('active', screen.id === screenId));
  elements.navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.target === screenId));
  state.currentScreen = screenId;
  if (screenId === 'app-draw' && state.draw.resize) {
    state.draw.resize();
  }
}

function updateClock() {
  const now = new Date();
  elements.clock.textContent = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  elements.date.textContent = now.toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: 'long' });
}

function renderPlaylist() {
  playlist.innerHTML = '';
  state.playlist.forEach((track, index) => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${track.title}</strong><span>${track.artist}</span><button data-index="${index}">Reproducir</button>`;
    const button = item.querySelector('button');
    button.addEventListener('click', () => playTrack(index));
    playlist.appendChild(item);
  });
}

function updateTrackInfo() {
  const track = state.playlist[state.activeTrack];
  if (!track) {
    trackTitle.textContent = 'Sin pista';
    trackArtist.textContent = 'Agrega un MP3 a la lista';
    musicCover.textContent = '🎧';
    return;
  }
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  musicCover.textContent = '🎵';
}

function loadTrackFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

async function handleMusicUpload(files) {
  const newTracks = [];
  for (const file of files) {
    const src = await loadTrackFile(file);
    newTracks.push({ src, title: file.name.replace(/\.[^/.]+$/, ''), artist: 'Pista local' });
  }
  state.playlist.push(...newTracks);
  renderPlaylist();
  if (!audio.src && state.playlist.length > 0) {
    playTrack(0);
  }
  saveStorage();
}

function playTrack(index) {
  if (index < 0 || index >= state.playlist.length) return;
  state.activeTrack = index;
  const track = state.playlist[index];
  audio.src = track.src;
  audio.play();
  updateTrackInfo();
  togglePlay.textContent = '⏸️';
}

function updateTimeDisplay() {
  if (!audio.duration || isNaN(audio.duration)) return;
  musicProgress.max = Math.floor(audio.duration);
  musicProgress.value = Math.floor(audio.currentTime);
  currentTime.textContent = formatTime(audio.currentTime);
  durationTime.textContent = formatTime(audio.duration);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function audioEndHandler() {
  if (repeatToggle.checked) {
    audio.currentTime = 0;
    audio.play();
    return;
  }
  if (shuffleToggle.checked) {
    const next = Math.floor(Math.random() * state.playlist.length);
    playTrack(next);
    return;
  }
  if (state.activeTrack + 1 < state.playlist.length) {
    playTrack(state.activeTrack + 1);
  }
}

function renderVideoList() {
  videoThumbs.innerHTML = '';
  const videos = JSON.parse(localStorage.getItem('davidHub-videos') || '[]');
  videos.forEach((video, index) => {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${video.name}</strong><button data-index="${index}">Abrir</button>`;
    item.querySelector('button').addEventListener('click', () => {
      videoPlayer.src = video.src;
      videoPlayer.play();
    });
    videoThumbs.appendChild(item);
  });
}

function loadVideo(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

async function handleVideoUpload(file) {
  if (!file) return;
  const src = await loadVideo(file);
  videoPlayer.src = src;
  videoPlayer.play();
  const saved = JSON.parse(localStorage.getItem('davidHub-videos') || '[]');
  saved.unshift({ name: file.name, src });
  localStorage.setItem('davidHub-videos', JSON.stringify(saved.slice(0, 10)));
  renderVideoList();
}

let selectedPhotoIndex = null;

function renderPhotos() {
  photoGrid.innerHTML = '';
  state.photos.forEach((photo, index) => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    const image = document.createElement('img');
    image.src = photo.src;
    image.alt = photo.name;
    card.appendChild(image);
    card.addEventListener('click', () => selectPhoto(index));
    photoGrid.appendChild(card);
  });
}

async function handlePhotoUpload(files) {
  const added = [];
  for (const file of files) {
    const reader = new FileReader();
    const src = await new Promise(resolve => {
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    added.push({ src, name: file.name });
  }
  state.photos.unshift(...added);
  renderPhotos();
  saveStorage();
}

function selectPhoto(index) {
  selectedPhotoIndex = index;
  const photo = state.photos[index];
  if (!photo) return;
  photoPreview.src = photo.src;
  photoPreview.style.display = 'block';
  photoPreview.style.transform = 'scale(1)';
  photoPreview.dataset.scale = '1';
  photoPreviewPanel.querySelector('.preview-empty').style.display = 'none';
}

function changePhotoZoom(scale) {
  if (!photoPreview.src) return;
  const current = parseFloat(photoPreview.dataset.scale || '1');
  const next = Math.max(0.5, Math.min(3, current + scale));
  photoPreview.dataset.scale = next.toString();
  photoPreview.style.transform = `scale(${next})`;
}

function removeSelectedPhoto() {
  if (selectedPhotoIndex === null) return;
  state.photos.splice(selectedPhotoIndex, 1);
  selectedPhotoIndex = null;
  renderPhotos();
  resetPhotoPreview();
  saveStorage();
}

function downloadSelectedPhoto() {
  if (selectedPhotoIndex === null) return;
  const photo = state.photos[selectedPhotoIndex];
  const link = document.createElement('a');
  link.href = photo.src;
  link.download = photo.name;
  link.click();
}

function resetPhotoPreview() {
  selectedPhotoIndex = null;
  photoPreview.src = '';
  photoPreview.style.display = 'none';
  photoPreview.style.transform = 'scale(1)';
  photoPreview.dataset.scale = '1';
  photoPreviewPanel.querySelector('.preview-empty').style.display = 'grid';
}

function setupDrawCanvas() {
  const ctx = drawCanvas.getContext('2d');
  resizeCanvas();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = state.draw.color;
  ctx.lineWidth = state.draw.size;
  let drawing = false;
  let startX = 0;
  let startY = 0;
  let textMode = false;

  function saveState() {
    state.draw.undoStack.push(drawCanvas.toDataURL());
    state.draw.redoStack = [];
  }

  function beginDraw(event) {
    drawing = true;
    const rect = drawCanvas.getBoundingClientRect();
    startX = (event.clientX || event.touches[0].clientX) - rect.left;
    startY = (event.clientY || event.touches[0].clientY) - rect.top;
    if (state.draw.tool === 'text') {
      textMode = true;
      const text = prompt('Escribe tu texto:');
      if (text) {
        saveState();
        ctx.fillStyle = state.draw.color;
        ctx.font = `${state.draw.size * 5}px sans-serif`;
        ctx.fillText(text, startX, startY);
      }
      drawing = false;
    } else {
      saveState();
      ctx.beginPath();
      ctx.moveTo(startX, startY);
    }
  }

  function continueDraw(event) {
    if (!drawing) return;
    const rect = drawCanvas.getBoundingClientRect();
    const x = (event.clientX || event.touches[0].clientX) - rect.left;
    const y = (event.clientY || event.touches[0].clientY) - rect.top;
    ctx.strokeStyle = state.draw.tool === 'eraser' ? '#11131a' : state.draw.color;
    ctx.lineWidth = state.draw.size;
    if (state.draw.tool === 'brush' || state.draw.tool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  function finishDraw(event) {
    if (!drawing) return;
    drawing = false;
    const rect = drawCanvas.getBoundingClientRect();
    const x = (event.clientX || event.changedTouches[0].clientX) - rect.left;
    const y = (event.clientY || event.changedTouches[0].clientY) - rect.top;
    ctx.strokeStyle = state.draw.color;
    ctx.lineWidth = state.draw.size;
    if (state.draw.tool === 'line') {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    if (state.draw.tool === 'rect') {
      ctx.strokeRect(startX, startY, x - startX, y - startY);
    }
    if (state.draw.tool === 'circle') {
      const radius = Math.hypot(x - startX, y - startY);
      ctx.beginPath();
      ctx.arc(startX, startY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function resizeCanvas() {
    const rect = drawCanvas.getBoundingClientRect();
    const width = Math.max(rect.width, 500);
    const height = Math.max(rect.height, 320);
    const preserve = drawCanvas.width > 0 && drawCanvas.height > 0;
    const image = preserve ? ctx.getImageData(0, 0, drawCanvas.width, drawCanvas.height) : null;
    drawCanvas.width = width * window.devicePixelRatio;
    drawCanvas.height = height * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    if (preserve && image) {
      ctx.putImageData(image, 0, 0);
    }
  }

  window.addEventListener('resize', resizeCanvas);
  drawCanvas.addEventListener('pointerdown', beginDraw);
  drawCanvas.addEventListener('pointermove', continueDraw);
  drawCanvas.addEventListener('pointerup', finishDraw);
  drawCanvas.addEventListener('pointerleave', finishDraw);

  state.draw.ctx = ctx;
  state.draw.canvas = drawCanvas;
  state.draw.resize = resizeCanvas;
}

function changeTool(tool) {
  state.draw.tool = tool;
  elements.toolButtons.forEach(button => button.classList.toggle('active', button.dataset.tool === tool));
}

function undoDraw() {
  if (!state.draw.undoStack.length) return;
  const previous = state.draw.undoStack.pop();
  state.draw.redoStack.push(drawCanvas.toDataURL());
  const img = new Image();
  img.src = previous;
  img.onload = () => {
    state.draw.ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    state.draw.ctx.drawImage(img, 0, 0, drawCanvas.width / window.devicePixelRatio, drawCanvas.height / window.devicePixelRatio);
  };
}

function redoDraw() {
  if (!state.draw.redoStack.length) return;
  const next = state.draw.redoStack.pop();
  state.draw.undoStack.push(drawCanvas.toDataURL());
  const img = new Image();
  img.src = next;
  img.onload = () => {
    state.draw.ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    state.draw.ctx.drawImage(img, 0, 0, drawCanvas.width / window.devicePixelRatio, drawCanvas.height / window.devicePixelRatio);
  };
}

function clearDraw() {
  state.draw.ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  state.draw.undoStack = [];
  state.draw.redoStack = [];
}

function saveDraw(format) {
  const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
  const link = document.createElement('a');
  link.href = drawCanvas.toDataURL(mime);
  link.download = `david-hub-dibujo.${format}`;
  link.click();
}

function calculate(value) {
  if (value === 'clear' || value === 'C') {
    calcDisplay.value = '';
    return;
  }

  if (value === 'history') {
    return;
  }

  const mathActions = ['sin', 'cos', 'tan', 'sqrt'];
  if (mathActions.includes(value)) {
    const current = parseFloat(calcDisplay.value);
    if (isNaN(current)) return;
    const result = {
      sin: Math.sin(current),
      cos: Math.cos(current),
      tan: Math.tan(current),
      sqrt: Math.sqrt(current),
    }[value];
    calcDisplay.value = Number(result.toFixed(8)).toString();
    state.history.unshift(`${value}(${current}) = ${calcDisplay.value}`);
    renderHistory();
    saveStorage();
    return;
  }

  if (value === '=') {
    try {
      const expression = calcDisplay.value.replace(/×/g, '*').replace(/÷/g, '/');
      const result = eval(expression);
      if (result !== undefined) {
        state.history.unshift(`${calcDisplay.value} = ${result}`);
        calcDisplay.value = result;
        renderHistory();
        saveStorage();
      }
    } catch (err) {
      calcDisplay.value = 'Error';
    }
    return;
  }

  const validChars = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/'];
  if (validChars.includes(value)) {
    calcDisplay.value += value;
  }
}

function renderHistory() {
  calcHistory.innerHTML = '';
  state.history.slice(0, 10).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    calcHistory.appendChild(li);
  });
}

function updateTimerDisplay() {
  const elapsed = state.timer.elapsed;
  const centiseconds = Math.floor((elapsed % 1000) / 10).toString().padStart(2, '0');
  const seconds = Math.floor(elapsed / 1000) % 60;
  const minutes = Math.floor(elapsed / 60000) % 60;
  const hours = Math.floor(elapsed / 3600000);
  timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds}`;
}

function startTimer() {
  if (state.timer.running) return;
  state.timer.running = true;
  state.timer.startTime = Date.now() - state.timer.elapsed;
  state.timer.interval = setInterval(() => {
    state.timer.elapsed = Date.now() - state.timer.startTime;
    updateTimerDisplay();
  }, 10);
}

function pauseTimer() {
  if (!state.timer.running) return;
  state.timer.running = false;
  clearInterval(state.timer.interval);
}

function resetTimer() {
  pauseTimer();
  state.timer.elapsed = 0;
  updateTimerDisplay();
  timerLaps.innerHTML = '';
}

function lapTimer() {
  const li = document.createElement('li');
  li.textContent = timerDisplay.textContent;
  timerLaps.prepend(li);
}

function generatePassword() {
  const length = Number(passLength.value);
  const hasLetters = passLetters.checked;
  const hasNumbers = passNumbers.checked;
  const hasSymbols = passSymbols.checked;
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';
  let chars = '';
  if (hasLetters) chars += letters;
  if (hasNumbers) chars += numbers;
  if (hasSymbols) chars += symbols;
  if (!chars) {
    passOutput.value = 'Selecciona al menos una opción';
    return;
  }
  let password = '';
  for (let i = 0; i < length; i += 1) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  passOutput.value = password;
}

function copyPassword() {
  navigator.clipboard.writeText(passOutput.value).then(() => {
    showToast('Contraseña copiada');
  });
}

function renderFiles() {
  fileHistory.innerHTML = '';
  const search = fileSearch.value.toLowerCase();
  state.files.filter(file => file.name.toLowerCase().includes(search)).forEach((file, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${file.name}</span><button data-index="${index}">Abrir</button>`;
    li.querySelector('button').addEventListener('click', () => {
      fileName.value = file.name;
      fileName.dataset.original = file.name;
      fileContent.value = file.content;
    });
    fileHistory.appendChild(li);
  });
}

function saveFile() {
  const name = fileName.value.trim();
  const content = fileContent.value.trim();
  if (!name) return;
  const existingIndex = state.files.findIndex(item => item.name === name);
  if (existingIndex >= 0) {
    state.files[existingIndex].content = content;
  } else {
    state.files.unshift({ name, content, createdAt: Date.now() });
  }
  renderFiles();
  saveStorage();
}

function renameFileEntry() {
  const currentName = fileName.dataset.original || '';
  const newName = fileName.value.trim();
  if (!currentName || !newName) return;
  if (currentName === newName) return;
  if (state.files.some(item => item.name === newName)) {
    alert('Ya existe un archivo con ese nombre.');
    return;
  }
  const entry = state.files.find(item => item.name === currentName);
  if (!entry) return;
  entry.name = newName;
  fileName.dataset.original = newName;
  renderFiles();
  saveStorage();
}

function deleteFile() {
  const name = fileName.value.trim();
  state.files = state.files.filter(file => file.name !== name);
  fileName.value = '';
  fileContent.value = '';
  renderFiles();
  saveStorage();
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2200);
}

function setupNotification() {
  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
}

function showNotification() {
  if (Notification.permission === 'granted') {
    new Notification('David Hub', { body: 'Notificación de prueba activada.' });
  } else {
    alert('Las notificaciones requieren permiso del navegador.');
  }
}

function buildCalendar() {
  const now = new Date();
  const month = now.toLocaleString('es-ES', { month: 'long' });
  const year = now.getFullYear();
  const firstDay = new Date(year, now.getMonth(), 1).getDay();
  const days = new Date(year, now.getMonth() + 1, 0).getDate();
  let html = `<div class="calendar-header"><strong>${month} ${year}</strong></div><div class="calendar-grid">`;
  ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].forEach(day => { html += `<span class="calendar-day-title">${day}</span>`; });
  for (let i = 1; i < ((firstDay + 6) % 7) + 1; i += 1) {
    html += '<span></span>';
  }
  for (let day = 1; day <= days; day += 1) {
    const isToday = day === now.getDate();
    html += `<span class="calendar-day${isToday ? ' today' : ''}">${day}</span>`;
  }
  html += '</div>';
  calendar.innerHTML = html;
}

function updateDeviceInfo() {
  deviceInfo.textContent = `Dispositivo: ${navigator.platform || 'Desconocido'}`;
  browserInfo.textContent = `Navegador: ${navigator.userAgent}`;
}

function convertHexToRgb() {
  const hex = hexInput.value.trim();
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
    converterResult.textContent = 'HEX no válido';
    return;
  }
  const sanitized = hex.replace('#', '');
  const r = parseInt(sanitized.substring(0, 2), 16);
  const g = parseInt(sanitized.substring(2, 4), 16);
  const b = parseInt(sanitized.substring(4, 6), 16);
  converterResult.textContent = `rgb(${r}, ${g}, ${b})`;
}

function convertRgbToHex() {
  const rgb = rgbInput.value.trim();
  const match = rgb.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i);
  if (!match) {
    converterResult.textContent = 'RGB no válido';
    return;
  }
  const hex = match.slice(1).map(num => parseInt(num).toString(16).padStart(2, '0')).join('');
  converterResult.textContent = `#${hex}`;
}

function initAudioVisualizer() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const canvasCtx = audioCanvas.getContext('2d');

    function renderFrame() {
      requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);
      canvasCtx.clearRect(0, 0, audioCanvas.width, audioCanvas.height);
      const barWidth = audioCanvas.width / bufferLength * 1.2;
      let x = 0;
      const height = audioCanvas.height;
      for (let i = 0; i < bufferLength; i += 1) {
        const barHeight = dataArray[i] / 255 * height;
        canvasCtx.fillStyle = `rgba(84, 176, 255, ${barHeight / height + 0.2})`;
        canvasCtx.fillRect(x, height - barHeight, barWidth, barHeight);
        x += barWidth + 2;
      }
    }

    function resizeCanvas() {
      audioCanvas.width = audioCanvas.clientWidth * window.devicePixelRatio;
      audioCanvas.height = 180 * window.devicePixelRatio;
      if (canvasCtx) canvasCtx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    renderFrame();
  } catch (err) {
    console.warn('Visualizador no disponible:', err);
  }
}

function bindEvents() {
  elements.navButtons.forEach(button => {
    button.addEventListener('click', () => showScreen(button.dataset.target));
  });

  document.querySelectorAll('button[data-target]').forEach(button => {
    button.addEventListener('click', () => showScreen(button.dataset.target));
  });

  elements.appCards.forEach(card => {
    card.querySelector('.enter-button').addEventListener('click', () => showScreen(card.dataset.app));
  });

  elements.backButtons.forEach(button => {
    button.addEventListener('click', () => showScreen('desktop'));
  });

  themeLight.addEventListener('click', () => {
    state.settings.theme = 'light';
    applySettings();
    saveStorage();
  });
  themeDark.addEventListener('click', () => {
    state.settings.theme = 'dark';
    applySettings();
    saveStorage();
  });
  accentColor.addEventListener('input', event => {
    state.settings.accent = event.target.value;
    applySettings();
    saveStorage();
  });
  toggleAnimations.addEventListener('change', event => {
    state.settings.animations = event.target.checked;
    document.body.style.transition = event.target.checked ? 'all 0.2s ease' : 'none';
    saveStorage();
  });
  fontSize.addEventListener('input', event => {
    state.settings.fontSize = event.target.value;
    applySettings();
    saveStorage();
  });

  elements.noteTextarea.addEventListener('input', () => {
    updateNoteCount();
    saveStorage();
  });
  clearNotes.addEventListener('click', () => {
    noteTextarea.value = '';
    updateNoteCount();
    saveStorage();
  });

  fileSearch.addEventListener('input', renderFiles);
  saveFileBtn.addEventListener('click', saveFile);
  renameFileBtn.addEventListener('click', renameFileEntry);
  deleteFileBtn.addEventListener('click', deleteFile);

  musicUpload.addEventListener('change', event => handleMusicUpload(event.target.files));
  prevTrack.addEventListener('click', () => playTrack((state.activeTrack - 1 + state.playlist.length) % state.playlist.length));
  nextTrack.addEventListener('click', () => playTrack((state.activeTrack + 1) % state.playlist.length));
  togglePlay.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      togglePlay.textContent = '⏸️';
    } else {
      audio.pause();
      togglePlay.textContent = '▶️';
    }
  });
  musicProgress.addEventListener('input', () => {
    audio.currentTime = Number(musicProgress.value);
  });
  musicVolume.addEventListener('input', () => {
    audio.volume = Number(musicVolume.value);
  });
  musicDownload.addEventListener('click', () => showToast('Descarga de música requiere backend/API en el futuro'));

  videoUpload.addEventListener('change', event => handleVideoUpload(event.target.files[0]));
  videoFullscreen.addEventListener('click', () => {
    if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    }
  });
  videoDownload.addEventListener('click', () => showToast('Descarga de video requiere backend/API en el futuro'));

  photoUpload.addEventListener('change', event => handlePhotoUpload(event.target.files));
  photoZoomIn.addEventListener('click', () => changePhotoZoom(0.2));
  photoZoomOut.addEventListener('click', () => changePhotoZoom(-0.2));
  photoRemove.addEventListener('click', removeSelectedPhoto);
  photoDownload.addEventListener('click', downloadSelectedPhoto);

  toolButtons.forEach(button => button.addEventListener('click', () => changeTool(button.dataset.tool)));
  drawColor.addEventListener('input', event => { state.draw.color = event.target.value; });
  drawSize.addEventListener('input', event => { state.draw.size = Number(event.target.value); });
  undoDrawBtn.addEventListener('click', undoDraw);
  redoDrawBtn.addEventListener('click', redoDraw);
  clearDrawBtn.addEventListener('click', clearDraw);
  savePngBtn.addEventListener('click', () => saveDraw('png'));
  saveJpgBtn.addEventListener('click', () => saveDraw('jpg'));

  elements.calcButtons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const value = button.dataset.value;
      if (action) {
        calculate(action);
      } else if (value) {
        calculate(value);
      }
    });
  });
  clearCalcHistory.addEventListener('click', () => { state.history = []; renderHistory(); saveStorage(); });

  timerStart.addEventListener('click', startTimer);
  timerPause.addEventListener('click', pauseTimer);
  timerReset.addEventListener('click', resetTimer);
  timerLap.addEventListener('click', lapTimer);

  generatePass.addEventListener('click', generatePassword);
  copyPass.addEventListener('click', copyPassword);

  hexConvert.addEventListener('click', convertHexToRgb);
  rgbConvert.addEventListener('click', convertRgbToHex);
  notifyButton.addEventListener('click', showNotification);

  audio.addEventListener('ended', audioEndHandler);
  audio.addEventListener('timeupdate', updateTimeDisplay);
  audio.addEventListener('play', () => { togglePlay.textContent = '⏸️'; });
  audio.addEventListener('pause', () => { togglePlay.textContent = '▶️'; });

  // Google Search listeners
  const googleSearchBtn = document.getElementById('googleSearchBtn');
  if (googleSearchBtn) {
    googleSearchBtn.addEventListener('click', googleSearch);
    document.getElementById('googleSearch').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') googleSearch();
    });
  }

  // YouTube Search listeners
  const youtubeSearchBtn = document.getElementById('youtubeSearchBtn');
  if (youtubeSearchBtn) {
    youtubeSearchBtn.addEventListener('click', youtubeSearch);
    document.getElementById('youtubeSearch').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') youtubeSearch();
    });
  }

  // AI Chat listeners
  const aiSendBtn = document.getElementById('aiSendBtn');
  if (aiSendBtn) {
    aiSendBtn.addEventListener('click', sendAIMessage);
    document.getElementById('aiMessage').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendAIMessage();
    });
  }
  const aiSaveSettingsBtn = document.getElementById('aiSaveSettings');
  if (aiSaveSettingsBtn) {
    aiSaveSettingsBtn.addEventListener('click', saveAISettings);
  }
  const aiClearChatBtn = document.getElementById('aiClearChat');
  if (aiClearChatBtn) {
    aiClearChatBtn.addEventListener('click', clearAIChat);
  }
}

// ===== GOOGLE SEARCH =====
function googleSearch() {
  const query = document.getElementById('googleSearch').value.trim();
  if (!query) return;

  const status = document.getElementById('googleStatus');
  const frame = document.getElementById('googleBrowserFrame');
  status.textContent = `🔍 Cargando Google para "${query}"...`;
  frame.src = `https://r.jina.ai/http://https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

// ===== YOUTUBE SEARCH =====
function youtubeSearch() {
  const query = document.getElementById('youtubeSearch').value.trim();
  if (!query) return;

  const status = document.getElementById('youtubeStatus');
  const frame = document.getElementById('youtubeBrowserFrame');
  status.textContent = `🎥 Cargando YouTube para "${query}"...`;
  frame.src = `https://r.jina.ai/http://https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

// ===== AI CHAT =====
function sendAIMessage() {
  const messageInput = document.getElementById('aiMessage');
  const message = messageInput.value.trim();
  if (!message) return;

  const chatContainer = document.getElementById('chatContainer');
  const apiKey = document.getElementById('aiApiKey').value.trim();

  // Mostrar mensaje del usuario
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'chat-message user';
  userMsgDiv.innerHTML = `<strong>Tú:</strong> ${message}`;
  chatContainer.appendChild(userMsgDiv);
  messageInput.value = '';

  // Si no hay API key, mostrar mensaje de error
  if (!apiKey) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'chat-message ai';
    errorDiv.innerHTML = `<strong>🤖 IA:</strong> ⚠️ Por favor, configura tu API Key de Gemini primero.`;
    chatContainer.appendChild(errorDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return;
  }

  // Mostrar indicador de carga
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'chat-message ai';
  loadingDiv.innerHTML = `<strong>🤖 IA:</strong> Escribiendo...`;
  chatContainer.appendChild(loadingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Llamar a Gemini API
  const model = document.getElementById('aiModel').value;
  callGeminiAPI(message, apiKey, model, loadingDiv, chatContainer);
}

function callGeminiAPI(message, apiKey, model, loadingDiv, chatContainer) {
  fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: message }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500
      }
    })
  })
  .then(response => response.json())
  .then(data => {
    loadingDiv.remove();

    if (data.error) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'chat-message ai';
      errorDiv.innerHTML = `<strong>🤖 IA:</strong> ❌ Error: ${data.error.message}`;
      chatContainer.appendChild(errorDiv);
    } else {
      const aiMsg = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No se recibió respuesta.';
      const aiMsgDiv = document.createElement('div');
      aiMsgDiv.className = 'chat-message ai';
      aiMsgDiv.innerHTML = `<strong>🤖 IA:</strong> ${aiMsg}`;
      chatContainer.appendChild(aiMsgDiv);
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
  })
  .catch(error => {
    loadingDiv.remove();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'chat-message ai';
    errorDiv.innerHTML = `<strong>🤖 IA:</strong> ❌ Error de conexión: ${error.message}`;
    chatContainer.appendChild(errorDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
}

function saveAISettings() {
  const apiKey = document.getElementById('aiApiKey').value.trim();
  const model = document.getElementById('aiModel').value;
  
  if (!apiKey) {
    showNotification('Por favor ingresa una API Key', 'error');
    return;
  }

  state.ai = { apiKey, model };
  saveStorage();
  showNotification('✅ Configuración de IA guardada');
}

function clearAIChat() {
  const chatContainer = document.getElementById('chatContainer');
  chatContainer.innerHTML = '<div class="chat-message ai"><strong>🤖 IA:</strong> Chat limpiado. Listo para nuevas preguntas.</div>';
}

function loadAISettings() {
  if (state.ai && state.ai.apiKey) {
    document.getElementById('aiApiKey').value = state.ai.apiKey;
    document.getElementById('aiModel').value = state.ai.model || 'gemini-2.0-flash';
  }
}

function updateNoteCount() {
  const count = noteTextarea.value.trim().split(/\s+/).filter(Boolean).length;
  noteCount.textContent = `${count} palabra${count === 1 ? '' : 's'}`;
}

function init() {
  loadStorage();
  bindEvents();
  loadAISettings();
  updateClock();
  setInterval(updateClock, 1000);
  buildCalendar();
  updateDeviceInfo();
  setupNotification();
  setupDrawCanvas();
  initAudioVisualizer();
  renderPlaylist();
  renderVideoList();
  renderPhotos();
  renderHistory();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  const loadingScreen = document.getElementById('loadingScreen');
  const loadingBarFill = document.getElementById('loadingBarFill');
  const loadingPercent = document.getElementById('loadingPercent');

  if (loadingScreen && loadingBarFill && loadingPercent) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 4;
      if (progress > 100) progress = 100;
      loadingBarFill.style.width = `${progress}%`;
      loadingPercent.textContent = `${progress}%`;

      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          setTimeout(() => loadingScreen.remove(), 500);
        }, 450);
      }
    }, 120);
  }
}

init();
