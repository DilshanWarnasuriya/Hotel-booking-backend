import Review from "../models/review.js";
import { isAdmin, isUser } from "./userController.js";

export async function save(req, res) {
    if (isUser(req)) {
        req.body.id = await Review.countDocuments() + 1; // Generate new id
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