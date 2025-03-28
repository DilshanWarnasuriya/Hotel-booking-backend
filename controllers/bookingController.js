import Booking from "../Models/booking.js";
import Room from "../Models/room.js";
import { isAdmin, isHaveUser, isUser } from "./userController.js";

export async function create(req, res) {
    if (isUser(req)) {
        const startDate = new Date(req.body.startDate) ;
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

export function getAll(req, res) {
    if (isAdmin(req)) {
        Booking.find().then((result) => {
            res.json(result)
        }).catch(() => {
            res.json({ message: "Server error" })
        });
    } else res.json({ message: "not permission" });
}

export function findById(req, res){
    if (isAdmin(req)) {
        Booking.find({ id: req.params.id }).then((result) => {
            res.json(result)
        }).catch(() => {
            res.json({ message: "Server error" })
        });
    } else res.json({ message: "not permission" });
}

export function findByEmail(req, res){
    if (isAdmin(req)) {
        Booking.find({ email: req.params.email }).then((result) => {
            res.json(result)
        }).catch(() => {
            res.json({ message: "Server error" })
        });
    } else res.json({ message: "not permission" });
}

export function cancel(req, res) {
    if (isHaveUser(req)) {
        Booking.updateOne({ id: req.params.id }, { status: "cancel" }).then(() => {
            res.json({ message: "Booking cancel success" })
        }).catch(() => {
            res.json({ message: "Booking cancel fail" })
        });
    } else res.json({ message: "not permission" });
}

export function confirm(req, res) {
    if (isHaveUser(req)) {
        Booking.updateOne({ id: req.params.id }, { status: "confirmed" }).then(() => {
            res.json({ message: "Booking confirm success" })
        }).catch(() => {
            res.json({ message: "Booking confirm fail" })
        });
    } else res.json({ message: "not permission" });
}


function compareDates(date1, date2, date3, date4) {
    const newStartDate = new Date(date1);
    const newEndDate = new Date(date2);
    const bookedStartDate = new Date(date3);
    const bookedEndDate = new Date(date4);

    if (newEndDate.getTime() < bookedStartDate.getTime() || newStartDate.getTime() > bookedEndDate.getTime()) {
        return true;
    }
    return false;
}