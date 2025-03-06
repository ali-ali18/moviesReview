import { Link, useLocation } from "react-router-dom";

interface ButtonNavProps {
	url: string;
	children: React.ReactNode;
}

const styleButton = 'opacity-100 flex items-center gap-2.5 font-medium bg-accent p-2 rounded-sm'

export default function ButtonNav({ url, children }: ButtonNavProps) {
	const location = useLocation();

	const getLink = (isActive: boolean) =>
		isActive
			? styleButton
			: "flex items-center gap-2.5 p-2 text-muted-foreground";

	return (
		<li className="mx-2">
			<Link to={url} className={getLink(location.pathname === url)}>
				{children}
			</Link>
		</li>
	);
}
