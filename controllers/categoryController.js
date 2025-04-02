import Category from "../Models/category.js";
import { isAdmin } from "./userController.js";

export function save(req, res) {
    if (isAdmin(req)) {
        const newCategory = new Category(req.body);
        newCategory.save().then((category) => {
            res.json({
                message: "Category added Success",
                category: category
            })
        }).catch((err) => {
            res.json({
                message: "Category added fail",
                error: err
            })
        });
    } else res.json({ message: "not permission" });
}

export function retrieve(req, res) {
    Category.find().sort({ id: -1 })
        .then((categories) => {
            res.status(200).json(categories);
        }).catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
}

export function remove(req, res) {
    if (isAdmin(req)) {
        Category.deleteOne({ name: req.params.name }).then(() => {
            res.json({ message: "Category delete success" });
        }).catch(() => {
            res.json({ message: "Category delete fail" });
        });
    } else res.json({ message: "not permission" });
}

export function update(req, res) {
    if (isAdmin(req)) {
        Category.updateOne({ name: req.params.name }, req.body).then(() => {
            res.json({ message: "Category update Success" })
        }).catch(() => {
            res.json({ message: "Category update fail" })
        });
    } else res.json({ message: "not permission" });
}