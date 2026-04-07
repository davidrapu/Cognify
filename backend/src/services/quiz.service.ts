import { type QuizSessionDataType } from "../types/dataTypes";
const {createNewQuizSession} = require("../database/repositories/quizSession.repository");

function generateQuiz() {
  // pick random word set for registration/recall
  const wordSets = [
    ["Apple", "Chair", "River"],
    ["House", "Pencil", "Ocean"],
    ["Dog", "Table", "Mountain"],
    ["Car", "Window", "Forest"],
  ];
  const wordSet = wordSets[Math.floor(Math.random() * wordSets.length)];

  // pick random language questions
  const sentenceOptions = [
    "The dog ran quickly across the park.",
    "No ifs, ands, or buts.",
    "She sells seashells by the seashore.",
  ];
  const sentence =
    sentenceOptions[Math.floor(Math.random() * sentenceOptions.length)];

  const objectOptions = ["pen", "watch", "key", "cup", "shoe", "clock", "book"];
  const [object1, object2] = objectOptions
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  const multipleChoiceOptions = [
    {
      question: "Which is a fruit?",
      options: ["Car", "Apple", "Chair"],
      answer: "Apple",
    },
    {
      question: "Which is an animal?",
      options: ["Table", "Dog", "Pencil"],
      answer: "Dog",
    },
    {
      question: "Which is a colour?",
      options: ["Blue", "Hammer", "Spoon"],
      answer: "Blue",
    },
  ];
  const mcq =
    multipleChoiceOptions[
      Math.floor(Math.random() * multipleChoiceOptions.length)
    ];

  return {
    wordSet, // stored server side to validate recall later
    questions: [
      // orientation - always the same
      {
        id: 1,
        category: "orientation",
        question: "What year is it?",
        type: "year",
        inputType: "number",
        points: 1,
      },
      {
        id: 2,
        category: "orientation",
        question: "What month is it?",
        type: "month",
        inputType: "text",
        points: 1,
      },
      {
        id: 3,
        category: "orientation",
        question: "What day of the week is it?",
        type: "day",
        inputType: "text",
        points: 1,
      },
      {
        id: 4,
        category: "orientation",
        question: "What is today's date?",
        type: "date",
        inputType: "text",
        points: 1,
      },
      {
        id: 5,
        category: "orientation",
        question: "What season is it?",
        type: "season",
        inputType: "text",
        points: 2,
      },
      {
        id: 6,
        category: "orientation",
        question: "What country are you in?",
        type: "country",
        inputType: "text",
        points: 2,
      },
      {
        id: 7,
        category: "orientation",
        question: "What city or town are you in?",
        type: "city",
        inputType: "text",
        points: 2,
      },

      // registration - randomised words
      {
        id: 8,
        category: "registration",
        statement: `Remember these three words: ${wordSet.join(", ")}.`,
        question: "Repeat those words.",
        type: "memory",
        inputType: "text",
        points: 3,
        answer: wordSet,
      },

      // calculation - always same
      {
        id: 9,
        category: "attention_calculation",
        question: "Starting from 100, subtract 7, five times.",
        type: "subtraction",
        inputType: "text",
        points: 5,
      },

      // language - randomised
      {
        id: 10,
        category: "language",
        question: "Name an object",
        type: "object_naming",
        inputType: "text",
        points: 1,
      },

      // recall - same words as registration
      {
        id: 11,
        category: "recall",
        question: "Recall the three words you were asked to remember earlier.",
        type: "memory",
        inputType: "text",
        points: 3,
        answer: wordSet,
      },

      {
        id: 12,
        category: "language",
        question: "Name another object",
        type: "object_naming",
        inputType: "text",
        points: 1,
      },
      {
        id: 13,
        category: "language",
        question: `Repeat the sentence exactly: "${sentence}"`,
        type: "sentence_repetition",
        inputType: "text",
        points: 1,
        answer: sentence,
      },
      {
        id: 14,
        category: "language",
        question:
          "Follow this instruction: Click the button, wait two seconds, then click it again.",
        type: "action",
        inputType: "action",
        points: 3,
      },
      {
        id: 15,
        category: "language",
        question: "Write a complete sentence of your choice.",
        type: "sentence_generation",
        inputType: "textarea",
        points: 1,
      },
      {
        id: 16,
        category: "language",
        question: mcq.question,
        type: "multiple_choice",
        inputType: "radio",
        options: mcq.options,
        points: 2,
        answer: mcq.answer,
      },
    ],
  };
}

function createQuizSession(score: number, userId: string) {
  const sessionData: QuizSessionDataType = {
    userId,
    score
  };
  createNewQuizSession(sessionData, userId);
}

module.exports = {
  generateQuiz,
  createQuizSession,
};
