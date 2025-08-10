import express from 'express';
import { checkAuth, login, logout, signUp } from '../controllers/auth.controllers.js';
import { protectAuthRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login )
router.post('/logout', logout);
router.get('/check', protectAuthRoute, checkAuth)

export default router;