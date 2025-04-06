import Review from "../Models/review.js";
import { isHaveUser, isUser } from "./userController.js";

export async function save(req, res) {
    if (isUser(req)) {
        req.body.id = await Review.countDocuments() + 1; // Generate new id
        req.body.email = req.user.email;
        const newReview = new Review(req.body);
        newReview.save().then((review) => {
            res.json({
                message: "Review added success",
                review: review
            })
        }).catch((err) => {
            res.json({
                message: "Review added fail",
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
        Review.find().sort({ id: -1 }).skip(skipRecord).limit(recordCount)
            .then((reviews) => {
                Review.countDocuments()
                    .then((totalRecord) => {
                        res.status(200).json({
                            message: "Rooms found",
                            reviews: reviews,
                            totalPage: Math.ceil(totalRecord / recordCount)
                        });
                    })
            })
            .catch((err) => {
                res.status(500).json({ message: "Server error occurred", error: err.message });
            });
    }
    else {
        Review.find({ disabled: type == "Disable" ? true : false }).skip(skipRecord).limit(recordCount)
            .then((reviews) => {
                Review.countDocuments({ disabled: type == "Disable" ? true : false })
                    .then((totalRecord) => {
                        res.status(200).json({
                            message: "Rooms found",
                            reviews: reviews,
                            totalPage: Math.ceil(totalRecord / recordCount)
                        });
                    })
            })
            .catch((err) => {
                res.status(500).json({ message: "Server error occurred", error: err.message });
            });
    }
}

export function findByEmail(req, res) {
    if (isUser(req)) {
        Review.find({ email: req.params.email }).then((result) => {
            res.json(result);
        }).catch(() => {
            res.json({ message: "Server error" });
        });
    } else res.json({ message: "not permission" });
}

export function remove(req, res) {
    if (isHaveUser(req)) {
        Review.deleteOne({ id: req.params.id }).then(() => {
            res.json({ message: "Review delete success" });
        }).catch(() => {
            res.json({ message: "Review delete fail" });
        });
    } else res.json({ message: "not permission" });
}

export function update(req, res) {
    if (!isHaveUser(req)) {
        return res.status(401).json({ message: "Registered user access required" });
    }

    const id = req.body.id;
    const message = req.body.message;

    if (message == "enable" || message == "disable") {
        Review.updateOne({ id: id }, { disabled: message == "enable" ? false : true })
            .then(() => {
                res.json({ message: `Review ${message == "enable" ? "enable" : "Disable"} success` })
            }).catch(() => {
                res.status(500).json({ message: "Server error occurred" });
            });
    }
    else {
        Review.updateOne({ id: id }, { Comment: message })
            .then(() => {
                res.json({ message: `Review comment update success` })
            }).catch(() => {
                res.status(500).json({ message: "Server error occurred" });
            });
    }
}