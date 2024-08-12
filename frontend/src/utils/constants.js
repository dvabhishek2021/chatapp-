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

export const MESSAGES_ROUTE = "api/messages";
export const GET_ALL_MESSAGES = `${MESSAGES_ROUTE}/getmessages`;


