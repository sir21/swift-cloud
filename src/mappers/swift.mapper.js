const columnMapper = (columnString) => {
  if (!columnString || columnString === "All") {
   return '*'
  }
  return columnString;
};

module.exports = {
    columnMapper,
}
