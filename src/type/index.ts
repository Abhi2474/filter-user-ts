export type DataProps = {
	id: number
	email: string
	first_name: string
	last_name: string
	domain: string
	avatar: string
	gender: string
	available: boolean
}

export type ZodPagination = {
	filteredArray: DataProps[];
	data: DataProps[];
	meta: {
		currentPage: number;
		perPage: number;
		totalPages: number;
		totalItems: number;
	};
};
