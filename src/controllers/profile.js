import { prisma } from "./../lib/prisma.js";

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
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await prisma.users.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userProfile = await prisma.profile.create({
            data: {
                username: req.body.username,
                password: req.body.password,
                address: req.body.address,
                phone: req.body.phone,
                userId: req.body.userId
            }
        });

        res.status(201).json({
            status: res.statusCode,
            message: "Create new profile success",
            data: userProfile
        });
    } catch (error) {
        console.error('Error creating new profile:', error);
        res.status(400).json({ message: 'Bad Request' });
    }
}


export const updateProfile = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const profile = await prisma.profile.findUnique({
            where: {
                id: id
            }
        })
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
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
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteProfile = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const profile = await prisma.profile.findUnique({
            where: {
                id: id
            }
        })

        if (!profile) {
            return res.status(404).json({
                message: 'Profile not found',
            })
        }

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

        res.status(500).json({
            message: 'Internal Server Error',
            description: err.message
        });
    }
}