export const validate = (element, formData = []) => {
    let error = [true,''];


    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value)
        const message = `${!valid ? 'Enter A Valid Email':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required':''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.confirm) {
        const valid = element.value.trim() === formData[element.validation.confirm].value;
        const message = `${!valid ? 'Confirm password and password must match':''}`;
        error = !valid ? [valid,message] : error;
    }

    return error
}

export const update = (element, formdata, formName ) => {
    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]
    }

    newElement.value = element.event.target.value;

    if(element.blur){
        let validData = validate(newElement,formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    return newFormdata;
}

export const generateData = (formData, formName) => {
    let dataToSubmit = {};
  
    for (let key in formData) {
        if(key !== 'confirmPassword') {
            dataToSubmit[key] = formData[key].value;
        }
    }
  
    return dataToSubmit;
  };
  
  export const isFormValid = (formData) => {
      let formIsValid = true;
  
      for(let key in formData) {
          formIsValid = formData[key].valid && formIsValid
      }
      return formIsValid;
  }