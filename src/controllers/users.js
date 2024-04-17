import { prisma } from "./../../lib/prisma.js";

export const getAllUsers = async (req, res) => {
    const limit = req.query.limit
    const page = req.query.page
    const users = await prisma.users.findMany({
        take: limit && parseInt(limit),
        skip: page && parseInt(page)
    });
    res.json(users);
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
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getSpecificUser = async (req, res) => {
    const id = parseInt(req.params.id);

    const user = await prisma.users.findFirst({
        where: {
            id
        },
    })

    if (!user) {
        res.status(404).json({
            status: 404,
            error: true,
            message: "User not found"
        });

    } else {
        res.json(user);
    }
}

export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = await prisma.users.update({
            where: {
                id
            },
            data: {
                name: req.body.name,
                email: req.body.email
            }
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