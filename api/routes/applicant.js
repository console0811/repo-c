import express from "express";
import ApplicantModel from "./../../models/model.application";
import { createApplicant } from "../controllers/applicant";
const router = express.Router();

import authenticate from "../middleware/authenticate";

router.post('/create', authenticate, (req, res) => {
    const { data } = req.body;
    return createApplicant({ data, user: req.user })
        .then(message => res.json({ message }))
        .catch(error => res.status(403).json({ error }))
})

export default router;