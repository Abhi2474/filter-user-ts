import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ZodPagination } from '../type';
import user_data from '../assets/user_data.json'

const initialState: ZodPagination = {
	filteredArray: user_data,
	data: [],
	meta: {
		currentPage: 1,
		perPage: 30,
		totalPages: 0,
		totalItems: 0,
	}
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state) => {
			let { currentPage } = state.meta
			state.meta.totalItems = state.filteredArray.length
			state.data = state.filteredArray.slice(currentPage * state.meta.perPage - state.meta.perPage, currentPage * state.meta.perPage)
			state.meta.totalPages = Math.floor(state.meta.totalItems / state.meta.perPage)
		},
		resetUser: (state) => {
			state.meta.currentPage = 1
			state.filteredArray = user_data
			state.data = state.filteredArray.slice(state.meta.currentPage * state.meta.perPage - state.meta.perPage, state.meta.currentPage * state.meta.perPage)
		},
		increaseCurrentPage: (state) => {
			state.meta.currentPage++
			state.data = state.filteredArray.slice(state.meta.currentPage * state.meta.perPage - state.meta.perPage, state.meta.currentPage * state.meta.perPage)
		},
		decreaseCurrentPage: (state) => {
			state.meta.currentPage--
			state.data = state.filteredArray.slice(state.meta.currentPage * state.meta.perPage - state.meta.perPage, state.meta.currentPage * state.meta.perPage)
		},
		getUniqueDomain: (state, action: PayloadAction<string>) => {

			state.filteredArray = user_data.filter((data) => {
				return data.domain === action.payload
			})
			state.meta.totalItems = state.filteredArray.length
			state.meta.totalPages = Math.floor(state.meta.totalItems / state.meta.perPage)


			state.data = state.filteredArray.slice(state.meta.currentPage * state.meta.perPage - state.meta.perPage, state.meta.currentPage * state.meta.perPage)
		},
		getUniqueGender: (state, action: PayloadAction<string>) => {

			state.filteredArray = user_data.filter((data) => {
				return data.gender === action.payload
			})
			state.meta.totalItems = state.filteredArray.length
			state.meta.totalPages = Math.floor(state.meta.totalItems / state.meta.perPage)


			state.data = state.filteredArray.slice(state.meta.currentPage * state.meta.perPage - state.meta.perPage, state.meta.currentPage * state.meta.perPage)
		},
	}
})

export const { increaseCurrentPage, setUser, decreaseCurrentPage, resetUser, getUniqueDomain, getUniqueGender } = userSlice.actions

export default userSlice.reducer