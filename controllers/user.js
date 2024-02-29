const User = require('../model/User');
exports.Login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // Username not found
      return res.status(401).json({ message: 'Invalid user' });
    }
    // console.log(user)
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      // Incorrect password
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  
    const token = await user.generateAuthToken();
    console.log(token)
    res.cookie('jwttoken', token);
     // secure true to allow https only
     // secure true to allow https only
  
    res.json({ message: "Login Success", status: 1 ,token: token })
  }
exports.Profile = async (req, res) => {
    const token = req.params.token;
    if (!token || token === 'null'|| token === 'undefined'|| token == null) {
      return res.status(401).json({ message: "Unauthorized", status: 401 });
    }
    // console.log(token)
    const user = await User.findByToken(token);
    res.json({ message: user.email, status: 1 })
  }
exports.Register = async (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
    try {
      await user.save();
      const token = user.generateAuthToken();
      res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false }); // secure true to allow https only
      res.json({ message: "User created successfully", status: 1 })
    } catch (error) {
      res.status(400).json({ message: error.message, status: 0 })
    }
  }