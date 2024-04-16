function getTimeDiffYear(date: Date | undefined) {
    if (!date) return 0;
    const now = new Date();
    return now.getFullYear() - date.getFullYear();
}

export default function TimeService() {
    return { getTimeDiffYear }
}