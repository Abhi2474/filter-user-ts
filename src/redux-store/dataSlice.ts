import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ZodPagination } from '../type';
import user_data from '../assets/user_data.json'
import _, { filter } from "lodash";

const initialState: ZodPagination = {
	filteredArray: user_data,
	data: [],
	meta: {
		currentPage: 1,
		perPage: 30,
		totalPages: 0,
		totalItems: 0,
	},
	filterBy: {
		available: undefined,
		domain: '',
		gender: ''
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
			state.meta.totalPages = Math.ceil(state.meta.totalItems / state.meta.perPage)
		},

		resetUser: (state) => {
			state.meta.currentPage = 1
			state.filterBy = {
				available: undefined,
				domain: '',
				gender: ''
			}
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
			if (state.filterBy.available && state.filterBy.gender) {
				state.filteredArray = _.filter(user_data, { available: state.filterBy.available })
				state.filteredArray = _.filter(state.filteredArray, { gender: state.filterBy.gender })
			}
			else if (state.filterBy.available) {
				state.filteredArray = _.filter(user_data, { available: state.filterBy.available })
			}
			else if (state.filterBy.gender) {
				state.filteredArray = _.filter(user_data, { gender: state.filterBy.gender })
			}

			else if (state.filterBy.available == undefined && !state.filterBy.gender) {
				state.filteredArray = _.filter(user_data, { domain: action.payload })
			}

			if (state.filterBy.available || state.filterBy.gender) {
				state.filteredArray = _.filter(state.filteredArray, { domain: action.payload })
			}
			state.meta.currentPage = 1
			state.meta.totalItems = state.filteredArray.length
			state.meta.totalPages = Math.ceil(state.meta.totalItems / state.meta.perPage)
			state.data = state.filteredArray.slice(state.meta.currentPage * state.meta.perPage - state.meta.perPage, state.meta.currentPage * state.meta.perPage)
		},

		getUniqueGender: (state, action: PayloadAction<string>) => {
			if (state.filterBy.available && state.filterBy.domain) {
				state.filteredArray = _.filter(user_data, { domain: state.filterBy.domain })
				state.filteredArray = _.filter(state.filteredArray, { available: state.filterBy.available })
			}
			else if (state.filterBy.domain) {
				state.filteredArray = _.filter(user_data, { domain: state.filterBy.domain })
			}
			else if (state.filterBy.available) {
				state.filteredArray = _.filter(user_data, { available: state.filterBy.available })
			}
			else if (state.filterBy.available == undefined && !state.filterBy.domain) {
				state.filteredArray = _.filter(user_data, { gender: action.payload })
			}
			if (state.filterBy.available || state.filterBy.domain) {
				state.filteredArray = _.filter(state.filteredArray, { gender: action.payload })
			}
			state.meta.currentPage = 1
			state.meta.totalItems = state.filteredArray.length
			state.meta.totalPages = Math.ceil(state.meta.totalItems / state.meta.perPage)
			state.data = state.filteredArray.slice(state.meta.currentPage * state.meta.perPage - state.meta.perPage, state.meta.currentPage * state.meta.perPage)

		},

		getAvailableUser: (state, action: PayloadAction<boolean>) => {
			if (state.filterBy.domain && state.filterBy.gender) {
				state.filteredArray = _.filter(user_data, { domain: state.filterBy.domain })
				state.filteredArray = _.filter(state.filteredArray, { gender: state.filterBy.gender })
			}
			else if (state.filterBy.domain) {
				state.filteredArray = _.filter(user_data, { domain: state.filterBy.domain })
			}
			else if (state.filterBy.gender) {
				state.filteredArray = _.filter(user_data, { gender: state.filterBy.gender })
			}
			else if (!state.filterBy.domain && !state.filterBy.gender) {
				state.filteredArray = _.filter(user_data, { available: action.payload })
			}
			if (state.filterBy.domain || state.filterBy.gender) {
				state.filteredArray = _.filter(state.filteredArray, { available: action.payload })
			}

			state.meta.currentPage = 1
			state.meta.totalItems = state.filteredArray.length
			state.meta.totalPages = Math.ceil(state.meta.totalItems / state.meta.perPage)
			state.data = state.filteredArray.slice(state.meta.currentPage * state.meta.perPage - state.meta.perPage, state.meta.currentPage * state.meta.perPage)

		},

		setDomain: (state, action: PayloadAction<string>) => {
			state.filterBy.domain = action.payload
		},

		setGender: (state, action: PayloadAction<string>) => {
			state.filterBy.gender = action.payload
		},

		isAvailable: (state, action: PayloadAction<boolean>) => {
			state.filterBy.available = action.payload
		},

	}
})

export const { increaseCurrentPage, setUser, decreaseCurrentPage, resetUser, getUniqueDomain, getUniqueGender, isAvailable, setDomain, setGender, getAvailableUser } = userSlice.actions

export default userSlice.reducer