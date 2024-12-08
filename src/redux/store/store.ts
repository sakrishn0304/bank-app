import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../reducers/transactionReducer";

export default configureStore({
  reducer: {
    transaction: transactionReducer
  },
});