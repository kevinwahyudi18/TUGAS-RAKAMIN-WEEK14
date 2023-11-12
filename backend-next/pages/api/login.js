// pages/api/login.js
import User from '../../sequelize/models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  // Mengambil email dan password dari body request yang dikirim oleh pengguna
  const { email, password } = req.body;

  try {
    // Mencoba menemukan pengguna dalam database yang memiliki email yang sama dengan yang diberikan
    const user = await User.findOne({ where: { email } });

    // Jika pengguna tidak ditemukan, mengirimkan respon error
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    // Jika pengguna ditemukan, cek apakah password yang diberikan sesuai dengan yang ada di database
    const isMatch = await bcrypt.compare(password, user.password);

    // Jika password tidak sesuai, mengirimkan respon error
    if (!isMatch) {
      return res.status(401).json({ message: 'Kredensial tidak valid' });
    }

    // Jika password sesuai, maka buat sebuah token JWT
    const token = jwt.sign(
      { userId: user.id }, // Payload token berisi ID pengguna
      process.env.JWT_SECRET, // Menggunakan secret key dari variabel lingkungan
      { expiresIn: '1h' } // Token akan kadaluarsa setelah 1 jam
    );

    // Mengirimkan respon sukses dengan token JWT yang telah dibuat
    res.status(200).json({ message: 'Berhasil login!', token });
  } catch (error) {
    // Jika ada kesalahan pada proses di atas, mengirimkan respon error
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
}
