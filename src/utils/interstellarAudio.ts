/**
 * Interstellar Soundtrack Controller
 * 
 * Features:
 * - Plays the exact audio from the Interstellar edit (Hans Zimmer - Cornfield Chase)
 * - Automatically starts at t=7.0s (the iconic pipe organ crescendo drop)
 * - Seamlessly loops the peak climax section (7.0s - 22.0s)
 * - Graceful fallback to real-time Web Audio API cathedral organ synthesis
 */

type AudioListener = (playing: boolean) => void;

class InterstellarAudioController {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners: Set<AudioListener> = new Set();
  private isUsingSynthFallback = false;

  // Web Audio Synth Fallback Nodes
  private synthCtx: AudioContext | null = null;
  private synthGain: GainNode | null = null;
  private synthLoopTimer: number | null = null;
  private activeSynthNodes: (OscillatorNode | GainNode)[] = [];

  constructor() {
    if (typeof window !== "undefined") {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    try {
      this.audioElement = new Audio();
      this.audioElement.preload = "auto";
      this.audioElement.volume = 0.85;

      // Check format support
      const canPlayWebm = this.audioElement.canPlayType('audio/webm; codecs="opus"');
      this.audioElement.src = canPlayWebm ? "/audio/interstellar.webm" : "/audio/interstellar.m4a";

      // Loop only the climax drop starting at 7.0s
      this.audioElement.addEventListener("timeupdate", () => {
        if (this.audioElement && this.audioElement.currentTime >= 21.8) {
          this.audioElement.currentTime = 7.0;
        }
      });

      this.audioElement.addEventListener("ended", () => {
        if (this.audioElement && this.isPlaying) {
          this.audioElement.currentTime = 7.0;
          void this.audioElement.play();
        }
      });

      this.audioElement.addEventListener("error", () => {
        // Fall back to Web Audio synthesis if audio file fails
        this.isUsingSynthFallback = true;
        if (this.isPlaying) {
          void this.playSynthFallback();
        }
      });
    } catch {
      this.isUsingSynthFallback = true;
    }
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public async play(): Promise<void> {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.notify();

    if (!this.isUsingSynthFallback && this.audioElement) {
      try {
        // Start exactly at the 7.0s crescendo drop requested
        if (this.audioElement.currentTime < 6.8 || this.audioElement.currentTime >= 21.5) {
          this.audioElement.currentTime = 7.0;
        }
        await this.audioElement.play();
        return;
      } catch (err) {
        console.warn("Audio element play error, using synth fallback:", err);
        this.isUsingSynthFallback = true;
      }
    }

    // Fallback: Web Audio Synth
    await this.playSynthFallback();
  }

  public pause(): void {
    if (!this.isPlaying) return;

    this.isPlaying = false;

    if (this.audioElement) {
      this.audioElement.pause();
    }

    if (this.synthLoopTimer) {
      clearTimeout(this.synthLoopTimer);
      this.synthLoopTimer = null;
    }

    if (this.synthGain && this.synthCtx) {
      this.synthGain.gain.setTargetAtTime(0.0001, this.synthCtx.currentTime, 0.08);
      setTimeout(() => {
        this.activeSynthNodes.forEach((node) => {
          try {
            if ("stop" in node) (node as OscillatorNode).stop();
            node.disconnect();
          } catch {
            // Already disconnected
          }
        });
        this.activeSynthNodes = [];
      }, 120);
    }

    this.notify();
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      void this.play();
    }
  }

  // ==========================================
  // Web Audio Cathedral Organ Synth Fallback
  // ==========================================
  private initSynth() {
    if (this.synthCtx && this.synthGain) return;

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return;

    this.synthCtx = new AudioContextClass();
    this.synthGain = this.synthCtx.createGain();
    this.synthGain.gain.setValueAtTime(0.2, this.synthCtx.currentTime);

    const filter = this.synthCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2600, this.synthCtx.currentTime);
    filter.Q.setValueAtTime(1.8, this.synthCtx.currentTime);

    const delayL = this.synthCtx.createDelay();
    delayL.delayTime.setValueAtTime(0.32, this.synthCtx.currentTime);
    const delayR = this.synthCtx.createDelay();
    delayR.delayTime.setValueAtTime(0.48, this.synthCtx.currentTime);

    const feedback = this.synthCtx.createGain();
    feedback.gain.setValueAtTime(0.38, this.synthCtx.currentTime);

    const merger = this.synthCtx.createChannelMerger(2);

    filter.connect(this.synthGain);
    filter.connect(delayL);
    filter.connect(delayR);

    delayL.connect(feedback);
    delayR.connect(feedback);
    feedback.connect(filter);

    delayL.connect(merger, 0, 0);
    delayR.connect(merger, 0, 1);
    merger.connect(this.synthGain);

    this.synthGain.connect(this.synthCtx.destination);
  }

  private playOrganNote(freq: number, startTime: number, duration: number, velocity = 0.24) {
    if (!this.synthCtx || !this.synthGain) return;

    const noteGain = this.synthCtx.createGain();
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(velocity, startTime + 0.04);
    noteGain.gain.setValueAtTime(velocity, startTime + duration - 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.15);

    const osc1 = this.synthCtx.createOscillator();
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(freq, startTime);
    osc1.detune.setValueAtTime(-5, startTime);

    const osc2 = this.synthCtx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq, startTime);
    osc2.detune.setValueAtTime(6, startTime);

    if (freq < 200) {
      const oscSub = this.synthCtx.createOscillator();
      oscSub.type = "sine";
      oscSub.frequency.setValueAtTime(freq * 0.5, startTime);
      oscSub.connect(noteGain);
      oscSub.start(startTime);
      oscSub.stop(startTime + duration + 0.2);
      this.activeSynthNodes.push(oscSub);
    }

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.synthGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.2);
    osc2.stop(startTime + duration + 0.2);

    this.activeSynthNodes.push(osc1, osc2, noteGain);
  }

  private scheduleClimaxCycle(startOffset: number): number {
    if (!this.synthCtx) return 0;

    const D2 = 73.42;
    const Bb1 = 58.27;
    const C2 = 65.41;
    const A1 = 55.0;
    const A2 = 110.0;
    const C3 = 130.81;
    const D3 = 146.83;
    const E3 = 164.81;
    const F3 = 174.61;
    const G3 = 196.0;
    const A3 = 220.0;
    const Bb3 = 233.08;
    const C4 = 261.63;
    const D4 = 293.66;
    const E4 = 329.63;
    const F4 = 349.23;
    const G4 = 392.0;
    const A4 = 440.0;
    const Bb4 = 466.16;
    const C5 = 523.25;
    const D5 = 587.33;
    const E5 = 659.25;
    const F5 = 698.46;

    const beatDuration = 60 / 112;
    const sixteenth = beatDuration / 4;
    const measureDuration = sixteenth * 12;

    const chords = [
      { pedal: D2, pad: [D3, A3, D4], arpeggio: [D4, F4, A4, D5, F5, A4, D5, F5, D5, A4, F4, D4] },
      { pedal: Bb1, pad: [Bb3, F4, Bb4], arpeggio: [D4, F4, Bb4, D5, F5, Bb4, D5, F5, D5, Bb4, F4, D4] },
      { pedal: C2, pad: [C3, G3, C4], arpeggio: [E4, G4, C5, E5, G4, C5, E5, C5, G4, E4, C4, G3] },
      { pedal: A1, pad: [A2, E3, A3], arpeggio: [E4, A4, C5, E5, A4, C5, E5, C5, A4, E4, C4, A3] },
      { pedal: D2, pad: [D3, F3, A3, D4], arpeggio: [A3, D4, F4, A4, D5, F5, A4, F4, D4, A3, F3, D3] },
      { pedal: Bb1, pad: [Bb3, D4, F4, Bb4], arpeggio: [Bb3, D4, F4, Bb4, D5, F5, Bb4, F4, D4, Bb3, F3, D3] },
    ];

    let t = startOffset;
    chords.forEach((chord) => {
      this.playOrganNote(chord.pedal, t, measureDuration * 0.98, 0.32);
      chord.pad.forEach((note) => this.playOrganNote(note, t, measureDuration * 0.95, 0.15));
      chord.arpeggio.forEach((note, idx) => {
        this.playOrganNote(note, t + idx * sixteenth, sixteenth * 1.35, 0.22);
      });
      t += measureDuration;
    });

    return t - startOffset;
  }

  private async playSynthFallback(): Promise<void> {
    this.initSynth();
    if (!this.synthCtx || !this.synthGain) return;

    if (this.synthCtx.state === "suspended") {
      await this.synthCtx.resume();
    }

    this.synthGain.gain.setValueAtTime(0.2, this.synthCtx.currentTime);

    const loop = () => {
      if (!this.isPlaying || !this.synthCtx) return;
      const now = this.synthCtx.currentTime + 0.05;
      const totalDuration = this.scheduleClimaxCycle(now);
      const scheduleTime = Math.max((totalDuration - 0.2) * 1000, 1000);
      this.synthLoopTimer = window.setTimeout(loop, scheduleTime);
    };

    loop();
  }
}

export const interstellarAudio = new InterstellarAudioController();
