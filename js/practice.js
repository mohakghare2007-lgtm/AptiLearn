// AptiLearn - Enterprise Topic-Wise Practice Controller

const PracticeManager = {
  activeCategory: 'All',
  activeSubtopic: 'All',
  activeDifficulty: 'All',
  activeCompany: 'All',
  searchQuery: '',
  userSelections: {}, // { questionId: selectedIndex }
  revealedSolutions: {}, // { questionId: boolean }

  init() {
    this.renderCategoryFilters();
    this.renderSubtopicPills();
    this.renderCompanyFilterSelect();
    this.renderQuestionsList();
  },

  setCategory(category) {
    this.activeCategory = category;
    this.activeSubtopic = 'All';
    this.renderCategoryFilters();
    this.renderSubtopicPills();
    this.renderQuestionsList();
    SoundFX.click();
  },

  setSubtopic(subtopic) {
    this.activeSubtopic = subtopic;
    this.renderSubtopicPills();
    this.renderQuestionsList();
    SoundFX.click();
  },

  setDifficulty(difficulty) {
    this.activeDifficulty = difficulty;
    this.renderQuestionsList();
    SoundFX.click();
  },

  setCompany(company) {
    this.activeCompany = company;
    this.renderQuestionsList();
    SoundFX.click();
  },

  setSearch(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    this.renderQuestionsList();
  },

  getFilteredQuestions() {
    return QUESTIONS_DATABASE.filter(q => {
      // Category filter
      if (this.activeCategory !== 'All' && q.category !== this.activeCategory) return false;
      // Subtopic filter
      if (this.activeSubtopic !== 'All' && q.subtopic !== this.activeSubtopic) return false;
      // Difficulty filter
      if (this.activeDifficulty !== 'All' && q.difficulty !== this.activeDifficulty) return false;
      // Company filter
      if (this.activeCompany !== 'All' && q.company !== this.activeCompany) return false;
      // Search
      if (this.searchQuery) {
        const text = (q.question + ' ' + q.subtopic + ' ' + q.category + ' ' + q.company + ' ' + (q.shortcut || '')).toLowerCase();
        if (!text.includes(this.searchQuery)) return false;
      }
      return true;
    });
  },

  selectOption(questionId, optionIndex) {
    if (this.userSelections[questionId] !== undefined) return; // already attempted
    this.userSelections[questionId] = optionIndex;

    const q = QUESTIONS_DATABASE.find(item => item.id === questionId);
    if (!q) return;

    const isCorrect = (optionIndex === q.correctAnswer);
    if (isCorrect) {
      SoundFX.correct();
      StorageManager.updateStats(stats => {
        stats.practiceCorrect = (stats.practiceCorrect || 0) + 1;
        stats.totalPracticeAttempted = (stats.totalPracticeAttempted || 0) + 1;
        stats.xp = (stats.xp || 120) + 10;
        return stats;
      });
    } else {
      SoundFX.wrong();
      StorageManager.updateStats(stats => {
        stats.totalPracticeAttempted = (stats.totalPracticeAttempted || 0) + 1;
        return stats;
      });
    }

    // Auto reveal solution after answering
    this.revealedSolutions[questionId] = true;

    this.updateQuestionCard(questionId);
    if (window.AptiApp) window.AptiApp.renderDashboardStats();
  },

  toggleSolution(questionId) {
    this.revealedSolutions[questionId] = !this.revealedSolutions[questionId];
    this.updateQuestionCard(questionId);
    SoundFX.click();
  },

  toggleBookmark(questionId) {
    const isBookmarked = StorageManager.toggleBookmark(questionId);
    this.updateBookmarkButton(questionId, isBookmarked);
    SoundFX.click();
    if (window.AptiApp) {
      window.AptiApp.showToast(isBookmarked ? "Question saved to Bookmarks" : "Question removed from Bookmarks");
    }
  },

  renderCategoryFilters() {
    const container = document.getElementById('practice-categories-bar');
    if (!container) return;

    const categories = ['All', 'Quantitative', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation'];
    
    container.innerHTML = categories.map(cat => {
      const active = this.activeCategory === cat ? 'active' : '';
      return `<button class="category-pill ${active}" onclick="PracticeManager.setCategory('${cat}')">${cat}</button>`;
    }).join('');
  },

  renderSubtopicPills() {
    const container = document.getElementById('practice-subtopics-bar');
    if (!container) return;

    let subtopics = ['All'];
    const filteredByCategory = this.activeCategory === 'All' 
      ? QUESTIONS_DATABASE 
      : QUESTIONS_DATABASE.filter(q => q.category === this.activeCategory);

    const set = new Set();
    filteredByCategory.forEach(q => set.add(q.subtopic));
    subtopics = ['All', ...Array.from(set)];

    container.innerHTML = subtopics.map(sub => {
      const active = this.activeSubtopic === sub ? 'active' : '';
      return `<button class="subtopic-pill ${active}" onclick="PracticeManager.setSubtopic('${sub}')">${sub}</button>`;
    }).join('');
  },

  renderCompanyFilterSelect() {
    const select = document.getElementById('practice-company-select');
    if (!select) return;

    const companies = ['All', ...new Set(QUESTIONS_DATABASE.map(q => q.company))];
    select.innerHTML = companies.map(c => `
      <option value="${c}" ${this.activeCompany === c ? 'selected' : ''}>${c === 'All' ? 'All Recruiters' : c}</option>
    `).join('');
  },

  renderQuestionsList() {
    const container = document.getElementById('practice-questions-list');
    const countLabel = document.getElementById('practice-count-label');
    if (!container) return;

    const questions = this.getFilteredQuestions();

    if (countLabel) {
      countLabel.textContent = `Showing ${questions.length} of ${QUESTIONS_DATABASE.length} verified placement questions`;
    }

    if (questions.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No matching questions found</h3>
          <p>Try resetting the category, subtopic, difficulty, or search query.</p>
          <button class="btn btn-secondary" onclick="PracticeManager.resetFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = questions.map((q, idx) => this.generateQuestionCardHTML(q, idx + 1)).join('');
  },

  resetFilters() {
    this.activeCategory = 'All';
    this.activeSubtopic = 'All';
    this.activeDifficulty = 'All';
    this.activeCompany = 'All';
    this.searchQuery = '';
    const searchInput = document.getElementById('practice-search-input');
    if (searchInput) searchInput.value = '';
    this.init();
  },

  updateQuestionCard(questionId) {
    const cardEl = document.getElementById(`practice-card-${questionId}`);
    const q = QUESTIONS_DATABASE.find(item => item.id === questionId);
    if (!cardEl || !q) return;

    const idx = parseInt(cardEl.dataset.index, 10) || 1;
    cardEl.outerHTML = this.generateQuestionCardHTML(q, idx);
  },

  updateBookmarkButton(questionId, isBookmarked) {
    const btn = document.getElementById(`bookmark-btn-${questionId}`);
    if (btn) {
      btn.classList.toggle('active', isBookmarked);
      btn.innerHTML = isBookmarked ? '★ Saved' : '☆ Bookmark';
    }
  },

  generateQuestionCardHTML(q, index) {
    const selected = this.userSelections[q.id];
    const isAnswered = selected !== undefined;
    const isSolutionRevealed = !!this.revealedSolutions[q.id];
    const isSaved = StorageManager.isBookmarked(q.id);
    const diffClass = (q.difficulty || 'medium').toLowerCase();

    const optionsHTML = q.options.map((opt, optIdx) => {
      let optionClass = 'practice-option';
      if (isAnswered) {
        if (optIdx === q.correctAnswer) {
          optionClass += ' correct';
        } else if (optIdx === selected) {
          optionClass += ' wrong';
        } else {
          optionClass += ' disabled';
        }
      }

      const letter = String.fromCharCode(65 + optIdx);
      return `
        <div class="${optionClass}" onclick="PracticeManager.selectOption('${q.id}', ${optIdx})">
          <div class="opt-letter">${letter}</div>
          <div class="opt-text">${opt}</div>
          ${isAnswered && optIdx === q.correctAnswer ? '<span class="opt-indicator">✓ Correct</span>' : ''}
          ${isAnswered && optIdx === selected && optIdx !== q.correctAnswer ? '<span class="opt-indicator">✕ Your Choice</span>' : ''}
        </div>
      `;
    }).join('');

    return `
      <div class="question-card" id="practice-card-${q.id}" data-index="${index}">
        <div class="question-header">
          <div class="q-meta-tags">
            <span class="badge badge-category">${q.category}</span>
            <span class="badge badge-subtopic">${q.subtopic}</span>
            <span class="badge badge-diff diff-${diffClass}">${q.difficulty}</span>
            <span class="badge badge-company">${q.company}</span>
          </div>
          <button class="btn-bookmark ${isSaved ? 'active' : ''}" id="bookmark-btn-${q.id}" onclick="PracticeManager.toggleBookmark('${q.id}')">
            ${isSaved ? '★ Saved' : '☆ Bookmark'}
          </button>
        </div>

        <div class="question-body">
          <div class="q-number">Q${index}.</div>
          <div class="q-text">${q.question.replace(/\n/g, '<br>')}</div>
        </div>

        <div class="options-grid">
          ${optionsHTML}
        </div>

        <div class="question-footer" style="display:flex; justify-content:space-between; align-items:center;">
          <button class="btn btn-outline-sm" onclick="PracticeManager.toggleSolution('${q.id}')">
            ${isSolutionRevealed ? 'Hide Solution ▲' : 'Show Explanation & Pro Trick ▼'}
          </button>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">+10 XP on correct answer</span>
        </div>

        ${isSolutionRevealed ? `
          <div class="solution-drawer">
            <div class="solution-section">
              <h4>Step-by-Step Derivation</h4>
              <p>${q.solution.replace(/\n/g, '<br>')}</p>
            </div>
            ${q.shortcut ? `
              <div class="shortcut-section">
                <div class="shortcut-header">
                  <span class="pro-tag">PRO TRICK</span>
                  <span>10-Second Placement Shortcut</span>
                </div>
                <p>${q.shortcut}</p>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PracticeManager };
}
