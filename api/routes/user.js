import express from "express";
import { ObjectId } from "mongodb";
import multer from "multer";
import UserModel from "../../models/model.user"
import { createUser, getUser } from "../controllers/user";
const router = express.Router();
const multi = multer()

import authenticate from "../middleware/authenticate";

router.get('/', authenticate, async (req, res) => {
    let user;
    try {
        user = new ObjectId(req.user)
    } catch (error) {
        return res.status(404).send({ err: 'Invalid user ID.' })
    }

    const { data, err } = await getUser({ _id: user })

    if (err) return res.status(404).send({ err })

    return res.json({ user: data })
})

router.post('/sign-up', multi.any(), (req, res) => {
    let { buffer } = req.files.find(i => i.mimetype == 'application/json');
    const user = JSON.parse(buffer.toString())
    const attachments = req.files.filter(i => i.fieldname == 'file');
    const profile = req.files.find(i => i.fieldname == 'profile');
    return createUser({ user: new UserModel({ ...user }), attachments, profile })
        .then(message => res.json({ message }))
        .catch(error => res.status(403).json({ error }))
})

export default router;