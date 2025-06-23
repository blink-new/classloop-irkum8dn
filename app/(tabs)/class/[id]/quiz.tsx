import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Award, Play, Sparkles, FileText, Upload } from 'lucide-react-native';
import { Colors, Typography, Spacing, GlassEffects, BlurIntensity } from '@/constants/Colors';

const mockQuizzes = [
  {
    id: '1',
    title: 'Linear Algebra Fundamentals',
    questions: 10,
    difficulty: 'Easy',
    lastAttempt: '85%',
    color: ['rgba(48, 209, 88, 0.8)', 'rgba(30, 212, 209, 0.8)'],
  },
  {
    id: '2',
    title: 'Quantum Entanglement Deep Dive',
    questions: 15,
    difficulty: 'Medium',
    lastAttempt: '72%',
    color: ['rgba(255, 45, 146, 0.8)', 'rgba(175, 82, 222, 0.8)'],
  },
  {
    id: '3',
    title: 'Calculus Midterm Prep',
    questions: 20,
    difficulty: 'Hard',
    lastAttempt: '-',
    color: ['rgba(255, 159, 10, 0.8)', 'rgba(255, 204, 0, 0.8)'],
  },
];

export default function ClassQuiz() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Glass AI Quiz Generation */}
        <Animated.View 
          style={styles.aiQuizContainer}
          entering={FadeInDown.duration(800).springify()}
        >
          <Text style={styles.sectionTitle}>AI Quiz Generation</Text>
          <View style={styles.aiQuizGrid}>
            <GlassAIQuizOptionCard
              icon={<Sparkles color={Colors.white} size={24} strokeWidth={1.5} />}
              title="Generate Quiz"
              description="From feed posts or uploaded documents"
              gradient={Colors.gradientPrimary}
              delay={0}
            />
            <GlassAIQuizOptionCard
              icon={<Upload color={Colors.white} size={24} strokeWidth={1.5} />}
              title="Upload Document"
              description="Create quiz from PDF, Word, etc."
              gradient={Colors.gradientSecondary}
              delay={100}
            />
          </View>
        </Animated.View>

        {/* Glass Available Quizzes */}
        <Animated.View 
          style={styles.quizzesContainer}
          entering={FadeInDown.duration(800).delay(200).springify()}
        >
          <Text style={styles.sectionTitle}>Available Quizzes</Text>
          {mockQuizzes.map((quiz, index) => (
            <Animated.View
              key={quiz.id}
              entering={FadeInDown.duration(600).delay(index * 100).springify()}
            >
              <GlassQuizCard quiz={quiz} />
            </Animated.View>
          ))}
        </Animated.View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

function GlassAIQuizOptionCard({ icon, title, description, gradient, delay }: {
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
      style={[styles.aiOptionCard, animatedStyle]}
      entering={FadeInDown.duration(600).delay(delay).springify()}
    >
      <TouchableOpacity 
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <BlurView intensity={BlurIntensity.medium} style={styles.aiOptionCardBlur}>
          <LinearGradient
            colors={gradient}
            style={styles.aiOptionCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.aiOptionIcon}>
              {icon}
            </View>
            <Text style={styles.aiOptionTitle}>{title}</Text>
            <Text style={styles.aiOptionDescription}>{description}</Text>
          </LinearGradient>
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
}

function GlassQuizCard({ quiz }: { quiz: typeof mockQuizzes[0] }) {
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return Colors.systemGreen;
      case 'Medium': return Colors.systemOrange;
      case 'Hard': return Colors.systemRed;
      default: return Colors.textTertiary;
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity 
        style={styles.quizCard}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <BlurView intensity={BlurIntensity.medium} style={styles.quizCardBlur}>
          <LinearGradient
            colors={quiz.color}
            style={styles.quizCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.quizInfo}>
              <Text style={styles.quizTitle}>{quiz.title}</Text>
              <Text style={styles.quizDetails}>
                {quiz.questions} Questions
              </Text>
              
              <View style={styles.quizMeta}>
                <View style={styles.difficultyBadge}>
                  <BlurView intensity={BlurIntensity.light} style={styles.difficultyBadgeBlur}>
                    <Text style={styles.difficultyText}>{quiz.difficulty}</Text>
                  </BlurView>
                </View>
                <Text style={styles.quizLastAttempt}>
                  {quiz.lastAttempt !== '-' ? `Best: ${quiz.lastAttempt}` : 'Not attempted'}
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.startButton}>
              <BlurView intensity={BlurIntensity.light} style={styles.startButtonBlur}>
                <Play color={Colors.white} size={20} strokeWidth={1.5} />
                <Text style={styles.startButtonText}>Start</Text>
              </BlurView>
            </TouchableOpacity>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.title2,
    color: Colors.text,
    marginBottom: Spacing.lg,
    fontWeight: '700',
  },
  aiQuizContainer: {
    marginBottom: Spacing.xl,
    marginTop: Spacing.md,
  },
  aiQuizGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  aiOptionCard: {
    width: '48%',
  },
  aiOptionCardBlur: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.elevated,
  },
  aiOptionCardGradient: {
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  aiOptionIcon: {
    marginBottom: Spacing.sm,
  },
  aiOptionTitle: {
    ...Typography.title3,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.xs,
    fontWeight: '700',
  },
  aiOptionDescription: {
    ...Typography.caption1,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  quizzesContainer: {
    marginBottom: Spacing.lg,
  },
  quizCard: {
    marginBottom: Spacing.lg,
  },
  quizCardBlur: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.elevated,
  },
  quizCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  quizInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  quizTitle: {
    ...Typography.title3,
    color: Colors.white,
    marginBottom: Spacing.xs,
    fontWeight: '700',
  },
  quizDetails: {
    ...Typography.subheadline,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: Spacing.sm,
  },
  quizMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  difficultyBadge: {
    // Base styling handled by BlurView
  },
  difficultyBadgeBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  difficultyText: {
    ...Typography.caption1,
    color: Colors.white,
    fontWeight: '600',
  },
  quizLastAttempt: {
    ...Typography.caption1,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  startButton: {
    // Base styling handled by BlurView
  },
  startButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xs,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  startButtonText: {
    ...Typography.footnote,
    color: Colors.white,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 120,
  },
});