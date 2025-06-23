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
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, Star, Users, ChevronRight, BookOpen, Sparkles } from 'lucide-react-native';
import { Colors, Typography, Spacing, GlassEffects, BlurIntensity } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

const popularClasses = [
  {
    id: '1',
    name: 'Machine Learning Basics',
    instructor: 'Dr. Sarah Chen',
    members: 156,
    rating: 4.8,
    tags: ['AI', 'Python', 'Data Science'],
    color: ['rgba(255, 45, 146, 0.8)', 'rgba(175, 82, 222, 0.8)'],
  },
  {
    id: '2', 
    name: 'Digital Marketing Strategy',
    instructor: 'Prof. Mike Johnson',
    members: 89,
    rating: 4.6,
    tags: ['Marketing', 'Business', 'Social Media'],
    color: ['rgba(0, 122, 255, 0.8)', 'rgba(90, 200, 250, 0.8)'],
  },
  {
    id: '3',
    name: 'Advanced Chemistry',
    instructor: 'Dr. Emily Rodriguez',
    members: 72,
    rating: 4.9,
    tags: ['Chemistry', 'Lab', 'Research'],
    color: ['rgba(48, 209, 88, 0.8)', 'rgba(30, 212, 209, 0.8)'],
  },
];

export default function Discover() {
  const floatAnimation = useSharedValue(0);
  const pulseAnimation = useSharedValue(1);

  useEffect(() => {
    // Floating animation for glass elements
    floatAnimation.value = withRepeat(
      withSequence(
        withSpring(1, { duration: 2800 }),
        withSpring(0, { duration: 2800 })
      ),
      -1,
      true
    );

    // Pulse animation for search elements
    pulseAnimation.value = withRepeat(
      withSequence(
        withSpring(1.02, { duration: 2500 }),
        withSpring(1, { duration: 2500 })
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
                      <Sparkles color={Colors.primary} size={32} strokeWidth={1.5} />
                    </BlurView>
                  </View>
                </Animated.View>
                <Text style={styles.headerTitle}>Discover Classes</Text>
                <Text style={styles.headerSubtitle}>
                  Find new learning opportunities
                </Text>
              </View>
            </BlurView>
          </Animated.View>

          {/* Liquid Glass Search Bar */}
          <Animated.View 
            style={styles.searchContainer}
            entering={FadeInDown.duration(800).delay(200).springify()}
          >
            <BlurView intensity={BlurIntensity.medium} style={styles.searchBarBlur}>
              <View style={styles.searchIconContainer}>
                <BlurView intensity={BlurIntensity.light} style={styles.searchIconBlur}>
                  <Search color={Colors.primary} size={20} strokeWidth={1.5} />
                </BlurView>
              </View>
              <TextInput
                style={styles.searchInput}
                placeholder="Search classes, topics, or instructors"
                placeholderTextColor={Colors.textTertiary}
              />
              <TouchableOpacity style={styles.filterButton}>
                <BlurView intensity={BlurIntensity.light} style={styles.filterButtonBlur}>
                  <Filter color={Colors.primary} size={18} strokeWidth={1.5} />
                </BlurView>
              </TouchableOpacity>
            </BlurView>
          </Animated.View>

          {/* Liquid Glass Popular Classes */}
          <Animated.View 
            style={styles.section}
            entering={FadeInDown.duration(800).delay(300).springify()}
          >
            <Text style={styles.sectionTitle}>Popular Classes</Text>
            
            {popularClasses.map((classItem, index) => (
              <Animated.View
                key={classItem.id}
                entering={FadeInDown.duration(600).delay(400 + index * 150).springify()}
              >
                <GlassClassDiscoveryCard classData={classItem} />
              </Animated.View>
            ))}
          </Animated.View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function GlassClassDiscoveryCard({ classData }: { classData: typeof popularClasses[0] }) {
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
        style={styles.classCard} 
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <BlurView intensity={BlurIntensity.medium} style={styles.classCardBlur}>
          <LinearGradient
            colors={classData.color}
            style={styles.classCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.classHeader}>
              <View style={styles.classInfo}>
                <Text style={styles.className}>{classData.name}</Text>
                <Text style={styles.instructor}>by {classData.instructor}</Text>
              </View>
              <BlurView intensity={BlurIntensity.light} style={styles.ratingContainer}>
                <Star color={Colors.white} size={14} fill={Colors.white} strokeWidth={1.5} />
                <Text style={styles.rating}>{classData.rating}</Text>
              </BlurView>
            </View>
            
            <View style={styles.tagsContainer}>
              {classData.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <BlurView intensity={BlurIntensity.light} style={styles.tagBlur}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </BlurView>
                </View>
              ))}
            </View>
            
            <View style={styles.classFooter}>
              <View style={styles.membersInfo}>
                <BlurView intensity={BlurIntensity.light} style={styles.membersIconContainer}>
                  <Users color="rgba(255, 255, 255, 0.9)" size={16} strokeWidth={1.5} />
                </BlurView>
                <Text style={styles.membersText}>{classData.members} members</Text>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <BlurView intensity={BlurIntensity.light} style={styles.joinButtonBlur}>
                  <Text style={styles.joinButtonText}>Join</Text>
                  <ChevronRight color={Colors.white} size={16} strokeWidth={2} />
                </BlurView>
              </TouchableOpacity>
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
    top: height * 0.12,
    right: width * 0.12,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.systemPink + '20',
  },
  floatingOrb2: {
    position: 'absolute',
    top: height * 0.7,
    left: width * 0.08,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: Colors.systemGreen + '20',
  },
  orbBlur: {
    flex: 1,
    borderRadius: 25,
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
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  searchBarBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glass,
    borderRadius: 20,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.card,
  },
  searchIconContainer: {
    // Base styling handled by BlurView
  },
  searchIconBlur: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.frostedGlass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
  },
  filterButton: {
    // Base styling handled by BlurView
  },
  filterButtonBlur: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.frostedGlass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  section: {
    paddingHorizontal: Spacing.lg,
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
  classHeader: {
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
  instructor: {
    ...Typography.subheadline,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  rating: {
    ...Typography.footnote,
    color: Colors.white,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  tag: {
    // Base styling handled by BlurView
  },
  tagBlur: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tagText: {
    ...Typography.caption1,
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '600',
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  membersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  membersIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  membersText: {
    ...Typography.footnote,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  joinButton: {
    // Base styling handled by BlurView
  },
  joinButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.xs,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  joinButtonText: {
    ...Typography.footnote,
    color: Colors.white,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 120,
  },
});