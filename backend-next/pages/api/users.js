import User from '../../sequelize/models/users';

export default async function handler(req, res) {
  const users = await User.findAll();
  res.status(200).json(users);
}
