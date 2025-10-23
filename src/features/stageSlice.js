import { createSlice } from "@reduxjs/toolkit";

const stageSlice = createSlice({
  name: "stage",
  initialState: {
    currentStage: "",
    templateId: null,
    templateWidth: 0,
    templateHeight: 0,
  },
  reducers: {
    handleStoreStage: (state, action) => {
      state.currentStage = action.payload;
    },
    handleTemplateId: (state, action) => {
      state.templateId = action.payload;
    },
    handleTemplateSize: (state, action) => {
      const { width, height } = action.payload;
      state.templateWidth = width;
      state.templateHeight = height;
    },
  },
});

export const { handleStoreStage, handleTemplateId, handleTemplateSize } =
  stageSlice.actions;
export default stageSlice.reducer;
