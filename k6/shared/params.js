export function params(api, route) {
    return {
        headers: {'Content-Type': 'application/json'},
        tags: {api, route},
        timeout: '5s'
    }
}