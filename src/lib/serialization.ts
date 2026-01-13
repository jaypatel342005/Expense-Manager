
export function serializeData<T>(data: T): T {
    if (data === null || data === undefined) {
        return data;
    }

    if (typeof data === 'object') {
        if (data instanceof Date) {
            return data.toISOString() as any;
        }
        
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
