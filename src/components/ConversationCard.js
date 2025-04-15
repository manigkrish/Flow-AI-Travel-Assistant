import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatRelativeTime } from '../utils/dateHelper';

const ConversationCard = ({ conversation, onPress }) => {
  const { summary, timestamp } = conversation;
  const timeDisplay = formatRelativeTime(timestamp);
  
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {summary}
        </Text>
        <Text style={styles.subtitle}>{timeDisplay}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="chevron-forward" size={25} color="#000000" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#c0c0c3',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginBottom: 20,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#888888',
    fontSize: 14,
  },
  iconContainer: {
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ConversationCard;