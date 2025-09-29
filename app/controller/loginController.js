import axios from "axios";
import TextFieldService from "../service/TextFieldService";


const loginController = async(email, pin)=>{

    let signinFeedbackMessage = TextFieldService(["email"], {email})

    if (signinFeedbackMessage != "Successful"){
        
       return {status:400, message:signinFeedbackMessage};
    }

    

    try {
        const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/signin'
        const response = await axios.post(url, {email, pin})



        if (response.data == "Successful"){

            return {status:200, message:"Successful"}
            
        }
        else{
            return {status:403, message:response.data}
        }

    
    } catch (error) {

        console.log("This is error::"+error)

        return {status:error.code, message:error.message}
    }





}

export default loginController