import Category from "../models/category.js";
import { isAdmin } from "./userController.js";

export function save(req, res){
    if(isAdmin(req)){
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
    }else res.json({ message: "not permission" });
}