import {runBatch} from "../flows/batchFlowAll.js";
import {THINK_TIME} from "../shared/config.js";
import {sleep} from "k6"

export const options = {

}

export default function (){
    runBatch()
    sleep(THINK_TIME)
}