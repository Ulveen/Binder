function getTimeDiffYear(date: Date | undefined) {
    if (!date) return 0;
    const now = new Date();
    return now.getFullYear() - date.getFullYear();
}

function getTimeDiffFormatted(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = days / 30;
    const years = days / 365;

    if (minutes < 60) {
        return `${Math.max(Math.floor(minutes), 1)} min`;
    } else if (hours < 24) {
        return `${Math.floor(hours)} hour`;
    } else if (days < 7) {
        return `${Math.floor(days)} day`;
    } else if (weeks < 4) {
        return `${Math.floor(weeks)} week`;
    } else if (months < 12) {
        return `${Math.floor(months)} month`;
    } else {
        return `${Math.floor(years)} year`;
    }

}

export default function TimeService() {
    return { getTimeDiffYear, getTimeDiffFormatted }
}