import { pass } from '../db/schema.ts'
import { db } from '../db/index.ts'
import { count, eq, sql } from 'drizzle-orm'
import type { Pass } from '../viewModels.ts'

export async function getTotalPasses(): Promise<{ total: number; active: number }> {
    const [row] = await db
        .select({
            total: count(),
            active: sql<number>`count(*) filter (where ${eq(pass.status, 'ACTIVE')})`.mapWith(
                Number,
            ),
        })
        .from(pass)

    if (row === undefined) {
        console.warn('Operation getTotalPasses did not return any rows, returning 0s')
        return { total: 0, active: 0 }
    }

    return { total: Number(row.total), active: Number(row.active) }
}

export async function getAllPasses(): Promise<Pass[]> {
    return await db.select().from(pass)
}

export async function getPass(id: string): Promise<Pass | undefined> {
    try {
        const passes = await db.select().from(pass).where(eq(pass.id, id))
        return passes[0]
    } catch (e) {
        console.error(e)
        return undefined
    }
}

export async function createPass(name: string, document: string): Promise<Pass | undefined> {
    const passes = await db.insert(pass).values({ name, document }).returning()
    return passes[0]
}

export async function deletePass(id: string): Promise<void> {
    await db.delete(pass).where(eq(pass.id, id))
}

export async function cancelPass(id: string): Promise<void> {
    await db.update(pass).set({ status: 'CANCELLED' }).where(eq(pass.id, id))
}
