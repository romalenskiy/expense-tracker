import { BaseController } from '@api/baseController';

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
