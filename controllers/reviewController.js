import Review from "../Models/review.js";
import { isAdmin, isHaveUser, isUser } from "./userController.js";

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

export function getAll(req, res) {
    if (isAdmin(req)) {
        Review.find().then((result) => {
            res.json(result);
        }).catch(() => {
            res.json({ message: "Server error" });
        });
    } else res.json({ message: "not permission" });
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
    if (isUser(req)) {
        Review.updateOne({ id: req.params.id }, req.body).then(() => {
            res.json({ message: "Review update success" })
        }).catch(() => {
            res.json({ message: "Review update fail" });
        });
    } else res.json({ message: "not permission" });
}

export function disable(req, res) {
    if (isAdmin(req)) {
        Review.updateOne({ id: req.params.id }, { disabled: true }).then(() => {
            res.json({ message: "Review disable success" })
        }).catch(() => {
            res.json({ message: "Review disable fail" });
        });
    } else res.json({ message: "not permission" });
}

export function enable(req, res) {
    if (isAdmin(req)) {
        Review.updateOne({ id: req.params.id }, { disabled: false }).then(() => {
            res.json({ message: "Review enable success" })
        }).catch(() => {
            res.json({ message: "Review enable fail" });
        });
    } else res.json({ message: "not permission" });
}