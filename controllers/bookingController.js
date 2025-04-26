import Booking from "../Models/booking.js";
import Room from "../Models/room.js";
import { isAdmin, isUser, isHaveUser } from "./userController.js";

export async function persist(req, res) {
    if (!isHaveUser(req)) {
        return res.status(401).json({ message: "user access required" });
    }

    // start and end date related
    const startDatePart = req.body.startDate.replace(/\./g, '-');
    const endDatePart = req.body.endDate.replace(/\./g, '-');
    const today = new Date();
    const todayPart = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const start = new Date(`${startDatePart}T10:00:00`); // start time is 10.00 A.M
    const end = new Date(`${endDatePart}T08:00:00`); // end Time is 8.00 AM
    const todayStart = new Date(`${todayPart}T10:00:00`); // today start time is 10.00 A.M
    req.body.startDate = start;
    req.body.endDate = end;

    if (start < todayStart || end < todayStart) {
        return res.status(401).json({ message: "Select today or grater than today for start date and end date" });
    }
    if (start > end) {
        return res.status(401).json({ message: "Select Start date is grater than end date" });
    }
    if (isUser(req)) {
        const fullName = req.user.name.split(" ");
        req.body.name = `${fullName[0] + fullName[1]}`;
        req.body.image = req.user.image;
        req.body.contactNo = req.user.contactNo;
    }

    try {
        // find bookings related to the given date period
        const bookings = await Booking.find({
            $or: [
                { startDate: { $gte: start, $lte: end }, status: ["pending", "confirm", "check in"], category: req.body.category },
                { endDate: { $gte: start, $lte: end }, status: ["pending", "confirm", "check in"], category: req.body.category },
                { startDate: { $lte: start }, endDate: { $gte: end }, status: ["pending", "confirm", "check in"], category: req.body.category }
            ]
        })

        const bookedRoomNo = []; // booking room number array
        bookings.forEach(element => {
            bookedRoomNo.push(element.roomNo); // booking room numbers added to bookedRoomNo array
        });

        // find rooms using given category, available, person count and not bookedRoomNo array
        const rooms = await Room.find({ number: { $nin: bookedRoomNo }, maxPerson: {$gte: req.body.personCount}, disabled: false, category: req.body.category });

        if (rooms.length === 0) {
            return res.status(401).json({ message: "Rooms not available this days" });
        }

        req.body.id = await Booking.countDocuments() + 1;
        req.body.roomNo = rooms[0].number

        // save new booking
        const newBooking = new Booking(req.body);
        const booking = await newBooking.save();
        res.status(201).json({
            message: "Room booking Successful",
            booking: booking
        })

    } catch (err) {
        res.status(500).json({ message: "Server error occurred", error: err.message });
    }
}

export function retrieve(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }
    const status = req.query.status.toLowerCase(); // filtering option
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