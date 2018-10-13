function sortByClosedProp(a, b) {
    if(a.closed && !b.closed)
        return 1;
    else if(b.closed && !a.closed)
        return -1;
    else
        return 0;
}

export {sortByClosedProp};