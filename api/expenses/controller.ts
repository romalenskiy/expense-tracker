import { BaseController } from '@api/baseController';
import { SessionStorage } from '@store/sessionStorage';

import { ExpenseObj } from './types';

type GetExpensesParams = { id?: string };
type GetExpensesResponse = ExpenseObj[];

type CreateExpenseParams = { expense: Omit<ExpenseObj, 'id'> };
type CreateExpenseResponse = { id: string };

type UpdateExpenseParams = { id: string; expense: Omit<ExpenseObj, 'id'> };
type UpdateExpenseResponse = Omit<ExpenseObj, 'id'>;

type DeleteExpenseParams = { id: string };
type DeleteExpenseResponse = { id: string };

export class ExpensesController extends BaseController {
  protected static self?: ExpensesController;
  public static get: () => ExpensesController;

  constructor() {
    super({
      baseURL:
        'https://expense-tracker-35fe9-default-rtdb.europe-west1.firebasedatabase.app',
    });

    this.request.interceptors.request.use(async (config) => {
      const session = await SessionStorage.get().getSession();
      if (!session) {
        console.error(new Error('No authentication'));
        return config;
      }

      const urlObj = new URL(`${config.baseURL}${config.url}`);
      urlObj.searchParams.append('auth', session.idToken);

      config.url = `${urlObj.pathname}${urlObj.search}`;
      return config;
    });
  }

  public async getExpenses({
    id,
  }: GetExpensesParams): Promise<GetExpensesResponse> {
    const session = await SessionStorage.get().getSession();
    if (!session) {
      throw new Error('No authentication');
    }

    const { data } = await this.request.get<Record<
      string,
      Omit<ExpenseObj, 'id'>
    > | null>(`/expenses.json?orderBy="ownerId"&equalTo="${session.uid}"`);

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
    const session = await SessionStorage.get().getSession();
    if (!session) {
      throw new Error('No authentication');
    }

    const { data } = await this.request.post(`/expenses.json?`, {
      ownerId: session.uid,
      ...expense,
    });

    return { id: data.name };
  }

  public async updateExpense({
    id,
    expense,
  }: UpdateExpenseParams): Promise<UpdateExpenseResponse> {
    const session = await SessionStorage.get().getSession();
    if (!session) {
      throw new Error('No authentication');
    }

    const { data } = await this.request.put(`/expenses/${id}.json`, {
      ownerId: session.uid,
      ...expense,
    });

    return data;
  }

  public async deleteExpense({
    id,
  }: DeleteExpenseParams): Promise<DeleteExpenseResponse> {
    const { data } = await this.request.delete(`/expenses/${id}.json`);
    return data;
  }
}
