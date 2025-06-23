import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Lightbulb, FileText, BookOpen, Download, Sparkles } from 'lucide-react-native';
import { Colors, Typography, Spacing, GlassEffects, BlurIntensity } from '@/constants/Colors';

const mockSummaries = [
  {
    id: '1',
    title: 'Chapter 3: Linear Algebra Key Concepts',
    type: 'Flashcards',
    date: 'May 10, 2024',
    content: 'Key definitions, theorems, and examples for linear algebra. Includes vector spaces, linear transformations, eigenvalues, and eigenvectors.',
    color: ['rgba(48, 209, 88, 0.8)', 'rgba(30, 212, 209, 0.8)'],
  },
  {
    id: '2',
    title: 'Lecture 5: Quantum Entanglement Summary',
    type: 'Text Summary',
    date: 'May 08, 2024',
    content: 'Concise summary of quantum entanglement principles, Bell\'s theorem, and its implications in quantum computing.',
    color: ['rgba(255, 45, 146, 0.8)', 'rgba(175, 82, 222, 0.8)'],
  },
  {
    id: '3',
    title: 'Midterm Review: Calculus I',
    type: 'Study Guide',
    date: 'May 01, 2024',
    content: 'Comprehensive study guide covering differentiation, integration, and applications. Includes practice problems and solutions.',
    color: ['rgba(0, 122, 255, 0.8)', 'rgba(90, 200, 250, 0.8)'],
  },
];

export default function ClassSummary() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Glass AI Generation Options */}
        <Animated.View 
          style={styles.aiOptionsContainer}
          entering={FadeInDown.duration(800).springify()}
        >
          <Text style={styles.sectionTitle}>AI Generation</Text>
          <View style={styles.aiOptionsGrid}>
            <GlassAIOptionCard
              icon={<Sparkles color={Colors.white} size={24} strokeWidth={1.5} />}
              title="Generate Flashcards"
              description="From feed posts or uploaded notes"
              gradient={Colors.gradientPrimary}
              delay={0}
            />
            <GlassAIOptionCard
              icon={<FileText color={Colors.white} size={24} strokeWidth={1.5} />}
              title="Summarize Content"
              description="Get key points from lectures or documents"
              gradient={Colors.gradientSecondary}
              delay={100}
            />
          </View>
        </Animated.View>

        {/* Glass Existing Summaries */}
        <Animated.View 
          style={styles.summariesContainer}
          entering={FadeInDown.duration(800).delay(200).springify()}
        >
          <Text style={styles.sectionTitle}>Class Summaries</Text>
          {mockSummaries.map((summary, index) => (
            <Animated.View
              key={summary.id}
              entering={FadeInDown.duration(600).delay(index * 100).springify()}
            >
              <GlassSummaryCard summary={summary} />
            </Animated.View>
          ))}
        </Animated.View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

function GlassAIOptionCard({ icon, title, description, gradient, delay }: {
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

function GlassSummaryCard({ summary }: { summary: typeof mockSummaries[0] }) {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Flashcards': return <BookOpen color={Colors.white} size={20} strokeWidth={1.5} />;
      case 'Text Summary': return <FileText color={Colors.white} size={20} strokeWidth={1.5} />;
      case 'Study Guide': return <Lightbulb color={Colors.white} size={20} strokeWidth={1.5} />;
      default: return <FileText color={Colors.white} size={20} strokeWidth={1.5} />;
    }
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity 
        style={styles.summaryCard}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <BlurView intensity={BlurIntensity.medium} style={styles.summaryCardBlur}>
          <LinearGradient
            colors={summary.color}
            style={styles.summaryCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.summaryIconContainer}>
              <BlurView intensity={BlurIntensity.light} style={styles.summaryIconBlur}>
                {getTypeIcon(summary.type)}
              </BlurView>
            </View>
            
            <View style={styles.summaryContent}>
              <Text style={styles.summaryTitle}>{summary.title}</Text>
              <Text style={styles.summaryDescription}>{summary.content}</Text>
              
              <View style={styles.summaryFooter}>
                <View style={styles.summaryMeta}>
                  <View style={styles.typeBadge}>
                    <BlurView intensity={BlurIntensity.light} style={styles.typeBadgeBlur}>
                      <Text style={styles.typeText}>{summary.type}</Text>
                    </BlurView>
                  </View>
                  <Text style={styles.summaryDate}>{summary.date}</Text>
                </View>
                
                <TouchableOpacity style={styles.downloadButton}>
                  <BlurView intensity={BlurIntensity.light} style={styles.downloadButtonBlur}>
                    <Download color={Colors.white} size={16} strokeWidth={1.5} />
                  </BlurView>
                </TouchableOpacity>
              </View>
            </View>
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
  aiOptionsContainer: {
    marginBottom: Spacing.xl,
    marginTop: Spacing.md,
  },
  aiOptionsGrid: {
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
  summariesContainer: {
    marginBottom: Spacing.lg,
  },
  summaryCard: {
    marginBottom: Spacing.lg,
  },
  summaryCardBlur: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.elevated,
  },
  summaryCardGradient: {
    flexDirection: 'row',
    padding: Spacing.lg,
  },
  summaryIconContainer: {
    marginRight: Spacing.md,
  },
  summaryIconBlur: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  summaryContent: {
    flex: 1,
  },
  summaryTitle: {
    ...Typography.title3,
    color: Colors.white,
    marginBottom: Spacing.xs,
    fontWeight: '700',
  },
  summaryDescription: {
    ...Typography.subheadline,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryMeta: {
    flex: 1,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.xs,
  },
  typeBadgeBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  typeText: {
    ...Typography.caption1,
    color: Colors.white,
    fontWeight: '600',
  },
  summaryDate: {
    ...Typography.caption1,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  downloadButton: {
    // Base styling handled by BlurView
  },
  downloadButtonBlur: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  bottomSpacing: {
    height: 120,
  },
});