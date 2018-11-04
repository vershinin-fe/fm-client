import React, {Component} from "react";
import {updateSortOrder} from "../actions";
import PropTypes from "prop-types";
import {SortOrders} from "../helpers/sort";
import {connect} from "react-redux";

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

const mapStateToProps = (state) => {
    return {sortOrder: state.sortOrder};
};

export default connect(
    mapStateToProps,
    { onClick: updateSortOrder }
)(SortMenu);