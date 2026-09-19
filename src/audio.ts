export class RainAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private sources: AudioScheduledSourceNode[] = [];
  private dropletTimer = 0;
  private started = false;
  private muted = false;

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.master) {
      this.master.gain.setTargetAtTime(muted ? 0 : 0.22, this.ctx?.currentTime ?? 0, 0.08);
    }
  }

  async start(): Promise<void> {
    if (this.started) {
      if (this.ctx?.state === "suspended") {
        await this.ctx.resume();
      }
      this.setMuted(this.muted);
      return;
    }

    const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;

    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);

    const noise = this.makeNoiseSource();
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 820;
    lowpass.Q.value = 0.7;

    const band = this.ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 420;
    band.Q.value = 0.55;

    const rainGain = this.ctx.createGain();
    rainGain.gain.value = 0.55;

    noise.connect(lowpass);
    lowpass.connect(band);
    band.connect(rainGain);
    rainGain.connect(this.master);

    this.sources.push(noise);
    this.started = true;
    this.setMuted(this.muted);
    this.scheduleDroplets();
  }

  stop(): void {
    window.clearTimeout(this.dropletTimer);
    for (const source of this.sources) {
      try {
        source.stop();
      } catch {
        /* already stopped */
      }
    }
    this.sources = [];
    void this.ctx?.close();
    this.ctx = null;
    this.master = null;
    this.started = false;
  }

  private makeNoiseSource(): AudioBufferSourceNode {
    if (!this.ctx) throw new Error("audio missing");
    const seconds = 3;
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * seconds, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i += 1) {
      const white = Math.random() * 2 - 1;
      last = last * 0.86 + white * 0.14;
      data[i] = last * 0.9;
    }
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.start();
    return source;
  }

  private scheduleDroplets(): void {
    const drip = () => {
      if (this.ctx && this.master && !this.muted) {
        this.playDroplet();
      }
      this.dropletTimer = window.setTimeout(drip, 700 + Math.random() * 1800);
    };
    this.dropletTimer = window.setTimeout(drip, 900);
  }

  private playDroplet(): void {
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 1200;
    osc.type = "sine";
    osc.frequency.setValueAtTime(1800 + Math.random() * 900, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(420, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, this.ctx.currentTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.18);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }
}
