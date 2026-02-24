import http from "k6/http";
import exec from "k6/execution";
import { sleep, check } from "k6";

import {getBaseUrl, THINK_TIME_SMOKE} from "../shared/config.js";
import { params } from "../shared/params.js";
import { cases } from "../shared/cases.js";
import {patternSmoke} from "../shared/pattern.js";

export const options = {
    stages: [
        { duration: "60s", target: 2}, // Warmup
        { duration: "30s", target: 0}, // Pause
        { duration: "120s", target: 2}, // Smoke Test
    ],
    tags: { scenario: "smoke" },
};

export default function () {
    const baseUrl = getBaseUrl();

    const iteration = exec.scenario.iterationInTest;
    const index = iteration % patternSmoke.length;

    const key = patternSmoke[index];
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
    sleep(THINK_TIME_SMOKE)
}