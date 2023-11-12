// pages/api/register.js
import User from '../../sequelize/models/users';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const { name, email, password } = req.body;

  // Meng-hash password dengan bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Membuat pengguna baru dengan model User
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  // Mengirimkan respon ke klien bahwa pengguna telah berhasil dibuat
  res.status(201).json({ message: 'Pengguna berhasil dibuat', userId: user.id });
}
