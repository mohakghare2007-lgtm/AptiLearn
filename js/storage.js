// AptiLearn - LocalStorage & State Management

const STORAGE_KEYS = {
  STATS: 'aptilearn_user_stats',
  HISTORY: 'aptilearn_test_history',
  BOOKMARKS: 'aptilearn_bookmarked_ids',
  SOUND_ENABLED: 'aptilearn_sound_pref',
  THEME: 'aptilearn_theme_pref'
};

const StorageManager = {
  // Get initial stats or load existing
  getStats() {
    const defaultStats = {
      testsTaken: 0,
      questionsSolved: 0,
      correctAnswers: 0,
      totalPracticeAttempted: 0,
      practiceCorrect: 0,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      xp: 120
    };

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STATS);
      if (!stored) return defaultStats;
      const stats = JSON.parse(stored);
      
      // Calculate streak
      const today = new Date().toISOString().split('T')[0];
      const last = stats.lastActiveDate;
      if (last) {
        const diffDays = Math.floor((new Date(today) - new Date(last)) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          stats.streak += 1;
          stats.lastActiveDate = today;
          localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
        } else if (diffDays > 1) {
          stats.streak = 1;
          stats.lastActiveDate = today;
          localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
        }
      }
      return stats;
    } catch (e) {
      console.warn("Storage error:", e);
      return defaultStats;
    }
  },

  updateStats(updaterFn) {
    const stats = this.getStats();
    const updated = updaterFn(stats);
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return updated;
  },

  // Save completed test result to history
  saveTestResult(result) {
    try {
      const history = this.getHistory();
      history.unshift({
        id: 'test_' + Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        ...result
      });
      // Keep last 30 tests
      if (history.length > 30) history.pop();
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));

      // Update global stats
      this.updateStats(stats => {
        stats.testsTaken += 1;
        stats.questionsSolved += (result.totalQuestions || 0);
        stats.correctAnswers += (result.correctCount || 0);
        stats.xp += (result.correctCount || 0) * 15 + 20;
        return stats;
      });
    } catch (e) {
      console.error("Failed to save test result", e);
    }
  },

  getHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  // Bookmarks
  getBookmarks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  toggleBookmark(questionId) {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(questionId);
    let isBookmarked = false;
    if (index >= 0) {
      bookmarks.splice(index, 1);
      isBookmarked = false;
    } else {
      bookmarks.push(questionId);
      isBookmarked = true;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
    return isBookmarked;
  },

  isBookmarked(questionId) {
    const bookmarks = this.getBookmarks();
    return bookmarks.includes(questionId);
  },

  // Audio preference
  getSoundPref() {
    const pref = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
    return pref !== null ? JSON.parse(pref) : true;
  },

  setSoundPref(enabled) {
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, JSON.stringify(enabled));
  },

  // Theme preference (dark or light)
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  },

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StorageManager };
}
