const { Op } = require("sequelize")
const User = require('../model/user.model')
const NoteFolder = require('../model/note_folder.model')

class UserService {
    // 【增】创建用户
    async createUser(name, password, mail) {
        const result = await User.create({
            name,
            password,
            mail,
        })
        // 创建用户的同时为此用户创建一个我的笔记 默认文件夹
        await NoteFolder.create({
            name: '默认文件夹',
            user_id: result.dataValues.id,
            default: '0',
        })
        return result.dataValues
    }

    // 【查】查询用户是否存在
    async getUserInfoByOr({ name, mail }) {
        const result = await User.findOne({
            where: {
                [Op.or]: [
                    { name },
                    { mail }
                ]
            }
        })
        return result ? result.dataValues : null
    }

    // 【查】根据条件和 查询用户
    async getUserByAnd({ ...args }) {
        const result = await User.findOne({
            where: { ...args },
        })
        return result ? result.dataValues : null
    }

    // 【改】根据id更改用户信息
    async updateById({ ...args }) {
        const { id, ...updateOpt } = args
        const result = await User.update(
            { ...updateOpt },
            {
                where: {
                    id,
                }
            }
        )
        return result[0] == 1 ? true : false
    }

    // 删除用户
    // async deleteUser(name) {
    //     const result = await User.destroy({
    //         where: {
    //             name
    //         }
    //     });
    //     return result
    // }
}

module.exports = new UserService()