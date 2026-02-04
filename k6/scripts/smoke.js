import {runBatch} from "../flows/batchFlowAll.js";
import {sleep} from "k6"

export const options = {
    vus: 1,
    duration: '1m',
    tags: {scenario: 'smoke'}
}

export default function (){
    runBatch()
    sleep(1)
}