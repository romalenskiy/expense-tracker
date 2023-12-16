import { FC } from 'react';
import { View } from 'react-native';

type Props = { size?: number };

export const Spacing: FC<Props> = ({ size = 8 }) => {
  return <View style={{ height: size }} />;
};
