import express from 'express'

const router = express.Router();

import { protectAuthRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersFromSidebar, sendMessages } from '../controllers/messages.controllers.js';

router.get('/users', protectAuthRoute, getUsersFromSidebar);
router.get("/:id", protectAuthRoute, getMessages);
router.post("/send/:id", protectAuthRoute, sendMessages);

export default router;