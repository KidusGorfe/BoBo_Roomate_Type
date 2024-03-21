var questions = [
  // Keep the first four questions as they already cover a range of types.
  {
    text: "How do you typically spend your Saturday night?",
    answers: [
      { text: "Organizing my room for the week ahead", type: "The Organizer" },
      { text: "Hosting a game night with friends", type: "The Social Butterfly" },
      { text: "Enjoying a quiet evening with a book", type: "The Bookworm" },
      { text: "Cooking a delicious new recipe", type: "The Chef" }
    ]
  },
  // Modified question to include missing types and ensure coverage.
  {
    text: "What's your reaction to a sunny day after a week of rain?",
    answers: [
      { text: "Plan an outdoor adventure", type: "The Adventurer" },
      { text: "Enjoy gardening or outdoor yoga", type: "The Zen Master" },
      { text: "Catch up on sleep or indoor activities", type: "The Homebody" },
      { text: "Work on a tech project with the windows open", type: "The Tech Wizard" }
    ]
  },
  {
    text: "How do you contribute to a shared living space?",
    answers: [
      { text: "Keeping common areas clean and tidy", type: "The Organizer" },
      { text: "Decorating with plants and greenery", type: "The Green Thumb" },
      { text: "Ensuring the house is always lively and fun", type: "The Social Butterfly" },
      { text: "Creating quiet, contemplative spaces", type: "The Zen Master" }
    ]
  },
  {
    text: "How do you unwind after a stressful day?",
    answers: [
      { text: "By working out or going for a run", type: "The Early Bird" },
      { text: "By having some alone time", type: "The Night Owl" },
      { text: "By taking care of the plants around the house", type: "The Green Thumb" },
      { text: "By meditating or doing yoga", type: "The Zen Master" }
    ]
  },
  {
    text: "When learning something new, you prefer:",
    answers: [
      { text: "Diving right into hands-on activities", type: "The Adventurer" },
      { text: "Reading and researching before starting", type: "The Bookworm" },
      { text: "Watching a YouTube video while relaxing on the couch", type: "The Homebody" },
      { text: "Learning in a group setting", type: "The Social Butterfly" }
    ]
  },
  {
    text: "When you have a free day with no obligations, you:",
    answers: [
      { text: "Plan your next travel adventure", type: "The Adventurer" },
      { text: "Spend time nurturing your indoor garden", type: "The Green Thumb" },
      { text: "Do as little as physically possible", type: "The Homebody" },
      { text: "Wake up early for a productive day", type: "The Early Bird" }
    ]
  },
  {
    text: "The type of movie you'd prefer to watch on a movie night is:",
    answers: [
      { text: "A documentary on a fascinating historical figure", type: "The Bookworm" },
      { text: "An action-packed adventure film", type: "The Adventurer" },
      { text: "A feel-good movie that brings everyone together", type: "The Social Butterfly" },
      { text: "A comfort film that helps you relax", type: "The Homebody" }
    ]
  },
  {
    text: "When it comes to interior decoration, your space is:",
    answers: [
      { text: "Filled with books and cozy reading nooks", type: "The Bookworm" },
      { text: "A collection of travel memorabilia and adventure gear", type: "The Adventurer" },
      { text: "Cozy and perfect for a late night movie", type: "The Night Owl" },
      { text: "Green and alive with plants in every corner", type: "The Green Thumb" }
    ]
  },
  {
    text: "Your preferred way to spend time with friends is:",
    answers: [
      { text: "Hosting a dinner party with gourmet dishes", type: "The Chef" },
      { text: "Going out to the hottest social spots in town", type: "The Social Butterfly" },
      { text: "A quiet evening chatting over tea", type: "The Zen Master" },
      { text: "A movie night", type: "The Homebody" }
    ]
  },

  {
    text: "When faced with a weekend DIY project, you:",
    answers: [
      { text: "Start early in the morning to make the most of the day", type: "The Early Bird" },
      { text: "Turn it into a fun group activity with friends", type: "The Social Butterfly" },
      { text: "Research and plan every detail before starting", type: "The Organizer" },
      { text: "Find a way to incorporate new tech or gadgets into the project", type: "The Tech Wizard" }
    ]
  },

  {
    text: "Your approach to weekends is best described as:",
    answers: [
      { text: "Catching up on personal projects and hobbies", type: "The Bookworm" },
      { text: "Planning an outdoor adventure or trip", type: "The Adventurer" },
      { text: "Enjoying quiet time at home to recharge", type: "The Homebody" },
      { text: "Going to a coffee shop that also sells plants", type: "The Green Thumb" }
    ]
  },
  {
    text: "Your method of dealing with disagreements in the household is:",
    answers: [
      { text: "Open and honest communication to resolve issues quickly", type: "The Zen Master" },
      { text: "A structured meeting to discuss and plan solutions", type: "The Organizer" },
      { text: "Trying to lighten the mood with humor and compromise", type: "The Social Butterfly" },
      { text: "Offering tech-based solutions to avoid future conflicts", type: "The Tech Wizard" }
    ]
  },
  {
    text: "In terms of personal space and belongings, you:",
    answers: [
      { text: "Have a specific place for everything and value organization", type: "The Organizer" },
      { text: "Don't mind sharing but appreciate when people ask first", type: "The Homebody" },
      { text: "Are all about the latest gadgets, even if it means a little clutter", type: "The Tech Wizard" },
      { text: "Prefer spaces that foster community and shared experiences", type: "The Social Butterfly" }
    ]
  },
  {
    text: "When it comes to mealtime in your household, you:",
    answers: [
      { text: "Enjoy experimenting with new recipes and cuisines", type: "The Chef" },
      { text: "Prefer a quick and efficient meal prep routine", type: "The Early Bird" },
      { text: "Love eating fresh fruits and veggies", type: "The Green Thumb" },
      { text: "Opt for meals that require minimal cleanup", type: "The Night Owl" }
    ]
  },
  {
    text: "How do you prefer to start your day?",
    answers: [
      { text: "With a morning meditation or yoga session", type: "The Zen Master" },
      { text: "By reviewing your to-do list and planning your day", type: "The Organizer" },
      { text: "By watering all the plants in your home", type: "The Green Thumb" },
      { text: "Bright and early with a good cup of coffee", type: "The Early Bird" }
    ]
  },

  {
    text: "What's your go-to activity for unwinding after a stressful day?",
    answers: [
      { text: "Diving into a new or favorite video game", type: "The Tech Wizard" },
      { text: "Tending to your indoor garden and plants", type: "The Green Thumb" },
      { text: "Starting a DIY or craft project", type: "The Early Bird" },
      { text: "Watching documentaries or educational content", type: "The Bookworm" }
    ]
  },
  {
    text: "Which weekend project sounds most appealing to you?",
    answers: [
      { text: "Building or coding a new gadget or app", type: "The Tech Wizard" },
      { text: "Reorganizing and decluttering your living space", type: "The Organizer" },
      { text: "Hosting a themed dinner party for friends", type: "The Chef" },
      { text: "Creating a new workout or outdoor adventure plan", type: "The Adventurer" }
    ]
  },
  {
    text: "How do you make your living space feel like home?",
    answers: [
      { text: "By hanging art and photos that inspire you", type: "The Social Butterfly" },
      { text: "Setting up a dedicated space for meditation or reflection", type: "The Zen Master" },
      { text: "Ensuring there's a cozy reading nook with plenty of books", type: "The Bookworm" },
      { text: "Installing smart home devices for convenience", type: "The Tech Wizard" }
    ]
  },

  {
    text: "Your ideal way to celebrate a personal achievement is:",
    answers: [
      { text: "A quiet night in, reflecting on your accomplishment", type: "The Homebody" },
      { text: "An adventurous trip to somewhere new", type: "The Adventurer" },
      { text: "A party with close friends and family", type: "The Social Butterfly" },
      { text: "Buying yourself a new book or tech gadget", type: "The Tech Wizard" }
    ]
  },
  {
    text: "What's your preferred method of staying in touch with friends?",
    answers: [
      { text: "Regularly scheduled video calls or meetups", type: "The Organizer" },
      { text: "Sending updates and photos through social media", type: "The Social Butterfly" },
      { text: "Crafting personalized letters or emails", type: "The Bookworm" },
      { text: "Group chats for sharing memes and quick messages", type: "The Tech Wizard" }
    ]
  }
  
];
