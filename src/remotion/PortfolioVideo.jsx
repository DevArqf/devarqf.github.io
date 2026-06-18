import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import profileImage from '../../images/Malik Johnson Profile.png';
import soundtrack from '../../audio/portfolio-soundtrack.mp3';

export const PORTFOLIO_VIDEO_FPS = 30;
export const PORTFOLIO_VIDEO_DURATION = 1080;

const colors = {
  background: '#07101f',
  panel: 'rgba(13, 27, 49, 0.86)',
  blue: '#4da6ff',
  cyan: '#64d2ff',
  white: '#f7fbff',
  muted: '#a8bad0',
  line: 'rgba(100, 210, 255, 0.2)',
};

const fontFamily = 'Poppins, Arial, sans-serif';

const FadeScene = ({children, durationInFrames}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 15, durationInFrames - 18, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>
  );
};

const Background = ({accent = colors.blue, children}) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 300], [-80, 100], {
    extrapolateRight: 'extend',
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(circle at 18% 15%, #173b68 0%, transparent 34%), linear-gradient(135deg, #07101f 0%, #0b1830 52%, #07101f 100%)',
        color: colors.white,
        fontFamily,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 700,
          height: 700,
          right: -180 + drift,
          top: -250,
          borderRadius: '50%',
          background: accent,
          filter: 'blur(150px)',
          opacity: 0.14,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 48,
          border: `1px solid ${colors.line}`,
          borderRadius: 36,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

const Eyebrow = ({children}) => (
  <div
    style={{
      color: colors.cyan,
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: 8,
      textTransform: 'uppercase',
      marginBottom: 24,
    }}
  >
    {children}
  </div>
);

const AnimatedWords = ({items, start = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 18}}>
      {items.map((item, index) => {
        const entrance = spring({
          frame: frame - start - index * 4,
          fps,
          config: {damping: 16, stiffness: 120},
        });

        return (
          <div
            key={item}
            style={{
              padding: '17px 25px',
              borderRadius: 999,
              background: 'rgba(77, 166, 255, 0.1)',
              border: `1px solid ${colors.line}`,
              color: index % 3 === 0 ? colors.cyan : colors.white,
              fontSize: 28,
              fontWeight: 600,
              opacity: entrance,
              transform: `translateY(${(1 - entrance) * 28}px)`,
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

const IntroScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 14, stiffness: 90}});
  const lineWidth = interpolate(frame, [18, 70], [0, 760], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <Background>
      <AbsoluteFill
        style={{
          padding: '130px 160px',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 90,
            transform: `translateY(${(1 - enter) * 60}px)`,
            opacity: enter,
          }}
        >
          <div
            style={{
              width: 330,
              height: 330,
              padding: 12,
              borderRadius: 74,
              background: `linear-gradient(145deg, ${colors.blue}, ${colors.cyan})`,
              boxShadow: '0 35px 100px rgba(77, 166, 255, 0.28)',
              flexShrink: 0,
            }}
          >
            <Img
              src={profileImage}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: 63,
                background: 'rgba(7, 16, 31, 0.78)',
              }}
            />
          </div>
          <div>
            <Eyebrow>Portfolio showreel</Eyebrow>
            <div style={{fontSize: 108, lineHeight: 0.98, fontWeight: 800}}>
              Malik <span style={{color: colors.blue}}>Johnson</span>
            </div>
            <div
              style={{
                height: 4,
                width: lineWidth,
                background: `linear-gradient(90deg, ${colors.blue}, ${colors.cyan}, transparent)`,
                margin: '34px 0',
              }}
            />
            <div style={{fontSize: 40, color: colors.muted, fontWeight: 500}}>
              Discord Bot Developer · Automation Specialist
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Background>
  );
};

const ProfileScene = () => (
  <Background accent="#8a68ff">
    <AbsoluteFill style={{padding: '120px 150px', justifyContent: 'center'}}>
      <Eyebrow>Profile</Eyebrow>
      <div style={{display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 70}}>
        <div>
          <div style={{fontSize: 72, fontWeight: 800, lineHeight: 1.08}}>
            Building intelligent bots and{' '}
            <span style={{color: colors.cyan}}>automation systems.</span>
          </div>
          <p
            style={{
              fontSize: 31,
              lineHeight: 1.55,
              color: colors.muted,
              marginTop: 35,
              maxWidth: 980,
            }}
          >
            Computer Science student combining machine learning, analytical
            thinking, APIs, and practical software engineering.
          </p>
        </div>
        <div style={{display: 'grid', gap: 20}}>
          {[
            ['Based in', 'Willemstad, Curaçao'],
            ['Languages', 'English · Dutch'],
            ['Focus', 'Bots · AI/ML · Automation'],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                padding: '28px 32px',
                borderRadius: 24,
                background: colors.panel,
                border: `1px solid ${colors.line}`,
              }}
            >
              <div
                style={{
                  color: colors.cyan,
                  fontSize: 19,
                  textTransform: 'uppercase',
                  letterSpacing: 4,
                  fontWeight: 700,
                }}
              >
                {label}
              </div>
              <div style={{fontSize: 29, fontWeight: 650, marginTop: 8}}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  </Background>
);

const SkillsScene = () => (
  <Background accent="#00d6a3">
    <AbsoluteFill style={{padding: '110px 145px', justifyContent: 'center'}}>
      <Eyebrow>Technical toolkit</Eyebrow>
      <div style={{fontSize: 76, fontWeight: 800, marginBottom: 50}}>
        From idea to <span style={{color: colors.cyan}}>working product.</span>
      </div>
      <AnimatedWords
        items={[
          'Python',
          'JavaScript',
          'TypeScript',
          'Lua',
          'React',
          'Node.js',
          'Discord.js',
          'Express',
          'NumPy',
          'MongoDB',
          'MySQL',
          'Redis',
          'SQLite',
          'Git',
          'Linux',
          'Bash',
          'Figma',
        ]}
        start={8}
      />
    </AbsoluteFill>
  </Background>
);

const projects = [
  {
    name: 'Cadia',
    tag: 'Discord · RPG',
    description: 'A multipurpose Discord bot with an RPG-style system at its core.',
    mark: 'CA',
  },
  {
    name: 'DeBugBuddy',
    tag: 'Python · Developer Tool',
    description: 'Instant terminal error explanations without leaving the workflow.',
    mark: 'DB',
  },
  {
    name: 'VoiceGuard',
    tag: 'AI · Security',
    description: 'Voice authentication using OpenAI APIs and secure biometric analysis.',
    mark: 'VG',
  },
];

const ProjectCard = ({project, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({
    frame: frame - 8 - index * 7,
    fps,
    config: {damping: 15},
  });

  return (
    <div
      style={{
        minHeight: 420,
        padding: 34,
        borderRadius: 30,
        background: colors.panel,
        border: `1px solid ${colors.line}`,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 70}px)`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: 24,
          background: 'rgba(77, 166, 255, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 34,
          overflow: 'hidden',
        }}
      >
        <span style={{fontSize: 30, fontWeight: 850, color: colors.cyan}}>
          {project.mark}
        </span>
      </div>
      <div style={{color: colors.cyan, fontSize: 19, fontWeight: 700}}>
        {project.tag}
      </div>
      <div style={{fontSize: 43, fontWeight: 800, margin: '8px 0 18px'}}>
        {project.name}
      </div>
      <div style={{fontSize: 25, lineHeight: 1.5, color: colors.muted}}>
        {project.description}
      </div>
    </div>
  );
};

const ProjectsScene = () => (
  <Background accent="#ff6eb4">
    <AbsoluteFill style={{padding: '105px 135px', justifyContent: 'center'}}>
      <Eyebrow>Selected work</Eyebrow>
      <div style={{fontSize: 72, fontWeight: 800, marginBottom: 45}}>
        Projects built to <span style={{color: colors.cyan}}>solve real problems.</span>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26}}>
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </AbsoluteFill>
  </Background>
);

const ClosingScene = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame % 60, [0, 30, 60], [1, 1.035, 1], {
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <Background>
      <AbsoluteFill
        style={{
          padding: '130px 150px',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Eyebrow>Let&apos;s build something useful</Eyebrow>
        <div style={{fontSize: 98, lineHeight: 1.05, fontWeight: 850}}>
          Bots. Automation. <span style={{color: colors.cyan}}>Intelligent systems.</span>
        </div>
        <div
          style={{
            marginTop: 48,
            padding: '26px 46px',
            borderRadius: 999,
            background: `linear-gradient(135deg, ${colors.blue}, #2f78df)`,
            fontSize: 31,
            fontWeight: 750,
            transform: `scale(${pulse})`,
            boxShadow: '0 25px 70px rgba(77, 166, 255, 0.3)',
          }}
        >
          devarqf@gmail.com
        </div>
        <div style={{display: 'flex', gap: 42, marginTop: 38, color: colors.muted, fontSize: 25}}>
          <span>github.com/DevArqf</span>
          <span>•</span>
          <span>LinkedIn / Malik Johnson</span>
          <span>•</span>
          <span>Available on Upwork</span>
        </div>
      </AbsoluteFill>
    </Background>
  );
};

export const PortfolioVideo = ({soundtrackEnabled = true}) => {
  const frame = useCurrentFrame();
  const cameraScale = interpolate(
    frame,
    [0, PORTFOLIO_VIDEO_DURATION - 1],
    [1.025, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    },
  );

  return (
    <AbsoluteFill style={{backgroundColor: colors.background}}>
      {soundtrackEnabled ? (
        <Audio
          src={soundtrack}
          volume={(audioFrame) =>
            interpolate(
              audioFrame,
              [0, 45, PORTFOLIO_VIDEO_DURATION - 90, PORTFOLIO_VIDEO_DURATION],
              [0, 0.9, 0.9, 0],
              {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
            )
          }
        />
      ) : null}
      <AbsoluteFill
        style={{
          transform: `translate3d(0, 0, 0) scale(${cameraScale})`,
          transformOrigin: '50% 50%',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      >
        <Sequence durationInFrames={180}>
          <FadeScene durationInFrames={180}>
            <IntroScene />
          </FadeScene>
        </Sequence>
        <Sequence from={180} durationInFrames={210}>
          <FadeScene durationInFrames={210}>
            <ProfileScene />
          </FadeScene>
        </Sequence>
        <Sequence from={390} durationInFrames={240}>
          <FadeScene durationInFrames={240}>
            <SkillsScene />
          </FadeScene>
        </Sequence>
        <Sequence from={630} durationInFrames={270}>
          <FadeScene durationInFrames={270}>
            <ProjectsScene />
          </FadeScene>
        </Sequence>
        <Sequence from={900} durationInFrames={180}>
          <FadeScene durationInFrames={180}>
            <ClosingScene />
          </FadeScene>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
