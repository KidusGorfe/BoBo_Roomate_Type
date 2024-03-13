document.addEventListener('DOMContentLoaded', () => {
    const roommateTypeDescriptions = {
        "The Organizer": "The Organizer is the type who alphabetizes their spice rack and color-codes their closet. They're on a first-name basis with the Container Store employees and think a fun Friday night involves a label maker. Beware: their idea of 'messy' is leaving one coffee cup in the sink.",
        "The Social Butterfly": "The Social Butterfly treats the apartment like a reality TV show set, where every night is a new episode filled with drama, laughter, and unexpected guests. They don't believe in 'too much party' and think silence is just unexplored space for conversation.",
        "The Homebody": "The Homebody has likely nested in the living room with a personal blanket fort. They treat the house like a personal hobbit hole, perfect for hibernation and not seeing the sun for days. They believe 'going out' is just a myth created by extroverts.",
        "The Adventurer": "The Adventurer is a mythical creature you're not sure actually lives in the house. Evidence of their existence includes a mysterious collection of souvenirs from around the world and occasional sightings at odd hours. They live by the motto, 'Why sleep when you can explore?'",
        "The Night Owl": "The Night Owl is a mysterious figure who thrives in the darkness, possibly a vampire. They're most active when everyone else is asleep, and the fridge light is their sun. They consider 3 AM an excellent time to vacuum or start a rock band.",
        "The Early Bird": "The Early Bird annoyingly chirps about their morning run and smoothie while you're still struggling with the concept of consciousness. They've accomplished more by 8 AM than most do in a day and are suspiciously chipper before coffee."
    };

    class QuizGame {
        constructor(questions, startButtonId, questionContainerId, questionElementId, answerButtonsElementId, resultContainerId, progressBarId) {
            this.questions = questions;
            this.startButton = document.getElementById(startButtonId);
            this.questionContainer = document.getElementById(questionContainerId);
            this.questionElement = document.getElementById(questionElementId);
            this.answerButtonsElement = document.getElementById(answerButtonsElementId);
            this.resultContainer = document.getElementById(resultContainerId);
            this.progressBar = document.getElementById(progressBarId); // Ensure this exists in your HTML
            this.currentQuestionIndex = 0;
            this.typeScores = {};
            if (this.startButton) {
                this.startButton.addEventListener('click', () => this.startGame());
            }
        }

        startGame() {
            this.startButton.classList.add('hidden');
            this.questionContainer.classList.remove('hidden');
            this.progressBar.parentElement.classList.remove('hidden'); // Ensure the progress bar container is shown
            this.currentQuestionIndex = 0;
            this.updateProgressBar();
            this.setNextQuestion();
        }

        setNextQuestion() {
            this.resetState();
            this.showQuestion(this.questions[this.currentQuestionIndex]);
            this.updateProgressBar();
        }

        updateProgressBar() {
            const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
            this.progressBar.style.width = `${progress}%`;
            this.progressBar.innerText = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
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
        }

        resetState() {
            while (this.answerButtonsElement.firstChild) {
                this.answerButtonsElement.removeChild(this.answerButtonsElement.firstChild);
            }
        }

        selectAnswer(answer) {
            this.typeScores[answer.type] = (this.typeScores[answer.type] || 0) + 1;
            const nextQuestionIndex = this.currentQuestionIndex + 1;
            if (nextQuestionIndex < this.questions.length) {
                this.currentQuestionIndex = nextQuestionIndex;
                this.setNextQuestion();
            } else {
                this.showResult();
            }
        }

        showResult() {
            this.questionContainer.classList.add('hidden');
            this.resultContainer.classList.remove('hidden');

            const sortedTypes = Object.keys(this.typeScores).sort((a, b) => this.typeScores[b] - this.typeScores[a]);
            const primaryType = sortedTypes[0];
            const secondaryType = sortedTypes[1] || 'N/A';

            this.resultContainer.innerHTML = `
                <h2>Your Primary Roommate Type: ${primaryType}</h2>
                <p>${roommateTypeDescriptions[primaryType]}</p>
                <h3>Your Secondary Roommate Type: ${secondaryType}</h3>
                <p>${secondaryType === 'N/A' ? "You're a unique blend that defies secondary categorization!" : roommateTypeDescriptions[secondaryType]}</p>
            `;
        }
    }
  
  // Initialize the game with questions and HTML element IDs
  const quizGame = new QuizGame(
    [
      {
        text: 'When do you feel most productive?',
        answers: [
          {text: 'Morning', type: 'Early Bird'},
          {text: 'Afternoon', type: 'Organizer'},
          {text: 'Evening', type: 'Homebody'},
          {text: 'Night', type: 'Night Owl'}
        ]
      },

      {
        text: 'How often do you cook at home?',
        answers: [
          {text: 'Every day', type: 'Homebody'},
          {text: 'Only on weekends', type: 'Adventurer'},
          {text: 'When hosting friends', type: 'Social Butterfly'},
          {text: 'Rarely, I prefer planning meals', type: 'Organizer'}
        ]
      },
      {
        text: 'What\'s your approach to borrowing things from roommates?',
        answers: [
          {text: 'I always ask for permission', type: 'Organizer'},
          {text: 'Only in emergencies', type: 'Early Bird'},
          {text: 'Often, I love sharing', type: 'Social Butterfly'},
          {text: 'Rarely, I\'m seldom home', type: 'Adventurer'}
        ]
      },

      {
        text: 'Your roommate forgot to clean up after cooking, you:',
        answers: [
          {text: 'Clean it up without mentioning it', type: 'Homebody'},
          {text: 'Remind them kindly to clean up', type: 'Organizer'},
          {text: 'Ignore, you rarely notice', type: 'Adventurer'},
          {text: 'Plan a cleaning schedule together', type: 'Early Bird'}
        ]
      },

      {
        text: 'Preferred method of settling disputes with roommates?',
        answers: [
          {text: 'Direct conversation', type: 'Organizer'},
          {text: 'Avoid conflict, hope it resolves', type: 'Homebody'},
          {text: 'Group discussion with all roommates', type: 'Social Butterfly'},
          {text: 'I\'m hardly there to have disputes', type: 'Adventurer'}
        ]
      },
      {
        text: 'How do you contribute to a shared living space?',
        answers: [
          {text: 'Keeping common areas clean', type: 'Organizer'},
          {text: 'Decorating and adding personal touches', type: 'Homebody'},
          {text: 'Organizing group activities', type: 'Social Butterfly'},
          {text: 'Contributing adventure stories', type: 'Adventurer'}
        ]
      },
      {
        text: 'How do you deal with shared bathroom schedules?',
        answers: [
          {text: 'Create a timetable', type: 'Organizer'},
          {text: 'First come, first served', type: 'Adventurer'},
          {text: 'Discuss and adjust as needed', type: 'Social Butterfly'},
          {text: 'I’m flexible, no need for schedules', type: 'Homebody'}
        ]
      },
      {
        text: 'Your idea of decorating the living room involves:',
        answers: [
          {text: 'Minimalist and clean designs', type: 'Organizer'},
          {text: 'Comfortable and cozy vibes', type: 'Homebody'},
          {text: 'Photos and memorabilia from travels', type: 'Adventurer'},
          {text: 'Space for hosting gatherings', type: 'Social Butterfly'}
        ]
      },
      {
        text: 'When it comes to pets in the house, you:',
        answers: [
          {text: 'Love the idea, the more the merrier', type: 'Social Butterfly'},
          {text: 'Prefer no pets, they disrupt the order', type: 'Organizer'},
          {text: 'A pet’s fine, as long as it’s not mine', type: 'Adventurer'},
          {text: 'Would love a quiet pet to chill with', type: 'Homebody'}
        ]
      },
      {
        text: 'In terms of utility bills, you:',
        answers: [
          {text: 'Keep a spreadsheet to track usage', type: 'Organizer'},
          {text: 'Split them equally, no questions asked', type: 'Social Butterfly'},
          {text: 'Seldom there, but willing to pay my share', type: 'Adventurer'},
          {text: 'Discuss to ensure fair usage', type: 'Homebody'}
        ]
      },
      {
        text: 'Your approach to grocery shopping is:',
        answers: [
          {text: 'Planning and buying for the week', type: 'Organizer'},
          {text: 'Buying whatever I crave that day', type: 'Adventurer'},
          {text: 'Shopping in bulk to save time', type: 'Homebody'},
          {text: 'Organizing potlucks, so I shop accordingly', type: 'Social Butterfly'}
        ]
      },
      {
        text: 'When you have free time, you’re most likely to:',
        answers: [
          {text: 'Catch up on work or personal projects', type: 'Organizer'},
          {text: 'Explore somewhere new', type: 'Adventurer'},
          {text: 'Hang out with friends', type: 'Social Butterfly'},
          {text: 'Watch movies or read', type: 'Homebody'}
        ]
      },
      {
        text: 'Your stance on overnight guests is:',
        answers: [
          {text: 'Okay with notice and not too often', type: 'Organizer'},
          {text: 'The more, the merrier', type: 'Social Butterfly'},
          {text: 'Rarely home to have guests', type: 'Adventurer'},
          {text: 'Prefer to keep our space private', type: 'Homebody'}
        ]
      },
      {
        text: 'How do you feel about sharing food with roommates?',
        answers: [
          {text: 'All about communal meals', type: 'Social Butterfly'},
          {text: 'I label my food, please ask', type: 'Organizer'},
          {text: 'I’m rarely home to share meals', type: 'Adventurer'},
          {text: 'Happy to share if we split the cost', type: 'Homebody'}
        ]
      },
      {
        text: 'Your method for resolving conflicts is:',
        answers: [
          {text: 'A structured conversation', type: 'Organizer'},
          {text: 'Let’s talk it out over coffee', type: 'Social Butterfly'},
          {text: 'Avoid confrontation, it’ll resolve itself', type: 'Adventurer'},
          {text: 'Give it time, then discuss calmly', type: 'Homebody'}
        ]
      },
      {
        text: 'What’s your take on communal spaces?',
        answers: [
          {text: 'They should be tidy and functional', type: 'Organizer'},
          {text: 'Great for socializing and activities', type: 'Social Butterfly'},
          {text: 'As long as I have my private space', type: 'Homebody'},
          {text: 'Useful for storage between adventures', type: 'Adventurer'}
        ]
      },
      
    ],
    'start-btn',
    'question-container',
    'question',
    'answer-buttons',
    'result-container',
    'progress-bar'
);
});