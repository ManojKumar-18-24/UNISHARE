import { configureStore } from "@reduxjs/toolkit";
import { authreducer } from "./authSlice";

export const store = configureStore({
    reducer : authreducer
})