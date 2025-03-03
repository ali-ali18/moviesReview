import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "./themeProvider";

export default function ToggleTheme() {
	const { theme, setTheme } = useTheme();
	function toggleTheme() {
		setTheme(theme === "dark" ? "light" : "dark");
	}

	return (
		<Button
			onClick={() => toggleTheme()}
			className=""
			variant={"ghost"}
			size={"icon"}
		>
			{theme === "dark" ? <Sun /> : <Moon />}
		</Button>
	);
}
