import {runSingleBatch} from "../flows/batchFlowSingle.js";
import {runBatch} from "../flows/batchFlowAll";

export const options = {
    vus: 1,
    duration: '1m',
    tags: {scenario: 'smoke'}
}

const selected = cases[__env.ENDPOINT || "primes"]

export default function (){
    runBatch()
}