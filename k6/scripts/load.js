import {pickEndpoint} from "../shared/pickEndpoint.js";
import {runSingleBatch} from "../flows/batchFlowSingle.js";
import {THINK_TIME_LOAD} from "../shared/config.js";
import {sleep} from "k6"

export const options = {

}

export default function (){
    const {path, method, body, endpoint} = pickEndpoint()
    runSingleBatch(path, method, body, endpoint)
    sleep(THINK_TIME_LOAD)
}