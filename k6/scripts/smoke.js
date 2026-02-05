import {runSingleBatch} from "../flows/batchFlowSingle.js";
import {sleep} from "k6";
import {THINK_TIME_SMOKE} from "../shared/config.js";
import {pickEndpoint} from "../shared/pickEndpoint.js";

export const options = {
    vus: 1,
    duration: '1m',
    tags: {scenario: 'smoke'}
}



export default function (){
    const {path, method, body, endpoint} = pickEndpoint()
    runSingleBatch(path, method, body, endpoint);
    sleep(THINK_TIME_SMOKE)
}