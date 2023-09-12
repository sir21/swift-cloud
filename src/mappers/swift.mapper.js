var _ = require("lodash");
const {
  isNumberColumn,
  isStringColumn,
  validateColumns,
  validateNumber,
  validateOrder,
  isColumn,
} = require("../validators/swift.validator");

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
  if (!orderString) return { orderString: null, newColumns: null };
  if (!orderString.includes("|")) {
    return { orderString, newColumns: null };
  }
  const finalOrder = [];
  const newColumns = [];
  const orders = orderString.split(",");
  orders.forEach((order, i) => {
    if (order.includes("|")) {
      const orderData = order.split(" ");
      const columns = orderData[0].split("|");
      const columnName = `column${i}`;
      newColumns.push(`(${columns.join("+")}) AS ${columnName}`);
      if (orderData.length > 1) {
        finalOrder.push(`${columnName} ${orderData[1]}`);
      } else {
        finalOrder.push(columnName);
      }
    } else {
      finalOrder.push(order);
    }
  });
  return {
    orderString: finalOrder.join(","),
    newColumns: newColumns.join(","),
  };
};

const getConditionOperator = (operator, value, column) => {
  switch (operator) {
    case "equal":
      isNumberColumn(
        column,
        `Invalid search. Invalid search operator for ${column}`
      );
      return `${column} = ${value}`;
    case "greater":
      isNumberColumn(
        column,
        `Invalid search. Invalid search operator for ${column}`
      );
      return `${column} > ${value}`;
    case "less":
      isNumberColumn(
        column,
        `Invalid search. Invalid search operator for ${column}`
      );
      return `${column} < ${value}`;
    case "greater_equal":
      isNumberColumn(
        column,
        `Invalid search. Invalid search operator for ${column}`
      );
      return `${column} >= ${value}`;
    case "less_equal":
      isNumberColumn(
        column,
        `Invalid search. Invalid search operator for ${column}`
      );
      return `${column} <= ${value}`;
    case "not_equal":
      isNumberColumn(
        column,
        `Invalid search. Invalid search operator for ${column}`
      );
      return `${column} <> ${value}`;
    case "between":
      isNumberColumn(
        column,
        `Invalid search. Invalid search operator for ${column}`
      );
      const values = value.split(" ");
      if (values.length !== 2)
        throw new Error(
          `Invalid search. Invalid search operator for ${column}`
        );
      return `${column} BETWEEN ${values[0]} AND ${values[1]}`;
    case "like":
      isStringColumn(
        column,
        `Invalid search. Invalid search operator for ${column}`
      );
      return `${column} LIKE '%${value}%'`;
    case "in":
      isColumn(column, `Invalid search. Invalid search operator for ${column}`);
      return `${column} IN (${value})`;
    default:
      throw new Error(`Invalid search. Invalid search operator for ${column}`);
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
  return _.uniqWith(searchList, _.isEqual).join(" AND ");
};

const requestMapper = (query) => {
  // Map
  const columns = columnMapper(query.columns);
  const limit = limitMapper(query.limit);
  const offset = offsetMapper(query.offset);
  const { orderString, newColumns } = orderMapper(query.order);
  const search = searchMapper(query.search);

  // Return
  return { columns, limit, offset, orderString, search, newColumns };
};

module.exports = {
  requestMapper,
};
