const {
  validateColumns,
  validateNumber,
  validateOrder,
} = require("../validators/swift.validator");
const { stringColumns, numberColumns } = require("../utils/const");

const columnMapper = (columnString) => {
  if (!validateColumns(columnString)) {
    throw new Error("Invalid column params");
  }
  if (!columnString || columnString === "All") {
    return "*";
  }
  return columnString;
};

const limitMapper = (limitString) => {
  if (!validateNumber(limitString, true)) {
    throw new Error("Invalid limit");
  }
  if (!limitString || isNaN(limitString)) return null;
  return +limitString;
};

const offsetMapper = (offsetString) => {
  if (!validateNumber(offsetString, true)) {
    throw new Error("Invalid offset");
  }
  if (!offsetString || isNaN(offsetString)) return 0;
  return +offsetString;
};

const orderMapper = (orderString) => {
  if (!validateOrder(orderString)) {
    throw new Error("Invalid order");
  }
  return orderString ?? null;
};

const isNumberColumn = (column) => numberColumns.includes(column);
const isStringColumn = (column) => stringColumns.includes(column);

const getConditionOperator = (operator, value, column) => {
  switch (operator) {
    case "equal":
      if (!isNumberColumn(column))
        throw new Error(
          `Invalid search. Invalid search operator for ${column}`
        );
      return `${column} = ${value}`;
    case "greater":
      if (!isNumberColumn(column))
        throw new Error(
          `Invalid search. Invalid search operator for ${column}`
        );
      return `${column} > ${value}`;
    case "less":
      if (!isNumberColumn(column))
        throw new Error(
          `Invalid search. Invalid search operator for ${column}`
        );
      return `${column} < ${value}`;
    case "greater_equal":
      if (!isNumberColumn(column))
        throw new Error(
          `Invalid search. Invalid search operator for ${column}`
        );
      return `${column} >= ${value}`;
    case "less_equal":
      if (!isNumberColumn(column))
        throw new Error(
          `Invalid search. Invalid search operator for ${column}`
        );
      return `${column} <= ${value}`;
    case "not_equal":
      if (!isNumberColumn(column))
        throw new Error(
          `Invalid search. Invalid search operator for ${column}`
        );
      return `${column} <> ${value}`;
    case "between":
      if (!isNumberColumn(column))
        throw new Error(
          `Invalid search. Invalid search operator for ${column}`
        );
      const values = value.split(" ");
      console.log('values');
      if (values.length !== 2)
        throw new Error(
          `Invalid search. Invalid search operator for ${column}`
        );
      return `${column} BETWEEN ${values[0]} AND ${values[1]}`;
    case "like":
      if (!isStringColumn(column))
        throw new Error(
          `Invalid search. Invalid search operator for ${column}`
        );
      return `${column} LIKE '%${value}%'`;
    case "in":
      if (!isStringColumn(column))
        throw new Error(
          `Invalid search. Invalid search operator for ${column}`
        );
      return `${column} IN (${value})`;
    default:
      throw new Error(
        `Invalid search. Invalid search operator for ${column}`
      );
  }
};

const searchMapper = (searchString) => {
  const searchList = [];
  if (!searchString) return null;
  const columns = searchString.split(",");
  columns.forEach((c) => {
    const columnSearch = c.split("|");
    if (columnSearch.length > 3)
      throw new Error(
        `Invalid search. Exceeding search params for ${columnSearch[0]}`
      );
    searchList.push(
      getConditionOperator(columnSearch[1], columnSearch[2], columnSearch[0])
    );
  });
  return searchList.join(" AND ");
};

const requestMapper = (query) => {
  // Map
  const columns = columnMapper(query.columns);
  const limit = limitMapper(query.limit);
  const offset = offsetMapper(query.offset);
  const order = orderMapper(query.order);
  const search = searchMapper(query.search);

  // Return
  return { columns, limit, offset, order, search };
};

module.exports = {
  requestMapper,
};
