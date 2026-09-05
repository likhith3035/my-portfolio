// Web Audio API Synthesizer — High-Fidelity Spatial "Woooooh" Warp Vortex Engine
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.activeWarpNodes = null;
    try {
      const stored = localStorage.getItem('sound_enabled');
      this.enabled = stored !== null ? stored === 'true' : true;
    } catch {
      this.enabled = true;
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    try {
      localStorage.setItem('sound_enabled', this.enabled ? 'true' : 'false');
    } catch (e) {
      console.warn(e);
    }
    if (!this.enabled) {
      this.stopWarpWhoosh();
    }
    return this.enabled;
  }

  // ── High-Fidelity Cinematic "Woooooh" Warp Vortex & Spatial Whoosh Generator ──
  startWarpWhoosh(duration = 2.8) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Organic Dual-Channel Pink Noise Buffer (Silky air vortex texture)
      const bufferSize = Math.floor(this.ctx.sampleRate * Math.max(duration + 0.9, 3.8));
      const noiseBuffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
      const left = noiseBuffer.getChannelData(0);
      const right = noiseBuffer.getChannelData(1);

      let b0 = 0, b1 = 0, b2 = 0;
      let rb0 = 0, rb1 = 0, rb2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const whiteL = Math.random() * 2 - 1;
        const whiteR = Math.random() * 2 - 1;

        b0 = 0.99886 * b0 + whiteL * 0.0555179;
        b1 = 0.99332 * b1 + whiteL * 0.0750759;
        b2 = 0.96900 * b2 + whiteL * 0.1538520;
        left[i] = (b0 + b1 + b2 + whiteL * 0.05) * 0.32;

        rb0 = 0.99886 * rb0 + whiteR * 0.0555179;
        rb1 = 0.99332 * rb1 + whiteR * 0.0750759;
        rb2 = 0.96900 * rb2 + whiteR * 0.1538520;
        right[i] = (rb0 + rb1 + rb2 + whiteR * 0.05) * 0.32;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      // Dual Cascading Sweeping Filter (Bandpass + Lowpass for that rising "Woooo-oooh" acoustic sweep)
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.Q.setValueAtTime(3.8, now);
      bandpass.frequency.setValueAtTime(110, now);
      bandpass.frequency.exponentialRampToValueAtTime(780, now + duration * 0.55);
      bandpass.frequency.exponentialRampToValueAtTime(2400, now + duration);

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.Q.setValueAtTime(2.2, now);
      lowpass.frequency.setValueAtTime(320, now);
      lowpass.frequency.exponentialRampToValueAtTime(3200, now + duration);

      // Noise gain envelope: silky rise -> deep swell -> warp surge -> exponential breath fade
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.075, now + duration * 0.55);
      noiseGain.gain.linearRampToValueAtTime(0.12, now + duration * 0.88);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.45);

      noiseSource.connect(bandpass);
      bandpass.connect(lowpass);
      lowpass.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + duration + 0.5);

      // 2. Dual Sub-Bass & Harmonic Body Drone (40Hz -> 185Hz warm cinematic rumble)
      const droneSub = this.ctx.createOscillator();
      const droneMid = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();

      droneSub.type = 'sine';
      droneMid.type = 'triangle';

      droneSub.frequency.setValueAtTime(40, now);
      droneSub.frequency.exponentialRampToValueAtTime(140, now + duration);

      droneMid.frequency.setValueAtTime(80, now);
      droneMid.frequency.exponentialRampToValueAtTime(220, now + duration);

      droneGain.gain.setValueAtTime(0.001, now);
      droneGain.gain.linearRampToValueAtTime(0.065, now + duration * 0.55);
      droneGain.gain.linearRampToValueAtTime(0.085, now + duration * 0.85);
      droneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.45);

      droneSub.connect(droneGain);
      droneMid.connect(droneGain);
      droneGain.connect(this.ctx.destination);

      droneSub.start(now);
      droneMid.start(now);
      droneSub.stop(now + duration + 0.5);
      droneMid.stop(now + duration + 0.5);

      this.activeWarpNodes = { noiseSource, noiseGain, droneSub, droneMid, droneGain };
    } catch (e) {
      // Audio playback may fail if blocked by browser
    }
  }

  // Smoothly stop active whoosh sound if skipped or unmounted
  stopWarpWhoosh() {
    if (!this.activeWarpNodes || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      if (this.activeWarpNodes.noiseGain) {
        this.activeWarpNodes.noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      }
      if (this.activeWarpNodes.droneGain) {
        this.activeWarpNodes.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      }
      this.activeWarpNodes = null;
    } catch (e) {
      // Audio context cleanup failure ignored
    }
  }

  // Silenced no-ops for all other sound calls
  click() {}
  pop() {}
  success() {}
  themeSwitch() {}
  loveChime() {}
  harpRipple() {}
  introBoot() {}
  introMilestone() {}
  introCharge() {}
  introLaunch() {}
  playTone() {}
}

export const sound = new SoundManager();
