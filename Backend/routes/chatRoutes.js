// routes/chatRoute.js
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // your existing auth middleware
import {
  getOrCreateConversation,
  getConversations,
  getMessages,
  sendMessage,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/conversations", isAuthenticated, getOrCreateConversation);
router.get("/conversations", isAuthenticated, getConversations);
router.get("/conversations/:conversationId/messages", isAuthenticated, getMessages);
router.post("/conversations/:conversationId/messages", isAuthenticated, sendMessage);

export default router;