const { columnList } = require('../utils/const');

const validateColumns = (column) => {
    if (!column) return true;
    if (column === 'All') return true;
    const columns = column.trim().split(',');
    columns.forEach(c => {
        if (!columnList.includes(c)) {
            return false;
        }
    });
    return true;
}

const validateNumber = (limit, allowNull) => {
    if (!limit ) return allowNull ?? false; 
    if (!isNaN(limit)) return true;
    return false;
}

const validateString = (str, allowNull) => {
    if (!str) return allowNull ?? false;
    return /^[A-Za-z0-9]*&/.test(str);
}

const validateOrder = (order) => {
    if(!order) return true;
    const columns = order.split(',');
    columns.forEach(c => {
        const orderColumn = c.split(' ');
        if (orderColumn.length > 2) return false;
        if (!columnList.includes(orderColumn[0])) {
            return false;
        }
        if (orderColumn[1] && !(orderColumn[1] === 'ASC' || orderColumn[1] === 'DESC')) {
            return false;
        }
    });
    return true;
}

module.exports = {
    validateColumns,
    validateNumber,
    validateString,
    validateOrder,
}