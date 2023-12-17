import { FC, ReactNode, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Input } from './Input';
import { Colors } from '../../../constants/colors';
import { Spacing } from '../../../ui/Spacing';

const dateFormatter = new Intl.DateTimeFormat('ru-RU');

const parseDateString = (dateString: string): Date => {
  return new Date(dateString.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'));
};

type Validation = {
  isValid: boolean;
  fields: { amount: boolean; date: boolean; title: boolean };
  errorMessage?: string;
};

type Props = {
  initialAmount?: number;
  initialDate?: Date;
  initialTitle?: string;
  getActions: (params: {
    amount: number;
    date: Date;
    title: string;
    validation: Validation;
    onSubmit: VoidFunction;
  }) => ReactNode;
};

export const ExpenseForm: FC<Props> = ({
  initialAmount = 0,
  initialDate = new Date(),
  initialTitle = '',
  getActions,
}) => {
  const amountInputRef = useRef<TextInput>(null);
  const dateInputRef = useRef<TextInput>(null);
  const titleInputRef = useRef<TextInput>(null);

  const [isFormSubmited, setIsFormSubmited] = useState(false);

  const [amountValue, setAmountValue] = useState({
    value: String(initialAmount || ''),
    isTouched: false,
  });
  const [dateValue, setDateValue] = useState(() => ({
    value: dateFormatter.format(initialDate).replace(/\.|,|\/|-/g, '.'),
    isTouched: false,
  }));
  const [titleValue, setTitleValue] = useState({
    value: initialTitle,
    isTouched: false,
  });

  const validation = useMemo<Validation>(() => {
    const amountValueNumber = parseFloat(amountValue.value);
    const dateValueObj = parseDateString(dateValue.value);
    const titleValueTrim = titleValue.value.trim();

    const isAmountValid =
      !Number.isNaN(amountValueNumber) && amountValueNumber > 0;
    const isDateValid =
      dateValueObj.toString() !== 'Invalid Date' &&
      dateValueObj.getTime() <= Date.now();
    const isTitleValid = titleValueTrim !== '';

    return {
      isValid: isAmountValid && isDateValid && isTitleValid,
      fields: { amount: isAmountValid, date: isDateValid, title: isTitleValid },
      errorMessage: !isAmountValid
        ? 'Amount should be greater than 0'
        : !isDateValid
          ? "Date cant't be in fututre and should match pattern: DD.MM.YYYY"
          : !isTitleValid
            ? 'Title should be not empty'
            : undefined,
    };
  }, [amountValue.value, dateValue.value, titleValue.value]);

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
  const onDateChange = (value: string) => {
    setDateValue({
      value: value
        .replaceAll(',', '.')
        .replace(/\./g, (match: string, offset: number, text: string) =>
          text.indexOf(match) === offset || text.lastIndexOf(match) === offset
            ? match
            : '',
        ),
      isTouched: true,
    });
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
          onSubmitEditing={() => dateInputRef.current?.focus()}
          blurOnSubmit={false}
        />

        <Input
          style={styles.inputRow}
          isInvalid={
            (dateValue.isTouched || isFormSubmited) && !validation.fields.date
          }
          label="Date"
          keyboardType="decimal-pad"
          placeholder="DD.MM.YYYY"
          maxLength={10}
          value={dateValue.value}
          onChangeText={onDateChange}
          returnKeyType="done"
          getInputRef={dateInputRef}
          onSubmitEditing={() => titleInputRef.current?.focus()}
          blurOnSubmit={false}
        />
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
        date: parseDateString(dateValue.value),
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
});
