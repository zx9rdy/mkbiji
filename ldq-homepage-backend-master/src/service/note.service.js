const { QueryTypes, Op } = require('sequelize')
const seq = require('../db/seq')
const NoteFolder = require('../model/note_folder.model')
const Note = require('../model/note.model')
const User = require('../model/user.model')
const TextContent = require('../model/text_content.model')

class MenuService {
    // 【增】创建笔记
    async createNoteService(user_id, title, content, folder_id, status) {
        const { id: text_id } = await TextContent.create({
            content
        })
        const result = await Note.create({
            title,
            user_id,
            folder_id,
            text_id,
            status,
        })

        return result
    }

    // 【增】创建笔记文件夹
    async createNoteFolderService(user_id, name, status) {
        const result = await NoteFolder.create({
            name,
            user_id,
            status,
        })

        return result
    }

    // 【删】删除笔记
    async deleteNoteService(user_id, note_id) {
        //text_content表我是完全不动的一直保留着的，这对数据库储存是否压力过大有待考量
        const result = await seq.query(`
            update note as n
            join user as u on u.id = n.user_id and u.id = ${user_id} and u.delete_time is null 
            set n.delete_time = now()
            where n.delete_time is null and n.id = ${note_id};
        `, { type: QueryTypes.UPDATE })

        return result[1]
    }

    // 【删】删除笔记文件夹
    async deleteFolderService(user_id, folder_id) {
        const result = await NoteFolder.findOne({
            where: { id: folder_id }
        })
        if (result.default == '0') {
            return -1
        }
        //text_content表我是完全不动的一直保留着的，这对数据库储存是否压力过大有待考量
        const resultFolder = await seq.query(`
            update note_folder as nf
            join user as u on u.id = nf.user_id and u.id = ${user_id} and u.delete_time is null 
            set nf.delete_time = now()
            where nf.delete_time is null and nf.id = ${folder_id};
        `, { type: QueryTypes.UPDATE })

        //该文件夹下的笔记也一并删除
        await seq.query(`
            update note as n
            join user as u on u.id = n.user_id and u.id = ${user_id} and u.delete_time is null 
            set n.delete_time = now()
            where n.delete_time is null and n.folder_id = ${folder_id};
        `, { type: QueryTypes.UPDATE })

        return resultFolder[1]
    }

    // 【改】更新笔记
    async updateNoteService(user_id, note_id, title, content, status) {
        let result = await Note.findOne({
            attributes: ['id', 'title', 'status', 'update_time'], //要用save的话必须要有主键，所以这里id不能去掉
            include: [
                {
                    attributes: [],
                    model: User,
                    where: {
                        id: user_id,
                    },
                },
            ],
            where: {
                id: note_id,
            }
        }).then(async (note) => {
            if (note) {
                await Note.update(
                    { title, status },
                    {
                        where: {
                            id: note_id,
                        }
                    }
                )
                return await TextContent.findOne({
                    include: [
                        {
                            attributes: [],
                            model: Note,
                            where: {
                                id: note.id
                            }
                        }
                    ]
                }).then(async textContent => {
                    if (textContent) {
                        textContent.content = content
                        return await textContent.save()
                    }
                })
            }
        })
        //这里因为不想把content也返回给客户端所以这里就只给个id，方便验证更新成功就行了
        return result.id
    }

    // 【改】更新笔记文件夹
    async updateFolderService(user_id, folder_id, name, status) {
        const result = await seq.query(`
            update note_folder as nf
            join user as u on u.id = nf.user_id and u.id = ${user_id} and u.delete_time is null 
            set nf.name = '${name}', nf.status = '${status}', nf.update_time = now() 
            where nf.delete_time is null and nf.id = ${folder_id};
        `, { type: QueryTypes.UPDATE })

        return result[1]
    }

    // 【查】查询笔记文件夹
    async getNoteFolderService(userId) {
        const result = await NoteFolder.findAll({
            where: {
                user_id: userId,
            }
        })

        // 查询文件夹中有多少笔记
        for (let i = 0; i < result.length; i++) {
            const count = await seq.query(`
                select count(*) 
                from note_folder as nf
                join note as n on n.folder_id = nf.id and n.delete_time IS NULL
                where nf.id = ${result[i].dataValues.id};
            `, { type: QueryTypes.SELECT })
            result[i].dataValues.count = count[0]['count(*)']
        }

        return result
    }

    // 【查】查询笔记列表
    async getNoteService(whereOpAnd, offset, limit, keyword) {
        const list = await Note.findAll({
            attributes: {
                exclude: ['user_id', 'folder_id', 'text_id', 'status', 'create_time', 'delete_time']
            },
            where: {
                [Op.and]: whereOpAnd,
                title: {
                    [Op.like]: '%' + keyword + '%'
                }
            },
            offset,
            limit,
            order: [['update_time', 'DESC']],
        })

        const total = await Note.findAll({
            attributes: [
                [seq.fn('COUNT', seq.col('*')), 'count'],
            ],
            where: {
                [Op.and]: whereOpAnd,
                title: {
                    [Op.like]: '%' + keyword + '%'
                }
            },
        })
        return {
            total: total[0].dataValues.count,
            list,
        }
    }

    // 【查】查询笔记内容
    async getNoteTextService(user_id, note_id) {
        const result = await Note.findOne({
            attributes: ['title', 'status', 'update_time'],
            include: [
                {
                    attributes: [],
                    model: User,
                    where: {
                        id: user_id,
                    },
                },
                {
                    attributes: ['content'],
                    model: TextContent,
                }
            ],
            where: {
                id: note_id,
            },
        })

        return result
    }
}

module.exports = new MenuService()