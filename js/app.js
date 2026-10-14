// AptiLearn - Enterprise Application Controller

const AptiApp = {
  currentView: 'dashboard',
  activeExamSection: 'All',

  init() {
    this.initTheme();
    AuthManager.init();
    this.bindNavigation();
    this.bindExamControls();
    this.bindCustomTestModal();
    this.bindAuthModal();
    this.renderDashboard();
    this.renderCompanyCards();
    this.renderFormulasView();
    this.updateHeaderStats();
    this.renderSoundToggle();
    this.renderThemeToggle();

    // Check URL hash or default
    window.addEventListener('hashchange', () => this.handleHashChange());
    this.handleHashChange();
  },

  // ==========================================
  // THEME MANAGEMENT (DARK / LIGHT MODE)
  // ==========================================
  initTheme() {
    const savedTheme = StorageManager.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = (currentTheme === 'dark') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    StorageManager.setTheme(nextTheme);
    this.renderThemeToggle();
    SoundFX.click();
    this.showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  },

  renderThemeToggle() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.innerHTML = (currentTheme === 'dark') ? '☀️ Light' : '🌙 Dark';
    btn.title = `Switch to ${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`;
  },

  // ==========================================
  // AUTHENTICATION MODAL & PROFILE
  // ==========================================
  bindAuthModal() {
    const modal = document.getElementById('auth-modal');
    const openBtn = document.getElementById('header-auth-btn');
    const closeBtn = document.getElementById('btn-close-auth-modal');
    const tabLogin = document.getElementById('tab-btn-login');
    const tabRegister = document.getElementById('tab-btn-register');
    const loginForm = document.getElementById('auth-login-form');
    const registerForm = document.getElementById('auth-register-form');

    if (openBtn) {
      openBtn.onclick = () => {
        modal.classList.add('active');
        SoundFX.click();
      };
    }

    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('active');
        SoundFX.click();
      };
    }

    // Switch between Login and Register tabs
    if (tabLogin && tabRegister) {
      tabLogin.onclick = () => {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        SoundFX.click();
      };

      tabRegister.onclick = () => {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        SoundFX.click();
      };
    }

    // Login submit
    loginForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email-input').value;
      const pass = document.getElementById('login-pass-input').value;

      const res = AuthManager.login(email, pass);
      if (res.success) {
        modal.classList.remove('active');
        SoundFX.correct();
        this.showToast(`Welcome back, ${res.user.name.split(' ')[0]}!`);
        this.renderDashboard();
      } else {
        SoundFX.wrong();
        alert(res.message);
      }
    });

    // Register submit
    registerForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const userData = {
        name: document.getElementById('reg-name-input').value,
        email: document.getElementById('reg-email-input').value,
        password: document.getElementById('reg-pass-input').value,
        college: document.getElementById('reg-college-input').value,
        targetCompany: document.getElementById('reg-company-input').value,
        graduationYear: document.getElementById('reg-year-input').value
      };

      const res = AuthManager.register(userData);
      if (res.success) {
        modal.classList.remove('active');
        SoundFX.correct();
        this.showToast(`Candidate account created! Welcome, ${res.user.name}!`);
        this.renderDashboard();
      } else {
        SoundFX.wrong();
        alert(res.message);
      }
    });

    // Profile menu click (shows user info or sign out)
    const profileBtn = document.getElementById('user-profile-menu');
    if (profileBtn) {
      profileBtn.onclick = () => {
        const user = AuthManager.getCurrentUser();
        if (!user) return;
        const confirmLogout = confirm(
          `Candidate Profile:\n\n• Name: ${user.name}\n• College: ${user.college}\n• Target: ${user.targetCompany}\n• Email: ${user.email}\n\nDo you want to sign out?`
        );
        if (confirmLogout) {
          AuthManager.logout();
          this.showToast("Signed out successfully.");
        }
      };
    }
  },

  handleHashChange() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    if (['dashboard', 'companies', 'practice', 'formulas', 'analytics', 'bookmarks'].includes(hash)) {
      if (examEngine.isExamActive) {
        if (!confirm("An exam is currently in progress. Leaving this view will forfeit your progress. Do you wish to leave?")) {
          window.location.hash = '#exam';
          return;
        } else {
          examEngine.stopTimer();
          examEngine.isExamActive = false;
        }
      }
      this.switchView(hash);
    }
  },

  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.view-container').forEach(view => {
      view.classList.remove('active');
    });

    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.view === viewName);
    });

    if (viewName === 'dashboard') {
      this.renderDashboard();
    } else if (viewName === 'practice') {
      PracticeManager.init();
    } else if (viewName === 'analytics') {
      this.renderAnalyticsView();
    } else if (viewName === 'bookmarks') {
      this.renderBookmarksView();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  bindNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.dataset.view;
        window.location.hash = `#${view}`;
        SoundFX.click();
      });
    });
  },

  updateHeaderStats() {
    const stats = StorageManager.getStats();
    const streakEl = document.getElementById('header-streak-count');
    const xpEl = document.getElementById('header-xp-count');

    if (streakEl) streakEl.textContent = `${stats.streak} Days`;
    if (xpEl) xpEl.textContent = `${stats.xp || 120} XP`;
  },

  renderSoundToggle() {
    const btn = document.getElementById('sound-toggle-btn');
    if (!btn) return;

    const isEnabled = StorageManager.getSoundPref();
    btn.innerHTML = isEnabled ? '🔊 Sound On' : '🔇 Sound Off';

    btn.onclick = () => {
      const next = !StorageManager.getSoundPref();
      StorageManager.setSoundPref(next);
      btn.innerHTML = next ? '🔊 Sound On' : '🔇 Sound Off';
      if (next) SoundFX.click();
      this.showToast(next ? "Audio feedback enabled" : "Audio muted");
    };
  },

  // ==========================================
  // DASHBOARD VIEW
  // ==========================================
  renderDashboard() {
    this.renderDashboardStats();
    this.renderDailyChallengeCard();
    this.renderCompanyCards();
  },

  renderDashboardStats() {
    const stats = StorageManager.getStats();
    const totalAttempted = stats.questionsSolved + (stats.totalPracticeAttempted || 0);
    const totalCorrect = stats.correctAnswers + (stats.practiceCorrect || 0);
    const overallAcc = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    const statTests = document.getElementById('dash-stat-tests');
    const statSolved = document.getElementById('dash-stat-solved');
    const statAccuracy = document.getElementById('dash-stat-accuracy');
    const statStreak = document.getElementById('dash-stat-streak');

    if (statTests) statTests.textContent = stats.testsTaken;
    if (statSolved) statSolved.textContent = totalAttempted;
    if (statAccuracy) statAccuracy.textContent = `${overallAcc}%`;
    if (statStreak) statStreak.textContent = `${stats.streak} Days`;
    this.updateHeaderStats();
    AuthManager.updateUserUI();
  },

  renderDailyChallengeCard() {
    const container = document.getElementById('daily-challenge-content');
    if (!container) return;

    const dayIndex = new Date().getDate() % QUESTIONS_DATABASE.length;
    const q = QUESTIONS_DATABASE[dayIndex];

    container.innerHTML = `
      <div class="daily-badge">Daily 5-Min Challenge</div>
      <h4 class="daily-q-title">${q.category} &bull; ${q.subtopic} (${q.company})</h4>
      <p class="daily-q-text">${q.question.replace(/\n/g, '<br>')}</p>
      <button class="btn btn-primary btn-outline-sm" onclick="AptiApp.openDailyPractice('${q.id}')">
        Solve Today's Problem (+25 XP)
      </button>
    `;
  },

  openDailyPractice(questionId) {
    window.location.hash = '#practice';
    PracticeManager.setSearch('');
    setTimeout(() => {
      const el = document.getElementById(`practice-card-${questionId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('highlight-pulse');
        setTimeout(() => el.classList.remove('highlight-pulse'), 2000);
      }
    }, 200);
  },

  // ==========================================
  // COMPANY TEST CARDS (10 COMPANIES)
  // ==========================================
  renderCompanyCards() {
    const container = document.getElementById('company-cards-grid');
    const previewContainer = document.getElementById('company-cards-preview');

    const generateHTML = (companies) => {
      return companies.map(company => {
        return `
          <div class="company-card" style="--company-accent: ${company.color};">
            <div class="company-card-header">
              <div class="company-logo-badge">${company.logoText}</div>
              <div class="company-badge-pill">${company.badge}</div>
            </div>
            
            <h3 class="company-title">${company.name}</h3>
            <p class="company-tagline">${company.tagline}</p>

            <div class="company-meta-row">
              <span class="meta-item">⏱️ ${company.durationMinutes} Mins</span>
              <span class="meta-item">📝 ${company.totalQuestions} Questions</span>
              <span class="meta-item">🎯 Cutoff: ${company.cutoffPercent}%</span>
              <span class="meta-item">⚠️ Neg: ${company.negativeMarking > 0 ? `-${company.negativeMarking}` : 'None'}</span>
            </div>

            <div class="company-syllabus-list">
              ${company.syllabus.map(s => `<div class="syllabus-pill">${s}</div>`).join('')}
            </div>

            <button class="btn btn-primary btn-block" onclick="AptiApp.startCompanyExam('${company.id}')">
              Start Mock Exam
            </button>
          </div>
        `;
      }).join('');
    };

    if (container) {
      container.innerHTML = generateHTML(COMPANY_TESTS);
    }
    if (previewContainer) {
      previewContainer.innerHTML = generateHTML(COMPANY_TESTS.slice(0, 4));
    }
  },

  startCompanyExam(companyId) {
    const companyConfig = COMPANY_TESTS.find(c => c.id === companyId);
    if (!companyConfig) return;

    // Filter questions mapped to this company or matching IDs
    const examQuestions = QUESTIONS_DATABASE.filter(q => companyConfig.questionIds.includes(q.id));
    
    // If not enough mapped, fill with random questions to match total
    if (examQuestions.length < companyConfig.totalQuestions) {
      const remaining = QUESTIONS_DATABASE.filter(q => !companyConfig.questionIds.includes(q.id));
      while (examQuestions.length < companyConfig.totalQuestions && remaining.length > 0) {
        examQuestions.push(remaining.shift());
      }
    }

    const started = examEngine.startExam(companyConfig, examQuestions);
    if (started) {
      this.showExamView();
    }
  },

  // ==========================================
  // EXAM ENGINE UI CONTROLLER
  // ==========================================
  showExamView() {
    this.currentView = 'exam';
    document.querySelectorAll('.view-container').forEach(view => view.classList.remove('active'));
    document.getElementById('view-exam').classList.add('active');

    // Header info
    document.getElementById('exam-title-display').textContent = examEngine.currentTestConfig.name;
    document.getElementById('exam-neg-marking').textContent = examEngine.currentTestConfig.negativeMarking > 0 
      ? `Negative Marking: -${examEngine.currentTestConfig.negativeMarking}` 
      : 'Negative Marking: No';

    // Candidate info in sidebar
    const currentUser = AuthManager.getCurrentUser();
    const candidateNameEl = document.getElementById('exam-candidate-name');
    const candidateCollegeEl = document.getElementById('exam-candidate-college');
    if (currentUser) {
      if (candidateNameEl) candidateNameEl.textContent = currentUser.name;
      if (candidateCollegeEl) candidateCollegeEl.textContent = currentUser.college;
    }

    this.renderExamQuestion();
    this.renderQuestionPalette();
    examEngine.renderTimer();
  },

  bindExamControls() {
    // Next / Save & Next
    document.getElementById('exam-btn-save-next')?.addEventListener('click', () => {
      examEngine.saveAndNext();
      this.renderExamQuestion();
      this.renderQuestionPalette();
    });

    // Mark for review & next
    document.getElementById('exam-btn-mark-review')?.addEventListener('click', () => {
      examEngine.markForReviewAndNext();
      this.renderExamQuestion();
      this.renderQuestionPalette();
    });

    // Clear response
    document.getElementById('exam-btn-clear')?.addEventListener('click', () => {
      examEngine.clearResponse();
      this.renderExamQuestion();
      this.renderQuestionPalette();
    });

    // Prev
    document.getElementById('exam-btn-prev')?.addEventListener('click', () => {
      examEngine.prevQuestion();
      this.renderExamQuestion();
      this.renderQuestionPalette();
    });

    // Submit test button
    document.getElementById('exam-btn-submit')?.addEventListener('click', () => {
      this.promptExamSubmit();
    });
  },

  renderExamQuestion() {
    const q = examEngine.getCurrentQuestion();
    if (!q) return;

    const qNumEl = document.getElementById('exam-q-number');
    const qCategoryEl = document.getElementById('exam-q-category');
    const qTextEl = document.getElementById('exam-q-text');
    const optionsContainer = document.getElementById('exam-options-container');

    qNumEl.textContent = `Question ${examEngine.currentIndex + 1} of ${examEngine.questions.length}`;
    qCategoryEl.textContent = `${q.category} &bull; ${q.subtopic}`;
    qTextEl.innerHTML = q.question.replace(/\n/g, '<br>');

    const selectedOption = examEngine.answers[q.id];

    optionsContainer.innerHTML = q.options.map((opt, idx) => {
      const isSelected = (selectedOption === idx);
      const letter = String.fromCharCode(65 + idx);
      return `
        <label class="exam-option-card ${isSelected ? 'selected' : ''}" onclick="AptiApp.handleExamOptionClick(${idx})">
          <input type="radio" name="exam_opt" ${isSelected ? 'checked' : ''} style="display:none;">
          <div class="exam-opt-letter">${letter}</div>
          <div class="exam-opt-text">${opt}</div>
        </label>
      `;
    }).join('');

    const prevBtn = document.getElementById('exam-btn-prev');
    if (prevBtn) {
      prevBtn.disabled = (examEngine.currentIndex === 0);
    }
  },

  handleExamOptionClick(optionIndex) {
    examEngine.selectOption(optionIndex);
    this.renderExamQuestion();
    this.renderQuestionPalette();
  },

  renderQuestionPalette() {
    const container = document.getElementById('exam-palette-grid');
    if (!container) return;

    const counts = examEngine.getStateCounts();

    const countAns = document.getElementById('count-answered');
    const countNotAns = document.getElementById('count-not-answered');
    const countNotVis = document.getElementById('count-not-visited');
    const countMarked = document.getElementById('count-marked');
    const countAnsMarked = document.getElementById('count-ans-marked');

    if (countAns) countAns.textContent = counts[QUESTION_STATES.ANSWERED] || 0;
    if (countNotAns) countNotAns.textContent = counts[QUESTION_STATES.NOT_ANSWERED] || 0;
    if (countNotVis) countNotVis.textContent = counts[QUESTION_STATES.NOT_VISITED] || 0;
    if (countMarked) countMarked.textContent = counts[QUESTION_STATES.MARKED] || 0;
    if (countAnsMarked) countAnsMarked.textContent = counts[QUESTION_STATES.ANSWERED_AND_MARKED] || 0;

    container.innerHTML = examEngine.questions.map((q, idx) => {
      const state = examEngine.states[q.id] || QUESTION_STATES.NOT_VISITED;
      const isCurrent = (idx === examEngine.currentIndex);
      return `
        <button class="palette-btn state-${state} ${isCurrent ? 'current' : ''}" 
          onclick="AptiApp.jumpToQuestion(${idx})" title="Question ${idx + 1} (${state})">
          ${idx + 1}
        </button>
      `;
    }).join('');
  },

  jumpToQuestion(index) {
    examEngine.goToQuestion(index);
    this.renderExamQuestion();
    this.renderQuestionPalette();
  },

  promptExamSubmit() {
    const counts = examEngine.getStateCounts();
    const answered = counts[QUESTION_STATES.ANSWERED] + counts[QUESTION_STATES.ANSWERED_AND_MARKED];
    const total = examEngine.questions.length;

    const confirmMsg = `Are you sure you want to finish your assessment?\n\n• Answered: ${answered} / ${total}\n• Unanswered: ${total - answered}\n\nOnce submitted, answers cannot be modified.`;

    if (confirm(confirmMsg)) {
      const result = examEngine.submitExam();
      this.showResultView(result);
    }
  },

  handleExamAutoSubmit() {
    const result = examEngine.submitExam();
    this.showResultView(result);
  },

  // ==========================================
  // EXAM RESULT VIEW
  // ==========================================
  showResultView(result) {
    this.currentView = 'result';
    document.querySelectorAll('.view-container').forEach(view => view.classList.remove('active'));
    document.getElementById('view-result').classList.add('active');

    document.getElementById('result-test-name').textContent = result.testName;
    document.getElementById('result-score-val').textContent = `${result.score} / ${result.maxScore}`;
    document.getElementById('result-accuracy-val').textContent = `${result.accuracy}%`;
    document.getElementById('result-attempted-val').textContent = `${result.attemptedCount} / ${result.totalQuestions}`;

    const mins = Math.floor(result.timeSpentSeconds / 60);
    const secs = result.timeSpentSeconds % 60;
    document.getElementById('result-time-val').textContent = `${mins}m ${secs}s`;

    const statusBanner = document.getElementById('result-status-banner');
    if (statusBanner) {
      if (result.passed) {
        statusBanner.className = 'result-banner passed';
        statusBanner.innerHTML = `
          <div class="banner-icon">✓</div>
          <div class="banner-text">
            <h3>Assessment Qualified</h3>
            <p>You scored ${result.percentage}% which is above the recruitment cutoff of ${result.cutoffPercent}%.</p>
          </div>
        `;
      } else {
        statusBanner.className = 'result-banner failed';
        statusBanner.innerHTML = `
          <div class="banner-icon">✕</div>
          <div class="banner-text">
            <h3>Assessment Below Benchmark</h3>
            <p>You scored ${result.percentage}%. The cutoff for ${result.company} was ${result.cutoffPercent}%. Review your weak areas below.</p>
          </div>
        `;
      }
    }

    const catContainer = document.getElementById('result-category-breakdown');
    if (catContainer) {
      catContainer.innerHTML = Object.entries(result.categoryStats).map(([cat, stat]) => {
        const catAcc = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0;
        return `
          <div class="category-breakdown-row">
            <div class="cat-label">
              <strong>${cat}</strong>
              <span>${stat.correct} / ${stat.total} Correct (${catAcc}% Accuracy)</span>
            </div>
            <div class="cat-progress-bar">
              <div class="cat-progress-fill" style="width: ${catAcc}%;"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    this.renderResultQuestionsReview('all');
    this.renderDashboardStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderResultQuestionsReview(filter = 'all') {
    const container = document.getElementById('result-questions-review-list');
    if (!container || !examEngine.examResult) return;

    const result = examEngine.examResult;
    let questionsToShow = result.questions;

    if (filter === 'correct') {
      questionsToShow = questionsToShow.filter(q => result.answers[q.id] === q.correctAnswer);
    } else if (filter === 'incorrect') {
      questionsToShow = questionsToShow.filter(q => {
        const ans = result.answers[q.id];
        return ans !== null && ans !== undefined && ans !== q.correctAnswer;
      });
    } else if (filter === 'unattempted') {
      questionsToShow = questionsToShow.filter(q => result.answers[q.id] === null || result.answers[q.id] === undefined);
    }

    container.innerHTML = questionsToShow.map((q, idx) => {
      const userAns = result.answers[q.id];
      const isCorrect = (userAns === q.correctAnswer);
      const isUnattempted = (userAns === null || userAns === undefined);

      let statusBadge = '';
      if (isCorrect) statusBadge = '<span class="badge badge-success">✓ Correct (+1.0)</span>';
      else if (isUnattempted) statusBadge = '<span class="badge badge-warning">○ Unattempted (0.0)</span>';
      else statusBadge = `<span class="badge badge-danger">✕ Incorrect (-${examEngine.currentTestConfig.negativeMarking || 0})</span>`;

      const optionsHTML = q.options.map((opt, optIdx) => {
        let optClass = 'review-option';
        if (optIdx === q.correctAnswer) optClass += ' correct-answer';
        if (optIdx === userAns && !isCorrect) optClass += ' user-wrong';
        const letter = String.fromCharCode(65 + optIdx);
        return `
          <div class="${optClass}">
            <span class="rev-letter">${letter}</span>
            <span class="rev-text">${opt}</span>
            ${optIdx === q.correctAnswer ? '<span class="rev-tag">Correct Answer</span>' : ''}
            ${optIdx === userAns && !isCorrect ? '<span class="rev-tag wrong">Your Answer</span>' : ''}
          </div>
        `;
      }).join('');

      return `
        <div class="result-review-card">
          <div class="review-header">
            <span class="q-meta">${q.category} &bull; ${q.subtopic}</span>
            ${statusBadge}
          </div>
          <p class="review-q-text"><strong>Q${idx + 1}.</strong> ${q.question.replace(/\n/g, '<br>')}</p>
          <div class="review-options-list">${optionsHTML}</div>
          <div class="review-solution-box">
            <h4>Step-by-Step Derivation</h4>
            <p>${q.solution.replace(/\n/g, '<br>')}</p>
            ${q.shortcut ? `
              <div class="review-pro-trick">
                <strong>PRO TRICK:</strong> ${q.shortcut}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  },

  // ==========================================
  // FORMULAS VIEW
  // ==========================================
  renderFormulasView() {
    const container = document.getElementById('formulas-cards-container');
    if (!container) return;

    container.innerHTML = FORMULAS_DATA.map(group => {
      return `
        <div class="formula-group-card">
          <div class="formula-group-header">
            <h3>${group.title}</h3>
            <span class="badge badge-category">${group.category}</span>
          </div>

          <div class="formula-items-list">
            ${group.items.map(item => `
              <div class="formula-item">
                <h4 class="item-name">${item.name}</h4>
                <pre class="formula-code">${item.formula}</pre>
                <div class="formula-tip"><strong>Shortcut Rule:</strong> ${item.tip}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  // ==========================================
  // ANALYTICS VIEW
  // ==========================================
  renderAnalyticsView() {
    const history = StorageManager.getHistory();

    const historyTableBody = document.getElementById('analytics-history-tbody');
    if (historyTableBody) {
      if (history.length === 0) {
        historyTableBody.innerHTML = `
          <tr>
            <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
              No mock tests recorded yet. Launch any recruiter assessment to see analytics.
            </td>
          </tr>
        `;
      } else {
        historyTableBody.innerHTML = history.map(h => `
          <tr>
            <td><strong>${h.testName}</strong><br><small style="color:var(--text-muted);">${h.date}</small></td>
            <td>${h.score} / ${h.maxScore}</td>
            <td>${h.accuracy}%</td>
            <td>${h.attemptedCount} / ${h.totalQuestions}</td>
            <td>${Math.floor(h.timeSpentSeconds / 60)}m ${h.timeSpentSeconds % 60}s</td>
            <td>
              <span class="badge ${h.passed ? 'badge-success' : 'badge-danger'}">
                ${h.passed ? 'Qualified' : 'Missed'}
              </span>
            </td>
          </tr>
        `).join('');
      }
    }
  },

  // ==========================================
  // BOOKMARKS VIEW
  // ==========================================
  renderBookmarksView() {
    const container = document.getElementById('bookmarks-list-container');
    if (!container) return;

    const bookmarkedIds = StorageManager.getBookmarks();
    const bookmarkedQuestions = QUESTIONS_DATABASE.filter(q => bookmarkedIds.includes(q.id));

    if (bookmarkedQuestions.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">★</div>
          <h3>No Saved Questions</h3>
          <p>Click "Bookmark" on any tricky question in the Practice Hub to store it here.</p>
          <button class="btn btn-primary" onclick="window.location.hash='#practice'">Go to Practice Hub</button>
        </div>
      `;
      return;
    }

    container.innerHTML = bookmarkedQuestions.map((q, idx) => {
      return `
        <div class="question-card" id="bookmark-card-${q.id}">
          <div class="question-header">
            <div class="q-meta-tags">
              <span class="badge badge-category">${q.category}</span>
              <span class="badge badge-subtopic">${q.subtopic}</span>
              <span class="badge badge-diff diff-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
              <span class="badge badge-company">${q.company}</span>
            </div>
            <button class="btn-bookmark active" onclick="AptiApp.removeBookmark('${q.id}')">
              Remove
            </button>
          </div>
          <div class="question-body">
            <div class="q-number">Q${idx + 1}.</div>
            <div class="q-text">${q.question.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="options-grid">
            ${q.options.map((opt, i) => `
              <div class="practice-option ${i === q.correctAnswer ? 'correct' : ''}">
                <div class="opt-letter">${String.fromCharCode(65 + i)}</div>
                <div class="opt-text">${opt}</div>
                ${i === q.correctAnswer ? '<span class="opt-indicator">✓ Correct</span>' : ''}
              </div>
            `).join('')}
          </div>
          <div class="solution-drawer" style="margin-top: 1rem;">
            <h4>Explanation</h4>
            <p>${q.solution.replace(/\n/g, '<br>')}</p>
            ${q.shortcut ? `<div class="shortcut-section"><span class="pro-tag">PRO TRICK</span> ${q.shortcut}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');
  },

  removeBookmark(questionId) {
    StorageManager.toggleBookmark(questionId);
    this.renderBookmarksView();
    this.showToast("Question removed from Bookmarks");
  },

  // ==========================================
  // CUSTOM TEST BUILDER MODAL
  // ==========================================
  bindCustomTestModal() {
    const modal = document.getElementById('custom-test-modal');
    const openBtn = document.getElementById('btn-open-custom-test');
    const closeBtn = document.getElementById('btn-close-modal');
    const startBtn = document.getElementById('btn-start-custom-test');

    if (openBtn) {
      openBtn.onclick = () => {
        modal.classList.add('active');
        SoundFX.click();
      };
    }

    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.remove('active');
        SoundFX.click();
      };
    }

    if (startBtn) {
      startBtn.onclick = () => {
        this.launchCustomTest();
      };
    }
  },

  launchCustomTest() {
    const categorySelect = document.getElementById('custom-category-select').value;
    const count = parseInt(document.getElementById('custom-count-select').value, 10) || 8;
    const duration = parseInt(document.getElementById('custom-duration-select').value, 10) || 10;
    const negMarking = parseFloat(document.getElementById('custom-neg-select').value) || 0;

    let available = QUESTIONS_DATABASE;
    if (categorySelect !== 'All') {
      available = available.filter(q => q.category === categorySelect);
    }

    const shuffled = [...available].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    const config = {
      id: 'custom-' + Date.now(),
      name: `Custom Assessment (${categorySelect})`,
      company: 'Custom Assessment',
      durationMinutes: duration,
      totalQuestions: selected.length,
      negativeMarking: negMarking,
      cutoffPercent: 65
    };

    document.getElementById('custom-test-modal').classList.remove('active');
    const started = examEngine.startExam(config, selected);
    if (started) {
      this.showExamView();
    }
  },

  showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'app-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.AptiApp = AptiApp;
  AptiApp.init();
});
