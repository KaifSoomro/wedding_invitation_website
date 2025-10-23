import { configureStore } from "@reduxjs/toolkit";
import tempReducer from "../features/tempSlice"
import stageReducer from "../features/stageSlice"

export const store = configureStore({
    reducer: {
        temp: tempReducer,
        stage: stageReducer
    }
})