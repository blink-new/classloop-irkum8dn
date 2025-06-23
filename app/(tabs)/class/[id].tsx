import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack, Tabs, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ChevronLeft, Users, BookOpen, Lightbulb, Award } from 'lucide-react-native';
import { Colors, Typography, Spacing, GlassEffects, BlurIntensity } from '@/constants/Colors';

// Mock data for a single class
const mockClassDetail = {
  id: '1',
  name: 'Advanced Mathematics',
  description: 'Calculus and Linear Algebra for advanced students. Focus on problem-solving and theoretical understanding.',
  instructor: 'Dr. Evelyn Reed',
  memberCount: 24,
  totalPosts: 120,
  totalQuizzes: 15,
  color: Colors.gradientPrimary,
};

export default function ClassDetailLayout() {
  const { id } = useLocalSearchParams();

  // In a real app, you'd fetch class details based on `id`
  const classData = mockClassDetail; 

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Glass Header */}
      <Animated.View 
        style={styles.header}
        entering={FadeInDown.duration(800).springify()}
      >
        <LinearGradient
          colors={classData.color}
          style={styles.headerGradient}
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <BlurView intensity={BlurIntensity.light} style={styles.backButtonBlur}>
              <ChevronLeft color={Colors.white} size={24} strokeWidth={1.5} />
            </BlurView>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{classData.name}</Text>
          <View style={styles.headerRight} />
        </LinearGradient>
      </Animated.View>

      {/* Glass Class Info Card */}
      <Animated.View 
        style={styles.infoCardContainer}
        entering={FadeInDown.duration(800).delay(100).springify()}
      >
        <BlurView intensity={BlurIntensity.medium} style={styles.infoCardBlur}>
          <LinearGradient
            colors={classData.color}
            style={styles.infoCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.infoCardTitle}>{classData.name}</Text>
            <Text style={styles.infoCardDescription}>{classData.description}</Text>
            <Text style={styles.infoCardInstructor}>by {classData.instructor}</Text>
            
            <View style={styles.infoCardStats}>
              <View style={styles.statItem}>
                <BlurView intensity={BlurIntensity.light} style={styles.statBlur}>
                  <Users color={Colors.white} size={16} strokeWidth={1.5} />
                  <Text style={styles.statText}>{classData.memberCount}</Text>
                </BlurView>
                <Text style={styles.statLabel}>Members</Text>
              </View>
              <View style={styles.statItem}>
                <BlurView intensity={BlurIntensity.light} style={styles.statBlur}>
                  <BookOpen color={Colors.white} size={16} strokeWidth={1.5} />
                  <Text style={styles.statText}>{classData.totalPosts}</Text>
                </BlurView>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.statItem}>
                <BlurView intensity={BlurIntensity.light} style={styles.statBlur}>
                  <Award color={Colors.white} size={16} strokeWidth={1.5} />
                  <Text style={styles.statText}>{classData.totalQuizzes}</Text>
                </BlurView>
                <Text style={styles.statLabel}>Quizzes</Text>
              </View>
            </View>
          </LinearGradient>
        </BlurView>
      </Animated.View>

      {/* Nested Tabs with Glass Effect */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textTertiary,
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
          tabBarBackground: () => (
            <BlurView intensity={BlurIntensity.strong} style={styles.tabBarBlur} />
          ),
          tabBarLabelStyle: {
            ...Typography.footnote,
            fontWeight: '600',
          },
          tabBarItemStyle: {
            paddingVertical: Spacing.sm,
          },
        }}
      >
        <Tabs.Screen
          name="feed"
          options={{
            title: 'Feed',
            tabBarIcon: ({ color, size }) => (
              <BookOpen color={color} size={size} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="summary"
          options={{
            title: 'Summary',
            tabBarIcon: ({ color, size }) => (
              <Lightbulb color={color} size={size} strokeWidth={2} />
            ),
          }}
        />
        <Tabs.Screen
          name="quiz"
          options={{
            title: 'Quiz',
            tabBarIcon: ({ color, size }) => (
              <Award color={color} size={size} strokeWidth={2} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingBottom: Spacing.md,
  },
  headerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    // Base styling handled by BlurView
  },
  backButtonBlur: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    ...Typography.title2,
    color: Colors.white,
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
  },
  headerRight: {
    width: 40, // To balance the back button
  },
  infoCardContainer: {
    paddingHorizontal: Spacing.lg,
    marginTop: -Spacing.md, // Overlap with header slightly
    marginBottom: Spacing.lg,
  },
  infoCardBlur: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.elevated,
  },
  infoCardGradient: {
    padding: Spacing.lg,
  },
  infoCardTitle: {
    ...Typography.title2,
    color: Colors.white,
    marginBottom: Spacing.xs,
    fontWeight: '700',
  },
  infoCardDescription: {
    ...Typography.subheadline,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: Spacing.xs,
    lineHeight: 20,
  },
  infoCardInstructor: {
    ...Typography.footnote,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: Spacing.lg,
  },
  infoCardStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    gap: 4,
    marginBottom: Spacing.xs,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statText: {
    ...Typography.footnote,
    color: Colors.white,
    fontWeight: '700',
  },
  statLabel: {
    ...Typography.caption2,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tabBarBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.glass,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
  },
});