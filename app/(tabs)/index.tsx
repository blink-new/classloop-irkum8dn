import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
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
import { Plus, Users, BookOpen, Calendar, TrendingUp, ChevronRight, Sparkles } from 'lucide-react-native';
import { Colors, Typography, Spacing, GlassEffects, BlurIntensity } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

// Mock data for classes
const mockClasses = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    description: 'Calculus and Linear Algebra',
    memberCount: 24,
    recentActivity: '2 hours ago',
    color: ['rgba(0, 122, 255, 0.8)', 'rgba(90, 200, 250, 0.8)'],
    unreadCount: 3,
    progress: 0.75,
  },
  {
    id: '2',
    name: 'Computer Science',
    description: 'Data Structures & Algorithms',
    memberCount: 31,
    recentActivity: '5 minutes ago',
    color: ['rgba(175, 82, 222, 0.8)', 'rgba(255, 45, 146, 0.8)'],
    unreadCount: 7,
    progress: 0.60,
  },
  {
    id: '3',
    name: 'Physics Laboratory',
    description: 'Quantum Mechanics Experiments',
    memberCount: 18,
    recentActivity: '1 day ago',
    color: ['rgba(48, 209, 88, 0.8)', 'rgba(30, 212, 209, 0.8)'],
    unreadCount: 0,
    progress: 0.90,
  },
];

export default function Classes() {
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useSharedValue(0);
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
        withSpring(1.02, { duration: 2000 }),
        withSpring(1, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatAnimation.value, [0, 1], [0, -6]) },
    ],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnimation.value }],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, 100],
          [0, -20],
          'clamp'
        ),
      },
    ],
    opacity: interpolate(
      scrollY.value,
      [0, 100],
      [1, 0.9],
      'clamp'
    ),
  }));

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleCreateClass = () => {
    console.log('Create class pressed');
  };

  const handleJoinClass = () => {
    console.log('Join class pressed');
  };

  const handleClassPress = (classId: string) => {
    console.log('Class pressed:', classId);
    router.push(`/class/${classId}/feed`);
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

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={(event) => {
            scrollY.value = event.nativeEvent.contentOffset.y;
          }}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
        >
          {/* Liquid Glass Header */}
          <Animated.View 
            style={[styles.header, headerAnimatedStyle]}
            entering={FadeInUp.duration(1000).springify()}
          >
            <BlurView intensity={BlurIntensity.medium} style={styles.headerBlur}>
              <View style={styles.headerContent}>
                <Animated.View style={pulseStyle}>
                  <View style={styles.logoContainer}>
                    <BlurView intensity={BlurIntensity.light} style={styles.logoBlur}>
                      <BookOpen color={Colors.primary} size={32} strokeWidth={1.5} />
                    </BlurView>
                  </View>
                </Animated.View>
                <Text style={styles.headerTitle}>My Classes</Text>
                <Text style={styles.headerSubtitle}>
                  {mockClasses.length} active classes
                </Text>
              </View>
            </BlurView>
          </Animated.View>

          {/* Liquid Glass Stats Cards */}
          <Animated.View 
            style={styles.statsContainer}
            entering={FadeInDown.duration(800).delay(200).springify()}
          >
            <GlassStatCard 
              icon={<Users color={Colors.systemBlue} size={20} strokeWidth={1.5} />}
              value="73"
              label="Classmates"
              delay={0}
            />
            <GlassStatCard 
              icon={<TrendingUp color={Colors.systemGreen} size={20} strokeWidth={1.5} />}
              value="85%"
              label="Avg Score"
              delay={100}
            />
            <GlassStatCard 
              icon={<Calendar color={Colors.systemPurple} size={20} strokeWidth={1.5} />}
              value="12"
              label="This Week"
              delay={200}
            />
          </Animated.View>

          {/* Liquid Glass Action Buttons */}
          <Animated.View 
            style={styles.actionsContainer}
            entering={FadeInDown.duration(800).delay(300).springify()}
          >
            <TouchableOpacity 
              style={styles.createButton}
              onPress={handleCreateClass}
              activeOpacity={0.8}
            >
              <BlurView intensity={BlurIntensity.strong} style={styles.createButtonBlur}>
                <LinearGradient
                  colors={Colors.gradientPrimary}
                  style={styles.createButtonGradient}
                >
                  <Plus color={Colors.white} size={20} strokeWidth={2} />
                  <Text style={styles.createButtonText}>Create Class</Text>
                </LinearGradient>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.joinButton}
              onPress={handleJoinClass}
              activeOpacity={0.8}
            >
              <BlurView intensity={BlurIntensity.medium} style={styles.joinButtonBlur}>
                <Sparkles color={Colors.primary} size={20} strokeWidth={1.5} />
                <Text style={styles.joinButtonText}>Join Class</Text>
              </BlurView>
            </TouchableOpacity>
          </Animated.View>

          {/* Liquid Glass Classes List */}
          <Animated.View 
            style={styles.classesContainer}
            entering={FadeInDown.duration(800).delay(400).springify()}
          >
            <Text style={styles.sectionTitle}>Recent Classes</Text>
            
            {mockClasses.map((classItem, index) => (
              <GlassClassCard 
                key={classItem.id}
                classData={classItem}
                onPress={() => handleClassPress(classItem.id)}
                delay={index * 150}
              />
            ))}
          </Animated.View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function GlassStatCard({ icon, value, label, delay }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <Animated.View 
      style={styles.statCard}
      entering={FadeInDown.duration(600).delay(delay).springify()}
    >
      <BlurView intensity={BlurIntensity.medium} style={styles.statCardBlur}>
        <View style={styles.statIcon}>
          <BlurView intensity={BlurIntensity.light} style={styles.statIconBlur}>
            {icon}
          </BlurView>
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </BlurView>
    </Animated.View>
  );
}

function GlassClassCard({ classData, onPress, delay }: {
  classData: typeof mockClasses[0];
  onPress: () => void;
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
      entering={FadeInDown.duration(600).delay(delay).springify()}
      style={animatedStyle}
    >
      <TouchableOpacity 
        style={styles.classCard}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <BlurView intensity={BlurIntensity.medium} style={styles.classCardBlur}>
          <LinearGradient
            colors={classData.color}
            style={styles.classCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.classCardContent}>
              <View style={styles.classInfo}>
                <Text style={styles.className}>{classData.name}</Text>
                <Text style={styles.classDescription}>{classData.description}</Text>
                
                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressTrack}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${classData.progress * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {Math.round(classData.progress * 100)}%
                  </Text>
                </View>
              </View>
              
              <View style={styles.classActions}>
                {classData.unreadCount > 0 && (
                  <BlurView intensity={BlurIntensity.light} style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{classData.unreadCount}</Text>
                  </BlurView>
                )}
                <ChevronRight color="rgba(255, 255, 255, 0.9)" size={20} strokeWidth={1.5} />
              </View>
            </View>
            
            <View style={styles.classFooter}>
              <View style={styles.memberInfo}>
                <Users color="rgba(255, 255, 255, 0.8)" size={16} strokeWidth={1.5} />
                <Text style={styles.memberCount}>
                  {classData.memberCount} members
                </Text>
              </View>
              <Text style={styles.recentActivity}>
                {classData.recentActivity}
              </Text>
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
    top: height * 0.15,
    right: width * 0.1,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.systemBlue + '20',
  },
  floatingOrb2: {
    position: 'absolute',
    top: height * 0.65,
    left: width * 0.15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.systemPurple + '20',
  },
  orbBlur: {
    flex: 1,
    borderRadius: 30,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
  header: {
    paddingTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  headerBlur: {
    backgroundColor: Colors.glass,
    borderRadius: 24,
    padding: Spacing.xl,
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
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
  },
  statCardBlur: {
    backgroundColor: Colors.glass,
    borderRadius: 20,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.card,
  },
  statIcon: {
    marginBottom: Spacing.sm,
  },
  statIconBlur: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.frostedGlass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  statValue: {
    ...Typography.title3,
    color: Colors.text,
    marginBottom: 4,
    fontWeight: '700',
  },
  statLabel: {
    ...Typography.caption1,
    color: Colors.textTertiary,
    textAlign: 'center',
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  createButton: {
    flex: 2,
  },
  createButtonBlur: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.elevated,
  },
  createButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  createButtonText: {
    ...Typography.headline,
    color: Colors.white,
    fontWeight: '600',
  },
  joinButton: {
    flex: 1.5,
  },
  joinButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
    borderRadius: 20,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    ...GlassEffects.card,
  },
  joinButtonText: {
    ...Typography.headline,
    color: Colors.primary,
    fontWeight: '600',
  },
  classesContainer: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.title2,
    color: Colors.text,
    marginBottom: Spacing.lg,
    fontWeight: '700',
  },
  classCard: {
    marginBottom: Spacing.lg,
  },
  classCardBlur: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.elevated,
  },
  classCardGradient: {
    padding: Spacing.lg,
  },
  classCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  classInfo: {
    flex: 1,
    marginRight: Spacing.md,
  },
  className: {
    ...Typography.title3,
    color: Colors.white,
    marginBottom: Spacing.xs,
    fontWeight: '700',
  },
  classDescription: {
    ...Typography.subheadline,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: Spacing.sm,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 3,
  },
  progressText: {
    ...Typography.caption1,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  classActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  unreadBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    minWidth: 24,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  unreadCount: {
    ...Typography.caption1,
    color: Colors.primary,
    fontWeight: '700',
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  memberCount: {
    ...Typography.footnote,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  recentActivity: {
    ...Typography.footnote,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 120,
  },
});