import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

// Get or create a conversation between two users
export const getOrCreateConversation = async (req, res) => {
    try {
        const userId = req.id;
        const { recipientId } = req.body;

        if (!recipientId) {
            return res.status(400).json({ message: "Recipient ID is required", success: false });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [userId, recipientId] },
        }).populate("participants", "fullname profile");

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [userId, recipientId],
            });
            conversation = await conversation.populate("participants", "fullname profile");
        }

        return res.status(200).json({ conversation, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Get all conversations for the logged-in user
export const getConversations = async (req, res) => {
    try {
        const userId = req.id;

        const conversations = await Conversation.find({
            participants: userId,
        })
            .populate("participants", "fullname profile")
            .populate("lastMessage")
            .sort({ updatedAt: -1 });

        return res.status(200).json({ conversations, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Get messages for a conversation
export const getMessages = async (req, res) => {
    try {
        const userId = req.id;
        const { conversationId } = req.params;

        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId,
        });

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found", success: false });
        }

        const messages = await Message.find({ conversation: conversationId })   // ← fixed
            .populate("sender", "fullname profile")
            .sort({ createdAt: 1 });

        return res.status(200).json({ messages, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Send a message
export const sendMessage = async (req, res) => {
    try {
        const userId = req.id;
        const { conversationId } = req.params;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Message text is required", success: false });
        }

        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId,
        });

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found", success: false });
        }

        const message = await Message.create({
            conversation: conversationId,   // ← fixed
            sender: userId,
            text,
        });

        conversation.lastMessage = message._id;
        await conversation.save();

        const populated = await message.populate("sender", "fullname profile");

        return res.status(201).json({ message: populated, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};