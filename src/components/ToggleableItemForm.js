import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addItem, toggleAddItemForm} from "../actions";
import ItemForm from "./ItemForm";

class ToggleableItemForm extends Component {
    static propTypes = {
        isOpened: PropTypes.bool,
        toggleForm: PropTypes.func,
        onFormSubmit: PropTypes.func.isRequired
    };

    handleFormOpen = () => {
        this.props.toggleForm(true);
    };

    handleFormClose = () => {
        this.props.toggleForm(false);
    };

    handleFormSubmit = (item) => {
        this.props.onFormSubmit(item);
        this.handleFormClose();
    };

    render() {
        if(this.props.isOpened) {
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

const mapStateToProps = (state) => ({ isOpened: state.addItemFormOpened });

export default connect(
    mapStateToProps,
    {
        onFormSubmit: addItem,
        toggleForm: toggleAddItemForm
    }
)(ToggleableItemForm);