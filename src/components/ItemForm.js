import React, {Component} from "react";
import PropTypes from "prop-types";

export default class ItemForm extends Component {
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