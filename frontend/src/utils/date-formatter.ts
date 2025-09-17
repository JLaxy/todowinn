export const dateFormatter = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", // e.g., "September"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
