import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/Card.jsx";
import { Button } from "@/components/ui/Button.jsx";
import { cn } from "@/lib/utils.js";

const quizQuestions = [
  {
    id: 1,
    question: "When was the Turing Test first proposed?",
    options: ["1950", "1960", "1970", "1980"],
    correctAnswer: 0,
    explanation:
      'The Turing Test was proposed by Alan Turing in 1950 in his paper "Computing Machinery and Intelligence".',
  },
  {
    id: 2,
    question: "Which company created ChatGPT?",
    options: ["Google", "OpenAI", "Meta", "Microsoft"],
    correctAnswer: 1,
    explanation:
      "ChatGPT was created by OpenAI, an AI research company focused on developing safe and beneficial AI.",
  },
  {
    id: 3,
    question:
      "Which AI technique allows models to improve performance through experience?",
    options: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Reinforcement Learning",
      "Transfer Learning",
    ],
    correctAnswer: 2,
    explanation:
      "Reinforcement Learning is an AI technique where models learn optimal behavior by interacting with an environment and receiving feedback.",
  },
  {
    id: 4,
    question: "Which AI model is known for generating human-like text?",
    options: [
      "Support Vector Machine",
      "Convolutional Neural Network",
      "Generative Pre-trained Transformer (GPT)",
      "K-Nearest Neighbors",
    ],
    correctAnswer: 2,
    explanation:
      "Generative Pre-trained Transformers (GPT) are large language models that generate coherent and contextually relevant human-like text.",
  },
  {
    id: 9,
    question:
      "Which type of AI is designed to perform specific tasks rather than general intelligence?",
    options: [
      "General AI",
      "Narrow AI",
      "Superintelligent AI",
      "Artificial Consciousness",
    ],
    correctAnswer: 1,
    explanation:
      "Narrow AI, also called Weak AI, is designed to perform specific tasks and does not possess general intelligence like humans.",
  },
];

export default function TriviaPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-white rounded-xl shadow-2xl p-12 text-center">
            <div className="text-8xl mb-6">🏆</div>
            <h2 className="text-5xl font-bold text-[#3B82F6] mb-4">
              You scored {score}/{quizQuestions.length}!
            </h2>
            <p className="text-2xl text-gray-700 mb-8">Great job!</p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleReset}
                className="bg-[#FF6B35] hover:bg-[#FF5722] text-white text-lg px-8 py-6"
              >
                Try Again
              </Button>
              <Link to="/learning">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3B82F6] text-center mb-8">
          Test Your AI Knowledge
        </h1>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span>
              Score: {score}/{quizQuestions.length}
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF6B35] transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestion + 1) / quizQuestions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <Card className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {question.question}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={cn(
                  "p-6 text-lg font-medium rounded-xl border-2 transition-all duration-200",
                  selectedAnswer === null &&
                    "border-gray-300 hover:border-[#3B82F6] hover:bg-blue-50",
                  selectedAnswer === index &&
                    index === question.correctAnswer &&
                    "bg-green-100 border-green-500",
                  selectedAnswer === index &&
                    index !== question.correctAnswer &&
                    "bg-red-100 border-red-500",
                  selectedAnswer !== null &&
                    index === question.correctAnswer &&
                    "bg-green-100 border-green-500",
                  selectedAnswer !== null && "cursor-not-allowed"
                )}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mb-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-gray-700 italic leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {showExplanation && (
            <Button
              onClick={handleNext}
              className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white text-lg py-6"
            >
              {currentQuestion < quizQuestions.length - 1
                ? "Next Question →"
                : "See Results →"}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
