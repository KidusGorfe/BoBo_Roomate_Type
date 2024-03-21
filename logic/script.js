document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing quiz game...');

    class QuizGame {
        constructor() {
            console.log('Initializing QuizGame instance...');
            this.introContainer = document.getElementById('intro-container');
            this.emailSignupContainer = document.getElementById('email-signup-container');
            this.quizContainer = document.getElementById('quiz-container');
            this.questionElement = document.getElementById('question');
            this.answerButtonsElement = document.getElementById('answer-buttons');
            this.resultContainer = document.getElementById('result-container');
            this.progressBar = document.getElementById('progress-bar');
            this.progressBarText = document.getElementById('progress-text');
            this.currentQuestionIndex = 0;
            this.typeScores = {};
            this.userName = '';

            this.questions = window.questions;
            this.roommateTypeDescriptions = window.roommateTypeDescriptions;

            this.setupEventListeners();
        }

        setupEventListeners() {
            console.log('Setting up event listeners...');
            document.getElementById('begin-quiz-btn').addEventListener('click', () => {
                console.log('Begin quiz button clicked.');
                this.introContainer.classList.add('hidden');
                this.emailSignupContainer.classList.remove('hidden');
            });

            document.getElementById('email-signup-form').addEventListener('submit', (event) => {
                console.log('Email signup form submitted.');
                event.preventDefault();
                this.userName = document.getElementById('name-input').value.trim();
                if (this.userName === '') {
                    alert('Please enter your name.');
                    return;
                }
                this.emailSignupContainer.classList.add('hidden');
                this.startQuiz();
            });
        }

        startQuiz() {
            console.log('Starting quiz...');
            this.quizContainer.classList.remove('hidden');
            this.setNextQuestion();
        }

        setNextQuestion() {
            console.log('Setting up next question...');
            if (this.currentQuestionIndex < this.questions.length) {
                console.log('Displaying question', this.currentQuestionIndex + 1);
                this.showQuestion(this.questions[this.currentQuestionIndex]);
            } else {
                console.log('All questions answered. Finishing quiz...');
                this.finishQuiz();
            }
        }

        showQuestion(question) {
            console.log('Displaying question:', question.text);
            this.questionElement.innerText = question.text;
            this.answerButtonsElement.innerHTML = ''; // Clear previous buttons

            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn');
                button.addEventListener('click', () => this.selectAnswer(answer));
                this.answerButtonsElement.appendChild(button);
            });

            this.updateProgressBar();
        }

        selectAnswer(answer) {
            console.log('Selected answer:', answer.text);
            this.typeScores[answer.type] = (this.typeScores[answer.type] || 0) + 1;
            this.currentQuestionIndex++;
            this.setNextQuestion();
        }

        updateProgressBar() {
            const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
            console.log('Updating progress bar:', progress.toFixed(2), '%');
            this.progressBar.style.width = `${progress}%`;
            this.progressBarText.innerText = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        }

        finishQuiz() {
            console.log('Quiz finished. Displaying result...');
            this.quizContainer.classList.add('hidden');
            this.resultContainer.classList.remove('hidden');
            this.showResult();
        }

        showResult() {
            console.log('Displaying result...');
            
            const sortedTypes = Object.keys(this.typeScores).sort((a, b) => this.typeScores[b] - this.typeScores[a]);
            const primaryType = sortedTypes[0];
            const secondaryType = sortedTypes[1] || null; // Handle case where there might not be a clear secondary type.
            
            const primaryInfo = this.roommateTypeDescriptions[primaryType];
            const secondaryInfo = secondaryType ? this.roommateTypeDescriptions[secondaryType] : null;
            
            let resultHtml = `<h2>Your Primary Roommate Type: ${primaryType}</h2><p>${primaryInfo.description}</p><img src="${primaryInfo.gifUrl}" alt="GIF for ${primaryType}" style="max-width:100%; height:auto;">`;
            
            if (secondaryInfo) {
                resultHtml += `<h2>Your Secondary Roommate Type: ${secondaryType}</h2><p>${secondaryInfo.description}</p><img src="${secondaryInfo.gifUrl}" alt="GIF for ${secondaryType}" style="max-width:100%; height:auto;">`;
            }
            
            this.resultContainer.innerHTML = resultHtml;
        }
    }

    // Initialization check.
    if (window.questions && window.roommateTypeDescriptions) {
        console.log('Questions and descriptions available. Initializing QuizGame...');
        new QuizGame();
    } else {
        console.error('Quiz initialization failed: Missing questions or descriptions.');
    }
});
