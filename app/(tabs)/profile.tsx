import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
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
import { 
  User, 
  Settings, 
  Trophy, 
  BookOpen, 
  Users, 
  Award,
  ChevronRight,
  Star,
  Target,
  Calendar
} from 'lucide-react-native';
import { Colors, Typography, Spacing, GlassEffects, BlurIntensity } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

const achievements = [
  { id: '1', title: 'Quick Learner', description: 'Completed 10 quizzes', icon: '⚡', earned: true },
  { id: '2', title: 'Team Player', description: 'Active in 5 classes', icon: '🤝', earned: true },
  { id: '3', title: 'Scholar', description: 'Scored 90%+ on 20 quizzes', icon: '🎓', earned: false },
  { id: '4', title: 'Mentor', description: 'Helped 50 classmates', icon: '👨‍🏫', earned: false },
];

export default function Profile() {
  const floatAnimation = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);

  useEffect(() => {
    // Floating animation for glass elements
    floatAnimation.value = withRepeat(
      withSequence(
        withSpring(1, { duration: 3200 }),
        withSpring(0, { duration: 3200 })
      ),
      -1,
      true
    );

    // Pulse animation for profile elements
    pulseAnimation.value = withRepeat(
      withSequence(
        withSpring(1.02, { duration: 2200 }),
        withSpring(1, { duration: 2200 })
      ),
      -1,
      true
    );
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatAnimation.value, [0, 1], [0, -10]) },
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
          {/* Liquid Glass Profile Header */}
          <Animated.View 
            style={styles.profileHeaderContainer}
            entering={FadeInUp.duration(1000).springify()}
          >
            <BlurView intensity={BlurIntensity.medium} style={styles.headerCardBlur}>
              <LinearGradient
                colors={Colors.gradientPrimary}
                style={styles.headerGradient}
              >
                <Animated.View style={[styles.avatarContainer, pulseStyle]}>
                  <BlurView intensity={BlurIntensity.light} style={styles.avatarBlur}>
                    <Text style={styles.avatarText}>🎯</Text>
                  </BlurView>
                  <TouchableOpacity style={styles.editButton}>
                    <BlurView intensity={BlurIntensity.light} style={styles.editButtonBlur}>
                      <Settings color={Colors.white} size={16} strokeWidth={1.5} />
                    </BlurView>
                  </TouchableOpacity>
                </Animated.View>
                
                <Text style={styles.userName}>Alex Student</Text>
                <Text style={styles.userSchool}>Stanford University</Text>
                
                <View style={styles.headerStatsContainer}>
                  <GlassStatItem 
                    icon={<Trophy color={Colors.white} size={20} strokeWidth={1.5} />} 
                    value="2,180" 
                    label="Points" 
                  />
                  <GlassStatItem 
                    icon={<BookOpen color={Colors.white} size={20} strokeWidth={1.5} />} 
                    value="3" 
                    label="Classes" 
                  />
                  <GlassStatItem 
                    icon={<Users color={Colors.white} size={20} strokeWidth={1.5} />} 
                    value="73" 
                    label="Friends" 
                  />
                </View>
              </LinearGradient>
            </BlurView>
          </Animated.View>

          {/* Liquid Glass Quick Stats */}
          <Animated.View 
            style={styles.quickStats}
            entering={FadeInDown.duration(800).delay(200).springify()}
          >
            <GlassStatCard
              icon={<Target color={Colors.systemBlue} size={24} strokeWidth={1.5} />}
              number="85%"
              label="Average Score"
              delay={0}
            />
            <GlassStatCard
              icon={<Star color={Colors.systemOrange} size={24} strokeWidth={1.5} />}
              number="47"
              label="Quizzes Taken"
              delay={100}
            />
            <GlassStatCard
              icon={<Calendar color={Colors.systemGreen} size={24} strokeWidth={1.5} />}
              number="12"
              label="Study Streak"
              delay={200}
            />
          </Animated.View>

          {/* Liquid Glass Achievements */}
          <Animated.View 
            style={styles.achievementsContainer}
            entering={FadeInDown.duration(800).delay(300).springify()}
          >
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement, index) => (
                <Animated.View
                  key={achievement.id}
                  entering={FadeInDown.duration(600).delay(400 + index * 100).springify()}
                >
                  <GlassAchievementCard achievement={achievement} />
                </Animated.View>
              ))}
            </View>
          </Animated.View>

          {/* Liquid Glass Menu Options */}
          <Animated.View 
            style={styles.menuContainer}
            entering={FadeInDown.duration(800).delay(500).springify()}
          >
            <Text style={styles.sectionTitle}>Settings</Text>
            <BlurView intensity={BlurIntensity.medium} style={styles.menuCardBlur}>
              <GlassMenuOption 
                icon={<User color={Colors.primary} size={20} strokeWidth={1.5} />} 
                title="Edit Profile" 
              />
              <GlassMenuOption 
                icon={<Trophy color={Colors.primary} size={20} strokeWidth={1.5} />} 
                title="My Achievements" 
              />
              <GlassMenuOption 
                icon={<BookOpen color={Colors.primary} size={20} strokeWidth={1.5} />} 
                title="Learning Progress" 
              />
              <GlassMenuOption 
                icon={<Settings color={Colors.primary} size={20} strokeWidth={1.5} />} 
                title="App Settings"
                isLast={true}
              />
            </BlurView>
          </Animated.View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function GlassStatItem({ icon, value, label }: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.statItem}>
      <BlurView intensity={BlurIntensity.light} style={styles.statItemBlur}>
        <View style={styles.statItemIcon}>
          {icon}
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statItemLabel}>{label}</Text>
      </BlurView>
    </View>
  );
}

function GlassStatCard({ icon, number, label, delay }: {
  icon: React.ReactNode;
  number: string;
  label: string;
  delay: number;
}) {
  return (
    <Animated.View 
      style={styles.statCard}
      entering={FadeInDown.duration(600).delay(delay).springify()}
    >
      <BlurView intensity={BlurIntensity.medium} style={styles.statCardBlur}>
        <View style={styles.statCardIcon}>
          <BlurView intensity={BlurIntensity.light} style={styles.statCardIconBlur}>
            {icon}
          </BlurView>
        </View>
        <Text style={styles.statNumber}>{number}</Text>
        <Text style={styles.statCardLabel}>{label}</Text>
      </BlurView>
    </Animated.View>
  );
}

function GlassAchievementCard({ achievement }: {
  achievement: typeof achievements[0];
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
    <Animated.View style={animatedStyle}>
      <TouchableOpacity 
        style={styles.achievementCard}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <BlurView 
          intensity={achievement.earned ? BlurIntensity.medium : BlurIntensity.light} 
          style={[
            styles.achievementCardBlur,
            !achievement.earned && styles.lockedAchievement
          ]}
        >
          <View style={[styles.achievementIcon, !achievement.earned && styles.lockedIcon]}>
            <BlurView intensity={BlurIntensity.light} style={styles.achievementIconBlur}>
              <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
            </BlurView>
          </View>
          <Text style={[styles.achievementTitle, !achievement.earned && styles.lockedText]}>
            {achievement.title}
          </Text>
          <Text style={[styles.achievementDescription, !achievement.earned && styles.lockedText]}>
            {achievement.description}
          </Text>
          {achievement.earned && (
            <View style={styles.earnedBadge}>
              <BlurView intensity={BlurIntensity.light} style={styles.earnedBadgeBlur}>
                <Award color={Colors.white} size={12} strokeWidth={2} />
              </BlurView>
            </View>
          )}
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
}

function GlassMenuOption({ icon, title, isLast = false }: {
  icon: React.ReactNode;
  title: string;  
  isLast?: boolean;
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
    <Animated.View style={animatedStyle}>
      <TouchableOpacity 
        style={[
          styles.menuOption,
          !isLast && styles.menuOptionBorder
        ]}
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.menuOptionContent}>
          <View style={styles.menuOptionIcon}>
            <BlurView intensity={BlurIntensity.light} style={styles.menuOptionIconBlur}>
              {icon}
            </BlurView>
          </View>
          <Text style={styles.menuOptionText}>{title}</Text>
        </View>
        <ChevronRight color={Colors.textTertiary} size={20} strokeWidth={1.5} />
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
    top: height * 0.18,
    right: width * 0.08,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: Colors.systemOrange + '20',
  },
  floatingOrb2: {
    position: 'absolute',
    top: height * 0.72,
    left: width * 0.12,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.systemPurple + '20',
  },
  orbBlur: {
    flex: 1,
    borderRadius: 22.5,
  },
  scrollView: {
    flex: 1,
  },
  profileHeaderContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  headerCardBlur: {
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.elevated,
  },
  headerGradient: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.lg,
  },
  avatarBlur: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarText: {
    fontSize: 44,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  editButtonBlur: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  userName: {
    ...Typography.title1,
    fontSize: 28,
    color: Colors.white,
    marginBottom: Spacing.xs,
    fontWeight: '800',
  },
  userSchool: {
    ...Typography.subheadline,
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: Spacing.lg,
    fontWeight: '500',
  },
  headerStatsContainer: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statItemBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minWidth: 80,
  },
  statItemIcon: {
    marginBottom: Spacing.xs,
  },
  statValue: {
    ...Typography.title3,
    color: Colors.white,
    marginBottom: 4,
    fontWeight: '700',
  },
  statItemLabel: {
    ...Typography.caption1,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
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
  statCardIcon: {
    marginBottom: Spacing.sm,
  },
  statCardIconBlur: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.frostedGlass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  statNumber: {
    ...Typography.title3,
    color: Colors.text,
    marginBottom: 4,
    fontWeight: '700',
  },
  statCardLabel: {
    ...Typography.caption1,
    color: Colors.textTertiary,
    textAlign: 'center',
    fontWeight: '500',
  },
  achievementsContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.title2,
    color: Colors.text,
    marginBottom: Spacing.lg,
    fontWeight: '700',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  achievementCard: {
    width: '48%',
  },
  achievementCardBlur: {
    backgroundColor: Colors.glass,
    borderRadius: 20,
    padding: Spacing.lg,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.card,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    marginBottom: Spacing.sm,
  },
  achievementIconBlur: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.frostedGlass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  lockedIcon: {
    opacity: 0.7,
  },
  achievementEmoji: {
    fontSize: 28,
  },
  achievementTitle: {
    ...Typography.footnote,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    ...Typography.caption2,
    color: Colors.textTertiary,
    textAlign: 'center',
    fontWeight: '500',
  },
  lockedText: {
    color: Colors.textTertiary,
  },
  earnedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  earnedBadgeBlur: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.systemGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  menuContainer: {
    paddingHorizontal: Spacing.lg,
  },
  menuCardBlur: {
    backgroundColor: Colors.glass,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.card,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  menuOptionBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
  },
  menuOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  menuOptionIcon: {
    // Base styling handled by BlurView
  },
  menuOptionIconBlur: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.frostedGlass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  menuOptionText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '500',
  },
  bottomSpacing: {
    height: 120,
  },
});