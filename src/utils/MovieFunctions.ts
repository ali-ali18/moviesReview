export function formatDuration(runtime: number | undefined): string {
	if (!runtime || runtime <= 0) return "Não disponível";

	const hours = Math.floor(runtime / 60);
	const minutes = runtime % 60;

	if (hours === 0) return `${minutes} minutos`;
	if (minutes === 0) return `${hours} horas`;
	return `${hours} horas e ${minutes} minutos`;
}

export function formatDate(dateStr: string): string {
	if (!dateStr) return "N/A";

	const [year, month, day] = dateStr.split("-");
	return `${day}/${month}/${year}`;
}

export function formatVote(vote_average: number) {
	if (!vote_average) return "0.0";
	const calculo = Math.min(vote_average, 10) / 2;
	return calculo.toFixed(1);
}

export function formatVoteCount(voteCount: number | undefined): string {
	if (!voteCount || voteCount < 0) return "N/A";

	return new Intl.NumberFormat("pt-BR", {
		notation: "compact",
		compactDisplay: "short",
	}).format(voteCount);
}

export function formatBudget(budget: number) {
	if (!budget || budget <= 0) return "Não disponível";

	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(budget);
}
