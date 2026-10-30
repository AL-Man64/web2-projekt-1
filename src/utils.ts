export function getEnvVar(name: string, defaultValue: string): string {
    const value = process.env[name]
    if (value === undefined) {
        console.warn(`Environment variable ${name} is not set, using default value ${defaultValue}`)
        return defaultValue
    }
    return value
}
