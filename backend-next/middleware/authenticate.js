import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  // Ambil token dari header Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak, token tidak ditemukan' });
  }

  try {
    // Verifikasi token menggunakan kunci rahasia dari variabel lingkungan
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan data pengguna yang ter-decode ke request untuk digunakan di downstream
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token tidak valid' });
  }
};

export default authenticate;
