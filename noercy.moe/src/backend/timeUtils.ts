

export const formatTimestamp = (timeStamp: number): string => {
    const date = new Date(timeStamp);
    const today = new Date();

    const isToday = 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() && 
        date.getFullYear() === today.getFullYear();

    if (isToday) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'});
    } else {
        return date.toLocaleString();
    }
}