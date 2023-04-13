import express from "express";
import { ObjectId } from "mongodb";
import multer from "multer";
import UserModel from "../../models/model.user"
import { countUserByGender, countUserByType, createUser, getUser, getUsers, updateUser } from "../controllers/user";
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

router.get('/count-by-gender', authenticate, async (req, res) => {
    return countUserByGender().then((data) => res.json(data)).catch((data) => res.json(data))
})

router.get('/count-by-type', authenticate, async (req, res) => {
    return countUserByType().then((data) => res.json(data)).catch((data) => res.json(data))
})

router.get('/status/:status/page/:page', authenticate, async (req, res) => {
    let { status = '', page = 0 } = req.params;
    const { search } = req.query
    page = Number(page)
    return getUsers({ status, search, page }).then((data) => res.json(data)).catch((data) => res.json(data))
})

router.get('/:id', authenticate, async (req, res) => {
    let { id } = req.params;
    try {
        id = new ObjectId(id)
    } catch (error) {
        return res.status(404).send({ err: 'Invalid user ID.' })
    }

    const { data, err } = await getUser({ _id: id })

    if (err) return res.status(404).send({ err })

    return res.json({ user: data })
})

router.post('/sign-up', multi.any(), (req, res) => {
    let { buffer } = req.files.find(i => i.mimetype == 'application/json');
    const user = JSON.parse(buffer.toString())
    const profile = req.files.find(i => i.fieldname == 'profile');
    return createUser({ user: new UserModel({ ...user }), profile })
        .then(message => res.json({ message }))
        .catch(error => res.status(403).json({ error }))
})

router.put('/', multi.any(), (req, res) => {
    let { buffer } = req.files.find(i => i.mimetype == 'application/json');
    const user = JSON.parse(buffer.toString())
    const attachments = req.files.filter(i => i.fieldname == 'file');
    const profile = req.files.find(i => i.fieldname == 'profile');
    return updateUser({ user, attachments, profile })
        .then(message => res.json({ message }))
        .catch(error => {
            console.log(error);
            return res.status(403).json({ error })
        })
})

router.put('/approve/:id', (req, res) => {
    const { id } = req.params;
    const user = { _id: id, status: 'active' }
    console.log(user);
    return updateUser({ user })
        .then(message => res.json({ message }))
        .catch(error => {
            console.log(error);
            return res.status(403).json({ error })
        })
})

router.put('/disapprove/:id', (req, res) => {
    const { id } = req.params;
    const user = { _id: id, status: 'disapproved' }
    console.log(user);
    return updateUser({ user })
        .then(message => res.json({ message }))
        .catch(error => {
            console.log(error);
            return res.status(403).json({ error })
        })
})

export default router;