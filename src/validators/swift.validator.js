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

module.exports = {
    validateColumns,
}