// This form is shared between streamCreate and streamEdit

import React from "react";
import { Field, reduxForm } from 'redux-form'



class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    // renderInput(formProps) { //before destructring
    renderInput = ({ label, input, meta }) => {  // we get formPros from <Field name="title" component={this.renderInput}
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`

        // return <input onChange={formProps.input.onChange} value={formProps.input.value} /> //this is before doing <input {...input} />
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>

        )
    }
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)  //this will send formvalues to props which will be invoked in the upstream component
    }

    render() {

        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>

            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {}
    if (!formValues.title) {
        errors.title = 'you must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'you must enter a description';
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);

