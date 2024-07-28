import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { fetchPreference } from 'src/api/preference';

const initState = {
    isLoading: true,
    preference: {},
    modules: [],
};

export const getPreference = createAsyncThunk(
    'root/getPreference',
    async ({id}, { getState, dispatch }) => {
        return await fetchPreference(id);
    },
);

export const counterSlice = createSlice({
    name: 'root',
    initialState: initState,
    reducers: {
        loaded: state => {
            state.isLoading = false;
        },
        refresh: state => {
            state.isLoading = true;
        },
        setPreference: (state, action) => {
            state.preference = action.payload;
        },
        setModules: (state, action) => {
            state.modules = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPreference.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPreference.fulfilled, (state, action) => {
                state.isLoading = false;
                state.preference = action.payload;
            })
            .addCase(getPreference.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const {
    loaded,
    refresh,
    setPreference,
    setModules,
} = counterSlice.actions;

export default counterSlice.reducer;

export const selectLoadingState = (state) => {
    return state.root.isLoading;
};

export const selectPreference = (state) => {
    return state.root.preference;
};

export const selectModules = (state) => {
    return state.root.modules;
};

export const selectAdminModules = createSelector(
    [selectModules],
    (modules) => {
        return modules.filter((m) => {
            return m.admin
        });
    }
);
