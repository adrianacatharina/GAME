// Mendapatkan elemen-elemen HTML yang dibutuhkan
const playerName = document.getElementById('player-name');
const scoreDisplay = document.getElementById('score');
const questionDisplay = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit-answer');
const finalScoreDisplay = document.getElementById('final-score');

// Inisialisasi data game
let score = 0;
let currentQuestion = generateQuestion();
let gameOver = false;

// Meminta pengguna untuk memasukkan nama
const playerNameInput = prompt('Masukkan nama Anda:');
playerName.textContent = playerNameInput;

// Fungsi untuk menghasilkan pertanyaan secara acak (penambahan atau pengurangan)
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = Math.random() < 0.5 ? 'add' : 'subtract'; // Menentukan operasi secara acak
    return { num1, num2, operation };
}

// Fungsi untuk mengupdate pertanyaan dan skor
function updateGame() {
    currentQuestion = generateQuestion();
    if (currentQuestion.operation === 'add') {
        questionDisplay.textContent = `Berapa ${currentQuestion.num1} + ${currentQuestion.num2}?`;
    } else {
        questionDisplay.textContent = `Berapa ${currentQuestion.num1} - ${currentQuestion.num2}?`;
    }
    answerInput.value = '';
    scoreDisplay.textContent = score;
}

// Event listener untuk tombol Jawab
submitButton.addEventListener('click', () => {
    if (gameOver) {
        return;
    }

    const userAnswer = parseInt(answerInput.value);
    let correctAnswer;

    if (currentQuestion.operation === 'add') {
        correctAnswer = currentQuestion.num1 + currentQuestion.num2;
    } else {
        correctAnswer = currentQuestion.num1 - currentQuestion.num2;
    }

    if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
        score++;
        alert('Jawaban Anda benar!');
    } else {
        alert('Jawaban Anda salah. Coba lagi.');
    }

    updateGame();

    // Tambahkan logika untuk menampilkan nilai akhir
    if (score >= 10) {
        finalScoreDisplay.textContent = `Selamat, ${playerNameInput}! Nilai akhir Anda adalah ${score}. Anda telah menyelesaikan permainan!`;
        submitButton.disabled = true; // Matikan tombol Jawab setelah mencapai nilai akhir
        gameOver = true;
    }
});

// Mulai permainan
updateGame();
