const API_URL = "https://script.google.com/macros/s/AKfycbwYlq4Ua1Y7ELQ1sBfq_4E-PYcGvAQZR2u7hUPy_X9riTv44q1DnRKGGiYEopZMmzCGHQ/exec";

const form = document.getElementById("questionForm");
const message = document.getElementById("message");
const counter = document.getElementById("questionCounter");

async function updateCounter() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const count = data.length - 1; // 1行目は見出し
  counter.textContent = `${count} / 100`;

  if (count >= 100) {
    form.querySelector("button").disabled = true;
    message.textContent = "現在質問数が上限に達しています。";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value || "匿名";
  const question = document.getElementById("question").value;

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ name, question })
  });

  const result = await res.json();

  if (result.result === "success") {
    message.textContent = "送信されました。";
    form.reset();
    updateCounter();
  } else {
    message.textContent = "送信に失敗しました。";
  }
});

updateCounter();
