import axios, { AxiosError } from 'axios';

import { ExpenseObj } from './types';

type GetExpensesParams = { id?: string };
type GetExpensesResponse = ExpenseObj[];

type CreateExpenseParams = { expense: Omit<ExpenseObj, 'id'> };
type CreateExpenseResponse = { id: string };

type UpdateExpenseParams = { id: string; expense: Omit<ExpenseObj, 'id'> };
type UpdateExpenseResponse = Omit<ExpenseObj, 'id'>;

type DeleteExpenseParams = { id: string };
type DeleteExpenseResponse = { id: string };

class API {
  private readonly baseUrl =
    'https://expense-tracker-35fe9-default-rtdb.europe-west1.firebasedatabase.app';

  private readonly request = axios.create({ baseURL: this.baseUrl });

  constructor() {
    this.request.interceptors.request.use((config) => {
      console.log(
        `Request start: ${config.method?.toUpperCase()} "${config.url}" ${
          config.data ? JSON.stringify(config.data) : '{}'
        }\n-----------------------------------------------------`,
      );

      return config;
    });

    this.request.interceptors.response.use(
      (response) => {
        const { config, data } = response;
        console.log('adsads');
        console.log(
          `Request end: ${config.method?.toUpperCase()} "${config.url}" ${
            data ? JSON.stringify(data) : '{}'
          }\n-----------------------------------------------------`,
        );

        return response;
      },
      (error) => {
        if (error instanceof AxiosError) {
          console.error(
            `Request error: ${error.config?.method?.toUpperCase()} "${error
              .config?.url}" ${
              error.message
            }\n-----------------------------------------------------`,
          );
        }
      },
    );
  }

  public async getExpenses({
    id,
  }: GetExpensesParams): Promise<GetExpensesResponse> {
    const { data } = await this.request.get<Record<
      string,
      Omit<ExpenseObj, 'id'>
    > | null>('/expenses.json');

    if (!data) {
      return [];
    }

    return Object.entries(data).reduce<ExpenseObj[]>((acc, [key, value]) => {
      acc.push({ id: key, ...value });
      return acc;
    }, []);
  }

  public async createExpense({
    expense,
  }: CreateExpenseParams): Promise<CreateExpenseResponse> {
    const { data } = await this.request.post('/expenses.json', expense);

    return { id: data.name };
  }

  public async updateExpense({
    id,
    expense,
  }: UpdateExpenseParams): Promise<UpdateExpenseResponse> {
    const { data } = await this.request.put(`/expenses/${id}.json`, expense);

    return data;
  }

  public async deleteExpense({
    id,
  }: DeleteExpenseParams): Promise<DeleteExpenseResponse> {
    const { data } = await this.request.delete(`/expenses/${id}.json`);
    return data;
  }
}

export const FirebaseApi = new API();
