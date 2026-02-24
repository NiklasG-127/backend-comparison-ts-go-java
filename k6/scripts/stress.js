import http from "k6/http";

import { check } from "k6";

import {cases} from "../shared/cases.js";
import {getBaseUrl} from "../shared/config";
import {params} from "../shared/params";


export const options = {
    stages: [
        {duration: '60s', target: 3}, // Warm up
        {duration: '30s', target: 0}, // Pause
        {duration: '60s', target: 10},
        {duration: '60s', target: 20},
        {duration: '60s', target: 30},
        {duration: '60s', target: 40},
        {duration: '60s', target: 50},
        {duration: '60s', target: 60},
        {duration: '60s', target: 80},
        {duration: '60s', target: 100},
    ],
    tags: { scenario: "stress"}
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