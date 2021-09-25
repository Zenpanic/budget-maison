import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addProjectAsync = createAsyncThunk(
    'projects/addProjectAsync',
    async payload => {
        const res = await fetch('/api/projects/createProject', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${payload.accessToken}`
            }
        });
        const project = await res.json();
        return { project };
    }
);

export const getProjectsAsync = createAsyncThunk(
    'projects/getProjectsAsync',
    async payload => {
        const res = await fetch('/api/projects/getUserProjects', {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${payload.accessToken}`
            }
        });
        const projects = await res.json();
        return { projects };
    }
);

export const addElementAsync = createAsyncThunk(
    'projects/addElementAsync',
    async payload => {
        const element = payload.element;
        const res = await fetch('/api/projects/addElement', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${payload.accessToken}`
            },
            body: JSON.stringify({
                element
            })
        });
        const project = await res.json();
        return { project };
    }
);

export const deleteElementAsync = createAsyncThunk(
    'projects/deleteElementAsync',
    async payload => {
        const element = payload.element;
        const res = await fetch('/api/projects/deleteElement', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${payload.accessToken}`
            },
            body: JSON.stringify({
                element
            })
        });
        const project = await res.json();
        return { project };
    }
);

export const updateElementAsync = createAsyncThunk(
    'projects/updateElementAsync',
    async payload => {
        const element = payload.element;
        const res = await fetch('/api/projects/updateElement', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${payload.accessToken}`
            },
            body: JSON.stringify({
                element
            })
        });
        const project = await res.json();
        return { project };
    }
);

export const renameCategoryAsync = createAsyncThunk(
    'projects/renameCategoryAsync',
    async payload => {
        const { oldName, newName, projectId, accessToken } = payload;
        const res = await fetch('/api/projects/renameCategory', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                oldName,
                newName,
                projectId
            })
        });
        const project = await res.json();
        return { project };
    }
);

export const deleteCategoryAsync = createAsyncThunk(
    'projects/deleteCategoryAsync',
    async payload => {
        const { projectId, category, accessToken } = payload;
        const res = await fetch('/api/projects/deleteCategory', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                category,
                projectId
            })
        });
        const project = await res.json();
        return { project };
    }
);

export const addCategoryAsync = createAsyncThunk(
    'projects/addCategoryAsync',
    async payload => {
        const { newName, projectId, accessToken } = payload;
        const res = await fetch('/api/projects/addCategory', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                projectId,
                newName
            })
        });
        const project = await res.json();
        return { project };
    }
);

export const projectSlice = createSlice({
    name: 'projects',
    initialState: [],
    reducers: {},
    extraReducers: {
        [addProjectAsync.fulfilled]: (state, action) => {
            state.push(action.payload.project);
        },
        [getProjectsAsync.fulfilled]: (state, action) => {
            return action.payload.projects;
        },
        [addElementAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(project => {
                return project._id === action.payload.project._id;
            });
            state[index] = { ...action.payload.project };
        },
        [updateElementAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(project => {
                return project._id === action.payload.project._id;
            });
            state[index] = { ...action.payload.project };
        },
        [deleteElementAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(project => {
                return project._id === action.payload.project._id;
            });
            state[index] = { ...action.payload.project };
        },
        [renameCategoryAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(project => {
                return project._id === action.payload.project._id;
            });
            state[index] = [...action.payload.project];
        },
        [deleteCategoryAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(project => {
                return project._id === action.payload.project._id;
            });
            state[index] = { ...action.payload.project };
        },
        [addCategoryAsync.fulfilled]: (state, action) => {
            const index = state.findIndex(project => {
                return project._id === action.payload.project._id;
            });
            state[index] = { ...action.payload.project };
        },
    },
});

export default projectSlice.reducer;