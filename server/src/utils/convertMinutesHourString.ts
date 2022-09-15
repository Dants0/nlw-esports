export function convertMinutesHourString(minutes: number){
    const hours = Math.floor(minutes /60);

    const minutesValue = minutes % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutesValue).padStart(2, '0')}`
}