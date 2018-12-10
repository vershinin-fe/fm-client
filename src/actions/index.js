export const GET_ITEMS = 'GET_ITEMS';

const sendGetItems = (items) => ({
    type: GET_ITEMS,
    items: items
});

export const getItems = () => (dispatch) => {
    const headers = new Headers({
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmZXdAbWFpbC5ydSIsImV4cCI6MTU0MjE3MTM0OX0.hQTMbxnmYDMGcstI6UdqGj__5zJllvTbwTKSeUclOlnOdZmrP6J0suZQtZ-upftxaS9Xo15nUOyj-MVS_eBKkA",
    });

    const init = {
        method: 'GET',
        headers: headers,
        cache: 'no-cache'
    };

    const request = new Request('http://localhost:8080/foodmanager/rest/profile/items', init);

    /*return fetch(request).then((response) => response.json()
    .then((data) => {
        if(!response.ok) {
            console.log(response.statusText);
            return Promise.reject(data);
        }
        return dispatch(sendGetItems(data))
    }));*/

    return fetch(request)
        .then(response => {
            console.log(response);

            if (!response.ok) {
                console.log(response.statusText);
                return Promise.reject(response)
            }

            response.json().then(json => dispatch(sendGetItems(json)));
        })
        .catch(error => console.log(error))
};


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


export const TOGGLE_ADD_ITEM_FORM = 'TOGGLE_ADD_ITEM_FORM';

export const toggleAddItemForm = (isOpened) => ({
    type: TOGGLE_ADD_ITEM_FORM,
    isOpened: isOpened
});


export const OPEN_EDIT_FORM_BY_ID = 'OPEN_EDIT_FORM_BY_ID';

export const openEditFormById = (itemId) => ({
    type: OPEN_EDIT_FORM_BY_ID,
    itemId: itemId
});