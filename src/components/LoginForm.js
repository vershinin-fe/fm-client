import React, {Component} from "react";
import PropTypes from "prop-types";

export default class LoginForm extends Component {
    static propTypes = {
        onFormSubmit: PropTypes.func.isRequired
    };

    state = {
        fields: {
            login: '',
            password: ''
        },
        errors: []
    };

    validate = (fields) => {
        let errors = [];
        if(!fields.login)
            errors.push('Введите Ваш логин');
        if(!fields.password)
            errors.push('Введите Ваш пароль');
        if(fields.password && fields.password.length < 6)
            errors.push('Пароль должен быть не короче 6 символов');

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

        return;
        // if(errors.length)
        //     return;
        //
        // this.props.onFormSubmit({
        //     id: this.props.item ? this.props.item.id : undefined,
        //     name: fields.name,
        //     description: fields.description,
        //     quantity: fields.quantity,
        //     measurementUnit: fields.measurementUnit
        // });
    };

    render() {
        const fields = this.state.fields;
        const errors = this.state.errors;
        return (
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h2 className="ui blue image header">
                        <div className="content">
                            Log-in to your account
                        </div>
                    </h2>
                    <form className="ui large form">
                        <div className="ui segment">
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
                                <div className="ui left icon input">
                                    <i className="user icon"></i>
                                    <input
                                        type="text"
                                        name="login"
                                        placeholder="Логин"
                                        value={fields.login}
                                        onChange={this.handleFieldChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Пароль"
                                        value={fields.password}
                                        onChange={this.handleFieldChange}
                                    />
                                </div>
                            </div>
                            <div
                                className="ui fluid large blue submit button"
                                onClick={this.handleSubmit}
                            >
                                Login
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}