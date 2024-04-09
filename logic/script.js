document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing quiz game...');

    class QuizGame {
        constructor() {
            console.log('Initializing QuizGame instance...');
            this.quizContainer = document.getElementById('quiz-container');
            this.questionElement = document.getElementById('question');
            this.answerButtonsElement = document.getElementById('answer-buttons');
            this.resultContainer = document.getElementById('result-container');
            this.progressBar = document.getElementById('progress-bar');
            this.progressBarText = document.getElementById('progress-text');
            this.currentQuestionIndex = 0;
            this.typeScores = {};

            this.questions = window.questions;
            this.roommateTypeDescriptions = window.descriptions;

            this.startQuiz();
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
            const sortedTypes = Object.keys(this.typeScores).sort((a, b) => this.typeScores[b] - this.typeScores[a]);
            const primaryType = sortedTypes[0];
            const primaryInfo = this.roommateTypeDescriptions[primaryType];
            const compatibleType = primaryInfo.CompatibleWith;

            let resultHtml = `<h2>Your Primary Roommate Type: ${primaryType}</h2>
                              <p>${primaryInfo.Description}</p>
                              <p><strong>Compatible with:</strong> ${compatibleType}</p>`;

            // Clear the result container's existing content
            this.resultContainer.innerHTML = resultHtml;

            // Create a div to safely insert the iframe HTML
            const gifContainer = document.createElement('div');
            gifContainer.innerHTML = primaryInfo.gifUrl; // Inserts the iframe embed code safely
            this.resultContainer.appendChild(gifContainer);
        }            
    }

    if (window.questions && window.descriptions) {
        new QuizGame();
    } else {
        console.error('Quiz initialization failed: Missing questions or descriptions.');
    }
});
