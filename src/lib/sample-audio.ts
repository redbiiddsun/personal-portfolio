/* Tiny WebAudio pad so the vinyl tile's play button actually does something. */

const MASTER_GAIN = 0.12;
const CHORD_EVERY_MS = 2000;
/** Per-note envelope, in seconds: swell to peak, then fade out before the oscillator stops. */
const NOTE_PEAK_GAIN = 0.5;
const NOTE_ATTACK_S = 0.4;
const NOTE_RELEASE_END_S = 2.2;
const NOTE_STOP_S = 2.3;
/** Exponential ramps can't reach 0, so fade to a near-silent floor instead. */
const NOTE_SILENT_GAIN = 0.001;
const CHORDS_HZ = [
  [220, 277.2, 329.6],
  [196, 246.9, 293.7],
  [174.6, 220, 261.6],
  [196, 246.9, 329.6],
];

type AudioContextConstructor = typeof AudioContext;

/** Starts a looping chord pad. Returns a stop function, or null if WebAudio is unavailable. */
export const playSamplePad = (): (() => void) | null => {
  const AudioContextClass: AudioContextConstructor | undefined =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext;
  if (!AudioContextClass) return null;

  const context = new AudioContextClass();
  const output = context.createGain();
  output.gain.value = MASTER_GAIN;
  output.connect(context.destination);

  let step = 0;
  const playChord = () => {
    const now = context.currentTime;
    CHORDS_HZ[step++ % CHORDS_HZ.length].forEach((frequency) => {
      const oscillator = context.createOscillator();
      const envelope = context.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.value = frequency;
      envelope.gain.setValueAtTime(0, now);
      envelope.gain.linearRampToValueAtTime(NOTE_PEAK_GAIN, now + NOTE_ATTACK_S);
      envelope.gain.exponentialRampToValueAtTime(NOTE_SILENT_GAIN, now + NOTE_RELEASE_END_S);
      oscillator.connect(envelope).connect(output);
      oscillator.start(now);
      oscillator.stop(now + NOTE_STOP_S);
    });
  };

  playChord();
  const timer = setInterval(playChord, CHORD_EVERY_MS);
  return () => {
    clearInterval(timer);
    context.close();
  };
};
