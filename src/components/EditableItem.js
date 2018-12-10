import React, {Component} from "react";
import PropTypes from "prop-types";
import ItemForm from "./ItemForm";
import Item from "./Item";

export default class EditableItem extends Component {
    static propTypes = {
        editFormIsOpened: PropTypes.bool.isRequired,
        item: PropTypes.object,
        openEditFormById: PropTypes.func.isRequired,
        onStatusIconClick: PropTypes.func.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
        onTrashClick: PropTypes.func.isRequired
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
        this.props.openEditFormById(undefined);
    };

    openForm = () => {
        this.props.openEditFormById(this.props.item.id);
    };

    render() {
        if(this.props.editFormIsOpened) {
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