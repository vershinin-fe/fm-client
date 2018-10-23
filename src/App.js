import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy, SortOrders } from "./helpers/sort";
import { Provider, connect } from 'react-redux';
import configureStore from "./store/configureStore";
import { switchItemStatus, deleteItem, addItem, updateItem, updateSortOrder } from './actions'

const store = configureStore();

class ItemForm extends Component {
    static propTypes = {
        item: PropTypes.object,
        onFormSubmit: PropTypes.func.isRequired,
        onFormClose: PropTypes.func.isRequired
    };

    static measurementUnits = [
        'кг',
        'г',
        'л',
        'мл',
        'шт'
    ];

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
                                    ItemForm.measurementUnits.map((mu, idx) => (
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

class Item extends Component {
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
                    onFormSubmit={this.handleSubmit}
                    onFormClose={this.handleFormClose}
                />
            );
        } else {
            return (
                <Item
                    item={this.props.item}
                    onStatusIconClick={this.props.onStatusIconClick}
                    onEditClick={this.handleEditClick}
                    onTrashClick={this.props.onTrashClick}
                />
            );
        }
    }
}

// ------------------ ToggleableItemForm -------------------------------
class ToggleableItemForm extends Component {
    static propTypes = {
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

const mapStateToToggleableItemFormProps = () => ({});

const ReduxToggleableItemForm = connect(
    mapStateToToggleableItemFormProps,
    { onFormSubmit: addItem }
)(ToggleableItemForm);
// ---------------------------------------------------------------------

// ----------------------- SortMenu ------------------------------------
class SortMenu extends Component {
    static propTypes = {
        sortOrder: PropTypes.number.isRequired,
        onClick: PropTypes.func.isRequired
    };

    handleMenuItemClick = (evt) => {
        this.props.onClick(Number.parseInt(evt.target.id, 10))
    };

    render() {
        const menuItems = [
            {
                label: 'Status',
                order: SortOrders.byStatus,
                itemClass: "item"
            },
            {
                label: 'Creation date',
                order: SortOrders.byDate,
                itemClass: "item"
            },
        ].map((item) => {
            if(item.order === this.props.sortOrder) {
                return Object.assign({}, item, {itemClass: "active item"})
            } else {
                return item;
            }
        });

        return (
            <div className="ui mini compact text menu">
                <div className="header item">Sort By:</div>
                {
                    menuItems.map((item, idx) => (
                        <a
                            key={idx}
                            id={item.order}
                            className={item.itemClass}
                            onClick={this.handleMenuItemClick}
                        >
                            {item.label}
                        </a>
                    ))
                }
            </div>
        );
    }
}

const mapStateToSortMenuProps = (state) => {
    return {sortOrder: state.sortOrder};
};

const ReduxSortMenu = connect(
    mapStateToSortMenuProps,
    { onClick: updateSortOrder }
)(SortMenu);
// ---------------------------------------------------------------------

// ------------------- EditableItemsList -------------------------------
class EditableItemsList extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        sortOrder: PropTypes.number.isRequired,
        onStatusIconClick: PropTypes.func.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
        onTrashClick: PropTypes.func.isRequired
    };

    render() {
        const editableItems = sortBy(this.props.items, this.props.sortOrder).map((item, idx) => (
            <EditableItem
                key={idx}
                item={item}
                onStatusIconClick={this.props.onStatusIconClick}
                onTrashClick={this.props.onTrashClick}
                onFormSubmit={this.props.onFormSubmit}
            />
        ));

        return (
            <div className="ui segment">
                <div className="ui relaxed divided list">
                    { editableItems }
                </div>
            </div>
        );
    }
}

const mapStateToEditableItemsListProps = (state) => {
    return {
        items: state.items,
        sortOrder: state.sortOrder
    };
};

const ReduxEditableItemsList = connect(
    mapStateToEditableItemsListProps,
    {
        onStatusIconClick: switchItemStatus,
        onFormSubmit: updateItem,
        onTrashClick: deleteItem
    }
)(EditableItemsList);
// ---------------------------------------------------------------------

class ItemsListView extends Component {
    render() {
        return (
            <div className="ui container">
                <ReduxToggleableItemForm/>
                <div className="ui segments">
                    <ReduxSortMenu/>
                    <ReduxEditableItemsList/>
                </div>
            </div>
        );
    }
}

const WrappedApp = () => (
    <Provider store={store}>
        <ItemsListView />
    </Provider>
);

export default WrappedApp;
