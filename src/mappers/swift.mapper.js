const { validateColumns, validateNumber, validateOrder } = require('../validators/swift.validator');
const { stringColumns, numberColumns} = require('../utils/const');

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

const searchMapper = (searchString) => {
  if (!searchString) return null;
  const columns = searchString.split(',');
  columns.forEach(c => {
    const columnSearch = c.split(' ');
    if(stringColumns.includes(columnSearch[0])) {

    } else if (numberColumns.includes(columnSearch[0])) {

    } else {
      throw new Error('Invalid search');
    }
  });
}

const requestMapper = (query) => {
  // Map
  const columns = columnMapper(query.columns);
  const limit = limitMapper(query.limit);
  const offset = offsetMapper(query.offset);
  const order = orderMapper(query.order);
  const search = searchMapper(query.search);

  // Return
  return {columns, limit, offset, order, search}
}

module.exports = {
    requestMapper,
}
