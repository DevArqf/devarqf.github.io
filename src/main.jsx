import React from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {
  PORTFOLIO_VIDEO_DURATION,
  PORTFOLIO_VIDEO_FPS,
  PortfolioVideo,
} from './remotion/PortfolioVideo';

const mount = document.getElementById('portfolio-video-player');

if (mount) {
  createRoot(mount).render(
    <React.StrictMode>
      <Player
        component={PortfolioVideo}
        durationInFrames={PORTFOLIO_VIDEO_DURATION}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={PORTFOLIO_VIDEO_FPS}
        controls
        loop
        autoPlay={false}
        acknowledgeRemotionLicense
        style={{
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 20,
          overflow: 'hidden',
        }}
      />
    </React.StrictMode>,
  );
}
