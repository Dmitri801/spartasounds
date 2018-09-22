import React from "react";

const FormField = ({ formData, id, change, location }) => {
  const generateInputClassName = () => {
    let locationClassname;
    switch (location) {
      case "login":
        locationClassname = "form_field_block";
        break;
      case "register":
        locationClassname = "register_inputs";
        break;
      case "add_product":
        locationClassname = "add_product_inputs";
        break;
      case "add_product_description":
       locationClassname = "add_product_inputs";
       break;
      default:
        locationClassname = "";
    }
    return locationClassname;
  };

  const generateSelectClassName = () => {
    let locationClassname;
    switch (location) {
      case "add_product":
        locationClassname = "add_product_select slate";
        break;
      default:
        locationClassname = "";
    }
    return locationClassname;
  };

  const generateErrorClassName = () => {
    let errorClassname;
    switch (location) {
      case "login":
        errorClassname = "error_label_login";
        break;
      case "register":
        errorClassname = "error_label_register";
        break;
      case "home":
        errorClassname = "error_label_home";
        break;
      case "add_product":
       errorClassname = "add_product_error";
       break;
      case "add_product_description":
       errorClassname = "add_product_error_desc";
       break;
      default:
        errorClassname = "";
    }
    return errorClassname;
  };

  const showError = () => {
    let errorMessage = null;
    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className={generateErrorClassName()}>
          {formData.validationMessage}
        </div>
      );
    }
    return errorMessage;
  };
  const renderTemplate = () => {
    let formTemplate = "";
    switch (formData.element) {
      case "input":
        formTemplate = (
          <div className={generateInputClassName()}>
            <input
              id={id}
              className={generateInputClassName()}
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "textarea":
        formTemplate = (
          <div className={generateInputClassName()}>
            <textarea
              className={generateInputClassName()}
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div className={generateSelectClassName()}>
            <select
              className="react_select"
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            >
              <option value="">Select One</option>
              {formData.config.options.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );
        break;
      default:
        return formTemplate;
    }
    return formTemplate;
  };
  return <div>{renderTemplate()}</div>;
};

export default FormField;
