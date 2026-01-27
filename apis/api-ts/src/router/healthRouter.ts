import {Router} from "express";
import healthController from "../controller/healthController";

// Erstellt Router
const router: Router = Router();

// Legt route mit Methode fest und sagt, wohin die Anfragen weitergeben werden sollen.
router.get('/', healthController)


// Exportiert den Router
export default router;