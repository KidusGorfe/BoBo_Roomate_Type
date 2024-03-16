document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, initializing quiz game...');

    class QuizGame {
        constructor(questions, startButtonId, questionContainerId, questionElementId, answerButtonsElementId, resultContainerId, progressBarId, progressBarTextId, descriptions) {
            console.log('QuizGame constructor called');
            this.questions = questions;
            this.startButton = document.getElementById(startButtonId);
            this.questionContainer = document.getElementById(questionContainerId);
            this.questionElement = document.getElementById(questionElementId);
            this.answerButtonsElement = document.getElementById(answerButtonsElementId);
            this.resultContainer = document.getElementById(resultContainerId);
            this.progressBar = document.getElementById(progressBarId);
            this.progressBarText = document.getElementById(progressBarTextId);
            this.roommateTypeDescriptions = descriptions;
            this.currentQuestionIndex = 0;
            this.typeScores = {};
            this.startButton.addEventListener('click', () => this.startGame());
        }

        startGame() {
            console.log('Starting game');
            this.questionContainer.classList.remove('hidden');
            this.hideStartButton();
            this.currentQuestionIndex = 0;
            this.typeScores = {};
            this.setNextQuestion();
        }

        hideStartButton() {
            this.startButton.classList.add('hidden');
            this.startButton.style.display = 'none';
        }

        setNextQuestion() {
            if (this.currentQuestionIndex < this.questions.length) {
                this.resetState();
                this.showQuestion(this.questions[this.currentQuestionIndex]);
                this.updateProgressBar();
            } else {
                this.hideQuestionElements();
                this.showResult();
            }
        }

        updateProgressBar() {
            const progress = ((this.currentQuestionIndex) / this.questions.length) * 100;
            this.progressBar.style.width = `${progress}%`;
            this.progressBarText.innerText = `Question ${this.currentQuestionIndex} of ${this.questions.length}`;
        }

        showQuestion(question) {
            this.questionElement.innerText = question.text;
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn');
                button.addEventListener('click', () => this.selectAnswer(answer));
                this.answerButtonsElement.appendChild(button);
            });
            this.currentQuestionIndex++;
        }

        resetState() {
            this.answerButtonsElement.innerHTML = '';
        }

        selectAnswer(answer) {
            this.typeScores[answer.type] = (this.typeScores[answer.type] || 0) + 1;
            this.setNextQuestion();
        }

        hideQuestionElements() {
            this.questionContainer.classList.add('hidden');
            this.questionElement.classList.add('hidden');
            this.answerButtonsElement.classList.add('hidden');
            this.progressBar.classList.add('hidden');
            this.progressBarText.classList.add('hidden');
        }

        showResult() {
            this.resultContainer.classList.remove('hidden');
            const sortedTypes = Object.keys(this.typeScores).sort((a, b) => this.typeScores[b] - this.typeScores[a]);
            const primaryType = sortedTypes[0];
            const secondaryType = sortedTypes[1] || 'N/A';

            const primaryDescription = this.roommateTypeDescriptions[primaryType] || "No description available. Please check your answers.";
            const secondaryDescription = this.roommateTypeDescriptions[secondaryType] || "No secondary type or description available.";

            this.resultContainer.innerHTML = `
                <h2>Your Primary Roommate Type: ${primaryType}</h2>
                <p>${primaryDescription}</p>
                <h3>Your Secondary Roommate Type: ${secondaryType}</h3>
                <p>${secondaryDescription}</p>
            `;
        }
    }

    if (window.questions && window.roommateTypeDescriptions) {
        console.log('Questions and descriptions found, initializing quiz game...');
        new QuizGame(
            window.questions,
            'start-btn',
            'question-container',
            'question',
            'answer-buttons',
            'result-container',
            'progress-bar',
            'progress-text',
            window.roommateTypeDescriptions
        );
    } else {
        console.error('Questions or descriptions not loaded correctly.');
    }
});
