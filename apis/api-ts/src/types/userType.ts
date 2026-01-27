export type UserInputType = {
    name: string,
    password: string,
    scores: number[],
    limit: number,
    iterations: number
}

export type UserOutputType = {
    id: string,
    name: string,
    hashedPassword: string,
    scores: number[],
    highestPrime: number
}