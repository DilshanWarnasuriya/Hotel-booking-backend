import Booking from "../Models/booking.js";
import Room from "../Models/room.js";
import { isAdmin, isUser } from "./userController.js";

export async function create(req, res) {
    if (isUser(req)) {
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);

        if (startDate.getTime() < endDate.getTime() && startDate.getTime() > Date.now()) {

            const lastBooking = await Booking.findOne({ roomNo: req.body.roomNo }).sort({ endDate: -1 }).limit(1);
            const room = await Room.findOne({ number: req.body.roomNo });

            if (lastBooking && lastBooking.status != "cancel" && !compareDates(req.body.startDate, req.body.endDate, lastBooking.startDate, lastBooking.endDate)) {
                res.json({ message: "Sorry!. Can't book this room right now" })
            }
            else if (req.body.personCount > room.maxPerson) {
                res.json({ message: "Sorry!. Can't book this room. because a room has more than the maximum person count. Please see a bigger room" })
            }
            else {
                req.body.id = await Booking.countDocuments() + 1;
                const newBooking = new Booking(req.body);
                newBooking.save().then((booking) => {
                    res.json({
                        message: "Room Booking Success",
                        booking: booking
                    })
                }).catch((err) => {
                    res.json({
                        message: "Room Booking fail",
                        error: err
                    })
                });
            }
        }
        else {
            res.json({ message: "Please enter correct dates" })
        }
    } else res.json({ message: "not permission" });
}

export function retrieve(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }
    const status = req.query.status.toLowerCase();; // filtering option
    const pageNumber = req.query.pageNo; // page number
    const recordCount = req.query.recordCount; // one page record count
    const skipRecord = (pageNumber - 1) * recordCount; // number of records to skip

    Booking.find({ status: status }).sort({ id: -1 }).skip(skipRecord).limit(recordCount)
        .then(booking => {
            Booking.countDocuments({ status: status })
                .then((totalRecord) => {
                    res.status(200).json({
                        message: "Booking found",
                        booking: booking,
                        totalPage: Math.ceil(totalRecord / recordCount)
                    });
                })
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        });
}

export function findById(req, res) {
    if (isAdmin(req)) {
        Booking.find({ id: req.params.id }).then((result) => {
            res.json(result)
        }).catch(() => {
            res.json({ message: "Server error" })
        });
    } else res.json({ message: "not permission" });
}