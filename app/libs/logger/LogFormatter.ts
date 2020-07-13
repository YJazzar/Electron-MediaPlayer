import winston from 'winston';

export function loggingStringFormatter(
    level: string,
    time: string,
    sourcePath: string,
    message: string
): string {
    let formattedLevel = `         [${level}]`;
    formattedLevel = formattedLevel.substring(formattedLevel.length - 10);

    return `${formattedLevel} [${time}] [${sourcePath}]: ${message}`;
}

export function customWinstonFormatter() {
    return winston.format.printf(({ level, time, source, message }) => {
        return loggingStringFormatter(level, time, source, message);
    });
}
