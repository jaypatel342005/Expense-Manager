/**
 * Serializes data to be passed from Server Components to Client Components.
 * Converts Decimal to number and Date to ISO string.
 * This is necessary because Next.js cannot serialize complex objects like Decimal directly.
 */
export function serializeData<T>(data: T): T {
    if (data === null || data === undefined) {
        return data;
    }

    if (typeof data === 'object') {
        if (data instanceof Date) {
            return data.toISOString() as any;
        }

        // Check for Decimal (Prisma/Decimal.js) using duck typing
        // We check for .toNumber() and .toFixed() which are characteristic of Decimal types
        const asAny = data as any;
        if (
            asAny &&
            typeof asAny.toNumber === 'function' &&
            typeof asAny.toFixed === 'function'
        ) {
            return asAny.toNumber();
        }

        if (Array.isArray(data)) {
            return data.map(item => serializeData(item)) as any;
        }

        const serialized: any = {};
        for (const key in data) {
            serialized[key] = serializeData(asAny[key]);
        }
        return serialized;
    }

    return data;
}
