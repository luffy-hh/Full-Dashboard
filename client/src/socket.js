import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://ar7mm.org/dashboard";

export const socket = io(URL);
