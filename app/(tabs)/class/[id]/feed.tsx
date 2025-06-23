import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { MessageSquare, Heart, Share2, Image, Mic, FileText, MoreHorizontal } from 'lucide-react-native';
import { Colors, Typography, Spacing, GlassEffects, BlurIntensity } from '@/constants/Colors';

const mockPosts = [
  {
    id: '1',
    author: 'Alex Student',
    avatar: '🎯',
    timestamp: '2 hours ago',
    content: 'Just finished reviewing Chapter 3 on Linear Algebra. Anyone else finding eigenvalues tricky? #math #linearalgebra',
    likes: 15,
    comments: 3,
    media: null,
    liked: false,
  },
  {
    id: '2',
    author: 'Sarah Wilson',
    avatar: '👩‍🔬',
    timestamp: 'Yesterday',
    content: 'Here are my notes from yesterday\'s lecture on Quantum Entanglement. Hope this helps! ⚛️',
    likes: 28,
    comments: 7,
    media: { type: 'image', url: 'https://via.placeholder.com/300x200.png?text=Quantum+Notes' },
    liked: true,
  },
  {
    id: '3',
    author: 'Dr. Evelyn Reed',
    avatar: '👩‍🏫',
    timestamp: '3 days ago',
    content: 'Reminder: Quiz 2 on Calculus is this Friday. Make sure to review the practice problems!',
    likes: 40,
    comments: 12,
    media: null,
    liked: false,
  },
];

export default function ClassFeed() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Glass Post Creation */}
        <Animated.View 
          style={styles.createPostContainer}
          entering={FadeInDown.duration(600).springify()}
        >
          <BlurView intensity={BlurIntensity.medium} style={styles.createPostBlur}>
            <TouchableOpacity style={styles.createPostButton}>
              <Text style={styles.createPostPlaceholder}>Share something with the class...</Text>
            </TouchableOpacity>
            <View style={styles.createPostActions}>
              <GlassActionButton 
                icon={<Image color={Colors.systemBlue} size={20} strokeWidth={1.5} />}
                onPress={() => console.log('Image pressed')}
              />
              <GlassActionButton 
                icon={<Mic color={Colors.systemPurple} size={20} strokeWidth={1.5} />}
                onPress={() => console.log('Mic pressed')}
              />
              <GlassActionButton 
                icon={<FileText color={Colors.systemGreen} size={20} strokeWidth={1.5} />}
                onPress={() => console.log('File pressed')}
              />
            </View>
          </BlurView>
        </Animated.View>

        {/* Glass Feed Posts */}
        <View style={styles.feedContainer}>
          {mockPosts.map((post, index) => (
            <GlassPostCard
              key={post.id}
              post={post}
              delay={index * 100}
            />
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

function GlassActionButton({ icon, onPress }: {
  icon: React.ReactNode;
  onPress: () => void;
}) {
  const scaleAnimation = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnimation.value }],
  }));

  const handlePressIn = () => {
    scaleAnimation.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scaleAnimation.value = withSpring(1);
  };

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <BlurView intensity={BlurIntensity.light} style={styles.actionButtonBlur}>
          {icon}
        </BlurView>
      </TouchableOpacity>
    </Animated.View>
  );
}

function GlassPostCard({ post, delay }: { 
  post: typeof mockPosts[0];
  delay: number;
}) {
  const likeAnimation = useSharedValue(1);
  
  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeAnimation.value }],
  }));

  const handleLike = () => {
    likeAnimation.value = withSpring(1.2, {}, () => {
      likeAnimation.value = withSpring(1);
    });
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(600).delay(delay)}
      style={styles.postCard}
    >
      <BlurView intensity={BlurIntensity.medium} style={styles.postCardBlur}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.postAuthorSection}>
            <View style={styles.postAvatar}>
              <BlurView intensity={BlurIntensity.light} style={styles.avatarBlur}>
                <Text style={styles.avatarText}>{post.avatar}</Text>
              </BlurView>
            </View>
            <View style={styles.postAuthorInfo}>
              <Text style={styles.postAuthor}>{post.author}</Text>
              <Text style={styles.postTimestamp}>{post.timestamp}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MoreHorizontal color={Colors.textTertiary} size={20} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        {/* Post Content */}
        <Text style={styles.postContent}>{post.content}</Text>

        {/* Post Media */}
        {post.media && (
          <View style={styles.postMediaContainer}>
            <BlurView intensity={BlurIntensity.light} style={styles.postMediaBlur}>
              <Text style={styles.postMediaPlaceholder}>
                📸 {post.media.type.toUpperCase()}
              </Text>
            </BlurView>
          </View>
        )}

        {/* Post Actions */}
        <View style={styles.postActions}>
          <Animated.View style={likeAnimatedStyle}>
            <TouchableOpacity 
              style={[styles.postActionButton, post.liked && styles.likedButton]}
              onPress={handleLike}
            >
              <Heart 
                color={post.liked ? Colors.systemRed : Colors.textTertiary} 
                size={18} 
                strokeWidth={1.5}
                fill={post.liked ? Colors.systemRed : 'transparent'}
              />
              <Text style={[
                styles.postActionText,
                post.liked && styles.likedText
              ]}>
                {post.likes}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity style={styles.postActionButton}>
            <MessageSquare color={Colors.textTertiary} size={18} strokeWidth={1.5} />
            <Text style={styles.postActionText}>{post.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.postActionButton}>
            <Share2 color={Colors.textTertiary} size={18} strokeWidth={1.5} />
            <Text style={styles.postActionText}>Share</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  createPostContainer: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  createPostBlur: {
    backgroundColor: Colors.glass,
    borderRadius: 20,
    padding: Spacing.lg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.card,
  },
  createPostButton: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderLight,
    marginBottom: Spacing.md,
  },
  createPostPlaceholder: {
    ...Typography.body,
    color: Colors.textTertiary,
  },
  createPostActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    // Base styling handled by BlurView
  },
  actionButtonBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 12,
    backgroundColor: Colors.frostedGlass,
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  feedContainer: {
    gap: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  postCard: {
    // Container for the glass card
  },
  postCardBlur: {
    backgroundColor: Colors.glass,
    borderRadius: 20,
    padding: Spacing.lg,
    borderWidth: 0.5,
    borderColor: Colors.border,
    ...GlassEffects.card,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  postAuthorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  postAvatar: {
    marginRight: Spacing.sm,
  },
  avatarBlur: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.frostedGlass,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  avatarText: {
    fontSize: 20,
  },
  postAuthorInfo: {
    flex: 1,
  },
  postAuthor: {
    ...Typography.headline,
    color: Colors.text,
    fontWeight: '600',
  },
  postTimestamp: {
    ...Typography.footnote,
    color: Colors.textTertiary,
  },
  moreButton: {
    padding: Spacing.xs,
  },
  postContent: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: Spacing.md,
    lineHeight: 24,
  },
  postMediaContainer: {
    marginBottom: Spacing.md,
  },
  postMediaBlur: {
    backgroundColor: Colors.frostedGlass,
    borderRadius: 16,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
  },
  postMediaPlaceholder: {
    ...Typography.subheadline,
    color: Colors.textTertiary,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.md,
    borderTopWidth: 0.5,
    borderTopColor: Colors.borderLight,
  },
  postActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 12,
  },
  likedButton: {
    backgroundColor: Colors.systemRed + '10',
  },
  postActionText: {
    ...Typography.footnote,
    color: Colors.textTertiary,
    fontWeight: '600',
  },
  likedText: {
    color: Colors.systemRed,
  },
  bottomSpacing: {
    height: 120,
  },
});