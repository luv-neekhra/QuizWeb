document.querySelector(".start_btn button").onclick = () => {
    document.querySelector(".info_box").classList.add("activeInfo");
};

// Event listeners for continue and quit buttons in the info box
document.querySelector(".info_box .restart").onclick = () => {
    document.querySelector(".info_box").classList.remove("activeInfo");
    document.querySelector(".container_box").classList.add("activeContainerbox");
    document.querySelector(".dropdown").classList.add("activeDrop");
    document.querySelector(".tabs").classList.add("activeTabs");
    
    //showQuestions();
};

document.querySelector(".info_box .quit").onclick = () => {
    window.location.reload();
};


let currentQuestionIndex = 0;
let timer;
const timeLimit = 15; // seconds
let filteredQuestions = [];

function startTimer() {
    let timeLeft = timeLimit;
    document.querySelector(".timer_sec").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.querySelector(".timer_sec").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showNextQuestion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function showQuestions() {
    const selectedCategory = document.getElementById("category-dropdown").value;
    const activeDifficultyButton = document.querySelector(".tabs button.active");
    const selectedDifficulty = activeDifficultyButton ? activeDifficultyButton.textContent.toLowerCase() : 'easy';
    filteredQuestions = questions.filter(q => q.category === selectedCategory && q.difficulty === selectedDifficulty);

    if (filteredQuestions.length > 0) {
        currentQuestionIndex = 0;
        displayQuestion(filteredQuestions[currentQuestionIndex]);
    } else {
        document.querySelector(".que_text").innerHTML = `<span>No questions available for the selected category and difficulty.</span>`;
        document.querySelector(".option_list").innerHTML = '';
        document.querySelector(".next_btn").style.display = "none";
    }
}

function displayQuestion(question) {
    document.querySelector(".que_text").innerHTML = `<span>${question.question}</span>`;
    const optionsHtml = question.options.map(option => `<div class="option"><span>${option}</span></div>`).join('');
    document.querySelector(".option_list").innerHTML = optionsHtml;

    document.querySelectorAll(".option").forEach(option => {
        option.onclick = () => {
            stopTimer();
            const userAnswer = option.textContent;
            if (userAnswer === question.answer) {
                option.classList.add("correct");
            } else {
                option.classList.add("incorrect");
            }
            setTimeout(() => {
                showNextQuestion();
            }, 1000);
        };
    });
    stopTimer(); // Ensure any existing timer is stopped before starting a new one
    startTimer();
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < filteredQuestions.length) {
        displayQuestion(filteredQuestions[currentQuestionIndex]);
    } else {
        stopTimer();
        document.querySelector(".quiz_box").classList.remove("activeQuiz");
        document.querySelector(".result_box").classList.add("activeResult");
    }
}

// Event listeners for difficulty buttons
document.querySelectorAll(".tabs button").forEach(button => {
    button.onclick = () => {
        document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        document.querySelector(".container_box").classList.remove("activeContainerbox");
    document.querySelector(".dropdown").classList.remove("activeDrop");
    document.querySelector(".tabs").classList.remove("activeTabs");

        document.querySelector(".quiz_box").classList.add("activeQuiz");
        showQuestions();
    };
});

// Category dropdown change event
document.getElementById("category-dropdown").onchange = () => {
    showQuestions();
};

// Initialize with default values
document.addEventListener('DOMContentLoaded', () => {
    const defaultCategory = document.getElementById("category-dropdown").value;
    const defaultDifficultyButton = document.querySelector(".tabs button.active");
    const defaultDifficulty = defaultDifficultyButton ? defaultDifficultyButton.textContent.toLowerCase() : 'easy';

    showQuestions(defaultCategory, defaultDifficulty);
});

// Placeholder for the next question button functionality
document.querySelector(".next_btn").onclick = () => {
    showNextQuestion();
};

// Event listener for restart button in result box
document.querySelector(".result_box .restart").onclick = () => {
    document.querySelector(".result_box").classList.remove("activeResult");
    document.querySelector(".info_box").classList.add("activeInfo");
};

// Event listener for quit button in result box
document.querySelector(".result_box .quit").onclick = () => {
    window.location.reload();
};

function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    var display = document.getElementById('display').value;
    var result = eval(display);
    document.getElementById('display').value = result;
}
