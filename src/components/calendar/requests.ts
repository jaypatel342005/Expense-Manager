import { prisma } from '@/lib/prisma'
import { verifySession } from '@/lib/session'
import type { IEvent } from '@/components/calendar/interfaces'

/** Formats a number as compact Indian Rupee: ₹1.2K, ₹3.5M, ₹2.1Cr */
function formatAmount(value: number | null | undefined): string {
  const n = Number(value ?? 0);
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(1).replace(/\.0$/, '')}Cr`;
  if (n >= 1_00_000)    return `₹${(n / 1_00_000).toFixed(1).replace(/\.0$/, '')}L`;
  if (n >= 1_000)       return `₹${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return `₹${n}`;
}

export const getEvents = async (): Promise<IEvent[]> => {
  const session = await verifySession()
  if (!session?.userId) return []

  const userId = parseInt(session.userId as string)

  const isNormalUser = session.role !== 'ADMIN'

  try {
    const queryWhere = isNormalUser ? {
      OR: [
        { UserID: userId },
        { peoples: { UserID: userId } }
      ]
    } : undefined;

    const [expenses, incomes] = await Promise.all([
      prisma.expenses.findMany({
        where: queryWhere,
        include: { categories: true, users: true, peoples: true },
      }),
      prisma.incomes.findMany({
        where: queryWhere,
        include: { categories: true, users: true, peoples: true },
      }),
    ])

    const expenseEvents: IEvent[] = expenses.map(e => {
      const startDate = new Date(e.ExpenseDate);
      startDate.setHours(10, 0, 0, 0); // 10:00 AM local
      const endDate = new Date(startDate);
      endDate.setHours(11, 0, 0, 0);   // 11:00 AM local

      return {
        id: `exp-${e.ExpenseID}`,
        title: `${e.ExpenseDetail || 'Expense'} (${formatAmount(Number(e.Amount))})`,
        description: e.Description || e.categories?.CategoryName || 'Expense',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        color: 'red',
        user: {
          id: e.peoples?.PeopleName || e.users?.UserName || 'You',
          name: e.peoples?.PeopleName || e.users?.UserName || 'You',
          picturePath: e.users?.ProfileImage || 'https://i.pravatar.cc/150?u=' + (e.peoples?.PeopleID || e.users?.UserID || userId),
        },
      }
    })

    const incomeEvents: IEvent[] = incomes.map(i => {
      const startDate = new Date(i.IncomeDate);
      startDate.setHours(10, 0, 0, 0); // 10:00 AM local
      const endDate = new Date(startDate);
      endDate.setHours(11, 0, 0, 0);   // 11:00 AM local
      
      return {
        id: `inc-${i.IncomeID}`,
        title: `${i.IncomeDetail || 'Income'} (${formatAmount(Number(i.Amount))})`,
        description: i.Description || i.categories?.CategoryName || 'Income',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        color: 'green',
        user: {
          id: i.peoples?.PeopleName || i.users?.UserName || 'You',
          name: i.peoples?.PeopleName || i.users?.UserName || 'You',
          picturePath: i.users?.ProfileImage || 'https://i.pravatar.cc/150?u=' + (i.peoples?.PeopleID || i.users?.UserID || userId),
        },
      }
    })

    return [...expenseEvents, ...incomeEvents]
  } catch (error) {
    console.error("Failed to fetch events from Prisma:", error)
    return []
  }
}

export const getUsers = async () => {
    const session = await verifySession()
    if (!session?.userId) return []

    const userId = parseInt(session.userId as string)
    const isNormalUser = session.role !== 'ADMIN'

    try {
      const peoplesQuery = isNormalUser ? { UserID: userId } : undefined;

      const peoples = await prisma.peoples.findMany({
        where: peoplesQuery,
        include: { users: true }
      });

      return peoples.map(p => ({
          id: p.PeopleName,
          name: p.PeopleName,
          picturePath: p.users?.ProfileImage || 'https://i.pravatar.cc/150?u=' + p.PeopleID,
      }));
    } catch {
      return [
          {
              id: 'You',
              name: 'You',
              picturePath: 'https://i.pravatar.cc/150?u=' + userId,
          }
      ]
    }
}
