export const SWITCH_ITEM_STATUS = 'SWITCH_ITEM_STATUS';

const sendSwitchItemStatus = (id) => ({
    type: SWITCH_ITEM_STATUS,
    id: id
});

export const switchItemStatus = (id) => (dispatch) => {
    return dispatch(sendSwitchItemStatus(id));
};


export const DELETE_ITEM = 'DELETE_ITEM';

const sendDeleteItem = (id) => ({
        type: DELETE_ITEM,
        id: id,
});

export const deleteItem = (id) => (dispatch) => {
    return dispatch(sendDeleteItem(id));
};


export const ADD_ITEM = 'ADD_ITEM';

const sendAddItem = (item) => ({
        type: ADD_ITEM,
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
        type: UPDATE_ITEM,
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

export const updateSortOrder = (sortOrder) => ({
        type: SET_SORT_ORDER,
        sortOrder: sortOrder
});
