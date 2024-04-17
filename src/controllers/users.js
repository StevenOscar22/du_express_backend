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
    await prisma.users.create({
        data: {
            name: req.body.name,
            email: req.body.email
        }
    })
    res.json({
        status: res.statusCode,
        message: "Create new user success",
        data: req.body
    })
    res.sendStatus(201);
}

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