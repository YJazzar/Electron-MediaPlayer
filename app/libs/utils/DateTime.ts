import moment from 'moment';

export default function getDateTime(): string {
    return moment().format('MMMM DD YYYY h:mm:ss a');
}
