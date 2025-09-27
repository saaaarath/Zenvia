import { generateStreamToken } from "../config/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const token = generateStreamToken(userId);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(500).json({ error: 'Failed to generate token' });
    }
  } catch (error) {
    console.error('Error generating stream token:', error);
    res.status(500).json({
      message: 'Failed to generate token'
    });
  }
}