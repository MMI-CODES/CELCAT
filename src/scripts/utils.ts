export const getDuration = (start: Date, end: Date): number => {
    const diff = end.getTime() - start.getTime();
    return diff / (1000 * 60 * 60);
}

export const toFormatHHMM = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export const colors: Record<string, string> = {
	'DS': '#FF48F3',
	'TD': '#2E8DB6',
	'TP': '#622FB5',
	'CM': '#E14864',
	'Projet Tutoré': '#5349D7'
}

export const emojis: Record<string, string> = {
	'R 1.01': '🇬🇧', // Anglais
	'R 1.02': '🇬🇧', // Anglais aussi (?)
	'R 1.03': '🚹', // Ergo/Accessibilité
	'R 1.04': '🌐', // Culture numérique
	'R 1.05': '📢', // Stratégies de communication
	'R 1.06': '🗣️', // Expression & Communication
	'R 1.07': '📝', // Écriture Multimédia et Narration
	'R 1.08': '✒️', // Graphisme
	'R 1.09': '🖼️', // Culture artistique
	'R 1.10': '🎥', // Audiovisuel
	'R 1.11': '⌨️', // Integration
	'R 1.12': '💻', // Dev Web
	'R 1.13': '🚀', // Hébergement
	'R 1.14': '🔣', // Représentation et Traitement Informatique
	'R 1.15': '🧠', // Gestion de Projet
	'R 1.16': '📜', // Économie & Droit
	'R 1.17': '💼', // Projet Personnel Professionel

	/* Les 3 lettres du supplice */
	'SAE 1.01': '', // Y'en a pas
	'SAE 1.02': '📊', // Recommandation Numérique
	'SAE 1.03': '✒️', // Design Graphique
	'SAE 1.04': '🎥', // Audiovisuel
	'SAE 1.05': '💻', // Conception d'un Site Web
	'SAE 1.06': '🧠', // Gestion de Projet et Recommandation

	/* Autres */
	'lunch': '🍽️', // Pause dej
	'Réunion': '🗓️', // Réunion
	'Portfolio': '💼' // Portfolio
}