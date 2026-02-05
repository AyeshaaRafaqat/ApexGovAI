'use client';

/**
 * High-performance audio singleton for hackathon 'vibe' coding.
 * Uses Web Audio API to generate procedural sounds without external assets.
 */
class ApexAudio {
    private context: AudioContext | null = null;

    private init() {
        if (!this.context) {
            this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    public playScan() {
        this.init();
        if (!this.context) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(880, this.context.currentTime); // High pitched scan
        osc.frequency.exponentialRampToValueAtTime(440, this.context.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.context.destination);

        osc.start();
        osc.stop(this.context.currentTime + 0.1);
    }

    public playViolation() {
        this.init();
        if (!this.context) return;

        // Double beep for alarm
        [0, 0.15].forEach(delay => {
            const osc = this.context!.createOscillator();
            const gain = this.context!.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(120, this.context!.currentTime + delay);
            osc.frequency.linearRampToValueAtTime(60, this.context!.currentTime + delay + 0.2);

            gain.gain.setValueAtTime(0.1, this.context!.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, this.context!.currentTime + delay + 0.2);

            osc.connect(gain);
            gain.connect(this.context!.destination);

            osc.start(this.context!.currentTime + delay);
            osc.stop(this.context!.currentTime + delay + 0.2);
        });
    }

    public playSuccess() {
        this.init();
        if (!this.context) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, this.context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.context.currentTime + 0.2);

        gain.gain.setValueAtTime(0.1, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(this.context.destination);

        osc.start();
        osc.stop(this.context.currentTime + 0.2);
    }
}

export const apexAudio = typeof window !== 'undefined' ? new ApexAudio() : null;
