import { sequelize } from "../models/connect.js";
import initModels from "../models/init-models.js";
import { Sequelize } from "sequelize";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const conn = initModels(sequelize);

const Op = Sequelize.Op;

const getVideo = async (req, res) => {
    // res.send("Get video 123456");
    try {
        let { page, size } = req.params;
        let index = (Number(page) - 1) * Number(size);
        // const dataVideo = await conn.video.findAll({
        //     limit: Number(size),
        //     offset: index
        // });
        let { videoName } = req.query;
        // let data = await conn.video.findAll({
        //     where: {
        //         video_name: {
        //             [Op.like]: `%${videoName}%`
        //         }
        //     },
        //     limit: Number(size),
        //     offset: index
        // })
        let data = await prisma.video.findMany({
            where: {
                video_name: {
                    contains: videoName
                }
            },
            skip: Number(index),
            take: Number(size)
        });
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

const getVideoDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const dataVideoDetail = await conn.video.findOne({
            where: {
                id
            }
        });

    } catch (error) {
        console.log("error : ", error);
    }
}

const createVideo = async (req, res) => {
    try {
        const { video_name, thumbnail, description, user_id, type_id } = req.body;
        const newData = {
            video_name,
            thumbnail,
            description,
            user_id,
            type_id
        };
        await prisma.video.create({
            data: newData
        })
        res.send("create success !")

    } catch (error) {
        console.log(error);
    }
}

const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        await conn.video.destroy({
            where: {
                video_id: id
            }
        });
        res.send("delete success!");

    } catch (error) {
        console.log(error);
    }
}

export {
    getVideo,
    getVideoDetail,
    createVideo,
    deleteVideo,
}