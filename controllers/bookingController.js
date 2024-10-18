import Booking from "../models/booking.js";
import Room from "../models/room.js";
import { isUser } from "./userController.js";

export async function create(req, res) {
    if (isUser(req)) {
        if (compareDates(req.body.endDate, req.body.startDate)) { // Check new booking has end date after the start date

            const lastBooking = await Booking.findOne({ roomNo: req.body.roomNo }).sort({ endDate: -1 }).limit(1); // Get last booking of the using room id
            const room = await Room.findOne({number: req.body.roomNo});

            if (lastBooking && compareDates(lastBooking.endDate, req.body.startDate) && lastBooking.status != "cancel") { // Check room is booked before and if the new booking start date is before the last booking end date.
                res.json({ message: "Sorry!. Can't book this room right now" })
            }
            else if(req.body.personCount > room.maxPerson){
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

function compareDates(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (d1.getTime() > d2.getTime()) {
        return true;
    }
    return false;
}