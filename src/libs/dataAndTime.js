export default function dbTimeToHuman(str) {
    return str.replace('T', ' ').substring(0, 16);
}