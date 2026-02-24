import http from "k6/http";
import { check } from "k6";

import {cases} from "../shared/cases.js";
import {getBaseUrl} from "../shared/config.js";
import {params} from "../shared/params.js";


export const options = {
    stages: [
        {duration: '60s', target: 3}, // Warm up
        {duration: '30s', target: 0}, // Pause
        {duration: '30s', target: 25}, // 1.Spike
        {duration: '60s', target: 5}, // Erholung
        {duration: '30s', target: 30}, // 2.Spike
        {duration: '60s', target: 5}, // Stabilisierung
    ],
    tags: { scenario: "spike"}
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