import { formatDistanceToNow, parseISO } from "date-fns";

export function timeAgo(dateString) {
  return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
}
