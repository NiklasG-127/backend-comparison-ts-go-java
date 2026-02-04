import {GO_URL, JAVA_URL, TS_URL} from "../shared/config.js";
import {bodyHash, bodyMixed, bodyOrders, bodyPrimes, bodySort} from "../shared/bodies.js";
import {params} from "../shared/params.js";
import http from "k6/http"
import {check} from "k6"

export function runBatch(){
    const responses = http.batch([
        ["GET", `${JAVA_URL}/health`, null, {tags: {api: "java_api", route: "health"}}],
        ["GET", `${TS_URL}/health`, null, {tags: {api: "ts_api", route: "health"}}],
        ["GET", `${GO_URL}/health`, null, {tags: {api: "go_api", route: "health"}}],

        ["POST", `${JAVA_URL}/compute/primes`, bodyPrimes, params("java_api", "compute_primes")],
        ["POST", `${TS_URL}/compute/primes`, bodyPrimes, params("ts_api", "compute_primes")],
        ["POST", `${GO_URL}/compute/primes`, bodyPrimes, params("go_api", "compute_primes")],

        ["POST", `${JAVA_URL}/compute/mixed`, bodyMixed, params("java_api", "compute_mixed")],
        ["POST", `${TS_URL}/compute/mixed`, bodyMixed, params("ts_api", "compute_mixed")],
        ["POST", `${GO_URL}/compute/mixed`, bodyMixed, params("go_api", "compute_mixed")],

        ["POST", `${JAVA_URL}/compute/sort`, bodySort, params("java_api", "compute_sort")],
        ["POST", `${TS_URL}/compute/sort`, bodySort, params("ts_api", "compute_sort")],
        ["POST", `${GO_URL}/compute/sort`, bodySort, params("go_api", "compute_sort")],

        ["POST", `${JAVA_URL}/compute/hash`, bodyHash, params("java_api", "compute_hash")],
        ["POST", `${TS_URL}/compute/hash`, bodyHash, params("ts_api", "compute_hash")],
        ["POST", `${GO_URL}/compute/hash`, bodyHash, params("go_api", "compute_hash")],

        ["POST", `${JAVA_URL}/orders/aggregate`, bodyOrders, params("java_api", "orders_aggregate")],
        ["POST", `${TS_URL}/orders/aggregate`, bodyOrders, params("ts_api", "orders_aggregate")],
        ["POST", `${GO_URL}/orders/aggregate`, bodyOrders, params("go_api", "orders_aggregate")],
    ])

    for(const r of responses){
        check(r, {'status is 200': x => x.status === 200}, r.request.tags)
    }
    return responses;
}