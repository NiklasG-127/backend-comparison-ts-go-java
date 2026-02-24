export const TS_URL = 'http://my-ts-api:3060'
export const JAVA_URL = 'http://my-java-api:3070'
export const GO_URL = 'http://my-go-api:3080'

export const THINK_TIME_SMOKE = Number(0.3)
export const THINK_TIME_SOAK = Number(1)
export const THINK_TIME_LOAD = Number(0.5)

export function getBaseUrl() {
    const target = (__ENV.TARGET || "go").toLowerCase();
    if (target === "java") return JAVA_URL;
    if (target === "ts") return TS_URL;
    return GO_URL;
}