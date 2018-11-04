import React, {Component} from "react";
import PropTypes from "prop-types";
import ItemForm from "./ItemForm";
import Item from "./Item";

export default class EditableItem extends Component {
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