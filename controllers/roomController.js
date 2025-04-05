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

export function retrieve(req, res) {

    const type = req.query.type; // filtering option
    const pageNumber = req.query.pageNo; // page number
    const recordCount = req.query.recordCount; // one page record count
    const skipRecord = (pageNumber - 1) * recordCount; // number of records to skip

    if (type == "All") { // All filter option
        Room.find().skip(skipRecord).limit(recordCount)
            .then((rooms) => {
                Room.countDocuments()
                    .then((totalRecord) => {
                        res.status(200).json({
                            message: "Rooms found",
                            rooms: rooms,
                            totalPage: Math.ceil(totalRecord / recordCount)
                        });
                    })
            })
            .catch((err) => {
                res.status(500).json({ message: "Server error occurred", error: err.message });
            });
    }
    else {
        Room.find({ disabled: type == "Disable" ? true : false }).skip(skipRecord).limit(recordCount)
            .then((rooms) => {
                Room.countDocuments({ disabled: type == "Disable" ? true : false })
                    .then((totalRecord) => {
                        res.status(200).json({
                            message: "Rooms found",
                            rooms: rooms,
                            totalPage: Math.ceil(totalRecord / recordCount)
                        });
                    })
            })
            .catch((err) => {
                res.status(500).json({ message: "Server error occurred", error: err.message });
            });
    }
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

