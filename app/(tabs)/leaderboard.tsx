import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react-native';
import { Colors, Typography, Spacing } from '@/constants/Colors';

const leaderboardData = [
  { id: '1', name: 'Emma Johnson', score: 2450, rank: 1, change: 2, avatar: '👩‍🎓' },
  { id: '2', name: 'Alex Chen', score: 2380, rank: 2, change: -1, avatar: '👨‍💻' },
  { id: '3', name: 'Sarah Wilson', score: 2340, rank: 3, change: 1, avatar: '👩‍🔬' },
  { id: '4', name: 'Mike Rodriguez', score: 2290, rank: 4, change: 0, avatar: '👨‍🎓' },
  { id: '5', name: 'You', score: 2180, rank: 5, change: 3, avatar: '🎯', isCurrentUser: true },
];

export default function Leaderboard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          style={styles.header}
          entering={FadeInDown.duration(600).springify()}
        >
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <Text style={styles.headerSubtitle}>
            See how you rank among classmates
          </Text>
        </Animated.View>

        {/* Top 3 Podium */}
        <Animated.View 
          style={styles.podiumContainer}
          entering={FadeInDown.duration(600).delay(100).springify()}
        >
          <View style={styles.podium}>
            {/* 2nd Place */}
            <View style={styles.podiumPlace}>
              <View style={[styles.podiumAvatar, styles.silverAvatar]}>
                <Text style={styles.avatarText}>{leaderboardData[1].avatar}</Text>
              </View>
              <View style={[styles.podiumRank, styles.silverRank]}>
                <Medal color={Colors.white} size={16} />
                <Text style={styles.podiumRankText}>2</Text>
              </View>
              <Text style={styles.podiumName}>{leaderboardData[1].name}</Text>
              <Text style={styles.podiumScore}>{leaderboardData[1].score}</Text>
            </View>

            {/* 1st Place */}
            <View style={[styles.podiumPlace, styles.firstPlace]}>
              <View style={[styles.podiumAvatar, styles.goldAvatar]}>
                <Text style={styles.avatarText}>{leaderboardData[0].avatar}</Text>
              </View>
              <View style={[styles.podiumRank, styles.goldRank]}>
                <Trophy color={Colors.white} size={18} />
                <Text style={styles.podiumRankText}>1</Text>
              </View>
              <Text style={styles.podiumName}>{leaderboardData[0].name}</Text>
              <Text style={styles.podiumScore}>{leaderboardData[0].score}</Text>
            </View>

            {/* 3rd Place */}
            <View style={styles.podiumPlace}>
              <View style={[styles.podiumAvatar, styles.bronzeAvatar]}>
                <Text style={styles.avatarText}>{leaderboardData[2].avatar}</Text>
              </View>
              <View style={[styles.podiumRank, styles.bronzeRank]}>
                <Award color={Colors.white} size={16} />
                <Text style={styles.podiumRankText}>3</Text>
              </View>
              <Text style={styles.podiumName}>{leaderboardData[2].name}</Text>
              <Text style={styles.podiumScore}>{leaderboardData[2].score}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Full Leaderboard */}
        <Animated.View 
          style={styles.leaderboardContainer}
          entering={FadeInDown.duration(600).delay(200).springify()}
        >
          <Text style={styles.sectionTitle}>Full Rankings</Text>
          
          {leaderboardData.map((user, index) => (
            <Animated.View
              key={user.id}
              entering={FadeInDown.duration(400).delay(index * 50)}
            >
              <LeaderboardRow user={user} />
            </Animated.View>
          ))}
        </Animated.View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

function LeaderboardRow({ user }: { user: typeof leaderboardData[0] }) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy color={Colors.warning} size={20} />;
      case 2: return <Medal color="#C0C0C0" size={20} />;
      case 3: return <Award color="#CD7F32" size={20} />;
      default: return <Text style={styles.rankNumber}>{rank}</Text>;
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp color={Colors.success} size={16} />;
    if (change < 0) return <TrendingUp color={Colors.error} size={16} style={{ transform: [{ rotate: '180deg' }] }} />;
    return null;
  };

  return (
    <TouchableOpacity 
      style={[styles.leaderboardRow, user.isCurrentUser && styles.currentUserRow]}
      activeOpacity={0.9}
    >
      <View style={styles.rankContainer}>
        {getRankIcon(user.rank)}
      </View>
      
      <View style={styles.userAvatar}>
        <Text style={styles.avatarText}>{user.avatar}</Text>
      </View>
      
      <View style={styles.userInfo}>
        <Text style={[styles.userName, user.isCurrentUser && styles.currentUserName]}>
          {user.name}
        </Text>
        <Text style={styles.userScore}>{user.score} points</Text>
      </View>
      
      <View style={styles.changeContainer}>
        {getChangeIcon(user.change)}
        {user.change !== 0 && (
          <Text style={[styles.changeText, user.change > 0 ? styles.positiveChange : styles.negativeChange]}>
            {Math.abs(user.change)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  podiumContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  podiumPlace: {
    alignItems: 'center',
    flex: 1,
  },
  firstPlace: {
    marginBottom: Spacing.lg,
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  goldAvatar: {
    backgroundColor: Colors.warning,
  },
  silverAvatar: {
    backgroundColor: '#C0C0C0',
  },
  bronzeAvatar: {
    backgroundColor: '#CD7F32',
  },
  podiumRank: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    marginBottom: Spacing.xs,
    gap: 4,
  },
  goldRank: {
    backgroundColor: Colors.warning,
  },
  silverRank: {
    backgroundColor: '#C0C0C0',
  },
  bronzeRank: {
    backgroundColor: '#CD7F32',
  },
  podiumRankText: {
    ...Typography.small,
    color: Colors.white,
    fontWeight: '600',
  },
  podiumName: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 2,
  },
  podiumScore: {
    ...Typography.small,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  leaderboardContainer: {
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentUserRow: {
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  rankNumber: {
    ...Typography.h3,
    color: Colors.textMuted,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  avatarText: {
    fontSize: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 2,
  },
  currentUserName: {
    color: Colors.primary,
  },
  userScore: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    ...Typography.small,
    fontWeight: '600',
  },
  positiveChange: {
    color: Colors.success,
  },
  negativeChange: {
    color: Colors.error,
  },
  bottomSpacing: {
    height: 100,
  },
});