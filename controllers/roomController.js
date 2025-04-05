import Room from "../Models/room.js";
import { isAdmin } from "./userController.js";


export function persist(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    const newRoom = new Room(req.body);
    newRoom.save()
        .then((room) => {
            res.status(201).json({
                message: "Room added successful",
                room: room
            })
        })
        .catch((err) => {
            if (err.message.includes("number_1")) {
                res.status(409).json({ message: "Room number is already used" })
            }
            else {
                res.status(500).json({ message: "Server error occurred", error: err.message });
            }

        })
}

export function retrieve(req, res) {

    const type = req.query.type; // filtering option
    const pageNumber = req.query.pageNo; // page number
    const recordCount = req.query.recordCount; // one page record count
    const skipRecord = (pageNumber - 1) * recordCount; // number of records to skip

    if (type == "All") { // All filter option
        Room.find().sort({ number: 1 }).skip(skipRecord).limit(recordCount)
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
    Room.findOne({ number: req.params.number })
        .then((room) => {
            if (!room) {
                return res.status(404).json({ message: "Room Not found" });
            }
            res.status(200).json({
                message: "Room found",
                room: room
            });
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function update(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    Room.updateOne({ number: req.body.number }, req.body)
        .then(() => {
            res.status(200).json({ message: "Room Update Successful" });
        })
        .catch(() => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function remove(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    Room.deleteOne({ number: req.params.number })
        .then(() => {
            res.status(200).json({ message: "Room Delete Successful" });
        })
        .catch(() => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

