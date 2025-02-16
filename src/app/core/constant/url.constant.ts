export const BACKEND_URI = "http://localhost:3001";

// First layer backend endpoints
export const BACKEND_ENDPOINT = {
  AUTH: "auth",
  EVENT: "event",
  USER: "user",
  CHAT: "chat",
};

// Second layer backend endpoints
export const BACKEND_AUTH_ENDPOINT = {
  LOGIN: "login",
  LOGOUT: "logout",
  REGISTER: "register",
};

export const BACKEND_EVENT_ENDPOINT = {
  NEW: 'new',
  UPDATE: 'update',
  DELETE: 'delete',
  SEND_IMAGE: 'send_image',
  GET_IMAGE: 'get_image',
  LIKE: 'like',
  UNLIKE: 'unlike',
  LIKES: 'likes',
};

export const BACKEND_USER_ENDPOINT = {
  PROFILE: "myprofile",
  UPDATE: "update",
  ALL: "all",
  SEND_IMAGE: "send_image",
  GET_IMAGE: "get_image",
};

export const BACKEND_CHAT_ENDPOINT = {
  ALL: "all",
  NEW: "new",
};

// Front end URL
export const APP_URL = {
  HOME: "home",
  LOGIN: "login",
  PROFILE: "profile",
  EVENT: "event",
  CHATS: "chats",
};

export const EVENT_URL = {
  NEW: "new",
  UPDATE: "update",
};

export const USER_URL = {
  UPDATE: "update",
};

export const LOGIN_FRAGMENT = {
  REGISTER: "register",
  LOGOUT: "logout",
};
