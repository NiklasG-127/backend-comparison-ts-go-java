import {GO_URL, JAVA_URL, TS_URL} from "../shared/config.js";
import {params} from "../shared/params.js";
import {check} from "k6"
import http from "k6/http"

export function runSingleBatch(selected){
    const {path, method, body, endpoint} = selected
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