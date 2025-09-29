const TextFieldService = (fieldsToValidate, form)=>{
    let finalMsg;

    
    const rules = {

      firstname: {
        regex: /^[a-zA-Z]{2,50}$/,
        message: 'firstname must be min of 2 & max of 50 characters',
      },

      lastname: {
        regex: /^[a-zA-Z]{2,50}$/,
        message: 'lastname must be min of 2 & max of 50 characters',
      },

      email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'email is not valid',
      },

      pin: {
        regex: /^\d{4}$/,
        message: 'Pin must be 4 digits',
      },

      confirmPin: {
        regex: new RegExp(`${form.pin}`),
        message: 'Pin does not match',
      },
    };

      


    for (const field of fieldsToValidate){
      const rule = rules[field];
      const value = form[field];

      if (!rule.regex.test(value)) {
        finalMsg = rule.message;

        return finalMsg;
      }
    }

    return finalMsg = "Successful"
}

export default TextFieldService