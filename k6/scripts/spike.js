import {runSingleBatch} from "../flows/batchFlowSingle.js";
import {cases} from "../shared/cases.js";

export const options = {
    scenarios: {
        api_load: {
            executor: 'ramping-arrival-rate',
            startRate: 10,
            timeUnit: '1s',
            preAllocatedVUs: 50,
            maxVUs: 2000,
            stages: [
                { target: 20, duration: '30s' },
                { target: 200, duration: '1m' },
                { target: 500, duration: '1m' },
                { target: 1000, duration: '1m' },
                { target: 2000, duration: '1m' },
                { target: 20, duration: '30s' },
            ]

        }
    }
}

const selected = cases[__ENV.ENDPOINT || "primes"];

export default function (){
    runSingleBatch(selected);
}