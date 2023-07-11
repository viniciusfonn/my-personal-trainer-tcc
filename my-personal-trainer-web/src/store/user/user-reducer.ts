import {createSlice} from "@reduxjs/toolkit";

export type User = {
	name: string
	avatar: string | undefined
	email: string
	ProviderInfo: {
		description: string | undefined;
		startHour: number;
		endHour: number;
		category_id: string
	}
}

type USER_REDUCER = {
	id: string | null
	token: string | null,
	user: User | null
}

const initialState: USER_REDUCER = {
	token: null,
	user: null,
	id: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser(state, action) {
			state.token = action.payload.token
			state.user = action.payload.user
			state.id = action.payload.id
		},
		setUserProfileData(state, action) {
			state.user = action.payload
		}
	}
})

export const {setCurrentUser, setUserProfileData} = userSlice.actions
export const userReducer = userSlice.reducer
