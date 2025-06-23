import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  useSharedValue, 
  useAnimatedStyle,
  interpolate,
  withSpring,
  withRepeat,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { BookOpen, Users, Award, Sparkles, ArrowRight } from 'lucide-react-native';
import { Colors, Typography, Spacing, GlassEffects, BlurIntensity } from '@/constants/Colors';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('window');

export default function Welcome() {
  const floatAnimation = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);

  useEffect(() => {
    // Floating animation for glass elements
    floatAnimation.value = withRepeat(
      withSequence(
        withSpring(1, { duration: 3000 }),
        withSpring(0, { duration: 3000 })
      ),
      -1,
      true
    );

    // Pulse animation for dynamic elements
    pulseAnimation.value = withRepeat(
      withSequence(
        withSpring(1.05, { duration: 2000 }),
        withSpring(1, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatAnimation.value, [0, 1], [0, -8]) },
    ],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnimation.value }],
  }));

  const handleGetStarted = () => {
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      {/* Dynamic Background */}
      <LinearGradient
        colors={['#F0F9FF', '#E0F2FE', '#BAE6FD']}
        style={styles.backgroundGradient}
      />
      
      {/* Floating Glass Orbs */}
      <Animated.View style={[styles.floatingOrb1, floatingStyle]}>
        <BlurView intensity={BlurIntensity.light} style={styles.orbBlur} />
      </Animated.View>
      <Animated.View style={[styles.floatingOrb2, floatingStyle]}>
        <BlurView intensity={BlurIntensity.light} style={styles.orbBlur} />
      </Animated.View>

      <Animated.View 
        style={styles.content}
        entering={FadeInUp.duration(1000).springify()}
      >
        {/* Logo Section with Glass Effect */}
        <View style={styles.header}>
          <Animated.View style={[styles.logoContainer, pulseStyle]}>
            <BlurView intensity={BlurIntensity.medium} style={styles.logoBlur}>
              <BookOpen color={Colors.primary} size={48} strokeWidth={1.5} />
            </BlurView>
          </Animated.View>
          
          <Text style={styles.title}>Classloop</Text>
          <Text style={styles.subtitle}>
            Learn together, achieve more
          </Text>
        </View>

        {/* Glass Features Cards */}
        <Animated.View 
          style={styles.featuresContainer}
          entering={FadeInDown.duration(1000).delay(200).springify()}
        >
          <GlassFeatureCard 
            icon={<Users color={Colors.systemBlue} size={24} strokeWidth={1.5} />}
            title="Join Classes"
            description="Connect with classmates and share knowledge"
            delay={0}
          />
          <GlassFeatureCard 
            icon={<Sparkles color={Colors.systemPurple} size={24} strokeWidth={1.5} />}
            title="AI-Powered Learning"
            description="Generate flashcards and quizzes automatically"
            delay={100}
          />
          <GlassFeatureCard 
            icon={<Award color={Colors.systemGreen} size={24} strokeWidth={1.5} />}
            title="Gamified Progress"
            description="Compete with friends and track achievements"
            delay={200}
          />
        </Animated.View>
      </Animated.View>

      {/* Glass Bottom Section */}
      <Animated.View 
        style={styles.bottomSection}
        entering={FadeInDown.duration(1000).delay(400).springify()}
      >
        <BlurView intensity={BlurIntensity.strong} style={styles.bottomBlur}>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <BlurView intensity={BlurIntensity.ultraStrong} style={styles.buttonBlur}>
              <Text style={styles.getStartedText}>Get Started</Text>
              <ArrowRight color={Colors.primary} size={20} strokeWidth={2} />
            </BlurView>
          </TouchableOpacity>
          
          <Text style={styles.footerText}>
            Join thousands of students already learning with Classloop
          </Text>
        </BlurView>
      </Animated.View>
    </View>
  );
}

function GlassFeatureCard({ icon, title, description, delay }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <Animated.View
      entering={FadeInDown.duration(800).delay(delay).springify()}
    >
      <BlurView intensity={BlurIntensity.medium} style={styles.featureCard}>
        <View style={styles.featureIcon}>
          <BlurView intensity={BlurIntensity.light} style={styles.featureIconBlur}>
            {icon}
          </BlurView>
        </View>
        <View style={styles.featureContent}>
          <Text style={styles.featureTitle}>{title}</Text>
          <Text style={styles.featureDescription}>{description}</Text>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingOrb1: {
    position: 'absolute',
    top: height * 0.15,
    right: width * 0.1,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.systemBlue + '20',
  },
  floatingOrb2: {
    position: 'absolute',
    top: height * 0.65,
    left: width * 0.1,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.systemPurple + '20',
  },
  orbBlur: {
    flex: 1,
    borderRadius: 40,
  },
  content: {
    flex: 1,
    paddingTop: height * 0.12,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
  },
  logoContainer: {
    marginBottom: Spacing.xl,
  },
  logoBlur: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.glass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  title: {
    ...Typography.largeTitle,
    fontSize: 42,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
    fontWeight: '800',
  },
  subtitle: {
    ...Typography.title3,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  featuresContainer: {
    gap: Spacing.lg,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glass,
    borderRadius: 20,
    padding: Spacing.lg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.card,
  },
  featureIcon: {
    marginRight: Spacing.lg,
  },
  featureIconBlur: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.frostedGlass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    ...Typography.headline,
    color: Colors.text,
    marginBottom: Spacing.xs,
    fontWeight: '600',
  },
  featureDescription: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  bottomSection: {
    paddingBottom: Spacing.xxxl,
  },
  bottomBlur: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.frostedGlass,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
  },
  getStartedButton: {
    marginBottom: Spacing.lg,
  },
  buttonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.glass,
    borderRadius: 16,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderWidth: 0.5,
    borderColor: Colors.border,
    gap: Spacing.sm,
    ...GlassEffects.elevated,
  },
  getStartedText: {
    ...Typography.headline,
    color: Colors.primary,
    fontWeight: '600',
  },
  footerText: {
    ...Typography.footnote,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
});