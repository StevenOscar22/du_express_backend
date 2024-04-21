import { prisma } from "./../../lib/prisma.js";

export const getAllUsers = async (req, res) => {
    const limit = req.query.limit
    const page = req.query.page
    const users = await prisma.users.findMany({
        take: limit && parseInt(limit),
        skip: page && parseInt(page),
        include: {
            blogs: true
        }
    });
    res.status(200).json(users);
}

export const createNewUser = async (req, res) => {
    try {
        const user = await prisma.users.create({
            data: {
                name: req.body.name,
                email: req.body.email
            }
        });

        // Mengirim data JSON sebagai respons
        res.status(201).json({
            status: res.statusCode,
            message: "Create new user success",
            data: user
        });
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(400).json({ message: 'Internal server error' });
    }
};


export const getSpecificUser = async (req, res) => {
    const id = parseInt(req.params.id);

    const user = await prisma.users.findFirst({
        where: {
            id
        },
        include: {
            profile: true,
            blogs: {
                include: {
                    tags: true,
                    comments: true
                }
            }
        }
    })

    if (!user) {
        res.status(404).json({
            status: res.statusCode,
            error: true,
            message: "User not found"
        });
    }
    res.status(200).json(user);
}

export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = await prisma.users.update({
            where: {
                id
            },
            data: req.body
        });

        // Mengirim data JSON sebagai respons
        res.status(200).json({
            message: "Update User is Success",
            status: res.statusCode,
            updated_data: user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(404).json({ message: 'User not found' });
    }
}

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = await prisma.users.delete({
            where: {
                id
            },
        })
        res.status(200).json({
            status: res.statusCode,
            message: "Delete User is Success",
            data: user
        })

    } catch (err) {
        console.error('Error deleting user:', err);

        res.status(404).json({
            message: 'User not found',
            description: err.message
        });
    }
}