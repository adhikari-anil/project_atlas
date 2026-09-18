import jwt from "jsonwebtoken";
import { parseCookie } from "cookie";
import type { Socket } from "socket.io";
import "../lib/env";

interface JwtPayload {
  userId: string;
}

export function authenticateSocket(
  socket: Socket,
  next: (error?: Error) => void,
) {
  try {
    //console.log("Incomming sockets: ", socket);
    const cookies = parseCookie(socket.handshake.headers.cookie ?? "");

    const accessToken = cookies.access_token;

    if (!accessToken) {
      return next(new Error("Authentication required."));
    }

    const payload = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as JwtPayload;

    //console.log("Information: ", payload);

    socket.data.userId = payload.userId;

    next();
  } catch {
    next(new Error("Invalid authentication token."));
  }
}
