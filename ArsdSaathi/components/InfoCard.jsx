import { Colors } from '@/constants/themeStyle';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function InfoCard({ title, value, color}) {
  const text = value == null ? '' : String(value);
  const colorValue = color || Colors.light.primary;

  // dynamic font sizing based on length of the text value
  let fontSize = 28;
  if (text.length <= 3) fontSize = 34;
  else if (text.length <= 6) fontSize = 28;
  else if (text.length <= 12) fontSize = 25;
  else fontSize = 18;

  return (
    <View style={styles.card}>
      <View style={styles.accent} />
      <View style={styles.content}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={[styles.cardValue, { fontSize, color: colorValue, }]} numberOfLines={2} ellipsizeMode="tail">
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    minHeight: 90,
    backgroundColor: Colors.light.background,
    padding: 15,
    paddingLeft: 8,
    borderRadius: 10,
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 6,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  accent: {
    width: 6,
    height: '100%',
    backgroundColor: Colors.light.primary,
    borderRadius: 6,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.light.text,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  cardValue: {
    fontWeight: '800',
    marginTop: 10,
    textAlign: 'right',
    includeFontPadding: false,
  },
});