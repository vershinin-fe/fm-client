import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addItem} from "../actions";
import ItemForm from "./ItemForm";

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

const mapStateToProps = () => ({});

export default connect(
    mapStateToProps,
    { onFormSubmit: addItem }
)(ToggleableItemForm);