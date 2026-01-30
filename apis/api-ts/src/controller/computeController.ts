import {Request, Response} from "express";
import {hashingService, mixedService, primeService, sortingService} from "../service/computeService";

// Controller für Primzahl Endpoint
export function primeHandler(req: Request, res: Response) {
    // Holt limit aus dem Request-Body und legt type auf number fest
    const rawLimit = req.body.limit;
    const limit = Number(rawLimit);
    // Überprüft, dass Limit größer als 0 ist und eine Zahl (Integer)
    if(!Number.isInteger(limit) || limit < 0){
        return res.status(400).json({error: "Limit must be an integer >= 0"})
    }
    // Gibt das Limit an Service layer und bekommt Anzahl der Primzahlen sowie die Letzte Primzahl zurück
    const {count, lastPrime} = primeService(limit);
    return res.status(200).json({limit, count, lastPrime});
}

// Controller für Sortierung Endpoint
export function sortingHandler(req: Request, res: Response) {
    // Holt das Array aus dem Request-Body und übergibt es an Service. Dann wird das sortierte zurück an den Client gegeben
    const numArr = req.body.values;
    const sorted = sortingService(numArr);
    return res.status(200).json({sorted});
}

// Controller für Hash Endpoint
export function hashingHandler(req: Request, res: Response) {
    // Dekonstruiert den Request-Body und holt das Wort sowie die Wiederholungen aus dem Request Body
    const {toBeHashed, iterations} = req.body;
    // Überprüft, dass Wiederholungen ein Integer ist und positiv ist.
    if(!Number.isInteger(iterations) || iterations <= 0){
        return res.status(400).json({error: "Iterations must be a positive integer"})
    }
    // Gibt das Wort sowie Wiederholungen an die Serviceebene und bekommt den hash zurück
    const hashedValue = hashingService(toBeHashed, iterations);
    return res.status(200).json({hash: hashedValue});
}

// Controller für den gemischten Endpoint
export function mixedHandler(req: Request, res: Response) {
    // Dekonstruiert den body und holt die User raus.
    const {users} = req.body;
    // Übergibt die User an die Serviceebene
    const userOutput = mixedService(users);
    return res.status(200).json({userOutput});
}
