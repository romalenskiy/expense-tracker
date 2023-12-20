import { FC, Ref } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '../../../../constants/colors';

type Props = Omit<TextInputProps, 'style'> & {
  label: string;
  isInvalid?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  getInputRef?: Ref<TextInput>;
};

export const Input: FC<Props> = ({
  label,
  isInvalid,
  style,
  inputStyle,
  labelStyle,
  getInputRef,
  ...restProps
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text
        style={[styles.label, isInvalid && styles.labelInvalid, labelStyle]}
      >
        {label}
      </Text>
      <TextInput
        {...restProps}
        ref={getInputRef}
        style={[
          styles.input,
          restProps.multiline && styles.inputMultiline,
          isInvalid && styles.inputInvalid,
          inputStyle,
        ]}
        placeholderTextColor={
          restProps.placeholderTextColor || Colors.primary300
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },

  label: { fontSize: 12, color: Colors.primary100, marginBottom: 4 },

  labelInvalid: {
    color: Colors.error500,
  },

  input: {
    backgroundColor: Colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: Colors.primary700,
  },

  inputInvalid: {
    backgroundColor: Colors.error50,
  },

  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
