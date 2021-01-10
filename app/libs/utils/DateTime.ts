import moment from 'moment';

export default function getDateTime(): string {
    return moment().format('l h:mm:ssa');
}

// A function to convert seconds into a string in the format 'hh:mm:ss'
export function formatSeconds(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.round(totalSeconds % 60);

    return [hours, minutes, seconds]
        .map((element: number) => {
            // Add an extra '0' if needed
            return element < 10 ? `0${element}` : element;
        })
        .filter((element, index) => {
            // Remove the hours mark if it is all zeros
            return !(element === '00' && index === 0);
        })
        .join(':');
}
