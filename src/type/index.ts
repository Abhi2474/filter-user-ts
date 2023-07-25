import { z } from "zod";

export const ZodDataObject = z.object({
	id: z.number(),
	email: z.string().email(),
	first_name: z.string(),
	last_name: z.string(),
	domain: z.string(),
	avatar: z.string(),
	gender: z.string(),
	available: z.boolean(),
});
export type DataProps = z.infer<typeof ZodDataObject>;
export const ZodDataArray = z.array(ZodDataObject);

export type ZodPagination = {
	data: DataProps[];
	meta: {
		currentPage: number;
		perPage: number;
		totalPages: number;
		totalItems: number;
	};
};
