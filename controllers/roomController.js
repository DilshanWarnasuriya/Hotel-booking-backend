import Room from "../models/room.js";
import { isAdmin } from "./userController.js";


export function save(req, res) {
    if (isAdmin(req)) {
        const newRoom = new Room(req.body);
        newRoom.save().then((room) => {
            res.json({
                message: "Room added success",
                room: room
            })
        }).catch((err) => {
            res.json({
                message: "Room added fail",
                error: err
            })
        });
    } else res.json({ message: "not permission" });
}

export function getAll(req, res) {
    Room.find().then((result) => {
        res.json(result)
    }).catch(() => {
        res.json({ message: "Server Error" });
    });
}

export function remove(req, res) {
    if (isAdmin(req)) {
        Room.deleteOne({ number: req.params.number }).then(() => {
            res.json({ message: "Room delete success" })
        }).catch(() => {
            res.json({ message: "Room delete fail" })
        });
    } else res.json({ message: "not permission" });
}

export function update(req, res) {
    if (isAdmin(req)) {
        Room.updateOne({ number: req.params.number }, req.body).then(() => {
            res.json({ message: "Room update success" })
        }).catch(() => {
            res.json({ message: "Room update fail" })
        });
    } else res.json({ message: "not permission" });
}