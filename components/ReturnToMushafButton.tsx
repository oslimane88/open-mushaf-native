import { StyleSheet, TouchableOpacity } from 'react-native';

import { FontAwesome6 } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { useNavigation, useRouter } from 'expo-router';

import { useColors } from '@/hooks';

import { ThemedText } from './ThemedText';

/**
 * Header control that returns the reader to the Mushaf, for screens that can
 * otherwise become a dead end: the Surah/Juz list when the bottom tab bar is
 * hidden, or a stack screen opened without history (e.g. a web deep link).
 *
 * Inside the tab navigator it focuses the Mushaf tab exactly like the tab bar
 * does (keeping the tab's params, so a temporary page stays open). Outside the
 * tabs it replaces the screen with the Mushaf, which then shows the saved page.
 *
 * @returns A labeled icon button for a screen header.
 */
export function ReturnToMushafButton() {
  const navigation = useNavigation();
  const router = useRouter();
  const { primaryColor } = useColors();

  const handlePress = () => {
    if (navigation.getState()?.routeNames.includes('index')) {
      navigation.dispatch(
        CommonActions.navigate({ name: 'index', merge: true }),
      );
      return;
    }
    router.replace('/');
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.button}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel="العودة إلى المصحف"
      accessibilityHint="اضغط للرجوع إلى صفحة المصحف"
    >
      <FontAwesome6 name="book-quran" size={20} color={primaryColor} />
      <ThemedText style={[styles.label, { color: primaryColor }]}>
        المصحف
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 8,
    // Keeps the label visually apart from the screen title next to it.
    marginHorizontal: 12,
  },
  label: {
    fontFamily: 'Tajawal_500Medium',
    fontSize: 16,
    lineHeight: 22,
  },
});
