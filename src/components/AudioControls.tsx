/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const AudioControls: React.FC = () => {
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [musicOn, setMusicOn] = useState<boolean>(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundEngine.soundEnabled = next;
    if (next) soundEngine.playPop();
  };

  const toggleMusic = () => {
    const next = !musicOn;
    const active = soundEngine.toggleAmbientMusic(next);
    setMusicOn(active);
    if (soundOn) soundEngine.playPop();
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-100 shadow-sm transition-all hover:shadow-md">
      {/* Sound Effects Toggle */}
      <button
        type="button"
        onClick={toggleSound}
        className={`p-2 rounded-full transition-all flex items-center justify-center ${
          soundOn
            ? 'text-pink-600 bg-pink-50 hover:bg-pink-100'
            : 'text-stone-400 bg-stone-100 hover:bg-stone-200'
        }`}
        title={soundOn ? 'Sound effects on' : 'Sound effects muted'}
        aria-label="Toggle sound effects"
      >
        {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      {/* Ambient Lo-Fi Cafe Music Toggle */}
      <button
        type="button"
        onClick={toggleMusic}
        className={`px-2.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
          musicOn
            ? 'bg-gradient-to-r from-amber-100 to-rose-100 text-amber-900 border border-amber-200'
            : 'text-stone-600 hover:bg-stone-100 border border-transparent'
        }`}
        title={musicOn ? 'Stop ambient cafe music' : 'Play ambient cafe chords'}
      >
        {musicOn ? (
          <Disc className="w-3.5 h-3.5 animate-spin text-amber-600" />
        ) : (
          <Music className="w-3.5 h-3.5 text-stone-400" />
        )}
        <span className="hidden sm:inline">
          {musicOn ? 'Cafe Music: On' : 'Cafe Music'}
        </span>
      </button>
    </div>
  );
};
