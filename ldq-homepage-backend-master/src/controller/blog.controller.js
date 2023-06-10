const { getBlogService } = require('../service/blog.service')
const { blogIsNotExist, getBlogError } = require('../constant/err.type')

class BlogController {
    async getBlog(ctx, next) {
        try {
            const { id } = ctx.query
            const result = await getBlogService(id)
            if (!result) {
                ctx.app.emit('error', blogIsNotExist, ctx)
            } else {
                const content = {
                    title: result.title,
                    status: result.status,
                    update_time: result.update_time,
                    content: result.TextContent.content,
                }
                ctx.body = {
                    code: 0,
                    message: '获取博客成功',
                    result: content,
                }
            }
        } catch (error) {
            console.error(error)
            ctx.app.emit('error', getBlogError, ctx)
        }
    }
}

module.exports = new BlogController()