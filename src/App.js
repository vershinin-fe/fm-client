import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from "./helpers";
//TODO Delete after connecting to server
import uuid from 'uuid';

class ItemForm extends Component {
    static propTypes = {
        item: PropTypes.object,
        muList: PropTypes.arrayOf(PropTypes.string).isRequired,
        onFormSubmit: PropTypes.func.isRequired,
        onFormClose: PropTypes.func.isRequired
    };

    state = {
        fields: {
            name: this.props.item ? this.props.item.name : '',
            description: this.props.item ? this.props.item.description : '',
            quantity: this.props.item ? this.props.item.quantity : '',
            measurementUnit: this.props.item ? this.props.item.measurementUnit : '',
        },
        errors: []
    };

    validate = (fields) => {
        let errors = [];
        if(!fields.name || fields.name.length > 30)
            errors.push('Название должно быть не менее 1 символа и не более 30');
        if(fields.description && fields.description.length > 30)
            errors.push('Описание не должно быть длинее 30 символов');
        if(!fields.quantity || fields.quantity < 1 || fields.quantity > 10000)
            errors.push('Количество должно быть не менее 1 и не более 10000');
        if(!fields.measurementUnit)
            errors.push('Выберите единицы измерения');

        return errors;
    };

    handleFieldChange = (evt) => {
        const fields = this.state.fields;
        fields[evt.target.name] = evt.target.value;
        this.setState({ fields });
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        const fields = this.state.fields;
        const errors = this.validate(fields);
        this.setState({ errors });
        if(errors.length)
            return;

        this.props.onFormSubmit({
            id: this.props.item ? this.props.item.id : undefined,
            name: fields.name,
            description: fields.description,
            quantity: fields.quantity,
            measurementUnit: fields.measurementUnit
        });
    };

    render() {
        const fields = this.state.fields;
        const errors = this.state.errors;
        return (
            <div className="item">
                <form className="ui form" onSubmit={this.handleSubmit}>
                    {
                        errors.length ? (
                            <div className="ui negative message">
                                <div className="header">Errors:</div>
                                <ul className="list">
                                    {
                                        errors.map((message, idx) => (
                                            <li key={idx}>{message}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ) : ''
                    }
                    <div className="field">
                        <label>Название</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Название"
                            value={fields.name}
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div className="field">
                        <label>Описание</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Описание"
                            value={fields.description}
                            onChange={this.handleFieldChange}
                        />
                    </div>
                    <div className="two fields">
                        <div className="field">
                            <label>Количество</label>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Количество"
                                value={fields.quantity}
                                onChange={this.handleFieldChange}
                            />
                        </div>
                        <div className="field">
                            <label>Ед. изм.</label>
                            <select
                                name="measurementUnit"
                                className="ui fluid dropdown"
                                defaultValue={fields.measurementUnit}
                                onChange={this.handleFieldChange}
                            >
                                <option key="no-mu" value=""></option>
                                {
                                    this.props.muList.map((mu, idx) => (
                                        <option
                                            key={idx}
                                            value={mu}
                                        >
                                            {mu}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className='two left floated buttons'>
                        <button
                            type="submit"
                            className='ui primary button'
                        >
                            Submit
                        </button>
                        <button
                            className='ui button'
                            onClick={this.props.onFormClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

class ListItem extends Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        onStatusIconClick: PropTypes.func.isRequired,
        onEditClick: PropTypes.func.isRequired,
        onTrashClick: PropTypes.func.isRequired
    };

    state = {
        isRolledUp: true
    };

    handleItemClick = () => {
        this.setState({ isRolledUp: !this.state.isRolledUp });
    };

    handleStatusIconClick = () => {
        this.props.onStatusIconClick(this.props.item.id);
    };

    handleTrashClick = () => {
        this.props.onTrashClick(this.props.item.id);
    };

    render() {
        const statusIconClass =
            `large ${this.props.item.closed ? 'check circle green' : 'circle outline red'} middle aligned icon`;

        return (
            <div className="item">
                <div className="right floated content">
                    <span
                        className='right floated edit icon'
                        onClick={this.props.onEditClick}
                    >
                        <i className='edit icon'/>
                    </span>
                    <span
                        className='right floated trash icon'
                        onClick={this.handleTrashClick}
                    >
                        <i className='trash icon'/>
                    </span>
                </div>
                <i
                    className={statusIconClass}
                    onClick={this.handleStatusIconClick}
                />
                <div className="content">
                    <a className="header" onClick={this.handleItemClick}>{this.props.item.name}</a>
                    <div style={{display: this.state.isRolledUp ? 'none' : ''}}>
                        <div className="description">
                            {this.props.item.description}
                        </div>
                        <div className="description">
                            Сколько: {this.props.item.quantity} {this.props.item.measurementUnit}
                        </div>
                        <div className="description">
                            Стоимость: {this.props.item.price} руб.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class EditableItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        muList: PropTypes.arrayOf(PropTypes.string).isRequired,
        onStatusIconClick: PropTypes.func.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
        onTrashClick: PropTypes.func.isRequired
    };

    state = {
        editFormOpen: false
    };

    handleEditClick = () => {
        this.openForm();
    };

    handleFormClose = () => {
        this.closeForm();
    };

    handleSubmit = (item) => {
        this.props.onFormSubmit(item);
        this.closeForm();
    };

    closeForm = () => {
        this.setState({editFormOpen: false});
    };

    openForm = () => {
        this.setState({editFormOpen: true});
    };

    render() {
        if(this.state.editFormOpen) {
            return (
                <ItemForm
                    item={this.props.item}
                    muList={this.props.muList}
                    onFormSubmit={this.handleSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <ListItem
                    item={this.props.item}
                    onStatusIconClick={this.props.onStatusIconClick}
                    onEditClick={this.handleEditClick}
                    onTrashClick={this.props.onTrashClick}
                />
            );
        }
    }
}

class ToggleableItemForm extends Component {
    static propTypes = {
        muList: PropTypes.arrayOf(PropTypes.string).isRequired,
        onFormSubmit: PropTypes.func.isRequired,
    };

    state = {
        isOpen: false
    };

    handleFormOpen = () => {
        this.setState({ isOpen: true });
    };

    handleFormClose = () => {
        this.setState({ isOpen: false });
    };

    handleFormSubmit = (item) => {
        this.props.onFormSubmit(item);
        this.setState({ isOpen: false })
    };

    render() {
        if(this.state.isOpen) {
            return (
                <ItemForm
                    muList={this.props.muList}
                    onFormSubmit={this.handleFormSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <div className='ui basic content center aligned segment'>
                    <button
                        className='ui basic button icon'
                        onClick={this.handleFormOpen}
                    >
                        <i className='plus icon'/>
                    </button>
                </div>
            );
        }
    }
}

class App extends Component {
    state = {
        mus: [
            'кг',
            'г',
            'л',
            'мл',
            'шт'
        ],
        items: sortBy([
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
                "createDate": "2018-01-14T15:00:50",
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
        ], 'BY_STATUS')
    };

    handleStatusIconClick  = (id) => {
        const newItems = this.state.items.map((item) => {
            if(item.id === id) {
                return Object.assign({}, item, {closed: !item.closed});
            } else {
                return item;
            }
        });
        this.setState(Object.assign({}, this.state, {items: sortBy(newItems, 'BY_STATUS')}));
    };

    handleCreateFormSubmit = (item) => {
        this.createItem(item);
    };

    handleEditFormSubmit = (item) => {
        this.updateItem(item);
    };

    handleTrashClick = (itemId) => {
        this.deleteItem(itemId);
    };

    createItem = (item) => {
        const newItem = {
            "@id": "",
            //TODO Delete after connecting to server
            "id": uuid.v4(),
            "name": item.name,
            "quantity": item.quantity,
            "measurementUnit": item.measurementUnit,
            "description": item.description,
            "price": "",
            "closed": false,
            "createDate": "",
            "family": null
        };

        this.setState({
            items: sortBy(this.state.items.concat(newItem), 'BY_STATUS')
        });
    };

    updateItem = (attrs) => {
        this.setState({
            items: this.state.items.map((item) => {
                if(item.id === attrs.id) {
                    return Object.assign({}, item, {
                        name: attrs.name,
                        description: attrs.description,
                        quantity: attrs.quantity,
                        measurementUnit: attrs.measurementUnit
                    });
                } else {
                    return item;
                }
            })
        });
    };

    deleteItem = (itemId) => {
        this.setState({
            items: this.state.items.filter(item => item.id !== itemId)
        });
    };

    render() {
        const editableItems = this.state.items.map((item, idx) => (
            <EditableItem
                key={idx}
                item={item}
                muList={this.state.mus}
                onStatusIconClick={this.handleStatusIconClick}
                onTrashClick={this.handleTrashClick}
                onFormSubmit={this.handleEditFormSubmit}
            />
        ));

        return (
            <div className="ui container">
                <div className="ui segments">
                    <div className="ui segment">
                        <div className="ui relaxed divided list">
                            <ToggleableItemForm
                                muList={ this.state.mus }
                                onFormSubmit={ this.handleCreateFormSubmit }
                            />
                            { editableItems }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
