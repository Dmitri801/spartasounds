import React from "react";

const FormField = ({ formData, id, change, location }) => {
  const showError = () => {
    let errorMessage = null;
    if(formData.validation && !formData.valid) {
      errorMessage = (
        <div className={location === "login" ? "error_label" : "error_label_register"}>
        {formData.validationMessage}
      </div>
      )
    }
    return errorMessage;
  }
  const renderTemplate = () => {
    let formTemplate = "";
    switch (formData.element) {
      case "input":
        formTemplate = (
          <div className={location === "login" ? "form_field_block" : ""}>
            <input
              className={location === "register" ? "register_inputs" : ""}
              {...formData.config}
              value={formData.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({event, id})}
            />
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
