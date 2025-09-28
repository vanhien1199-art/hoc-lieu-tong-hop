// File: /shared/chatbot.js (Không thay đổi)

document.addEventListener('DOMContentLoaded', () => {
    // Lấy các phần tử giao diện từ file HTML
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // URL của "Tổng đài" (Web Service trung tâm), địa chỉ này không đổi
    const AI_SERVICE_URL = 'https://ai-trung-tam-service.onrender.com'; // <<-- Địa chỉ này giữ nguyên

    // Lấy mã bài học được định nghĩa trong từng file HTML
    const LESSON_ID = window.lessonId || 'default';

    // Gán sự kiện cho nút Gửi và phím Enter
    if(sendButton){
        sendButton.addEventListener('click', askAI);
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                askAI();
            }
        });
    }

    // Hàm thêm tin nhắn vào cửa sổ chat
    function addMessageToChat(text, className) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', className);
        chatWindow.appendChild(messageElement);
        
        // Sử dụng thư viện `marked` để hiển thị định dạng (chữ đậm, xuống dòng...)
        messageElement.innerHTML = marked.parse(text);

        chatWindow.scrollTop = chatWindow.scrollHeight;
        return messageElement;
    }

    // Hàm chính: Gửi câu hỏi đến "Tổng đài" và nhận câu trả lời
    async function askAI() {
        const question = userInput.value.trim();
        if (!question) return;

        addMessageToChat(question, 'user-message');
        userInput.value = '';
        const waitingMessage = addMessageToChat('Trợ lý AI đang suy nghĩ...', 'ai-message');

        try {
            // Gửi yêu cầu đến "Tổng đài", kèm theo câu hỏi và mã bài học
            const response = await fetch(`${AI_SERVICE_URL}/ask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: question,
                    lesson_id: LESSON_ID 
                })
            });

            if (!response.ok) {
                throw new Error('Lỗi mạng hoặc server');
            }
            
            const data = await response.json();
            // Hiển thị câu trả lời nhận được từ "Tổng đài"
            waitingMessage.innerHTML = marked.parse(data.answer);

        } catch (error) {
            waitingMessage.innerHTML = marked.parse('**Xin lỗi, đã có lỗi xảy ra!** Vui lòng thử lại sau.');
        }
    }
});