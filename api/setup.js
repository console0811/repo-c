import { createUser, getUser } from "./controllers/user";
import Database from "./services/service.database";
import UserModel from "./../models/model.user";
import * as dotenv from 'dotenv'
dotenv.config()
const {
    ADMIN_NAME,
    ADMIN_EMAIL,
    ADMIN_PASSWORD
} = process.env;

export default () => {
    Database.connect()
        .then(msg => {
            consola.success(msg)
            getUser({ email: ADMIN_EMAIL })
                .then(({ data }) => {
                    if (data && !data._id) {
                        createUser({
                            user: new UserModel({
                                name: JSON.parse(ADMIN_NAME),
                                email: ADMIN_EMAIL,
                                password: ADMIN_PASSWORD,
                                type: 'admin'
                            })
                        })
                            .then(({ message }) => console.log(message))
                            .catch(({ err }) => console.log(err))
                    }
                })
                .catch(() => console.log('Failed to create default user.'))
        })
        .catch(err => consola.error(err));
}