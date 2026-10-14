// AptiLearn - Real-Time Exam Engine & Simulator
// Simulates authentic placement exam environments (TCS iON / AMCAT / CoCubes)

const QUESTION_STATES = {
  NOT_VISITED: 'not-visited',
  NOT_ANSWERED: 'not-answered',
  ANSWERED: 'answered',
  MARKED: 'marked',
  ANSWERED_AND_MARKED: 'ans-marked'
};

class ExamEngine {
  constructor() {
    this.currentTestConfig = null;
    this.questions = [];
    this.currentIndex = 0;
    this.answers = {}; // { questionId: selectedOptionIndex }
    this.states = {}; // { questionId: QUESTION_STATES }
    this.questionTimes = {}; // { questionId: secondsSpent }
    this.activeQuestionStartTime = null;
    this.timerInterval = null;
    this.remainingSeconds = 0;
    this.totalSeconds = 0;
    this.isExamActive = false;
    this.isReviewMode = false;
    this.examResult = null;
  }

  // Start an exam from a Company spec or Custom config
  startExam(config, questionList) {
    if (!questionList || questionList.length === 0) {
      alert("No questions found for this exam configuration.");
      return false;
    }

    this.currentTestConfig = config;
    this.questions = JSON.parse(JSON.stringify(questionList));
    this.currentIndex = 0;
    this.answers = {};
    this.states = {};
    this.questionTimes = {};
    this.isReviewMode = false;
    this.examResult = null;

    // Initialize states
    this.questions.forEach((q, idx) => {
      this.states[q.id] = (idx === 0) ? QUESTION_STATES.NOT_ANSWERED : QUESTION_STATES.NOT_VISITED;
      this.answers[q.id] = null;
      this.questionTimes[q.id] = 0;
    });

    this.totalSeconds = (config.durationMinutes || 15) * 60;
    this.remainingSeconds = this.totalSeconds;
    this.isExamActive = true;
    this.activeQuestionStartTime = Date.now();

    this.startTimer();
    SoundFX.click();
    return true;
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateActiveQuestionTime();
        this.renderTimer();

        // Sound chime at 1 minute mark
        if (this.remainingSeconds === 60) {
          SoundFX.timerWarning();
        }
      } else {
        this.autoSubmit();
      }
    }, 1000);
  }

  updateActiveQuestionTime() {
    const currentQ = this.questions[this.currentIndex];
    if (currentQ) {
      this.questionTimes[currentQ.id] = (this.questionTimes[currentQ.id] || 0) + 1;
    }
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  selectOption(optionIndex) {
    if (!this.isExamActive) return;
    const q = this.getCurrentQuestion();
    if (!q) return;

    this.answers[q.id] = optionIndex;
    
    // Update state
    if (this.states[q.id] === QUESTION_STATES.MARKED || this.states[q.id] === QUESTION_STATES.ANSWERED_AND_MARKED) {
      this.states[q.id] = QUESTION_STATES.ANSWERED_AND_MARKED;
    } else {
      this.states[q.id] = QUESTION_STATES.ANSWERED;
    }
    SoundFX.click();
  }

  clearResponse() {
    if (!this.isExamActive) return;
    const q = this.getCurrentQuestion();
    if (!q) return;

    this.answers[q.id] = null;
    this.states[q.id] = QUESTION_STATES.NOT_ANSWERED;
    SoundFX.click();
  }

  markForReviewAndNext() {
    if (!this.isExamActive) return;
    const q = this.getCurrentQuestion();
    if (!q) return;

    if (this.answers[q.id] !== null && this.answers[q.id] !== undefined) {
      this.states[q.id] = QUESTION_STATES.ANSWERED_AND_MARKED;
    } else {
      this.states[q.id] = QUESTION_STATES.MARKED;
    }

    this.nextQuestion();
  }

  saveAndNext() {
    if (!this.isExamActive) return;
    const q = this.getCurrentQuestion();
    if (!q) return;

    if (this.answers[q.id] !== null && this.answers[q.id] !== undefined) {
      this.states[q.id] = QUESTION_STATES.ANSWERED;
    } else {
      this.states[q.id] = QUESTION_STATES.NOT_ANSWERED;
    }

    this.nextQuestion();
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.goToQuestion(this.currentIndex + 1);
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.goToQuestion(this.currentIndex - 1);
    }
  }

  goToQuestion(index) {
    if (index < 0 || index >= this.questions.length) return;
    this.currentIndex = index;

    const currentQ = this.questions[this.currentIndex];
    // If not visited yet, now it's visited and not answered
    if (this.states[currentQ.id] === QUESTION_STATES.NOT_VISITED) {
      this.states[currentQ.id] = QUESTION_STATES.NOT_ANSWERED;
    }
    SoundFX.click();
  }

  // Calculate statistics and submit exam
  submitExam() {
    this.stopTimer();
    this.isExamActive = false;

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let score = 0;
    const negMark = this.currentTestConfig.negativeMarking || 0;

    // Breakdown by category
    const categoryStats = {};

    this.questions.forEach(q => {
      const selected = this.answers[q.id];
      const isCorrect = (selected !== null && selected !== undefined && selected === q.correctAnswer);
      const isAttempted = (selected !== null && selected !== undefined);

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { total: 0, correct: 0, attempted: 0 };
      }
      categoryStats[q.category].total++;

      if (isAttempted) {
        categoryStats[q.category].attempted++;
        if (isCorrect) {
          correctCount++;
          score += 1;
          categoryStats[q.category].correct++;
        } else {
          incorrectCount++;
          score -= negMark;
        }
      } else {
        unattemptedCount++;
      }
    });

    const totalQuestions = this.questions.length;
    const maxScore = totalQuestions;
    const accuracy = (correctCount + incorrectCount > 0)
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 0;
    const percentage = Math.max(0, Math.round((score / maxScore) * 100));
    const passed = percentage >= (this.currentTestConfig.cutoffPercent || 60);

    const timeSpentSeconds = this.totalSeconds - this.remainingSeconds;

    this.examResult = {
      testName: this.currentTestConfig.name || "Placement Mock Exam",
      company: this.currentTestConfig.company || "AptiLearn",
      totalQuestions,
      attemptedCount: correctCount + incorrectCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      score: Math.max(0, parseFloat(score.toFixed(2))),
      maxScore,
      percentage,
      accuracy,
      passed,
      cutoffPercent: this.currentTestConfig.cutoffPercent || 60,
      timeSpentSeconds,
      categoryStats,
      questionTimes: this.questionTimes,
      answers: this.answers,
      questions: this.questions
    };

    // Save to storage
    StorageManager.saveTestResult(this.examResult);
    SoundFX.complete();

    return this.examResult;
  }

  autoSubmit() {
    alert("Time is up! Submitting your test automatically...");
    if (window.AptiApp) {
      window.AptiApp.handleExamAutoSubmit();
    }
  }

  renderTimer() {
    const timerEl = document.getElementById('exam-timer-display');
    if (!timerEl) return;

    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (this.remainingSeconds <= 120) {
      timerEl.classList.add('urgent');
    } else {
      timerEl.classList.remove('urgent');
    }
  }

  // Get summary of question states for the palette legend
  getStateCounts() {
    const counts = {
      [QUESTION_STATES.ANSWERED]: 0,
      [QUESTION_STATES.NOT_ANSWERED]: 0,
      [QUESTION_STATES.NOT_VISITED]: 0,
      [QUESTION_STATES.MARKED]: 0,
      [QUESTION_STATES.ANSWERED_AND_MARKED]: 0
    };

    this.questions.forEach(q => {
      const state = this.states[q.id] || QUESTION_STATES.NOT_VISITED;
      if (counts[state] !== undefined) {
        counts[state]++;
      }
    });

    return counts;
  }
}

// Global ExamEngine instance
const examEngine = new ExamEngine();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExamEngine, examEngine, QUESTION_STATES };
}
