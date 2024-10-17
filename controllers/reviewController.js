import Review from "../models/review.js";
import { isUser } from "./userController.js";

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
