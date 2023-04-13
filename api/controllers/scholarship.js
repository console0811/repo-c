import { ObjectId } from "mongodb";
import ScholarshipModel from "../../models/model.scholarship"
import Database from "../services/service.database"

export function scholarshipCollection() {
    return Database.instance().collection('scholarships')
}

export function createScholarship({ data = new ScholarshipModel() }) {
    data.date = new Date();
    data.lastModified = new Date();
    try {
        data.createdBy = new ObjectId(data.createdBy);
    } catch (error) {
        return Promise.reject('Invalid createdBy ID.')
    }
    return scholarshipCollection()
        .insertOne(data)
        .then(() => 'Successfully created scholarship offer.')
        .catch(() => Promise.reject('Failed to create scholarship.'))
}

function pineLine({ skip = 0, limit = 10, sort = { _id: 1 }, search = "" } = {}) {
    return [
        {
            '$match': {
                $or: [
                    { course: new RegExp(search, 'i') },
                    { date: new RegExp(search, 'i') },
                    { limit: new RegExp(search, 'i') },
                    { cutOff: new RegExp(search, 'i') },
                    { descriptions: new RegExp(search, 'i') }
                ]
            }
        }, {
            '$sort': sort
        }, {
            '$skip': skip * limit
        }, {
            '$limit': limit
        },
        {
            '$lookup': {
                'from': 'applicants',
                'localField': '_id',
                'foreignField': 'scholarship',
                'as': 'applicants'
            }
        }, {
            '$project': {
                'applicants': {
                    '$size': '$applicants'
                },
                '_id': 1,
                'course': 1,
                'date': 1,
                'descriptions': 1,
                'limit': 1,
                'createdBy': 1,
                'status': 1,
                'lastModified': 1,
                'cufOff': 1
            }
        }
    ]
}

export async function getScholarships({ skip = 0, limit = 10, sort = { _id: 1 }, search = "" } = {}) {
    const pipe = pineLine({
        skip,
        limit,
        sort,
        search
    })

    const items = await scholarshipCollection()
        .aggregate(pipe)
        .toArray()
        .catch((err) => {
            console.log(err);
            return []
        })

    const length = await scholarshipCollection()
        .countDocuments(pipe[0].$match)
        .catch(err => {
            console.log(err)
            return 0
        })

    return { items, length }
}

export async function getScholarship(_id = '') {
    try {
        _id = new ObjectId(_id)
    } catch (error) {
        return Promise.reject('Invalid ID.')
    }

    const scholarship = await scholarshipCollection().findOne({ _id }).then(data => (data || {})).catch(() => ({}))
    return scholarship;
}