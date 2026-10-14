// AptiLearn - Authentication & Candidate Profile Engine
// Provides working login, registration, session persistence, and candidate profiles

const AUTH_STORAGE_KEY = 'aptilearn_users_db';
const SESSION_STORAGE_KEY = 'aptilearn_active_session';

const AuthManager = {
  // Pre-seed a realistic default demo account if none exist
  init() {
    const users = this.getUsers();
    if (users.length === 0) {
      const defaultUser = {
        id: 'usr_default',
        name: 'Aditya Sharma',
        email: 'aditya.sharma@campus.edu',
        password: 'password123',
        college: 'National Institute of Technology',
        branch: 'Computer Science & Engineering',
        targetCompany: 'TCS NQT / Infosys',
        graduationYear: '2025',
        registeredAt: new Date().toISOString()
      };
      this.saveUsers([defaultUser]);
      this.setSession(defaultUser);
    }
  },

  getUsers() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveUsers(users) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
  },

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error(e);
    }
    // Fallback to first user or guest
    const users = this.getUsers();
    return users.length > 0 ? users[0] : null;
  },

  setSession(user) {
    if (!user) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } else {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    }
    this.updateUserUI();
  },

  login(email, password) {
    const users = this.getUsers();
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid email or password. Please try again.' };
    }

    this.setSession(user);
    return { success: true, user };
  },

  register(userData) {
    const users = this.getUsers();
    const cleanEmail = (userData.email || '').trim().toLowerCase();

    if (!userData.name || !userData.email || !userData.password) {
      return { success: false, message: 'Please complete all required fields.' };
    }

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: userData.name.trim(),
      email: cleanEmail,
      password: userData.password,
      college: userData.college ? userData.college.trim() : 'Engineering Institute',
      branch: userData.branch ? userData.branch.trim() : 'B.Tech / MCA',
      targetCompany: userData.targetCompany || 'TCS NQT',
      graduationYear: userData.graduationYear || '2025',
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    this.setSession(newUser);

    return { success: true, user: newUser };
  },

  logout() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    this.updateUserUI();
  },

  updateUserUI() {
    const user = this.getCurrentUser();
    const userBadgeName = document.getElementById('header-user-name');
    const userAvatarText = document.getElementById('header-user-avatar');
    const authBtn = document.getElementById('header-auth-btn');
    const profileDropdown = document.getElementById('user-profile-menu');

    if (user) {
      if (userBadgeName) userBadgeName.textContent = user.name.split(' ')[0];
      if (userAvatarText) {
        const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
        userAvatarText.textContent = initials || 'AS';
      }
      if (authBtn) authBtn.style.display = 'none';
      if (profileDropdown) profileDropdown.style.display = 'flex';

      // Update candidate details in exam sidebar if available
      const examCandidateName = document.getElementById('exam-candidate-name');
      const examCandidateCollege = document.getElementById('exam-candidate-college');
      if (examCandidateName) examCandidateName.textContent = user.name;
      if (examCandidateCollege) examCandidateCollege.textContent = user.college;
    } else {
      if (authBtn) authBtn.style.display = 'inline-flex';
      if (profileDropdown) profileDropdown.style.display = 'none';
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AuthManager };
}
