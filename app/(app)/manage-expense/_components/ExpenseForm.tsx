import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { FC, ReactNode, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Input } from './Input';
import { Colors } from '../../../../constants/colors';
import { Spacing } from '../../../../ui/Spacing';

const dateFormatter = new Intl.DateTimeFormat('ru-RU');

type Validation = {
  isValid: boolean;
  fields: { amount: boolean; title: boolean };
  errorMessage?: string;
};

type Props = {
  initialAmount?: number;
  initialDate?: number;
  initialTitle?: string;
  getActions: (params: {
    amount: number;
    date: number;
    title: string;
    validation: Validation;
    onSubmit: VoidFunction;
  }) => ReactNode;
};

export const ExpenseForm: FC<Props> = ({
  initialAmount = 0,
  initialDate = new Date().getTime(),
  initialTitle = '',
  getActions,
}) => {
  const amountInputRef = useRef<TextInput>(null);
  const titleInputRef = useRef<TextInput>(null);

  const [isFormSubmited, setIsFormSubmited] = useState(false);

  const [amountValue, setAmountValue] = useState({
    value: String(initialAmount || ''),
    isTouched: false,
  });

  const [datePickerValue, setDatePickerValue] = useState(
    () => new Date(initialDate),
  );

  const [titleValue, setTitleValue] = useState({
    value: initialTitle,
    isTouched: false,
  });

  const validation = useMemo<Validation>(() => {
    const amountValueNumber = parseFloat(amountValue.value);
    const titleValueTrim = titleValue.value.trim();

    const isAmountValid =
      !Number.isNaN(amountValueNumber) && amountValueNumber > 0;
    const isTitleValid = titleValueTrim !== '';

    return {
      isValid: isAmountValid && isTitleValid,
      fields: { amount: isAmountValid, title: isTitleValid },
      errorMessage: !isAmountValid
        ? 'Amount should be greater than 0'
        : !isTitleValid
          ? 'Title should be not empty'
          : undefined,
    };
  }, [amountValue.value, datePickerValue, titleValue.value]);

  const onAmountChange = (value: string) => {
    setAmountValue({
      value: value
        .replaceAll(',', '.')
        .replace(/\./g, (match: string, offset: number, text: string) =>
          text.indexOf(match) === offset ? match : '',
        ),
      isTouched: true,
    });
  };

  const onDatePickerChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type !== 'set' || !date || date.toString() === 'Invalid Date') {
      return;
    }

    setDatePickerValue(date);
  };

  const onTitleChange = (value: string) => {
    setTitleValue({ value, isTouched: true });
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputRowContainer}>
        <Input
          style={styles.inputRow}
          isInvalid={
            (amountValue.isTouched || isFormSubmited) &&
            !validation.fields.amount
          }
          label="Amount, $"
          keyboardType="decimal-pad"
          value={amountValue.value}
          onChangeText={onAmountChange}
          returnKeyType="done"
          getInputRef={amountInputRef}
          onSubmitEditing={() => titleInputRef.current?.focus()}
          blurOnSubmit={false}
        />

        <View>
          <Input
            style={styles.inputRow}
            label="Date"
            value={dateFormatter.format(datePickerValue)}
            editable={false}
          />

          <DateTimePicker
            value={datePickerValue}
            onChange={onDatePickerChange}
            style={styles.datePicker}
            maximumDate={new Date()}
          />
        </View>
      </View>
      <Input
        isInvalid={
          (titleValue.isTouched || isFormSubmited) && !validation.fields.title
        }
        label="Title"
        multiline
        value={titleValue.value}
        onChangeText={onTitleChange}
        getInputRef={titleInputRef}
      />

      <Spacing size={16} />

      {getActions({
        amount: parseFloat(amountValue.value),
        date: datePickerValue.getTime(),
        title: titleValue.value.trim(),
        validation,
        onSubmit: () => setIsFormSubmited(true),
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  form: { marginVertical: 30 },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text_primary,
    marginVertical: 24,
    textAlign: 'center',
  },

  inputRowContainer: { flexDirection: 'row', justifyContent: 'space-between' },

  inputRow: { flex: 1 },

  datePicker: {
    opacity: 0.05,
    position: 'absolute',
    left: 0,
    top: 8,
    height: '100%',
    width: '100%',
  },
});
