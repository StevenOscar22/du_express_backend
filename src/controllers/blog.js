import { prisma } from "./../lib/prisma.js"

export const getAllBlogs = async (req, res) => {
    const limit = req.query.limit
    const page = req.query.page
    const blogs = await prisma.blog.findMany({
        take: limit && parseInt(limit),
        skip: page && parseInt(page),
        include: {
            tags: true,
            author: true
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
            author: true,
            tags: true,
            comments: true
        },
    })

    if (!blog) {
        return res.status(404).json({
            status: res.statusCode,
            error: true,
            message: "Blog not found"
        });
    }
    res.status(200).json(blog);
}

export const createNewBlog = async (req, res) => {
    try {
        const authorId = req.body.authorId;
        if (!authorId) {
            return res.status(400).json({ message: 'Author ID is required' });
        }

        const author = await prisma.users.findUnique({
            where: { id: authorId }
        });
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        const tags = await Promise.all(req.body.tags.map(async tagName => {
            let tag = await prisma.tag.findFirst({
                where: { name: tagName }
            });

            if (!tag) {
                tag = await prisma.tag.create({
                    data: { name: tagName }
                });
            }
            return tag;
        }));

        const blog = await prisma.blog.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                authorId: authorId,
                tags: {
                    connect: tags.map(tag => ({ id: tag.id }))
                }
            }
        });

        res.status(201).json({
            status: res.statusCode,
            message: "Create new blog success",
            data: blog
        });
    } catch (error) {
        console.error('Error creating new blog:', error);
        res.status(400).json({ message: 'Bad Request' });
    }
};


export const updateBlog = async (req, res) => {
    const blogId = parseInt(req.params.blogId);

    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: blogId
            },
            include: {
                tags: true
            }
        })

        if (!blog) {
            return res.status(404).json({
                status: res.statusCode,
                error: true,
                message: "Blog not found"
            });
        }

        const tags = req.body.tags && await Promise.all(req.body.tags.map(async tagName => {
            let tag = await prisma.tag.findFirst({
                where: { name: tagName }
            });

            if (!tag) {
                tag = await prisma.tag.create({
                    data: { name: tagName }
                });
            }
            return tag;
        }));


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
                    set: tags && tags.map(tag => ({ id: tag.id })),
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
        res.status(400).json({ message: 'Bad Request' });
    }
}

export const deleteBlog = async (req, res) => {
    const blogId = parseInt(req.params.blogId);

    try {
        const blogExist = await prisma.blog.findUnique({
            where: {
                id: blogId
            }
        });
        if (!blogExist) {
            return res.status(404).json({ message: 'Blog not found' });
        }
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