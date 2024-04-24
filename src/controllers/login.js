import { prisma } from "./../lib/prisma.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Mencari pengguna berdasarkan username
    const user = await prisma.profile.findUnique({ where: { username } });
    if (!user) {
      // Mengembalikan pesan bahwa pengguna tidak ditemukan
      return res.status(404).json({ message: 'User not found' });
    }

    // Memeriksa kecocokan kata sandi
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Mengembalikan pesan jika kata sandi tidak cocok
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Membuat token JWT setelah login berhasil
    const token = jwt.sign({ id: user.userId, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token kedaluwarsa dalam 1 jam
    });

    // Mengembalikan pesan sukses dan token JWT
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    // Mengembalikan pesan error jika terjadi kesalahan
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

