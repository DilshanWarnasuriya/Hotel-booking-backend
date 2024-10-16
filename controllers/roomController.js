import Room from "../models/room.js";
import { isAdmin } from "./userController.js";


export function save(req, res){
    if(isAdmin(req)){
        const newRoom = new Room(req.body);
        newRoom.save().then((room) => {
            res.json({
                message: "Room added success",
                room: room
            })
        }).catch((err) => {
            res.json({
                message: "Room added fail",
                error: err
            })
        });
    }else res.json({ message: "not permission" });
}