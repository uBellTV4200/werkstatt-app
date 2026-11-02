import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import Merkzettel from '@/widgets/merkzettel';

// Praxistest Stufe 1: Ein Text aus der App soll im Widget auf dem Home-Bildschirm erscheinen.
export default function MerkzettelScreen() {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [meldung, setMeldung] = useState('');

  const aufsWidget = () => {
    const stand = new Date().toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    Merkzettel.updateSnapshot({ text: text.trim() || 'Noch nichts gemerkt', stand: `Stand ${stand}` });
    setMeldung('Steht jetzt im Widget.');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Merkzettel</ThemedText>
        <ThemedText>Text eintippen und aufs Widget schicken.</ThemedText>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Woran musst du denken?"
          placeholderTextColor={theme.textSecondary}
          multiline
          style={[styles.eingabe, { color: theme.text, backgroundColor: theme.backgroundElement }]}
        />
        <Pressable
          onPress={aufsWidget}
          accessibilityRole="button"
          style={({ pressed }) => [styles.knopf, pressed && styles.gedrueckt]}>
          <ThemedText style={styles.knopfText}>Aufs Widget</ThemedText>
        </Pressable>
        {meldung ? <ThemedText type="small">{meldung}</ThemedText> : null}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  eingabe: {
    minHeight: 120,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    fontSize: 17,
    textAlignVertical: 'top',
  },
  knopf: {
    minHeight: 50,
    borderRadius: Spacing.three,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gedrueckt: {
    opacity: 0.7,
  },
  knopfText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
