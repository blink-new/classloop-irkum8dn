export const Colors = {
  // Liquid Glass Primary Colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#5AC8FA',
  secondary: '#FF2D92',
  accent: '#30D158',
  
  // Glass Background System
  background: '#F2F2F7',
  backgroundSecondary: '#FFFFFF',
  
  // Glass Surface System with Translucency
  glass: 'rgba(255, 255, 255, 0.8)',
  glassStrong: 'rgba(255, 255, 255, 0.9)',
  glassLight: 'rgba(255, 255, 255, 0.6)',
  glassDark: 'rgba(0, 0, 0, 0.04)',
  
  // Frosted Glass Effects
  frostedGlass: 'rgba(255, 255, 255, 0.75)',
  frostedGlassDark: 'rgba(0, 0, 0, 0.08)',
  
  // Dynamic Island / Translucent Surfaces
  surface: 'rgba(242, 242, 247, 0.8)',
  surfaceElevated: 'rgba(255, 255, 255, 0.85)',
  surfacePressed: 'rgba(255, 255, 255, 0.9)',
  
  // Text System
  text: '#1C1C1E',
  textSecondary: '#3C3C43',
  textTertiary: '#8E8E93',
  textMuted: '#C7C7CC',
  
  // Border System - Ultra Thin
  border: 'rgba(60, 60, 67, 0.12)',
  borderLight: 'rgba(60, 60, 67, 0.08)',
  borderStrong: 'rgba(60, 60, 67, 0.18)',
  
  // Status Colors
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF3B30',
  
  // Base Colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Liquid Glass Gradients
  gradientPrimary: ['rgba(0, 122, 255, 0.9)', 'rgba(90, 200, 250, 0.9)'],
  gradientSecondary: ['rgba(255, 45, 146, 0.9)', 'rgba(255, 159, 10, 0.9)'],
  gradientAccent: ['rgba(48, 209, 88, 0.9)', 'rgba(30, 212, 209, 0.9)'],
  
  // Glass Overlay System
  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayLight: 'rgba(0, 0, 0, 0.2)',
  overlayStrong: 'rgba(0, 0, 0, 0.6)',
  
  // iOS System Colors for Dynamic Island Effects
  systemBlue: '#007AFF',
  systemPurple: '#AF52DE',
  systemPink: '#FF2D92',
  systemGreen: '#30D158',
  systemOrange: '#FF9F0A',
  systemRed: '#FF3B30',
  systemYellow: '#FFCC00',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const Typography = {
  largeTitle: {
    fontSize: 34,
    fontWeight: '700' as const,
    lineHeight: 41,
  },
  title1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
  },
  title2: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 25,
  },
  headline: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  callout: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 21,
  },
  subheadline: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  footnote: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  caption1: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  caption2: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 13,
  },
};

// Liquid Glass Effects
export const GlassEffects = {
  // Standard Glass Card
  card: {
    backgroundColor: Colors.glass,
    borderWidth: 0.5,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  
  // Elevated Glass Surface
  elevated: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 0.5,
    borderColor: Colors.border,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  
  // Dynamic Island Style
  island: {
    backgroundColor: Colors.frostedGlass,
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // Pressed State
  pressed: {
    backgroundColor: Colors.surfacePressed,
    transform: [{ scale: 0.98 }],
  },
};

// Blur Intensities for different contexts
export const BlurIntensity = {
  light: 20,
  medium: 50,
  strong: 80,
  ultraStrong: 100,
};