import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./Slice/usersSlice";
import transactionsSlice from "./Slice/transactionsSlice";
import plansSlice from "./Slice/plansSlice";
import paymentMethodsSlice from "./Slice/paymentMethodsSlice";
import newsletterSlice from "./Slice/newsletterSlice";
import membershipsSlice from "./Slice/membershipsSlice";
import instructorsSlice from "./Slice/instructorsSlice";
import classTypeSlice from "./Slice/classTypeSlice";
import classParticipantsSlice from "./Slice/classParticipantsSlice";
import classesSlice from "./Slice/classesSlice";
import classCategorySlice from "./Slice/classCategorySlice";

export const store = configureStore({
    reducer:{
        users : usersSlice,
        transactions : transactionsSlice,
        plans : plansSlice,
        paymentMethod : paymentMethodsSlice,
        newsletter : newsletterSlice,
        memberships : membershipsSlice,
        instructor : instructorsSlice,
        classType : classTypeSlice,
        classParticipants : classParticipantsSlice,
        classes : classesSlice,
        classCategory : classCategorySlice,
    }
})