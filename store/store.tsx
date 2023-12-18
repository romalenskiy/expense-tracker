import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { ExpenseObj } from './types';

type StoreData = { expenses: ExpenseObj[] };

type StoreContextData = {
  store: StoreData;
  updateStore: (
    updateFn: (prevStoreData: StoreData) => Partial<StoreData>,
  ) => void;
};

const EXPENSES_MOCK: ExpenseObj[] = [
  {
    id: 'e1',
    title: 'Winter shoes',
    date: new Date('2022-01-15').getTime(),
    amount: 50.99,
  },
  {
    id: 'e2',
    title: 'Soundbar',
    date: new Date('2023-12-05').getTime(),
    amount: 42,
  },
  {
    id: 'e3',
    title: 'Vape liquid',
    date: new Date('2023-12-10').getTime(),
    amount: 10.2,
  },
  {
    id: 'e4',
    title: 'Bread',
    date: new Date('2023-12-13').getTime(),
    amount: 0.69,
  },
  {
    id: 'e5',
    title: 'Book',
    date: new Date('2023-12-15').getTime(),
    amount: 2,
  },
];

const storeInitialData: StoreContextData['store'] = {
  expenses: EXPENSES_MOCK,
};

const StoreContext = createContext<StoreContextData>({
  store: storeInitialData,
  updateStore: () => {},
});

type Props = { children: ReactNode };

export const StoreContextProvider: FC<Props> = ({ children }) => {
  const [storeData, setStoreData] = useState(storeInitialData);

  const updateStore: StoreContextData['updateStore'] = useCallback(
    (updateFn) => {
      setStoreData((prevValue) => {
        const newStoreData = updateFn(prevValue);
        return { ...prevValue, ...newStoreData };
      });
    },
    [setStoreData],
  );

  const contextValue = useMemo(
    () => ({ store: storeData, updateStore }),
    [updateStore, storeData],
  );

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
