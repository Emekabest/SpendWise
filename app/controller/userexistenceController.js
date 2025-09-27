import axios from "axios";
import TextFieldService from "../service/TextFieldService";



const UserExistenceController = async(firstname, lastname, email, pin, confirmPin)=>{

    let signupFeedbackMessage = TextFieldService(["firstname", "lastname", "email", "pin", "confirmPin"], {firstname, lastname, email, pin, confirmPin})


    if (signupFeedbackMessage != "Successful"){
        
      return {status:400, message:signupFeedbackMessage};
    }



    try{
        const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/checkuser';
        const response = await axios.post(url, {email})

        console.log(response.data)

        if (response.data == "Successful"){

            return {status:200, message:"Successful"}
        }
        else{
            return {status:403, message:response.data}

        }
    }
    catch(error){
        return error.code

    }
}

export default UserExistenceController;