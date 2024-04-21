import { prisma } from "./../../lib/prisma.js";

export const createNewComment = async (req, res) => {
    try {
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
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    try {
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
        res.status(404).json({ message: 'Tag not found' });
    }
}

export const deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId);
    try {
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
        res.status(404).json({ message: 'Comment not found' });
    }
}