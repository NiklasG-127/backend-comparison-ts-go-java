import http from "k6/http";

import { check } from "k6";

import {cases} from "../shared/cases.js";
import {getBaseUrl} from "../shared/config.js";
import {params} from "../shared/params.js";


export const options = {
    stages: [
        { duration: "60s", target: 2 },  // Warmup
        { duration: "30s", target: 0 },  // Pause

        { duration: "1s",  target: 1000 },
        { duration: "59s", target: 1000 },

        { duration: "1s",  target: 2000 },
        { duration: "59s", target: 2000 },

        { duration: "1s",  target: 3000 },
        { duration: "59s", target: 3000 },

        { duration: "1s",  target: 4000 },
        { duration: "59s", target: 4000 },

        { duration: "1s",  target: 1 },
        { duration: "119s",  target: 1 },
    ],
    tags: { scenario: "stress"},
    thresholds: {
        http_req_failed: ["rate<0.05"], // < 5% Fehler der Anfragen
        http_req_duration: ["p(99)<30000"], // < 30s Als Antwortzeit
        checks: ["rate>0.95"] // 95% der Checks ok
    }
}

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

}