import { ObjectId } from "mongodb";
import ApplicationModel from "../../models/model.application"
import Database from "../services/service.database"

export function applicantCollection() {
    return Database.instance().collection('applicants')
}

export async function createApplicant({ data = new ApplicationModel(), user = '' },) {

    data.date = new Date();
    data.lastModified = new Date();
    try {
        data.scholarship = new ObjectId(data.scholarship);
    } catch (error) {
        return Promise.reject('Invalid scholarship ID.')
    }

    try {
        data.applicant = new ObjectId(data.applicant);
    } catch (error) {
        return Promise.reject('Invalid applicant ID.')
    }

    try {
        user = new ObjectId(user);
    } catch (error) {
        return Promise.reject('Invalid user ID.')
    }

    const applicant = await Database.instance().collection('users').findOne({ _id: user }).catch(() => { })

    if (applicant && applicant.type == 'sponsor') {
        return Promise.reject('Sponsors are not allowed to apply for scholarships!')
    }

    const applications = await applicantCollection().countDocuments({ scholarship: data.scholarship, applicant: data.applicant })

    if (applications) return Promise.reject(`Failed to apply for scholarship, you can't apply for the same scholarship multiple times.`)

    await applicantCollection()
        .insertOne(data)
        .catch(() => Promise.reject('Failed to create applicant.'));

    return 'Successfully created application.'
}
