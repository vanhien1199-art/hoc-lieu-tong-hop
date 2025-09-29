// File này sẽ chứa logic cho các mô phỏng và bài tập của riêng bài học Cơ năng.
// Hiện tại để trống vì các phần đó rất phức tạp và cần nhiều thời gian để xây dựng.

document.addEventListener('DOMContentLoaded', function() {
    console.log("Trang học liệu Cơ năng đã sẵn sàng.");

    // Ví dụ: Render công thức toán học sau khi trang tải xong
    renderMathInElement(document.body, {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
        ]
    });
});
// bổ sung
function checkCalculation() {
    const userAnswer = parseFloat(document.getElementById('calc-answer').value);
    const correctAnswer = Math.sqrt(2 * 9.8 * 4); // ~8.85
    const feedbackDiv = document.getElementById('feedback-q2');
    const solutionDiv = document.getElementById('solution-q2');

    if (Math.abs(userAnswer - correctAnswer) < 0.1) { // Sai số cho phép 0.1
        feedbackDiv.textContent = "Chính xác! Rất tốt!";
        feedbackDiv.style.color = 'green';
        solutionDiv.style.display = 'block';
    } else {
        feedbackDiv.textContent = "Chưa đúng. Hãy xem lại công thức và thử lại nhé.";
        feedbackDiv.style.color = 'red';
        solutionDiv.style.display = 'none';
    }
}

document.getElementById('interactive-quiz').addEventListener('submit', function(e) {
    e.preventDefault();
    let score = 0;
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    if (q1Answer && q1Answer.value === 'c') {
        score++;
        document.getElementById('feedback-q1').textContent = "Đúng! Cơ năng được bảo toàn khi không có ma sát.";
        document.getElementById('feedback-q1').style.color = 'green';
    } else {
        document.getElementById('feedback-q1').textContent = "Sai! Khi không có ma sát, động năng và thế năng chuyển hóa cho nhau nhưng tổng của chúng (cơ năng) không đổi.";
        document.getElementById('feedback-q1').style.color = 'red';
    }

    // Phần chấm điểm cho câu 2
    const userAnswerCalc = parseFloat(document.getElementById('calc-answer').value);
    const correctAnswerCalc = Math.sqrt(2 * 9.8 * 4);
    if (Math.abs(userAnswerCalc - correctAnswerCalc) < 0.1) {
        score++;
    }
    
    document.getElementById('final-score').textContent = `Kết quả của bạn: ${score} / 2 câu đúng.`;
});
