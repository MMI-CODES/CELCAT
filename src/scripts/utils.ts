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