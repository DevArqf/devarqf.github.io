import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {
  PORTFOLIO_VIDEO_DURATION,
  PORTFOLIO_VIDEO_FPS,
  PortfolioVideo,
} from './remotion/PortfolioVideo';
import soundtrack from '../audio/portfolio-soundtrack.mp3';

const mount = document.getElementById('portfolio-video-player');

const ShowreelPlayer = () => {
  const playerRef = useRef(null);
  const audioRef = useRef(null);
  const [soundStarted, setSoundStarted] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    const audio = audioRef.current;
    if (!player || !audio) {
      return undefined;
    }

    const syncAudioPosition = (frame) => {
      const expectedTime = frame / PORTFOLIO_VIDEO_FPS;
      if (Math.abs(audio.currentTime - expectedTime) > 0.2) {
        audio.currentTime = expectedTime;
      }
    };
    const onPlay = () => {
      syncAudioPosition(player.getCurrentFrame());
      void audio.play().catch(() => setSoundStarted(false));
    };
    const onPause = () => audio.pause();
    const onSeek = ({detail}) => syncAudioPosition(detail.frame);
    const onTimeUpdate = ({detail}) => syncAudioPosition(detail.frame);
    const onEnded = () => {
      audio.currentTime = 0;
    };
    const onVolumeChange = ({detail}) => {
      audio.volume = Math.max(0, Math.min(1, detail.volume));
    };
    const onMuteChange = () => {
      audio.muted = player.isMuted();
    };

    player.addEventListener('play', onPlay);
    player.addEventListener('pause', onPause);
    player.addEventListener('seeked', onSeek);
    player.addEventListener('timeupdate', onTimeUpdate);
    player.addEventListener('ended', onEnded);
    player.addEventListener('volumechange', onVolumeChange);
    player.addEventListener('mutechange', onMuteChange);

    return () => {
      player.removeEventListener('play', onPlay);
      player.removeEventListener('pause', onPause);
      player.removeEventListener('seeked', onSeek);
      player.removeEventListener('timeupdate', onTimeUpdate);
      player.removeEventListener('ended', onEnded);
      player.removeEventListener('volumechange', onVolumeChange);
      player.removeEventListener('mutechange', onMuteChange);
    };
  }, []);

  const playWithSound = (event) => {
    const player = playerRef.current;
    const audio = audioRef.current;
    if (!player || !audio) {
      return;
    }

    audio.currentTime = player.getCurrentFrame() / PORTFOLIO_VIDEO_FPS;
    audio.volume = 0.85;
    audio.muted = false;
    audio.loop = true;
    player.setVolume(0.85);
    player.unmute();

    void audio.play().then(() => {
      setSoundStarted(true);
      player.play(event);
    });
  };

  return (
    <div className="showreel-player-shell">
      <audio ref={audioRef} src={soundtrack} preload="auto" />
      <Player
        ref={playerRef}
        component={PortfolioVideo}
        inputProps={{soundtrackEnabled: false}}
        durationInFrames={PORTFOLIO_VIDEO_DURATION}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={PORTFOLIO_VIDEO_FPS}
        controls
        showVolumeControls
        loop
        autoPlay={false}
        initiallyMuted={false}
        initialVolume={0.85}
        volumePersistenceKey="malik-portfolio-showreel-volume-v3"
        sampleRate={44100}
        acknowledgeRemotionLicense
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 20,
          overflow: 'hidden',
        }}
      />
      {!soundStarted ? (
        <button
          type="button"
          className="showreel-sound-button"
          onClickCapture={playWithSound}
        >
          <span className="showreel-sound-icon">▶</span>
          Play with sound
        </button>
      ) : null}
    </div>
  );
};

if (mount) {
  createRoot(mount).render(
    <React.StrictMode>
      <ShowreelPlayer />
    </React.StrictMode>,
  );
}
