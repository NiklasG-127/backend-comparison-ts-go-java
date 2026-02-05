import {THINK_TIME_SOAK} from "../shared/config.js";
import {sleep} from "k6"
import {runSingleBatch} from "../flows/batchFlowSingle.js";
import {pickEndpoint} from "../shared/pickEndpoint.js";

export const options = {

}

export default function (){
    const {path, method, body, endpoint} = pickEndpoint()
    runSingleBatch(path, method, body, endpoint)
    sleep(THINK_TIME_SOAK)
}