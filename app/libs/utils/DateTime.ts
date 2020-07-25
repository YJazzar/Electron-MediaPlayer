import moment from 'moment';

export default function getDateTime(): string {
    return moment().format('l h:mm:ssa');
}
