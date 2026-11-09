/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API Sound Synthesizer for cozy pastel cafe sounds
class SoundEngine {
  private ctx: AudioContext | null = null;
  private frotherOsc: OscillatorNode | null = null;
  private frotherGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying: boolean = false;
  private ambientInterval: number | null = null;
  public soundEnabled: boolean = true;
  public musicEnabled: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Cute pop / button press sound
  playPop() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Audio fallback silent
    }
  }

  // Water / liquid droplet bubble
  playBubble() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 500 + Math.random() * 200;
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.8, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // Ignore
    }
  }

  // Spoon scoop / powder sprinkle sound
  playSprinkle() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.04));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2400;
      filter.Q.value = 3;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Ignore
    }
  }

  // Liquid pouring stream
  playPour() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const duration = 0.6;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(1400, this.ctx.currentTime + duration * 0.5);
      filter.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + duration);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.14, this.ctx.currentTime + 0.1);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Ignore
    }
  }

  // Ice cube clinking against glass
  playIceClink() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const freq = 1800 + Math.random() * 400;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.95, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch {
      // Ignore
    }
  }

  // Electric frother start/stop
  startFrother() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx || this.frotherOsc) return;

      this.frotherOsc = this.ctx.createOscillator();
      this.frotherGain = this.ctx.createGain();

      this.frotherOsc.type = 'sawtooth';
      this.frotherOsc.frequency.setValueAtTime(120, this.ctx.currentTime);
      this.frotherOsc.frequency.linearRampToValueAtTime(180, this.ctx.currentTime + 0.3);

      this.frotherGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.frotherGain.gain.linearRampToValueAtTime(0.09, this.ctx.currentTime + 0.2);

      // Lowpass filter to muffle it like inside cream
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 500;

      this.frotherOsc.connect(filter);
      filter.connect(this.frotherGain);
      this.frotherGain.connect(this.ctx.destination);

      this.frotherOsc.start();
    } catch {
      // Ignore
    }
  }

  stopFrother() {
    try {
      if (this.frotherGain && this.ctx) {
        this.frotherGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      }
      setTimeout(() => {
        if (this.frotherOsc) {
          try {
            this.frotherOsc.stop();
            this.frotherOsc.disconnect();
          } catch {
            // Ignore
          }
          this.frotherOsc = null;
        }
      }, 100);
    } catch {
      this.frotherOsc = null;
    }
  }

  // Shaking sound
  playShake() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      for (let i = 0; i < 2; i++) {
        setTimeout(() => {
          this.playIceClink();
        }, i * 120);
      }
    } catch {
      // Ignore
    }
  }

  // Swirl sound
  playSwirl() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.25);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.5);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch {
      // Ignore
    }
  }

  // Celebration fanfare when coffee is ready
  playCelebration() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.value = freq;

        const startTime = this.ctx!.currentTime + idx * 0.12;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.85);
      });
    } catch {
      // Ignore
    }
  }

  // Ambient gentle pastel cafe chords loop (toggled by user)
  toggleAmbientMusic(enable?: boolean) {
    const targetState = enable !== undefined ? enable : !this.musicEnabled;
    this.musicEnabled = targetState;

    if (!targetState) {
      if (this.ambientInterval) {
        window.clearInterval(this.ambientInterval);
        this.ambientInterval = null;
      }
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      }
      this.isAmbientPlaying = false;
      return false;
    }

    try {
      this.initContext();
      if (!this.ctx) return false;

      this.isAmbientPlaying = true;
      const chords = [
        [261.63, 329.63, 392.0, 493.88], // Cmaj7 (C4, E4, G4, B4)
        [220.0, 261.63, 329.63, 392.0],   // Am7 (A3, C4, E4, G4)
        [293.66, 349.23, 440.0, 523.25], // Dm7 (D4, F4, A4, C5)
        [196.0, 246.94, 293.66, 349.23], // G7 (G3, B3, D4, F4)
      ];

      let chordIndex = 0;
      const playChord = () => {
        if (!this.musicEnabled || !this.ctx) return;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq, idx) => {
          try {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            const time = this.ctx!.currentTime + idx * 0.08;
            gain.gain.setValueAtTime(0.001, time);
            gain.gain.linearRampToValueAtTime(0.025, time + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, time + 2.4);

            osc.connect(gain);
            gain.connect(this.ctx!.destination);

            osc.start(time);
            osc.stop(time + 2.5);
          } catch {
            // Ignore
          }
        });
      };

      playChord();
      this.ambientInterval = window.setInterval(playChord, 2600);
      return true;
    } catch {
      return false;
    }
  }
}

export const soundEngine = new SoundEngine();
