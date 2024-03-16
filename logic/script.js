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
            this.initializeQuiz();
        }

        initializeQuiz() {
            console.log('Initializing quiz...');
            this.startButton.addEventListener('click', () => {
                console.log('Start button clicked');
                this.startGame();
            });
        }

        startGame() {
            console.log('Starting game');
            this.hideStartButton();
            this.currentQuestionIndex = 0;
            this.typeScores = {};
            this.setNextQuestion();
        }

        hideStartButton() {
            console.log('Hiding start button');
            this.startButton.style.display = 'none';
        }

        setNextQuestion() {
            if (this.currentQuestionIndex < this.questions.length) {
                this.showQuestion(this.questions[this.currentQuestionIndex]);
            } else {
                this.finishQuiz();
            }
        }

        showQuestion(question) {
            console.log('Showing question:', question.text);
            this.resetState();
            this.questionElement.innerText = question.text;
            question.answers.forEach(answer => {
                const button = document.createElement('button');
                button.innerText = answer.text;
                button.classList.add('btn');
                button.addEventListener('click', () => this.selectAnswer(answer));
                this.answerButtonsElement.appendChild(button);
            });
            this.updateProgressBar();
        }

        resetState() {
            this.answerButtonsElement.innerHTML = '';
        }

        updateProgressBar() {
            const progressPercentage = ((this.currentQuestionIndex / this.questions.length) * 100).toFixed(0);
            this.progressBar.style.width = `${progressPercentage}%`;
            this.progressBarText.innerText = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        }

        selectAnswer(answer) {
            console.log('Answer selected:', answer.text);
            this.typeScores[answer.type] = (this.typeScores[answer.type] || 0) + 1;
            this.currentQuestionIndex++;
            this.setNextQuestion();
        }

        finishQuiz() {
            console.log('Finishing quiz...');
            this.questionContainer.style.display = 'none'; // Ensure all question-related elements are hidden
            this.showResult();
        }

        showResult() {
            this.questionContainer.classList.add('hidden');
            this.resultContainer.classList.remove('hidden');
        
            // Sort the types based on scores and get the primary and secondary types
            const sortedTypes = Object.keys(this.typeScores).sort((a, b) => this.typeScores[b] - this.typeScores[a]);
            const primaryType = sortedTypes[0];
            const secondaryType = sortedTypes[1] || 'N/A';
        
            // Retrieve the description and gifUrl for the primary type
            const primaryDescription = this.roommateTypeDescriptions[primaryType] ? this.roommateTypeDescriptions[primaryType].description : "No description available. Please check your answers.";
            const primaryGifUrl = this.roommateTypeDescriptions[primaryType] ? this.roommateTypeDescriptions[primaryType].gifUrl : "";
        
            // Retrieve the description for the secondary type, if applicable
            const secondaryDescription = this.roommateTypeDescriptions[secondaryType] ? this.roommateTypeDescriptions[secondaryType].description : "No secondary type or description available.";
            const secondaryGifUrl = this.roommateTypeDescriptions[secondaryType] ? this.roommateTypeDescriptions[secondaryType].gifUrl : "";
        
            // Update the result container's inner HTML to include the descriptions and the GIFs
            this.resultContainer.innerHTML = `
                <h2>Your Primary Roommate Type: ${primaryType}</h2>
                <p>${primaryDescription}</p>
                ${primaryGifUrl}
                <h3>Your Secondary Roommate Type: ${secondaryType}</h3>
                <p>${secondaryDescription}</p>
                ${secondaryGifUrl ? secondaryGifUrl : ''}
            `;
        }
        
        
    }

    if (window.questions && window.roommateTypeDescriptions) {
        console.log('Questions and descriptions found, initializing quiz...');
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
