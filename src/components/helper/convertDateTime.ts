export const convertDateTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(date);
  return formattedDate;
};
