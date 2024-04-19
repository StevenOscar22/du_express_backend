import { prisma } from "./../../lib/prisma.js";

export const getAllUsersProfile = async (req, res) => {
    const limit = req.query.limit
    const page = req.query.page
    const allUsersProfile = await prisma.profile.findMany({
        take: limit && parseInt(limit),
        skip: page && parseInt(page),
        include: {
            user: true
        }
    });
    res.json(allUsersProfile);
}

export const createNewUserProfile = async (req, res) => {
    try {
        const userProfile = await prisma.profile.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
                userId: req.body.userId
            }
        });

        // Mengirim data JSON sebagai respons
        res.status(201).json({
            status: res.statusCode,
            message: "Create new user profile is success",
            data: userProfile
        });
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getSpecificUserProfile = async (req, res) => {
    const id = parseInt(req.params.id);
    const userProfile = await prisma.profile.findFirst({
        where: {
            id
        },
        include: {
            user: true
        }
    });

    if (!userProfile) {
        res.status(404).json({
            status: 404,
            error: true,
            message: "User not found"
        });
    }
    res.json(userProfile);
}
