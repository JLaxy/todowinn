export const dateFormatter = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", // e.g., "September"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Returns "yyyy-MM-dd" format for <input type="date" />
export const toDateInputValue = (date: string | Date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0]; // "2025-11-28"
};
