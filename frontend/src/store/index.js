import { create } from "zustand";
import { createAuthslice } from "./slices/authslice.js";
import { chatSlice } from "./slices/chatslice.js";

export const useAppStore = create()((...a)=>({
    ...createAuthslice(...a),
    ...chatSlice(...a),
}));
