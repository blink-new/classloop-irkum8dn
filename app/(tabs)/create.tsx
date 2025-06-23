import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  FadeInDown, 
  FadeInUp,
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Plus, Users, BookOpen, Camera, Mic, FileText, Sparkles } from 'lucide-react-native';
import { Colors, Typography, Spacing, GlassEffects, BlurIntensity } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function Create() {
  const floatAnimation = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);

  useEffect(() => {
    // Floating animation for glass elements
    floatAnimation.value = withRepeat(
      withSequence(
        withSpring(1, { duration: 2900 }),
        withSpring(0, { duration: 2900 })
      ),
      -1,
      true
    );

    // Pulse animation for create elements
    pulseAnimation.value = withRepeat(
      withSequence(
        withSpring(1.02, { duration: 2400 }),
        withSpring(1, { duration: 2400 })
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

      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Liquid Glass Header */}
          <Animated.View 
            style={styles.header}
            entering={FadeInUp.duration(1000).springify()}
          >
            <BlurView intensity={BlurIntensity.medium} style={styles.headerBlur}>
              <View style={styles.headerContent}>
                <Animated.View style={pulseStyle}>
                  <View style={styles.logoContainer}>
                    <BlurView intensity={BlurIntensity.light} style={styles.logoBlur}>
                      <Plus color={Colors.primary} size={32} strokeWidth={1.5} />
                    </BlurView>
                  </View>
                </Animated.View>
                <Text style={styles.headerTitle}>Create & Share</Text>
                <Text style={styles.headerSubtitle}>
                  Share knowledge with your classmates
                </Text>
              </View>
            </BlurView>
          </Animated.View>

          {/* Liquid Glass Quick Post */}
          <Animated.View 
            style={styles.quickPostContainer}
            entering={FadeInDown.duration(800).delay(200).springify()}
          >
            <Text style={styles.sectionTitle}>Quick Post</Text>
            <BlurView intensity={BlurIntensity.medium} style={styles.quickPostCardBlur}>
              <TextInput
                style={styles.quickPostInput}
                placeholder="Share something with your class..."
                placeholderTextColor={Colors.textTertiary}
                multiline
                numberOfLines={3}
              />
              <View style={styles.quickPostActions}>
                <View style={styles.mediaButtons}>
                  <GlassMediaButton 
                    icon={<Camera color={Colors.systemBlue} size={20} strokeWidth={1.5} />}
                    onPress={() => console.log('Camera pressed')}
                  />
                  <GlassMediaButton 
                    icon={<Mic color={Colors.systemRed} size={20} strokeWidth={1.5} />}
                    onPress={() => console.log('Mic pressed')}
                  />
                  <GlassMediaButton 
                    icon={<FileText color={Colors.systemGreen} size={20} strokeWidth={1.5} />}
                    onPress={() => console.log('File pressed')}
                  />
                </View>
                <TouchableOpacity style={styles.postButton}>
                  <BlurView intensity={BlurIntensity.medium} style={styles.postButtonBlur}>
                    <LinearGradient
                      colors={Colors.gradientPrimary}
                      style={styles.postButtonGradient}
                    >
                      <Text style={styles.postButtonText}>Post</Text>
                    </LinearGradient>
                  </BlurView>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>

          {/* Liquid Glass Create Options */}
          <Animated.View 
            style={styles.createOptionsContainer}
            entering={FadeInDown.duration(800).delay(300).springify()}
          >
            <Text style={styles.sectionTitle}>Create New</Text>
            
            <View style={styles.optionsGrid}>
              <GlassCreateOptionCard
                icon={<Users color={Colors.white} size={24} strokeWidth={1.5} />}
                title="New Class"
                description="Start a new study group"
                gradient={Colors.gradientPrimary}
                delay={0}
              />
              <GlassCreateOptionCard
                icon={<BookOpen color={Colors.white} size={24} strokeWidth={1.5} />}
                title="Study Guide"
                description="Create learning materials"
                gradient={Colors.gradientSecondary}
                delay={100}
              />
              <GlassCreateOptionCard
                icon={<Sparkles color={Colors.white} size={24} strokeWidth={1.5} />}
                title="AI Quiz"
                description="Generate smart quizzes"
                gradient={Colors.gradientAccent}
                delay={200}
              />
              <GlassCreateOptionCard
                icon={<FileText color={Colors.white} size={24} strokeWidth={1.5} />}
                title="Flashcards"
                description="Review key concepts"
                gradient={['rgba(139, 92, 246, 0.8)', 'rgba(168, 85, 247, 0.8)']}
                delay={300}
              />
            </View>
          </Animated.View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function GlassMediaButton({ icon, onPress }: {
  icon: React.ReactNode;
  onPress: () => void;
}) {
  const pressAnimation = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressAnimation.value }],
  }));

  const handlePressIn = () => {
    pressAnimation.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    pressAnimation.value = withSpring(1);
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity 
        style={styles.mediaButton}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <BlurView intensity={BlurIntensity.light} style={styles.mediaButtonBlur}>
          {icon}
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
}

function GlassCreateOptionCard({ 
  icon, 
  title, 
  description, 
  gradient,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string[];
  delay: number;
}) {
  const pressAnimation = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressAnimation.value }],
  }));

  const handlePressIn = () => {
    pressAnimation.value = withSpring(0.98);
  };

  const handlePressOut = () => {
    pressAnimation.value = withSpring(1);
  };

  return (
    <Animated.View 
      style={[styles.optionCard, animatedStyle]}
      entering={FadeInDown.duration(600).delay(400 + delay).springify()}
    >
      <TouchableOpacity 
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <BlurView intensity={BlurIntensity.medium} style={styles.optionCardBlur}>
          <LinearGradient
            colors={gradient}
            style={styles.optionCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.optionIconContainer}>
              <BlurView intensity={BlurIntensity.light} style={styles.optionIconBlur}>
                {icon}
              </BlurView>
            </View>
            <Text style={styles.optionTitle}>{title}</Text>
            <Text style={styles.optionDescription}>{description}</Text>
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
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
    top: height * 0.16,
    right: width * 0.1,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: Colors.systemPink + '20',
  },
  floatingOrb2: {
    position: 'absolute',
    top: height * 0.68,
    left: width * 0.14,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.systemGreen + '20',
  },
  orbBlur: {
    flex: 1,
    borderRadius: 27.5,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  headerBlur: {
    backgroundColor: Colors.glass,
    borderRadius: 24,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.elevated,
  },
  headerContent: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: Spacing.md,
  },
  logoBlur: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.frostedGlass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  headerTitle: {
    ...Typography.title1,
    fontSize: 32,
    color: Colors.text,
    marginBottom: Spacing.xs,
    fontWeight: '800',
  },
  headerSubtitle: {
    ...Typography.subheadline,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  quickPostContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.title2,
    color: Colors.text,
    marginBottom: Spacing.lg,
    fontWeight: '700',
  },
  quickPostCardBlur: {
    backgroundColor: Colors.glass,
    borderRadius: 24,
    padding: Spacing.lg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.card,
  },
  quickPostInput: {
    ...Typography.body,
    color: Colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: Spacing.md,
  },
  quickPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  mediaButton: {
    // Base styling handled by BlurView
  },
  mediaButtonBlur: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.frostedGlass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  postButton: {
    // Base styling handled by BlurView
  },
  postButtonBlur: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  postButtonGradient: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  postButtonText: {
    ...Typography.footnote,
    color: Colors.white,
    fontWeight: '600',
  },
  createOptionsContainer: {
    paddingHorizontal: Spacing.lg,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  optionCard: {
    width: '48%',
  },
  optionCardBlur: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.elevated,
  },
  optionCardGradient: {
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
  },
  optionIconContainer: {
    marginBottom: Spacing.md,
  },
  optionIconBlur: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  optionTitle: {
    ...Typography.title3,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.xs,
    fontWeight: '700',
  },
  optionDescription: {
    ...Typography.caption1,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 120,
  },
});