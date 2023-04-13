import UserModel from "../../models/model.user"
import Database from "../services/database"
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import sendMail from "../services/mailer";
import { createFile, deleteFile } from "../services/spaces";

export function userCollection() {
    return Database.instance().collection('users')
}

export function createUser({ user = new UserModel(), profile = {} }) {
    const session = Database.client().startSession();
    const transactionOptions = {
        readPreference: "primary",
        readConcern: { level: "local" },
        writeConcern: { w: "majority" },
    };

    return session.withTransaction(async () => {
        delete user._id;
        const password = user.password || String(new ObjectId())

        const exist = await userCollection().countDocuments({ email: user.email })

        if (exist) return Promise.reject('Invalid, someone is already using that email.')



        if (user.type == 'applicant') {
            user.status = 'active'
            user.password = await bcrypt.hash(password, 10)
                .catch(err => {
                    console.log(err);
                    return Promise.reject(err)
                })
        }
        if (user.type == 'sponsor') user.status = 'pending'

        const insertResult = await userCollection()
            .insertOne(user, { session })
            .catch(() => Promise.reject('Failed to create user.'))

        if (user.status == 'active') {
            await sendMail({
                to: user.email,
                subject: 'Account Credential',
                text: `Congratulation! here's your temporary password: ${password}.`,
                html: `<h1>Congratulation!</h1><br/>Here's your temporary password: ${password}.`
            })
                .catch(err => Promise.reject(err));
        } else {
            const adminUser = await userCollection().findOne({ type: 'admin' }) || new UserModel()
            await sendMail({
                to: adminUser.email,
                subject: 'New Sponsor',
                text: `A new sponsor is waiting for approval.`,
                html: `<h1>A new sponsor is waiting for approval.</h1>`
            })
                .catch(err => Promise.reject(err));
        }

        if (profile.originalname) user.profile = profile.originalname

        if (profile.originalname) {
            await createFile({ data: profile.buffer, name: profile.originalname, type: profile.mimetype, directory: `${user.type}s/attachments/${insertResult.insertedId}/profile` })
                .catch(() => Promise.reject(`Failed to upload profile.`))

            await userCollection()
                .updateOne({ _id: insertResult.insertedId }, { $set: { profile: profile.originalname } }, { session })
                .catch(() => Promise.reject('Failed to push profile.'))
        }
    }, transactionOptions)
        .then(() => {
            session.endSession();
            return 'Congratulation! Please check your email, we sent you a verification containing your temporary password.'
        })
        .catch(err => {
            session.endSession();
            return Promise.reject(err)
        })


}


export function updateUser({ user = new UserModel(), attachments = [], profile = {} }) {
    const session = Database.client().startSession();
    const transactionOptions = {
        readPreference: "primary",
        readConcern: { level: "local" },
        writeConcern: { w: "majority" },
    };

    return session.withTransaction(async () => {

        let _id = user._id;
        delete user._id;

        try {
            _id = new ObjectId(_id)
        } catch (error) {
            return Promise.reject('Invalid ID.')
        }

        const exist = await userCollection().countDocuments({ _id: { $ne: _id }, email: user.email })

        if (exist) return Promise.reject('Invalid, someone is already using that email.')

        if (user.password) {
            user.password = await bcrypt.hash(user.password, 10)
                .catch(err => {
                    console.log(err);
                    return Promise.reject(err)
                })
        }

        const original = await userCollection().findOne({ _id }) || new UserModel();

        if (original.status == 'pending' && user.status == 'active') {
            user.password = await bcrypt.hash(String(new ObjectId()), 10)
                .catch(err => {
                    console.log(err);
                    return Promise.reject(err)
                })
        }

        await userCollection()
            .updateOne({ _id }, { $set: user }, { session })
            .catch(() => Promise.reject('Failed to update user.'))

        for (let index = 0; index < attachments.length; index++) {
            const { buffer, originalname, mimetype } = attachments[index];

            await createFile({ data: buffer, name: originalname, type: mimetype, directory: `${user.type}s/attachments/${_id}` })
                .then(() => console.log(`Successfully uploaded file, ${originalname}.`))
                .catch(() => Promise.reject(`Failed to upload attachment ${originalname}.`))

            await userCollection()
                .updateOne({ _id }, { $push: { attachments: originalname } }, { session })
                .catch(() => Promise.reject('Failed to push attachments.'))
        }


        const missing = original.attachments.filter(
            (i) => !user.attachments.includes(i)
        )

        for (let index = 0; index < missing.length; index++) {
            const name = missing[index];

            await deleteFile(`${user.type}s/attachments/${_id}/${name}`)
                .then(() => console.log(`Successfully deleted attachment, ${name}.`))
                .catch(() => Promise.reject(`Failed to deleted attachment ${name}.`))

            await userCollection()
                .updateOne({ _id }, { $pull: { attachments: name } }, { session })
                .catch(() => Promise.reject('Failed to pull attachments.'))
        }

        if (profile.originalname) {
            await deleteFile(`${user.type}s/attachments/${_id}/profile/${user.profile}`)
                .then(() => console.log(`Successfully deleted profile, ${user.profile}.`))
                .catch(() => Promise.reject(`Failed to deleted profile ${user.profile}.`))

            await createFile({ data: profile.buffer, name: profile.originalname, type: profile.mimetype, directory: `${user.type}s/attachments/${_id}/profile` })
                .catch(() => Promise.reject(`Failed to upload profile.`))

            await userCollection()
                .updateOne({ _id }, { $set: { profile: profile.originalname } }, { session })
                .catch(() => Promise.reject('Failed to push profile.'))
        }

        if (original.status == 'pending' && user.status == 'active') {
            await sendMail({
                to: original.email,
                subject: 'Your account is now active',
                text: `Congratulation! here's your temporary password: ${user.password}.`,
                html: `<h1>Congratulation!</h1><br/>Here's your temporary password: ${user.password}.`
            })
                .catch(err => Promise.reject(err));
        }

    }, transactionOptions)
        .then(() => {
            session.endSession();
            return 'Successfully updated user.'
        })
        .catch(err => {
            session.endSession();
            return Promise.reject(err)
        })
}

export function getUser(payload = {}) {
    return userCollection()
        .findOne(payload)
        .then(data => {
            delete data.password
            return { data: data || {} }
        })
        .catch(err => ({ err }))
}

export function getUsers({ status = '', search = '', page = 0, limit = 10 } = {}) {
    page = page > 0 ? page - 1 : 0;

    let match = {
        $match: {
            status,
            $or: [
                { name: new RegExp(search, 'i') },
                { organization: new RegExp(search, 'i') },
            ]
        }
    }

    return userCollection()
        .aggregate([
            {
                '$sort': {
                    '_id': 1
                }
            }, match,
            {
                '$skip': page * limit
            },
            {
                '$limit': limit
            },
            {
                '$project': {
                    "password": 0
                }
            }
        ]).toArray()
        .then(async items => {
            return {
                items,
                length: await userCollection().countDocuments(match.$match)
            }
        })
        .catch(err => {
            console.log(err, 'error');
            return { items: [], length: 0 }
        })
}

// get male applicants
export function countUserByGender() {
    return userCollection().aggregate([
        {
            $match: { type: "applicant" }
        },
        {
            $group: {
                _id: "$gender",
                count: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$count" },
                male: {
                    $sum: { $cond: { if: { $eq: ["$_id", "male"] }, then: "$count", else: 0 } }
                },
                female: {
                    $sum: { $cond: { if: { $eq: ["$_id", "female"] }, then: "$count", else: 0 } }
                }
            }
        },
        {
            $project: {
                _id: 0,
                male: 1,
                female: 1,
                total: 1
            }
        }
    ]).toArray()
        .then(data => data[0])
        .catch(() => ({ male: 0, female: 0 }))
}

export function countUserByType() {
    return userCollection().aggregate([
        {
            $match: { type: { $in: ["applicant", "sponsor"] } }
        },
        {
            $group: {
                _id: "$type",
                count: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$count" },
                applicant: {
                    $sum: { $cond: { if: { $eq: ["$_id", "applicant"] }, then: "$count", else: 0 } }
                },
                sponsor: {
                    $sum: { $cond: { if: { $eq: ["$_id", "sponsor"] }, then: "$count", else: 0 } }
                }
            }
        },
        {
            $project: {
                _id: 0,
                applicant: 1,
                sponsor: 1,
                total: 1
            }
        }
    ]).toArray()
        .then(data => data[0])
        .catch(() => ({ highSchool: 0, college: 0, total: 0 }))
}