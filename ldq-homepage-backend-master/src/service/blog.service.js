const seq = require('../db/seq')
const Note = require('../model/note.model')
const TextContent = require('../model/text_content.model')
const NoteFolder = require('../model/note_folder.model')

class BlogService {
    // 【查】查询博客内容
    async getBlogService(id) {
        const result = await Note.findOne({
            attributes: ['title', 'status', 'update_time'],
            include: [
                {
                    attributes: ['content'],
                    model: TextContent,
                },
                {
                    attributes: [],
                    model: NoteFolder,
                    where: {
                        status: '1',
                    }
                }
            ],
            where: {
                id,
                status: '1',
            },
        })

        return result
    }
}

module.exports = new BlogService()