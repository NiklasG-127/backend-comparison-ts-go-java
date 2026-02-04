import {runBatchReal} from "../flows/batchRealistic";
import {sleep} from "k6"

export const options = {
    vus: 1,
    duration: '1m',
    tags: {scenario: 'real'}
}

export default function (){
    runBatchReal()
    sleep(0.2)
}