function getYearOptions() {
  const dateOptions = [];

  for (
    let year = new Date().getFullYear();
    year >= 1900;
    year > 2000 ? (year -= 1) : (year -= 10)
  ) {
    const dateOption =
      year >= 2000
        ? { value: year, label: year.toString() }
        : { value: year, label: `${year.toString()}s` };

    dateOptions.push(dateOption);
  }

  return dateOptions;
}
export const sorterByDate = [{ value: 0, label: "All" }, ...getYearOptions()];

export const sorterByOthers = [
  { value: "", label: "Default" },
  { value: "originalTitle", label: "Name A-Z" },
  { value: "imdbRating", label: "IMDb" },
  { value: "imdbVoteCount", label: "Most voted" },
];
