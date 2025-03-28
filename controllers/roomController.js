import Room from "../Models/room.js";
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

export function findByNumber(req, res) {
    Room.findOne({ number: req.params.number }).then((room) => {
        if (room) {
            res.json({
                message: "room found",
                room: room
            })
        }
        else {
            res.json({ message: "room not found" })
        }
    }).catch((err) => {
        res.json({ message: "Server error" })
    });
}

export function findByCategory(req, res) {
    Room.findOne({ category: req.params.category }).then((room) => {
        if (room) {
            res.json({
                message: "room found",
                room: room
            })
        }
        else {
            res.json({ message: "room not found" })
        }
    }).catch((err) => {
        res.json({ message: "Server error" })
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

export function disable(req, res) {
    if (isAdmin(req)) {
        Room.updateOne({ number: req.params.number }, { available: false }).then(() => {
            res.json({ message: "Room disable success" })
        }).catch(() => {
            res.json({ message: "Room disable fail" })
        });
    } else res.json({ message: "not permission" });
}

export function enable(req, res) {
    if (isAdmin(req)) {
        Room.updateOne({ number: req.params.number }, { available: true }).then(() => {
            res.json({ message: "Room enable success" })
        }).catch(() => {
            res.json({ message: "Room enable fail" })
        });
    } else res.json({ message: "not permission" });
}
