function compareByStatus(a, b) {
    if(a.closed && !b.closed)
        return 1;
    else if(b.closed && !a.closed)
        return -1;
    else
        return 0;
}

function compareByDate(a, b) {
    return Date.parse(a.createDate) - Date.parse(b.createDate);
}

function sortBy(data, sortOrder) {
    let comparator;
    switch (sortOrder) {
        case 'BY_STATUS': {
            comparator = compareByStatus;
            break;
        }
        case 'BY_DATE': {
            comparator = compareByDate;
            break;
        }
        default:
            return data;
    }

    return data.sort(comparator);
}

export {sortBy};