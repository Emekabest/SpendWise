import axios from "axios";
import TextFieldService from "../service/TextFieldService";

const CreateAccountController = async(firstname, lastname, email, phone, password, confirmPassword)=>{

    let signupFeedbackMessage = TextFieldService(["firstname", "lastname", "email", "phone", "password", "confirmPassword"], {firstname, lastname, email, phone, password, confirmPassword})

    if (signupFeedbackMessage != "Successful"){
        
      return {status:400, message:signupFeedbackMessage};
    }



    try{
        const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/signup'
        const response = await axios.post(url, {firstname, lastname, email, phone, password})
        

        if (response.data != "Successful"){

            return {status:403, message:response.data}
        }
        else{
            return {status:200, message:"Successful"}
        }

    }
    catch(error){
          
          return error.code
    }





    




}

export default CreateAccountController;