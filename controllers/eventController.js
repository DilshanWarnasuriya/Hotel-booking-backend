import Event from "../models/event.js";
import { isAdmin } from "./userController.js";

export function save(req, res) {
    if (isAdmin(req)) {
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

export function getAll(req, res) {
    Event.find().then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json({ message: "Server error" });
    });
}

export function update(req, res) {
    if (isAdmin(req)) {
        Event.updateOne({ name: req.params.name }, req.body).then(() => {
            res.json({ message: "Event update Success" });
        }).catch((err) => {
            res.json({
                message: "Event update Fail",
                error: err
            });
        });
    }else res.json({ message: "not permission" });
}

export function disable(req, res) {
    if(isAdmin(req)){
        Event.updateOne({ name: req.params.name }, { disabled: true }).then(() => {
            res.json({ message: "Event disable Success" });
        }).catch((err) => {
            res.json({
                message: "Event disable Fail",
                error: err
            });
        });
    }else res.json({ message: "not permission" });
    
}

export function enable(req, res) {
    if(isAdmin(req)){
        Event.updateOne({ name: req.params.name }, { disabled: false }).then(() => {
            res.json({ message: "Event enable Success" });
        }).catch((err) => {
            res.json({
                message: "Event enable Fail",
                error: err
            });
        });
    }else res.json({ message: "not permission" });   
}

export function remove(req, res){
    if(isAdmin(req)){
        Event.deleteOne({name: req.params.name}).then(() => {
            res.json({ message: "Event delete Success" });
        }).catch((err) => {
            res.json({
                message: "Event delete Fail",
                error: err
            });
        });
    }else res.json({ message: "not permission" });
}