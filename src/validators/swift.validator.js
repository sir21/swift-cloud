const { columnList, stringColumns, numberColumns } = require("../utils/const");

const validateColumns = (column) => {
  if (!column) return true;
  if (column === "All") return true;
  const columns = column.trim().split(",");
  columns.forEach((c) => {
    if (!columnList.includes(c)) {
      return false;
    }
  });
  return true;
};

const isColumn = (column, error) => {
  const includes = columnList.includes(column);
  if (!includes && error) {
    throw new Error(error);
  }
  return includes;
};

const isNumberColumn = (column, error) => {
  const includes = numberColumns.includes(column);
  if (!includes && error) {
    throw new Error(error);
  }
  return includes;
};

const isStringColumn = (column, error) => {
  const includes = stringColumns.includes(column);
  if (!includes && error) {
    throw new Error(error);
  }
  return includes;
};

const validateNumber = (limit, allowNull) => {
  if (!limit) return allowNull ?? false;
  if (!isNaN(limit)) return true;
  return false;
};

const validateString = (str, allowNull) => {
  if (!str) return allowNull ?? false;
  return /^[A-Za-z0-9]*&/.test(str);
};

const validateOrder = (order) => {
  if (!order) return true;
  const columns = order.split(",");
  columns.forEach((c) => {
    const orderColumn = c.split(" ");
    if (orderColumn.length > 2) return false;
    const subColumns = orderColumn[0].split("|");
    subColumns.forEach((s) => {
      if (!columnList.includes(subColumns)) {
        return false;
      }
    });
    if (
      orderColumn[1] &&
      !(orderColumn[1] === "ASC" || orderColumn[1] === "DESC")
    ) {
      return false;
    }
  });
  return true;
};

module.exports = {
  isColumn,
  isNumberColumn,
  isStringColumn,
  validateColumns,
  validateNumber,
  validateString,
  validateOrder,
};
