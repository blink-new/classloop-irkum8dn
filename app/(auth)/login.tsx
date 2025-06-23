import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Mail } from 'lucide-react-native';
import { Colors, Typography, Spacing } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function Login() {
  const handleBack = () => {
    router.back();
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login pressed');
    router.replace('/(auth)/onboarding');
  };

  const handleEmailLogin = () => {
    // For now, skip to onboarding
    router.replace('/(auth)/onboarding');
  };

  return (
    <LinearGradient
      colors={Colors.gradientPrimary}
      style={styles.container}
    >
      {/* Header */}
      <Animated.View 
        style={styles.header}
        entering={FadeInUp.duration(600).springify()}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft color={Colors.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Welcome Back</Text>
        <Text style={styles.headerSubtitle}>
          Sign in to continue your learning journey
        </Text>
      </Animated.View>

      {/* Login Options */}
      <Animated.View 
        style={styles.loginContainer}
        entering={FadeInDown.duration(600).delay(200).springify()}
      >
        <View style={styles.loginCard}>
          <Text style={styles.cardTitle}>Choose your sign-in method</Text>
          
          {/* Google Login */}
          <TouchableOpacity 
            style={styles.googleButton}
            onPress={handleGoogleLogin}
            activeOpacity={0.9}
          >
            <View style={styles.googleIcon}>
              <Text style={styles.googleIconText}>G</Text>
            </View>
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Email Login */}
          <TouchableOpacity 
            style={styles.emailButton}
            onPress={handleEmailLogin}
            activeOpacity={0.9}
          >
            <Mail color={Colors.white} size={20} style={styles.emailIcon} />
            <Text style={styles.emailButtonText}>Continue with Email</Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    ...Typography.h1,
    fontSize: 32,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  headerSubtitle: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  loginCard: {
    alignItems: 'center',
  },
  cardTitle: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    width: width - Spacing.lg * 2,
    marginBottom: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  googleIconText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  googleButtonText: {
    ...Typography.h3,
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginHorizontal: Spacing.md,
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    width: width - Spacing.lg * 2,
    marginBottom: Spacing.xxl,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emailIcon: {
    marginRight: Spacing.md,
  },
  emailButtonText: {
    ...Typography.h3,
    color: Colors.white,
    flex: 1,
    textAlign: 'center',
  },
  footerText: {
    ...Typography.small,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: Spacing.lg,
  },
  linkText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});