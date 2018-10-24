import * as ActionTypes from '../actions'
import { combineReducers } from 'redux';
import { SortOrders } from "../helpers/sort";
import uuid from "uuid";

const items = (state = [
    {
        "@id": 1,
        "id": 105,
        "name": "Молоко",
        "quantity": 1,
        "measurementUnit": "л",
        "description": "Чебаркуль",
        "price": 84,
        "closed": false,
        "createDate": "2018-01-14T15:00:50",
        "family": null
    },
    {
        "@id": 2,
        "id": 106,
        "name": "Хлеб",
        "quantity": 1,
        "measurementUnit": "шт",
        "description": "Бородинский",
        "price": 30,
        "closed": false,
        "createDate": "2018-01-14T15:00:50",
        "family": null
    },
    {
        "@id": 3,
        "id": 107,
        "name": "Кефир",
        "quantity": 1,
        "measurementUnit": "л",
        "description": "Чебаркуль",
        "price": 89,
        "closed": false,
        "createDate": "2018-01-14T15:00:51",
        "family": null
    },
    {
        "@id": 4,
        "id": 108,
        "name": "Творог",
        "quantity": 500,
        "measurementUnit": "г",
        "description": "Чебаркуль",
        "price": 125,
        "closed": false,
        "createDate": "2018-01-14T15:00:50",
        "family": null
    },
    {
        "@id": 5,
        "id": 109,
        "name": "Сыр",
        "quantity": 300,
        "measurementUnit": "г",
        "description": "Артур",
        "price": 200,
        "closed": true,
        "createDate": "2018-02-14T15:00:50",
        "family": null
    },
    {
        "@id": 6,
        "id": 110,
        "name": "Яблоки",
        "quantity": 5,
        "measurementUnit": "шт",
        "description": "Сезонные",
        "price": 80,
        "closed": true,
        "createDate": "2018-03-14T15:00:50",
        "family": null
    },
    {
        "@id": 7,
        "id": 111,
        "name": "Бананы",
        "quantity": 10,
        "measurementUnit": "шт",
        "description": "",
        "price": 60,
        "closed": false,
        "createDate": "2018-04-14T15:00:50",
        "family": null
    }
], action) => {
    switch (action.type) {
        case ActionTypes.GET_ITEMS: {
            return [...action.items];
        }
        case ActionTypes.ADD_ITEM: {
            const newItem = {
                "@id": "",
                //TODO Delete after connecting to server
                "id": uuid.v4(),
                "name": action.name,
                "quantity": action.quantity,
                "measurementUnit": action.measurementUnit,
                "description": action.description,
                "price": "",
                "closed": false,
                "createDate": "",
                "family": null
            };
            return state.concat(newItem);
        }
        case ActionTypes.UPDATE_ITEM:{
            return state.map((item) => {
                if(item.id === action.id) {
                    return Object.assign({}, item, {
                        name: action.name,
                        description: action.description,
                        quantity: action.quantity,
                        measurementUnit: action.measurementUnit
                    });
                } else {
                    return item;
                }
            });
        }
        case ActionTypes.DELETE_ITEM: {
            return state.filter(item => item.id !== action.id);
        }
        case ActionTypes.SWITCH_ITEM_STATUS: {
            return state.map((item) => {
                if(item.id === action.id) {
                    return Object.assign({}, item, {closed: !item.closed});
                } else {
                    return item;
                }
            });
        }
        default: {
            return state;
        }
    }
};

const sortOrder = (state = SortOrders.byStatus, action) => {
    if (action.type === ActionTypes.SET_SORT_ORDER) {
        return action.sortOrder;
    } else {
        return state;
    }
};

const rootReducer = combineReducers({
    sortOrder,
    items
});

export default rootReducer;