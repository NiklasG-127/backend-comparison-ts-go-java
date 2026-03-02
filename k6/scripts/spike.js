import http from "k6/http";
import { check, sleep } from "k6";

import {cases} from "../shared/cases.js";
import {getBaseUrl} from "../shared/config.js";
import {params} from "../shared/params.js";


export const options = {
    stages: [
        { duration: "60s", target: 2 },  // Warmup
        { duration: "30s", target: 0 },  // Pause

        { duration: "1s",  target: 500 }, // Spike: schnell hoch
        { duration: "29s", target: 500 }, // halten

        { duration: "1s",  target: 1 },  // schnell runter
        { duration: "59s", target: 1 },  // Erholung

        { duration: "1s",  target: 1000 }, // 2. Spike
        { duration: "29s", target: 1000 }, // halten

        { duration: "1s",  target: 1 },  // runter
        { duration: "59s", target: 1 },  // Stabilisierung
    ],
    tags: { scenario: "spike" },
};
export default function () {
    const baseUrl = getBaseUrl();

    const request = cases[__ENV.ROUTE];

    const url = `${baseUrl}${request.path}`;
    const p = params(__ENV.API, request.endpoint);

    let res;
    if (request.method === "GET") {
        res = http.get(url, p);
    } else {
        res = http.post(url, request.body, p);
    }

    check(res, { "status is 200": (r) => r.status === 200 });
    sleep(0.1)
}