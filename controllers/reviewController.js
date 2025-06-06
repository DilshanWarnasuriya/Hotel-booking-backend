import Review from "../Models/review.js";
import { isHaveUser, isUser } from "./userController.js";

export function persist(req, res) {
    if (!isUser(req)) {
        return res.status(401).json({ message: "User access required" });
    }

    req.body.email = req.user.email;
    req.body.name = req.user.name;
    req.body.image = req.user.image;

    Review.findOne().sort({ id: -1 })
        .then((review) => {
            req.body.id = review ? review.id + 1 : 1;
            const newReview = new Review(req.body);
            newReview.save()
                .then((review) => {
                    res.status(201).json({
                        message: "Review Save Successful",
                        review: review
                    })
                })
                .catch((err) => {
                    res.status(500).json({ message: "Server error occurred", error: err.message });
                })
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
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
    if (!isUser(req)) {
        return res.status(401).json({ message: "User access required" });
    }

    Review.find({ email: req.params.email })
        .then((result) => {
            res.json(result);
        }).catch(() => {
            res.json({ message: "Server error" });
        });
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