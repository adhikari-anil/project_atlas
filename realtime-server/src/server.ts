import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { authenticateSocket } from "./middleware/auth";
import { registerOrganizationHandlers } from "./handlers/organization";
import { prisma } from "./lib/prisma";
import { assertRealtimeEnvironment } from "./lib/env";

assertRealtimeEnvironment();

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.WEB_APP_URL || "http://localhost:3000",
    credentials: true,
  },
});

app.post("/internal/activity", (req, res) => {
  const secret = req.headers["x-internal-secret"];
  const expectedSecret =
    process.env.REALTIME_INTERNAL_SECRET || process.env.INTERNAL_API_SECRET;

  if (!expectedSecret || !secret || secret !== expectedSecret) {
    console.warn("Unauthorized internal activity broadcast request.");
    return res.status(401).json({
      error: "Unauthorized.",
    });
  }

  const activity = req.body;

  if (!activity?.organizationId) {
    return res.status(400).json({
      error: "organizationId is required.",
    });
  }

  const roomName = `organization:${activity.organizationId}`;
  console.log("Broadcasting activity to room:", roomName);

  io.to(roomName).emit("activity:created", activity);

  return res.json({
    success: true,
  });
});

io.use(authenticateSocket);

io.on("connection", async (socket) => {
  console.log("User ID:", socket.data.userId);

  const memberships = await prisma.organizationMember.findMany({
    where: {
      userId: socket.data.userId,
      status: "ACTIVE",
    },

    select: {
      organizationId: true,
    },
  });

  for (const membership of memberships) {
    socket.join(`organization:${membership.organizationId}`);

    console.log(
      `User ${socket.data.userId} joined organization:${membership.organizationId}`,
    );
  }

  registerOrganizationHandlers(socket);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err.message);
  });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Realtime server running on port ${PORT}`);
});
