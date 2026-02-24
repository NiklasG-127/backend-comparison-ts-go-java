import http from "k6/http";
import exec from "k6/execution";
import { sleep, check } from "k6";

import {getBaseUrl, THINK_TIME_SOAK} from "../shared/config.js";
import {cases} from "../shared/cases.js";
import {params} from "../shared/params.js";
import {patternSoak} from "../shared/pattern.js";


export const options = {
    stages: [
        {duration: '2m', target: 5}, // Warmup
        {duration: '30s', target: 0}, // pause
        {duration: '60m', target: 12}, // 60 min Soak
    ],
    tags: { scenario: "soak" },
};

export default function () {
    const baseUrl = getBaseUrl();

    const iteration = exec.scenario.iterationInTest;
    const index = iteration % patternSoak.length;

    const key = patternSoak[index];
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
    sleep(THINK_TIME_SOAK)
}
