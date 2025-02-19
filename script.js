// جلب عناصر الصفحة
let textArea = document.getElementById("textArea");
let sendBtn = document.getElementById("sendBtn");
let chatBox = document.getElementById("chatbox");
let emojiBtn = document.getElementById("emojiBtn");

// زر الإيموجي: يضيف إيموجي عند الضغط عليه
emojiBtn.addEventListener("click", function () {
    textArea.value += " 😊"; // إضافة الإيموجي
    textArea.focus(); // إبقاء المؤشر داخل مربع النص
});

// زر الإرسال: يرسل الرسالة عند الضغط عليه
sendBtn.addEventListener("click", function () {
    sendMessage();
});

// جعل زر Enter يرسل الرسالة أيضًا
textArea.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // منع السطر الجديد
        sendMessage();
    }
});

// دالة إرسال الرسالة
function sendMessage() {
    let userMessage = textArea.value.trim(); // إزالة الفراغات الزائدة

    if (userMessage !== "") {
        // إنشاء عنصر رسالة جديدة
        let userMsgElement = document.createElement("p");
        userMsgElement.classList.add("user-message");
        userMsgElement.textContent = userMessage;

        // إضافة الرسالة إلى صندوق الشات
        chatBox.appendChild(userMsgElement);

        // جعل الشات يمرر تلقائيًا للأسفل لرؤية الرسائل الجديدة
        chatBox.scrollTop = chatBox.scrollHeight;

        // مسح مربع النص بعد الإرسال
        textArea.value = "";

        // محاكاة رد تلقائي من الروبوت
        setTimeout(() => botReply(userMessage), 1000);
    }
}

// قائمة الردود بناءً على الكلمات المفتاحية
const botResponses = {
    "hello": "Hi there! 😊 How can I assist you?",
    "how are you": "I'm just a bot, but I'm doing great! What about you? 🤖",
    "what is your name": "I'm your Digital Twin Chatbot! Nice to meet you. 👋",
    "bye": "Goodbye! Have a great day! 👋",
    "thanks": "You're welcome! 😊",
    "help": "Sure! Tell me what you need help with. 🧐",
    "joke": "Why don’t skeletons fight each other? Because they don’t have the guts! 😂",
    "love": "Aww! ❤️ Love makes the world go round! 💕",
    "angry": "Take a deep breath! 😤 Everything will be okay. 😊",
    "happy": "I'm glad you're happy! 😃 Keep smiling! 😁",
    "sad": "Oh no! 😔 Do you want to talk about it? 🤗"
};

// دالة الرد التلقائي بناءً على رسالة المستخدم

function botReply(userMessage) {
    let botResponse = "I'm not sure what you mean. 🤔"; // رد افتراضي

    // البحث عن رد مناسب من القائمة
    for (let key in botResponses) {
        if (userMessage.toLowerCase().includes(key)) {
            botResponse = botResponses[key];
            break;
        }
    }

    // إنشاء عنصر رسالة البوت
    let botMsgElement = document.createElement("p");
    botMsgElement.classList.add("bot-message");
    botMsgElement.textContent = botResponse;

    // إضافة الرسالة إلى الشات
    chatBox.appendChild(botMsgElement);
    chatBox.scrollTop = chatBox.scrollHeight; // تمرير الشات للأسفل تلقائيًا

    // 🔊 نطق الرد بصوت البوت
    speak(botResponse);
}

// دالة تحويل النص إلى صوت
function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // تعيين اللغة إلى الإنجليزية
    speech.volume = 1; // مستوى الصوت
    speech.rate = 1; // سرعة الكلام
    speech.pitch = 1; // نغمة الصوت

    window.speechSynthesis.speak(speech);
}