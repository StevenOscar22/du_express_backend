import { prisma } from "./../lib/prisma.js";

export const createNewComment = async (req, res) => {
    try {
        const authorId = req.body.authorId;
        const blogId = req.body.blogId
        if (!authorId || !blogId) {
            return res.status(400).json({ message: 'Author ID and Blog ID is required' });
        }

        const user = await prisma.users.findUnique({
            where: {
                id: authorId
            }
        });
        if (!user) {
            return res.status(404).json({
                message: 'Author not found'
            });
        }

        const comment = await prisma.comment.create({
            data: {
                content: req.body.content,
                authorId: req.body.authorId,
                blogId: req.body.blogId
            }
        })
        res.status(201).json({
            status: res.statusCode,
            message: "Create new comment success",
            data: comment
        })
    } catch (error) {
        console.error('Error creating new comment:', error);
        res.status(400).json({ message: 'Bad Request' });
    }
}

export const updateComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    try {
        const findComment = await prisma.comment.findUnique({
            where: { id: commentId }
        });
        if (!findComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const comment = await prisma.comment.update({
            where: {
                id: commentId
            },
            data: req.body
        })
        res.status(200).json({
            status: res.statusCode,
            message: "Update comment success",
            data: comment
        })
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    try {
        const findComment = await prisma.comment.findUnique({
            where: { id: commentId }
        })

        if (!findComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const comment = await prisma.comment.delete({
            where: {
                id: commentId
            }
        })
        res.status(200).json({
            status: res.statusCode,
            message: "Delete comment success",
            data: comment
        })
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}