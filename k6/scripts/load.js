import http from "k6/http";
import exec from "k6/execution";
import { sleep, check } from "k6";

import {getBaseUrl, THINK_TIME_LOAD} from "../shared/config.js";
import {cases} from "../shared/cases.js";
import {params} from "../shared/params.js";
import {patternLoad} from "../shared/pattern.js";

export const options = {
    stages: [
        {duration: '60s', target: 5}, //Warmup
        {duration: '30s', target: 0}, // Pause
        {duration: '2m', target: 15}, // Ramp up
        {duration: '8m', target: 30}, // Load über 8 min
    ],
    tags: { scenario: "load" },
};

export default function () {
    const baseUrl = getBaseUrl();

    const iteration = exec.scenario.iterationInTest;
    const index = iteration % patternLoad.length;

    const key = patternLoad[index];
    const request = cases[key];

    const url = `${baseUrl}${request.path}`;
    const p = params(__ENV.API, request.endpoint);

    let res;
    if (request.method === "GET") {
        res = http.get(url, p);
    } else {
        res = http.post(url, request.body, p);
    }

    check(res, { "status is 200": (r) => r.status === 200 });
    sleep(THINK_TIME_LOAD)
}