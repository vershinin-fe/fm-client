import {sortBy} from "../helpers/sort";
import {getItems, switchItemStatus, updateItem, deleteItem, openEditFormById} from "../actions";
import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import EditableItem from "./EditableItem";

class EditableItemsList extends Component {
    static propTypes = {
        formOpenedItemId: PropTypes.number.isRequired,
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        sortOrder: PropTypes.number.isRequired,
        openEditFormById: PropTypes.func.isRequired,
        onStatusIconClick: PropTypes.func.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
        onTrashClick: PropTypes.func.isRequired,
        getItems: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.props.getItems();
    }

    render() {
        const editableItems = sortBy(this.props.items, this.props.sortOrder).map((item, idx) => (
            <EditableItem
                key={idx}
                editFormIsOpened={item.id === this.props.formOpenedItemId}
                item={item}
                openEditFormById={this.props.openEditFormById}
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

const mapStateToProps = (state) => {
    return {
        formOpenedItemId: state.itemsList.formOpenedItemId,
        items: state.itemsList.items,
        sortOrder: state.sortOrder
    };
};

export default connect(
    mapStateToProps,
    {
        openEditFormById: openEditFormById,
        onStatusIconClick: switchItemStatus,
        onFormSubmit: updateItem,
        onTrashClick: deleteItem,
        getItems: getItems
    }
)(EditableItemsList);