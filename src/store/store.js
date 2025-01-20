import { configureStore } from "@reduxjs/toolkit";
import { authreducer } from "./postSlice";
import { postreducer } from "./postSlice";

export const store = configureStore({
    reducer : [authreducer,postreducer]
})