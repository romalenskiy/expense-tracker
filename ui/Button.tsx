import { FC, ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '../constants/colors';

type Props = {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  onPress?: PressableProps['onPress'];
  mode?: 'primary' | 'flat';
};

export const Button: FC<Props> = ({
  children,
  onPress,
  mode = 'primary',
  style,
}) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: { borderRadius: 4, padding: 8, backgroundColor: Colors.primary500 },

  buttonText: { color: Colors.text_primary, textAlign: 'center' },

  flat: { backgroundColor: 'transparent' },

  flatText: { color: Colors.primary200 },

  pressed: {
    opacity: 0.75,
    backgroundColor: Colors.primary100_alpha50,
    borderRadius: 4,
  },
});
