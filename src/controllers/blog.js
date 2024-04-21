import { prisma } from "./../../lib/prisma.js"

export const getAllBlogs = async (req, res) => {
    const limit = req.query.limit
    const page = req.query.page
    const blogs = await prisma.blog.findMany({
        take: limit && parseInt(limit),
        skip: page && parseInt(page),
        include: {
            tags: true,
        }
    });
    res.status(200).json(blogs);
}

export const getSpecificBlog = async (req, res) => {
    const blogId = parseInt(req.params.blogId);

    const blog = await prisma.blog.findFirst({
        where: {
            id: blogId,
        },
        include: {
            tags: true,
            comments: true
        },
    })

    if (!blog) {
        res.status(404).json({
            status: res.statusCode,
            error: true,
            message: "Blog not found"
        });
    }
    res.status(200).json(blog);
}

export const createNewBlog = async (req, res) => {
    try {
        const blog = await prisma.blog.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                authorId: req.body.authorId,
                tags: {
                    create: req.body.tags.map(tag => ({ name: tag }))
                },
            }
        })
        res.status(201).json({
            status: res.statusCode,
            message: "Create new blog success",
            data: blog
        });
    } catch (error) {
        console.error('Error creating new blog:', error);
        res.status(400).json({ message: 'Internal server error' });
    }
};

export const updateBlog = async (req, res) => {
    const blogId = parseInt(req.params.blogId);

    try {
        await prisma.blog.update({
            where: {
                id: blogId
            },
            data: {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                authorId: req.body.authorId,
                tags: {
                  set: req.body.tags
                }
            }
        });

        res.status(200).json({
            status: res.statusCode,
            message: "Update blog Success",
            updated_data: await prisma.blog.findFirst({
                where: {
                    id: blogId
                },
                include: {
                    tags: true
                }
            }),
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(404).json({ message: 'Blog not found' });
    }
}

export const deleteBlog = async (req, res) => {
    const blogId = parseInt(req.params.blogId);

    try {
        const blog = await prisma.blog.delete({
            where: {
                id: blogId
            },
        })
        res.status(200).json({
            status: res.statusCode,
            message: "Delete Blog Success",
            data: blog
        })

    } catch (err) {
        console.error('Error deleting blog:', err);

        res.status(404).json({
            message: 'Blog not found',
            description: err.message
        });
    }
}