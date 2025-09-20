export const dateFormatter = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short", // e.g., "September"
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Returns "yyyy-MM-ddTHH:mm" for <input type="datetime-local" />
export const toDateInputValue = (date: string | Date) => {
  const d = new Date(date);

  const pad = (n: number) => n.toString().padStart(2, "0");

  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};
