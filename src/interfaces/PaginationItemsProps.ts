export interface PaginationItemsProps {
	currentPage: number;
	totalPages: number;
	setCurrentPage: (page: number) => void;
}

export interface PagesProps {
	setter: React.Dispatch<React.SetStateAction<number>>;
	page: number;
	totalPages: number | undefined;
}
