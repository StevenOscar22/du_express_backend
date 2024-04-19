import { prisma } from "./../../lib/prisma.js";

export const getAllUsers = async (req, res) => {
    const limit = req.query.limit
    const page = req.query.page
    const users = await prisma.users.findMany({
        take: limit && parseInt(limit),
        skip: page && parseInt(page),
        include: {
            profile: true
        }
    });
    res.json(users);
}

export const createNewUser = async (req, res) => {
    try {
        const user = await prisma.users.create({
            data: {
                username: req.body.username,
                password: req.body.password
            }
        });

        // Mengirim data JSON sebagai respons
        res.status(201).json({
            status: res.statusCode,
            message: "Create new user is success",
            data: user
        });
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getSpecificUser = async (req, res) => {
    const id = parseInt(req.params.id);

    const user = await prisma.users.findFirst({
        where: {
            id
        },
        include: {
            profile: true
        }
    })

    if (!user) {
        res.status(404).json({
            status: 404,
            error: true,
            message: "User not found"
        });
    }
    res.json(user);
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
            status: res.statusCode,
            updated_data: user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
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
            message: "Delete user success",
            data: user
        })

    } catch (err) {
        console.error('Error deleting user:', err);

        res.status(500).json({
            message: 'Internal server error',
            description: err.message
        });
    }
}