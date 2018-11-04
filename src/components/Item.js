import React, {Component} from "react";
import PropTypes from "prop-types";

export default class Item extends Component {
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