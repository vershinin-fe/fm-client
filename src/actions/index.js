export const SWITCH_ITEM_STATUS = 'SWITCH_ITEM_STATUS';

const sendSwitchItemStatus = (id) => ({
    type: 'SWITCH_ITEM_STATUS',
    id: id
});

export const switchItemStatus = (id) => (dispatch) => {
    return dispatch(sendSwitchItemStatus(id));
};


export const DELETE_ITEM = 'DELETE_ITEM';

const sendDeleteItem = (id) => ({
        type: 'DELETE_ITEM',
        id: id,
});

export const deleteItem = (id) => (dispatch) => {
    return dispatch(sendDeleteItem(id));
};


export const ADD_ITEM = 'ADD_ITEM';

const sendAddItem = (item) => ({
        type: 'ADD_ITEM',
        name: item.name,
        quantity: item.quantity,
        measurementUnit: item.measurementUnit,
        description: item.description
});

export const addItem = (item) => (dispatch) => {
    return dispatch(sendAddItem(item));
};


export const UPDATE_ITEM = 'UPDATE_ITEM';

const sendUpdateItem = (item) => ({
        type: 'UPDATE_ITEM',
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        measurementUnit: item.measurementUnit,
        description: item.description
});

export const updateItem = (item) => (dispatch) => {
    return dispatch(sendUpdateItem(item));
};


export const SET_SORT_ORDER = 'SET_SORT_ORDER';

const sendUpdateSortOrder = (sortOrder) => ({
        type: 'SET_SORT_ORDER',
        sortOrder: sortOrder
});

export const updateSortOrder = (sortOrder) => (dispatch) => {
    return dispatch(sendUpdateSortOrder(sortOrder));
};

/*
import fetch from 'cross-fetch';

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const requestItems = () => {
    return {
        type: REQUEST_ITEMS
    }
};

export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const receiveItems = (json) => {
    return {
        type: RECEIVE_ITEMS,
        items: json
    }
};

export const fetchItems = (dispatch) => {
    dispatch(requestItems);
    let request = { method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default' };
    return fetch(`https://localhost:8080/foodmanager/`)
};
 */