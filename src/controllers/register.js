import { prisma } from "./../lib/prisma.js";
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { username, password, address, phone, userId } = req.body;
  try {
    // Mengecek apakah username sudah digunakan
    const existingUser = await prisma.profile.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Mengenkripsi kata sandi sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.profile.create({
      data: {
        username,
        password: hashedPassword,
        address,
        phone,
        userId
      },
    });

    // Memberikan respons bahwa registrasi berhasil
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    // Mengembalikan pesan error jika terjadi kesalahan
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

