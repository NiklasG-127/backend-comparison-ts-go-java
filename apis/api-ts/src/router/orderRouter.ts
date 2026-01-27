import {Router} from "express";
import {orderHandler} from "../controller/orderController";

// Erstellt Router
const router: Router = Router();

// Legt route mit Methode fest und sagt, wohin die Anfragen weitergeben werden sollen.
router.post("/aggregate", orderHandler)

// Exportiert Router
export default router;