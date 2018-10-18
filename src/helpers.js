const SortOrders = Object.freeze({"byStatus":1, "byDate":2});

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
        case SortOrders.byStatus: {
            comparator = compareByStatus;
            break;
        }
        case SortOrders.byDate: {
            comparator = compareByDate;
            break;
        }
        default:
            return data;
    }

    return data.sort(comparator);
}

export {sortBy, SortOrders};