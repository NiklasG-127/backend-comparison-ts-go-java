import {runSingleBatch} from "../flows/batchFlowSingle.js";
import {cases} from "../shared/cases.js";

export const options = {

}

const selected = cases[__ENV.ENDPOINT || "primes"]

export default function (){
    runSingleBatch(selected)
}