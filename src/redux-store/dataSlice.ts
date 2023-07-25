import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ZodPagination } from '../type';
import user_data from '../assets/user_data.json'

const initialState: ZodPagination = {
	data: user_data,
	meta: {
		currentPage: 1,
		perPage: 0,
		totalPages: 0,
		totalItems: user_data.length,
	}
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state) => {
			let { currentPage } = state.meta
			state.meta.perPage = 20
			state.data = user_data.slice(currentPage * state.meta.perPage - state.meta.perPage, currentPage * state.meta.perPage)
			state.meta.totalPages = state.meta.totalItems / state.meta.perPage
		},
		increaseCurrentPage: (state) => {
			state.meta.currentPage++
			state.data = user_data.slice(state.meta.currentPage * state.meta.perPage - state.meta.perPage, state.meta.currentPage * state.meta.perPage)
		},
		decreaseCurrentPage: (state) => {
			state.meta.currentPage--
			state.data = user_data.slice(state.meta.currentPage * state.meta.perPage - state.meta.perPage, state.meta.currentPage * state.meta.perPage)
		}
	}
})

export const { increaseCurrentPage, setUser, decreaseCurrentPage } = userSlice.actions

export default userSlice.reducer