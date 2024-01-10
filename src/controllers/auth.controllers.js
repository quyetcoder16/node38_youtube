import { createToken } from "../configs/jwt.config.js";
import { sequelize } from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";

const conn = initModels(sequelize);

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let data = await conn.users.findOne({
            where: {
                email
            }
        });

        // console.log(data)
        if (!data) {
            res.status(404).send("not found email!")
        } else {
            let checkPass = bcrypt.compareSync(password, data.pass_word);

            if (checkPass) {
                const token = createToken({
                    user_id: data.user_id
                })
                res.send(token);
            } else {
                res.status(400).send("fail password!");
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const signUp = async (req, res) => {
    try {
        let { userName, email, password, role } = req.body;

        const data = await conn.users.findOne({
            where: {
                email
            }
        });

        if (data) {
            res.status(400).send("user is existed!");
        } else {
            let encodePassword = bcrypt.hashSync(password, 10);
            let newUser = {
                full_name: userName,
                pass_word: encodePassword,
                email,
                role
            };
            await conn.users.create(newUser);
            res.status(201).send("sign up successful!");

        }

    } catch (error) {
        res.status(500).send(error);
    }
}

const loginFacebook = async (req, res) => {
    let { id, name, email } = req.body;
    let newData = {
        full_name: name,
        email,
        face_app_id: id
    }

    let checkUser = await conn.users.findOne({
        where: {
            face_app_id: id
        }
    });

    if (!checkUser) {
        await conn.users.create(newData);
        checkUser = await conn.users.findOne({
            where: {
                face_app_id: id
            }
        })
    }
    let token = createToken({ checkEmail: checkUser, pass_word: "" });
    // console.log(token)
    res.send(token);
}

export {
    login,
    signUp,
    loginFacebook,
}