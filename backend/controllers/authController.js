// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// // Register a new user
// exports.register = async (req, res) => {
//   const { name, email, password, confirmPassword } = req.body; // Ensure you are receiving these

//   // Additional validation to ensure password and confirmPassword match
//   if (password !== confirmPassword) {
//     return res.status(400).json({ msg: 'Passwords do not match' });
//   }

//   try {
//     let user = await User.findOne({ where: { email } }); // Change username to email
//     if (user) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     user = await User.create({ name, email, password: hashedPassword }); // Adjusted to include name

//     const payload = { user: { id: user.id } };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message); // Log the error for debugging
//     res.status(500).send('Server error');
//   }
// };


// // Authenticate user and return token
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     let user = await User.findOne({ where: { email } }); // Find user by email
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const payload = { user: { id: user.id } };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Ensure this line is correct

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the User model is imported correctly
    console.log('User model:', User);
    
    let user = await User.findOne({ where: { email } });
    console.log('Found user:', user); // Log the user found

    if (user) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: hashedPassword });
    console.log('New user created:', user); // Log the new user created

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('Error signing token:', err);
        throw err;
      }
      res.json({ token });
    });
  } catch (err) {
    console.error('Registration error:', err); // Log the error
    res.status(500).send('Server error');
  }
};

// Authenticate user and return token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    console.log('Login attempt for user:', user); // Log the user found for login

    if (!user) {
      console.log('Invalid credentials: User not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials: Password mismatch');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('Error signing token:', err);
        throw err;
      }
      res.json({ token });
    });
  } catch (err) {
    console.error('Login error:', err); // Log the error
    res.status(500).send('Server error');
  }
};
