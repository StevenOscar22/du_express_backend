import { prisma } from "./../lib/prisma.js";

export const getAllTags = async (req, res) => {
    const limit = req.query.limit
    const page = req.query.page
    const tags = await prisma.tag.findMany({
        take: limit && parseInt(limit),
        skip: page && parseInt(page),
    });
    res.status(200).json(tags);
}

export const getSpecificTag = async (req, res) => {
    const tagId = parseInt(req.params.tagId);
    const tag = await prisma.tag.findFirst({
        where: {
            id: tagId
        },
        include: {
            blogs: {
                include: {
                    author: true
                }
            }
        }
    });

    if (!tag) {
        return res.status(404).json({
            status: res.statusCode,
            error: true,
            message: "Tag not found"
        });
    }
    res.status(200).json(tag);
}

export const createNewTag = async (req, res) => {
    try {
        const tag = await prisma.tag.create({
            data: {
                name: req.body.name
            }
        })
        res.status(201).json({
            status: res.statusCode,
            message: "Create new tag success",
            data: tag
        });
    } catch (error) {
        console.error('Error creating new tag:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateTag = async (req, res) => {
    const tagId = parseInt(req.params.tagId);
    try {
        const findTag = await prisma.tag.findUnique({
            where: {
                id: tagId
            }
        })
        if (!findTag) {
            return res.status(404).json({
                message: "Tag not found"
            });
        }

        const tag = await prisma.tag.update({
            where: {
                id: tagId
            },
            data: req.body
        })
        res.status(200).json({
            status: res.statusCode,
            message: "Update tag success",
            updated_data: tag
        });
    } catch (error) {
        console.error('Error updating tag:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteTag = async (req, res) => {
    const tagId = parseInt(req.params.tagId);
    try {
        const findTag = await prisma.tag.findUnique({
            where: {
                id: tagId
            }
        })
        if (!findTag) {
            return res.status(404).json({
                message: "Tag not found"
            });
        }

        const tag = await prisma.tag.delete({
            where: {
                id: tagId
            }
        })
        res.status(200).json({
            status: res.statusCode,
            message: "Delete tag success",
            data: tag
        });
    } catch (error) {
        console.error('Error deleting tag:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}