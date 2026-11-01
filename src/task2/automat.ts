import * as fs from 'node:fs/promises'

export async function getToken(
    authority: string,
    audience: string,
    clientId: string,
    clientSecret: string,
    scope: string,
): Promise<string> {
    const res = await fetch(`${authority}/oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            audience,
            grant_type: 'client_credentials',
            scope,
        }),
    })

    const resBody = await res.json()
    return resBody.access_token
}

export async function issuePass(
    url: string,
    token: string,
    name: string,
    document: string,
): Promise<void> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, document }),
    })
    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
    }

    const location = res.headers.get('Location')
    if (location === null) {
        throw new Error('Response did not return `Location` header')
    }

    const id = location.split('/').pop()
    if (id === undefined) {
        throw new Error('Could not extract id from `Location` header')
    }

    if (res.headers.get('Content-Type') !== 'image/png') {
        throw new Error("Response isn't a PNG image")
    }

    const buffer = Buffer.from(await res.arrayBuffer())
    await fs.writeFile(`${id}.png`, buffer)
}
