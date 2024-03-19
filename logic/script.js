console.log('Initializing quiz game...');

class QuizGame {
    constructor(questions, introContainerId, emailSignupContainerId, emailFormId, questionContainerId, answerButtonsElementId, resultContainerId, progressBarId, progressBarTextId, descriptions) {
        this.questions = questions;
        this.introContainer = document.getElementById(introContainerId);
        this.emailSignupContainer = document.getElementById(emailSignupContainerId);
        this.emailForm = document.getElementById(emailFormId);
        this.questionContainer = document.getElementById(questionContainerId);
        this.answerButtonsElement = document.getElementById(answerButtonsElementId);
        this.resultContainer = document.getElementById(resultContainerId);
        this.progressBar = document.getElementById(progressBarId);
        this.progressBarText = document.getElementById(progressBarTextId);
        this.descriptions = descriptions;
        this.currentQuestionIndex = 0;
        this.typeScores = {};

        this.initializeIntro();
    }

    initializeIntro() {
        console.log('Initializing intro...');
        const beginQuizBtn = document.getElementById('begin-quiz-btn');
        beginQuizBtn.addEventListener('click', () => {
            console.log('Begin quiz button clicked...');
            this.introContainer.classList.add('hidden');
            this.emailSignupContainer.classList.remove('hidden');
        });

        // Start the quiz after email submission
        this.emailForm.addEventListener('submit', (event) => {
            console.log('Email form submitted...');
            event.preventDefault(); // Prevent the form from actually submitting
            this.startQuiz();
        });
    }

    startQuiz() {
        console.log('Starting the quiz...');
        this.emailSignupContainer.classList.add('hidden');
        this.questionContainer.classList.remove('hidden');
        this.setNextQuestion();
    }

    setNextQuestion() {
        console.log('Setting next question...');
        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion(this.questions[this.currentQuestionIndex]);
        } else {
            this.finishQuiz();
        }
    }

    showQuestion(question) {
        console.log('Showing question...');
        this.resetState();
        const questionElement = document.getElementById('question');
        if (questionElement) {
            questionElement.innerText = question.text;
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn');
                button.addEventListener('click', () => this.selectAnswer(answer));
                this.answerButtonsElement.appendChild(button);
            });
            this.updateProgressBar();
        } else {
            console.error("Question element not found.");
        }
    }

    resetState() {
        console.log('Resetting state...');
        while (this.answerButtonsElement.firstChild) {
            this.answerButtonsElement.removeChild(this.answerButtonsElement.firstChild);
        }
    }

    selectAnswer(answer) {
        console.log('Answer selected...');
        this.typeScores[answer.type] = (this.typeScores[answer.type] || 0) + 1;
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.setNextQuestion();
        } else {
            this.finishQuiz();
        }
    }

    updateProgressBar() {
        console.log('Updating progress bar...');
        const progressPercentage = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.progressBar.style.width = `${progressPercentage}%`;
        this.progressBarText.innerText = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
    }

    finishQuiz() {
        console.log('Finishing quiz...');
        this.questionContainer.classList.add('hidden');
        this.showResult();
    }

    showResult() {
        console.log('Showing result...');
        console.log('Descriptions:', this.descriptions);
    
        this.resultContainer.classList.remove('hidden');
        const sortedTypes = Object.keys(this.typeScores).sort((a, b) => this.typeScores[b] - this.typeScores[a]);
        const primaryType = sortedTypes[0];
        console.log('Primary Type:', primaryType);
    
        const primaryInfo = this.descriptions[primaryType];
        console.log('Primary Info:', primaryInfo);
    
        if (primaryInfo) {
            const resultHtml = `
                <h2>Your Primary Roommate Type: ${primaryType}</h2>
                <p>${primaryInfo.description}</p>
                ${primaryInfo.gifUrl}
            `;
            this.resultContainer.innerHTML = resultHtml;
        } else {
            console.error("Description not found for the primary roommate type.");
        }
    }
}

if (window.questions && window.roommateTypeDescriptions) {
    new QuizGame(
        window.questions,
        'intro-container',
        'email-signup-container',
        'email-signup-form',
        'question-container',
        'answer-buttons',
        'result-container',
        'progress-bar',
        'progress-text',
        window.roommateTypeDescriptions
    );
} else {
    console.error('Quiz data not loaded properly.');
}
