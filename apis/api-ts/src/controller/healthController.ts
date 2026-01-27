import {Request, Response} from "express";

// Health Controller der eine Response mit Status Ok zurückgibt
export default function healthController(req: Request, res: Response) {
    return res.status(200).json({"status": "Ok"});
}