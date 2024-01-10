import jwt, { decode } from 'jsonwebtoken';
import initModels from '../models/init-models.js';
import { sequelize } from '../models/connect.js';

const conn = initModels(sequelize);

const createToken = (data) => {
    return jwt.sign({ data }, "NODE38", { expiresIn: "5m" })
}

const checkToken = (token) => {
    return jwt.verify(token, "NODE38", (err, decoded) => {
        if (err) {
            return {
                statusCode: 401,
                mess: "Invalid token"
            }
        } else {
            return {
                statusCode: 200,
                data: decoded
            }
        }
    });
}

const khoaApi = async (req, res, next) => {
    let { token } = req.headers;
    if (token) {
        let verifyToken = checkToken(token);
        if (verifyToken.statusCode === 401) {
            res.status(401).send("invalid token!");
        } else {
            // console.log(verifyToken);
            let { user_id } = verifyToken.data.data;
            // console.log(user_id);
            let checkUser = await conn.users.findOne({
                where: {
                    user_id: user_id
                }
            })
            if (!checkUser) {
                res.status(401).send("Invalid token")
                return
            }
            next();
        }
    } else {
        res.status(401).send("unauthorized!")
    }
}

export {
    createToken,
    checkToken,
    khoaApi,
}
