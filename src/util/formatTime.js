import moment from "moment-jalaali";

export function formatTime(time) {
    return moment(time).format("HH:mm:ss");
}

export function formatDate(date) {
    return moment(date).format("jYYYY/jM/jD");
}
