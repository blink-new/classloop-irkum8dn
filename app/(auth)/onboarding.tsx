import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { User, GraduationCap, ArrowRight } from 'lucide-react-native';
import { Colors, Typography, Spacing } from '@/constants/Colors';

export default function Onboarding() {
  const [username, setUsername] = useState('');
  const [school, setSchool] = useState('');

  const handleComplete = () => {
    if (username.trim() && school.trim()) {
      // TODO: Save user data
      console.log('User data:', { username, school });
      router.replace('/(tabs)');
    }
  };

  const isValid = username.trim().length >= 3 && school.trim().length >= 2;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={Colors.gradientPrimary}
        style={styles.header}
      >
        <Animated.View 
          style={styles.headerContent}
          entering={FadeInUp.duration(600).springify()}
        >
          <View style={styles.avatarContainer}>
            <User color={Colors.white} size={32} strokeWidth={2} />
          </View>
          <Text style={styles.headerTitle}>Complete Your Profile</Text>
          <Text style={styles.headerSubtitle}>
            Help us personalize your learning experience
          </Text>
        </Animated.View>
      </LinearGradient>

      <Animated.View 
        style={styles.formContainer}
        entering={FadeInDown.duration(600).delay(200).springify()}
      >
        <View style={styles.form}>
          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Username</Text>
            <View style={styles.inputContainer}>
              <User color={Colors.textMuted} size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your username"
                placeholderTextColor={Colors.textMuted}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* School Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>School</Text>
            <View style={styles.inputContainer}>
              <GraduationCap color={Colors.textMuted} size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your school name"
                placeholderTextColor={Colors.textMuted}
                value={school}
                onChangeText={setSchool}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Progress Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Your username will be visible to other students in your classes. 
              Your school helps us connect you with relevant content.
            </Text>
          </View>
        </View>

        {/* Complete Button */}
        <TouchableOpacity 
          style={[styles.completeButton, !isValid && styles.disabledButton]}
          onPress={handleComplete}
          disabled={!isValid}
          activeOpacity={0.9}
        >
          <Text style={[styles.completeButtonText, !isValid && styles.disabledButtonText]}>
            Complete Setup
          </Text>
          <ArrowRight 
            color={isValid ? Colors.white : Colors.textMuted} 
            size={20} 
            style={styles.buttonIcon} 
          />
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingTop: 60,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    ...Typography.h1,
    fontSize: 28,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  headerSubtitle: {
    ...Typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  textInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    minHeight: 24,
  },
  infoContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.md,
    marginTop: Spacing.lg,
  },
  infoText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 18,
    textAlign: 'center',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xxl,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: Colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  completeButtonText: {
    ...Typography.h3,
    color: Colors.white,
    flex: 1,
    textAlign: 'center',
  },
  disabledButtonText: {
    color: Colors.textMuted,
  },
  buttonIcon: {
    marginLeft: Spacing.sm,
  },
});