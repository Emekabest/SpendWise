import axios from "axios";
import TextFieldService from "../service/TextFieldService";


const loginController = async(phone, password)=>{

    let signinFeedbackMessage = TextFieldService(["phone"], {phone})

    if (signinFeedbackMessage != "Successful"){
        
      return {status:400, message:signinFeedbackMessage};
    }

    

    try {
        const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/signin'
        const response = await axios.post(url, {phone, password})



        if (response.data != "Successful"){

            return {status:403, message:response.data}
        }
        else{
            return {status:200, message:"Successful"}
        }

    
    } catch (error) {

        console.log("This is error::"+error)

        return error.code
    }





}

export default loginController