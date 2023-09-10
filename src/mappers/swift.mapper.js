const { validateColumns, validateNumber, validateOrder } = require('../validators/swift.validator');

const columnMapper = (columnString) => {
  if (!validateColumns(columnString)) {
    throw new Error('Invalid column params');
  }
  if (!columnString || columnString === "All") {
   return '*'
  }
  return columnString;
};

const limitMapper = (limitString) => {
  if(!validateNumber(limitString, true)) {
    throw new Error('Invalid limit');
  }
  if (!limitString || isNaN(limitString)) return null;
  return +limitString;
}

const offsetMapper = (offsetString) => {
  if(!validateNumber(offsetString, true)) {
    throw new Error('Invalid offset');
  }
  if (!offsetString || isNaN(offsetString)) return 0;
  return +offsetString;
}

const orderMapper = (orderString) => {
  if(!validateOrder(orderString)) {
    throw new Error('Invalid order');
  }
  return orderString ?? null;
}

const requestMapper = (query) => {
  // Map
  const columns = columnMapper(query.columns);
  const limit = limitMapper(query.limit);
  const offset = offsetMapper(query.offset);
  const order = orderMapper(query.order);

  // Return
  return {columns, limit, offset, order}
}

module.exports = {
    requestMapper,
}
