import {Router} from "express";
import {hashingHandler, mixedHandler, primeHandler, sortingHandler} from "../controller/computeController";

// Erstellt Router
const router: Router = Router();

// Legt route mit Methode fest und sagt, wohin die Anfragen weitergeben werden sollen.
router.post("/primes", primeHandler)
router.post("/sort", sortingHandler)
router.post("/hash", hashingHandler)
router.post("/mixed", mixedHandler)

// Exportiert den Router
export default router;