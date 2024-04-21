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
    res.status(200).json(allUsersProfile);
}

export const createNewUserProfile = async (req, res) => {
    try {
        const userProfile = await prisma.profile.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                address: req.body.address,
                phone: req.body.phone,
                userId: req.body.userId
            }
        });

        // Mengirim data JSON sebagai respons
        res.status(201).json({
            status: res.statusCode,
            message: "Create new profile success",
            data: userProfile
        });
    } catch (error) {
        console.error('Error creating new profile:', error);
        res.status(400).json({ message: 'Internal server error' });
    }
}


export const updateProfile = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = await prisma.profile.update({
            where: {
                id
            },
            data: req.body
        });

        // Mengirim data JSON sebagai respons
        res.status(200).json({
            status: res.statusCode,
            message: "Update Profile is Success",
            updated_data: user
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(404).json({ message: 'Profile not found' });
    }
}

export const deleteProfile = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = await prisma.profile.delete({
            where: {
                id
            },
        })
        res.status(200).json({
            status: res.statusCode,
            message: "Delete Profile is Success",
            data: user
        })

    } catch (err) {
        console.error('Error deleting profile:', err);

        res.status(404).json({
            message: 'Profile not found',
            description: err.message
        });
    }
}