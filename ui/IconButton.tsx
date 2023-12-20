import { Colors } from '@ui/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';

type Props = {
  iconName: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
  onPress?: PressableProps['onPress'];
};

export const IconButton: FC<Props> = ({
  iconName,
  color = Colors.text_primary,
  size = 24,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={size} color={color} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: { opacity: 0.7 },

  iconContainer: {
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 24,
  },
});
