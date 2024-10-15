import Event from "../models/event.js";
import { isAdmin } from "./userController.js";

export function save(req, res) {
    if(isAdmin(req)){
        const newEvent = new Event(req.body);
        newEvent.save().then((event) => {
            res.json({
                message: "Event Added Success",
                event: event
            })
        }).catch((err) => {
            res.json({
                message: "Event Added Fail",
                error: err
            })
        });
    }
    else res.json({ message: "not permission" });
}

export function getAll(req, res){
    Event.find().then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json({ message: "Server error" });
    });
}