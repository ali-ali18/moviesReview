import {
	PaginationItem,
	PaginationLink,
	PaginationEllipsis,
} from "@/components/ui/pagination";

interface PagesProps {
	setter: React.Dispatch<React.SetStateAction<number>>;
	page: number;
	totalPages: number;
}

export function goPreviousPage({ page, setter }: PagesProps) {
	if (page > 1) {
		setter((prev) => prev - 1);
	}
}

export function goNextPage({ page, setter, totalPages }: PagesProps) {
	if (page < totalPages) {
		setter((prev) => prev + 1);
	}
}

interface PaginationItemsProps {
	currentPage: number;
	totalPages: number;
	setCurrentPage: (page: number) => void;
}

export function getPaginationItems({
	currentPage,
	totalPages,
	setCurrentPage,
}: PaginationItemsProps) {
	const items = [];
	const isMobile = window.innerWidth < 640; // Breakpoint sm
	const maxVisiblePages = isMobile ? 1 : 3; // 1 em mobile, 3 em desktop

	if (totalPages <= maxVisiblePages) {
		for (let i = 1; i <= totalPages; i++) {
			items.push(
				<PaginationItem key={i}>
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault();
							setCurrentPage(i);
						}}
						isActive={currentPage === i}
						className={isMobile ? "text-sm px-2" : "text-base px-3"} // Compacta em mobile
					>
						{i}
					</PaginationLink>
				</PaginationItem>,
			);
		}
	} else {
		const range = Math.floor(maxVisiblePages / 2);
		const startPage = Math.max(1, currentPage - range);
		const endPage = Math.min(totalPages, currentPage + range);

		if (startPage > 1) {
			items.push(
				<PaginationItem key={1}>
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault();
							setCurrentPage(1);
						}}
						className={isMobile ? "text-sm px-2" : "text-base px-3"}
					>
						1
					</PaginationLink>
				</PaginationItem>,
			);
		}

		if (startPage > 2) {
			items.push(<PaginationEllipsis key="start-ellipsis" />);
		}

		for (let i = startPage; i <= endPage; i++) {
			items.push(
				<PaginationItem key={i}>
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault();
							setCurrentPage(i);
						}}
						isActive={currentPage === i}
						className={isMobile ? "text-sm px-2" : "text-base px-3"}
					>
						{i}
					</PaginationLink>
				</PaginationItem>,
			);
		}

		if (endPage < totalPages - 1) {
			items.push(<PaginationEllipsis key="end-ellipsis" />);
		}

		if (endPage < totalPages) {
			items.push(
				<PaginationItem key={totalPages}>
					<PaginationLink
						href="#"
						onClick={(e) => {
							e.preventDefault();
							setCurrentPage(totalPages);
						}}
						className={isMobile ? "text-sm px-2" : "text-base px-3"}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>,
			);
		}
	}

	return items;
}
