import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loginAPI } from "./features/loginAPI";
import { ProjectsAPI } from "./features/projectsAPI";
import { ContactsAPI } from "./features/contactsAPI";
import { SkillsAPI } from "./features/skillsAPI";
import { BlogsAPI } from "./features/blogsAPI";
import { UsersAPI } from "./features/usersAPI";


// Redux Persist configuration
const persistConfig = {
    key: "root",
    storage,
};

// Combine reducers here
const rootReducer = combineReducers({
    [loginAPI.reducerPath]:loginAPI.reducer,
    [ProjectsAPI.reducerPath]:ProjectsAPI.reducer,
    [ContactsAPI.reducerPath]:ContactsAPI.reducer,
    [SkillsAPI.reducerPath]:SkillsAPI.reducer,
    [BlogsAPI.reducerPath]:BlogsAPI.reducer,
    [UsersAPI.reducerPath]:UsersAPI.reducer
    // Example: Add your reducers
    // [registerAPI.reducerPath]: registerAPI.reducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(loginAPI.middleware ,ProjectsAPI.middleware ,ContactsAPI.middleware ,SkillsAPI.middleware ,BlogsAPI.middleware ,UsersAPI.middleware), // Move this inside
});


// Create persistor for Redux Persist
export const persistor = persistStore(store);

// Define types for state and dispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
