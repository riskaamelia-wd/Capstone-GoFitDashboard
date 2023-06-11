import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./Slice/usersSlice";
import paymentMethodsSlice from "./Slice/paymentMethodsSlice";
import classesSlice from "./Slice/classesSlice";
import trainingSlice from "./Slice/trainingSlice";
import onlineClassSlice from "./Slice/OnlineClassSlice";
import recomendedSlice from "./Slice/recomendedSlice";

export const store = configureStore({
    reducer:{
        users : usersSlice,
        paymentMethod : paymentMethodsSlice,
        classes : classesSlice,
        training: trainingSlice,
        onlineClass : onlineClassSlice,
        recomended : recomendedSlice
    }
})