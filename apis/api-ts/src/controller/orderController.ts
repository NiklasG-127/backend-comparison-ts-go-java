import {Request, Response} from "express";
import {AggregateOrder, OrderType} from "../types/ordersType";
import {aggregateOrderService} from "../service/orderService";

// Controller für Order Endpoint
export function orderHandler(req: Request, res: Response) {
    // Holt Daten aus dem Request-Body, casted diese als OrderType-Array und geht sicher, dass die Daten wirklich ein Array sind
    const data = req.body.orders as OrderType[]
    if(!Array.isArray(data)) {
        return res.status(400).json({error: "Orders must be an array"});
    }
    // Aggregiert die Orders über die Serviceebene
    const result: AggregateOrder[] = aggregateOrderService(data);
    // Gibt die Orders nach Kunden aggregiert zurück
    return res.status(200).json({customers: result});
}