import {GO_URL, JAVA_URL, TS_URL} from "../shared/config";
import {params} from "../shared/params";
import http from "k6/http"
import {check} from "k6"
import {bodyHash, bodyMixed, bodyOrders, bodyPrimes, bodySort} from "../shared/bodies";

function pickEndpoint(){
    const r = Math.random();

    if(r < 0.2) return {path: "/health", method: "GET", body: null, endpoint: "health"}
    if(r < 0.5) return {path: "/compute/hash", method: "POST", body: bodyHash, endpoint: "compute_hash"}
    if(r < 0.7) return {path: "/compute/prime", method: "POST", body: bodyPrimes, endpoint: "compute_prime"}
    if(r < 0.85) return {path: "/compute/mixed", method: "POST", body: bodyMixed, endpoint: "compute_mixed"}
    if(r < 0.95) return {path: "/compute/sort", method: "POST", body: bodySort, endpoint: "compute_sort"}
    return {path: "/orders/aggregate", method: "POST", body: bodyOrders, endpoint: "orders_aggregate"}
}


export function runBatchReal(){
    const {path, method, body, endpoint} = pickEndpoint()

    const reqs = {
        java: [method, `${JAVA_URL}${path}`, body, params("java_api", endpoint)],
        ts: [method, `${TS_URL}${path}`, body, params("ts_api", endpoint)],
        go: [method, `${GO_URL}${path}`, body, params("go_api", endpoint)],
    }
    const res = http.batch(reqs)

    check(res.java, {'java 200': (r) => r.status === 200});
    check(res.ts, {'ts 200': (r) => r.status === 200});
    check(res.go, {'go 200': (r) => r.status === 200});
}