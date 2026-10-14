// AptiLearn - Sound & Audio Feedback Engine (Web Audio API)
// Provides clean, subtle micro-haptics without external audio assets

const SoundFX = {
  ctx: null,

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  },

  isEnabled() {
    return StorageManager.getSoundPref();
  },

  playTone(freq, type = 'sine', duration = 0.1, delay = 0, gainLevel = 0.08) {
    if (!this.isEnabled()) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + duration);
    } catch (e) {
      // Audio might be blocked before first user gesture
    }
  },

  click() {
    this.playTone(800, 'sine', 0.04, 0, 0.03);
  },

  correct() {
    this.playTone(523.25, 'triangle', 0.1, 0, 0.06);     // C5
    this.playTone(659.25, 'triangle', 0.18, 0.08, 0.06);  // E5
    this.playTone(783.99, 'triangle', 0.25, 0.16, 0.06);  // G5
  },

  wrong() {
    this.playTone(320, 'sawtooth', 0.1, 0, 0.04);
    this.playTone(280, 'sawtooth', 0.18, 0.08, 0.04);
  },

  timerWarning() {
    this.playTone(880, 'sine', 0.06, 0, 0.05);
    this.playTone(880, 'sine', 0.06, 0.12, 0.05);
  },

  complete() {
    // Triumphant chime
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      this.playTone(freq, 'triangle', 0.3, i * 0.1, 0.07);
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SoundFX };
}
