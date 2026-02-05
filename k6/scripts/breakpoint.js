import {cases} from "../shared/cases";
import {runSingleBatch} from "../flows/batchFlowSingle";

export const options = {

}

const selected = cases[__ENV.ENDPOINT || "primes"]

export default function (){
    runSingleBatch(selected)
}