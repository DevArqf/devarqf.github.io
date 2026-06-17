import React from 'react';
import {Composition} from 'remotion';
import {
  PORTFOLIO_VIDEO_DURATION,
  PORTFOLIO_VIDEO_FPS,
  PortfolioVideo,
} from './PortfolioVideo';

export const RemotionRoot = () => (
  <Composition
    id="PortfolioShowreel"
    component={PortfolioVideo}
    durationInFrames={PORTFOLIO_VIDEO_DURATION}
    fps={PORTFOLIO_VIDEO_FPS}
    width={1920}
    height={1080}
  />
);
