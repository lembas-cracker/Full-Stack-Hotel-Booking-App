export const searchParamsToQuery = ({ destination, options, dates }) => {
  const query = new URLSearchParams();

  query.append("destination", destination);
  query.append("options", JSON.stringify(options));
  query.append(
    "dates",
    JSON.stringify(
      dates.map((x) => ({
        ...x,
        startDate: x.startDate.getTime(),
        endDate: x.endDate.getTime(),
      }))
    )
  );

  return query.toString();
};

export const searchParamsFromQuery = (queryString) => {
  const query = new URLSearchParams(queryString);

  const destination = query.get("destination") || "";
  const options = JSON.parse(query.get("options") || "{}");
  const dates = JSON.parse(query.get("dates") || "[]").map((x) => ({
    ...x,
    startDate: new Date(x.startDate),
    endDate: new Date(x.endDate),
  }));
  return { destination, options, dates };
};
