import TextFieldService from "../service/TextFieldService";


const SigninController = (phone, password)=>{
    let signinFeedbackMessage = TextFieldService(["phone"], {phone})

    if (signinFeedbackMessage != "Successful"){
        
      return {status:400, message:signinFeedbackMessage};
    }


    try {
        

        
    } catch (error) {
        
    }





}

export default SigninController