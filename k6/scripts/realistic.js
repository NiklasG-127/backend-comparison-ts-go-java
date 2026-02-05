import {sleep} from "k6"
import {pickEndpoint} from "../shared/pickEndpoint.js";
import {runSingleBatch} from "../flows/batchFlowSingle.js";

export const options = {
    vus: 1,
    duration: '1m',
    tags: {scenario: 'real'}
}

export default function (){
    const {path, method, body, endpoint} = pickEndpoint()
    runSingleBatch(path, method, body, endpoint);
    sleep(0.2)
}