import Category from "../Models/category.js";
import { isAdmin } from "./userController.js";

export function persist(req, res) {
    if (!isAdmin(req)) {
        return res.status(401).json({ message: "Admin access required" });
    }

    Category.findOne().sort({ id: -1 }) // find last user
        .then((category) => {
            req.body.id = category ? category.id + 1 : 1 // set new category id

            const newCategory = new Category(req.body);
            newCategory.save() // save new category
                .then((category) => {
                    res.status(201).json({
                        message: "Category Creation Successful",
                        category: category
                    })
                })
                .catch((err) => {
                    const errorMessage = err.message;
                    if (errorMessage.includes("name_1")) {
                        res.status(409).json({ message: "Category name is already used" })
                    }
                    else {
                        res.status(500).json({ message: "Server error occurred", error: errorMessage });
                    }
                })
        })
        .catch((err) => {
            res.status(500).json({ message: "Server error occurred", error: err.message });
        })
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