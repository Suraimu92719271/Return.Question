const PASSWORD = "Kdkm09020701";
const MAX_QUESTIONS = 100;

/* ---------------- 投稿処理 ---------------- */

document.getElementById("questionForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = JSON.parse(localStorage.getItem("questions") || "[]");

    if (data.length >= MAX_QUESTIONS) {
        document.getElementById("message").innerText =
            "現在質問数が上限に達しています。";
        return;
    }

    const name = document.getElementById("name").value || "匿名";
    const question = document.getElementById("question").value;

    data.push({ name, question });
    localStorage.setItem("questions", JSON.stringify(data));

    document.getElementById("questionForm").reset();
    document.getElementById("message").innerText = "送信されました。";

    updateCounter();
});

/* ---------------- カウンター更新 ---------------- */

function updateCounter() {
    const data = JSON.parse(localStorage.getItem("questions") || "[]");
    const count = data.length;

    const counter = document.getElementById("questionCounter");
    if (counter) {
        counter.innerText = `${count} / ${MAX_QUESTIONS}`;
    }

    const adminCounter = document.getElementById("adminCounter");
    if (adminCounter) {
        adminCounter.innerText = `現在の質問数：${count} / ${MAX_QUESTIONS}`;
    }

    if (count >= MAX_QUESTIONS) {
        const form = document.getElementById("questionForm");
        if (form) {
            form.querySelector("button").disabled = true;
            document.getElementById("message").innerText =
                "現在質問受付は停止中です。";
        }
    }
}

/* ---------------- ログイン ---------------- */

function login() {
    const input = document.getElementById("password").value;

    if (input === PASSWORD) {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("adminContent").style.display = "block";
        loadQuestions();
        updateCounter();
    } else {
        alert("パスワードが違います");
    }
}

/* ---------------- 管理画面表示 ---------------- */

function loadQuestions() {
    const data = JSON.parse(localStorage.getItem("questions") || "[]");
    const list = document.getElementById("questionsList");
    if (!list) return;

    list.innerHTML = "";

    data.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <strong>${item.name}</strong>
            <p>${item.question}</p>
            <button onclick="deleteQuestion(${index})">削除</button>
        `;

        list.appendChild(div);
    });
}

/* ---------------- 削除 ---------------- */

function deleteQuestion(index) {
    const data = JSON.parse(localStorage.getItem("questions") || "[]");
    data.splice(index, 1);
    localStorage.setItem("questions", JSON.stringify(data));
    loadQuestions();
    updateCounter();
}

/* ---------------- 初期読み込み ---------------- */

window.onload = function() {
    updateCounter();
};