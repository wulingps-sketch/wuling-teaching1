// app.js（請直接貼到 GitHub 的 app.js 檔案）
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

/* ---------- 把你之前提供的 firebaseConfig 放在這裡 ---------- */
const firebaseConfig = {
  apiKey: "AIzaSyClasvQpf9U1LaPh4Zay3P24qIHgVUCXF4",
  authDomain: "wuling-teaching.firebaseapp.com",
  projectId: "wuling-teaching",
  storageBucket: "wuling-teaching.firebasestorage.app",
  messagingSenderId: "309649482176",
  appId: "1:309649482176:web:e41ec1c1544b7b6fef2825",
  measurementId: "G-1QJ9P1ML8F"
};

/* ---------- 初始化 Firebase ---------- */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

/* ---------- DOM 元素 ---------- */
const loginSection = document.getElementById('loginSection');
const loginBtn = document.getElementById('loginBtn');
const appSection = document.getElementById('appSection');
const userNameEl = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

const tabButtons = document.querySelectorAll('.tabbtn');
const tabContents = document.querySelectorAll('.tabcontent');

const lessonTitle = document.getElementById('lessonTitle');
const lessonContent = document.getElementById('lessonContent');
const submitLesson = document.getElementById('submitLesson');

const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const uploadFiles = document.getElementById('uploadFiles');

/* ---------- 登入 / 登出 ---------- */
loginBtn.addEventListener('click', async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    alert('登入錯誤，請允許跳出視窗並再試一次');
    console.error(err);
  }
});

logoutBtn.addEventListener('click', async () => {
  await signOut(auth);
});

/* 監聽登入狀態，Firebase 會自動呼叫 */
onAuthStateChanged(auth, (user) => {
  if (user) {
    // 已登入：顯示主介面
    loginSection.classList.add('hidden');
    appSection.classList.remove('hidden');
    userNameEl.textContent = `👩‍🏫 ${user.displayName || user.email}`;
  } else {
    // 未登入：顯示登入按鈕
    loginSection.classList.remove('hidden');
    appSection.classList.add('hidden');
    userNameEl.textContent = '';
  }
});

/* ---------- 頁籤切換（教案 / 上傳） ---------- */
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.getAttribute('data-tab');
    tabContents.forEach(tc => tc.classList.add('hidden'));
    document.getElementById(tab).classList.remove('hidden');
  });
});

/* ---------- 教案送出（示意） ---------- */
submitLesson.addEventListener('click', () => {
  const title = lessonTitle.value.trim();
  const content = lessonContent.value.trim();
  if (!title) return alert('請輸入教案標題');
  // 目前為示意：實際儲存可以接 Firestore（後續加）
  alert(`教案已送出（示意）\n標題：${title}\n內容長度：${content.length} 字`);
  lessonTitle.value = '';
  lessonContent.value = '';
});

/* ---------- 選取檔案清單顯示（示意） ---------- */
fileInput.addEventListener('change', () => {
  fileList.innerHTML = '';
  const files = Array.from(fileInput.files || []);
  files.forEach(f => {
    const li = document.createElement('li');
    li.textContent = f.name;
    fileList.appendChild(li);
  });
});

/* ---------- 上傳檔案按鈕（示意） ---------- */
uploadFiles.addEventListener('click', () => {
  const files = Array.from(fileInput.files || []);
  if (files.length === 0) return alert('尚未選擇檔案');
  // 目前為示意：實際上傳可接 Firebase Storage（後續加）
  alert(`已上傳 ${files.length} 個檔案（示意）`);
  fileInput.value = '';
  fileList.innerHTML = '';
});
app.js
