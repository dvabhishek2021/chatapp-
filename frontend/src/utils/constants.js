export const HOST = import.meta.env.VITE_URL;

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USERINFO = `${AUTH_ROUTES}/userinfo`;
export const UPDATE_PROFILE= `${AUTH_ROUTES}/updateprofile`;
export const LOGOUT = `${AUTH_ROUTES}/logout`;

export const CONTACT_ROUTE = "api/contact";
export const SEARCH_CONTACTS = `${CONTACT_ROUTE}/search`;
export const GET_DM_CONTACTS = `${CONTACT_ROUTE}/getcontactsfordm`;
export const GET_ALL_CONTACTS_ROUTE = `${CONTACT_ROUTE}/get-all-contacts`;

export const MESSAGES_ROUTE = "api/messages";
export const GET_ALL_MESSAGES = `${MESSAGES_ROUTE}/getmessages`;
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTE}/upload-file`;

export const CHANNEL_ROUTE = "api/channel";
export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTE}/create-channel`;
export const GET_USER_CHANNELS = `${CHANNEL_ROUTE}/get-user-channels`;
export const GET_CHANNEL_MESSAGES = `${CHANNEL_ROUTE}/get-channel-messages`;
