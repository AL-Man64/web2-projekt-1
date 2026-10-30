export interface Pass {
    id: string
    name: string
    document: string
    issuedAt: Date
    status: string
}

export interface PassWithReadableDate {
    id: string
    name: string
    document: string
    issuedAt: string
    status: string
}

export function resolvePassDate(pass: Pass): PassWithReadableDate {
    return {
        id: pass.id,
        name: pass.name,
        document: pass.document,
        issuedAt: pass.issuedAt.toLocaleString('en'),
        status: pass.status,
    }
}
