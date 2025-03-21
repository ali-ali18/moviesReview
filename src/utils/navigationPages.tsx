import {
	PaginationItem,
	PaginationLink,
	PaginationEllipsis,
} from "@/components/ui/pagination";
import type { PagesProps, PaginationItemsProps } from "@/interfaces/PaginationItemsProps";

function scrollToTop() {
	window.scrollTo(0, 0);
}

export function goPreviousPage({ page, setter }: PagesProps) {
	if (page > 1) {
		setter((prev) => prev - 1);
		window.scrollTo(0,0)
	}
}

export function goNextPage({ page, setter, totalPages = 1 }: PagesProps) {
	if (page < totalPages) {
		setter((prev) => prev + 1);
		window.scrollTo(0,0)
	}
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
							scrollToTop();
						} }
						isActive={currentPage === i}
						className={isMobile ? "text-sm px-2" : "text-base px-3"}
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
							scrollToTop();
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
							scrollToTop();
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
							scrollToTop();
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
