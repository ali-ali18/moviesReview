export interface CardAtorProps {
	id: number;
	name: string;
	original_name: string;
	profile_path: string;
}

export default function CardAtor({
	id,
	name = "Nome do personagem",
	original_name = "Nome do ator",
	profile_path = "/tJr9GcmGNHhLVVEH3i7QYbj6hBi.jpg",
}: CardAtorProps) {
	return (
		<div className="border rounded-sm w-auto h-auto flex-shrink-0" key={id}>
			<img
				className="rounded-t-sm"
				src={`https://media.themoviedb.org/t/p/w276_and_h350_face/${profile_path}`}
				alt="foto-ator"
			/>
			<div className="py-2 mx-2">
				<p className="font-semibold text-lg">{original_name}</p>
				<p className="text-muted-foreground">{name}</p>
			</div>
		</div>
	);
}
