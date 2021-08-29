import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import TextArea from "./textArea";
import ImageField from "./imageField";

export default class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  chosenImg = "";

  validate = () => {
    const options = {
      abortEarly: false,
    };

    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  validateProperty = ({ name, value, files }) => {
    if (name === "image") {
      value = files[0].name;
    }
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) {
      return;
    }
    this.afterSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };

    let errorMessage = this.validateProperty(input);

    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };

    if (input.name === "image") {
      this.chosenImg = input.files[0];
    }
    data[input.name] = input.value;

    this.setState({ data, errors });
    this.afterChange(input);
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
      ></Input>
    );
  }

  renderTextArea(name, label, placeholder = name) {
    const { data, errors } = this.state;
    return (
      <TextArea
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={placeholder}
      ></TextArea>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      ></Select>
    );
  }

  renderImageField(name, label, accept, placeholder = name) {
    const { data, errors } = this.state;
    return (
      <ImageField
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={placeholder}
        type="file"
        accept={accept}
      ></ImageField>
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-warning">
        {label}
      </button>
    );
  }
}
