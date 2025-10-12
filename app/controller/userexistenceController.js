import axios from "axios";
import Constants from 'expo-constants';
import TextFieldService from "../service/TextFieldService";




const UserExistenceController = async(firstname, lastname, email, pin, confirmPin)=>{
    const API_URL = Constants.expoConfig?.extra?.API_URL;
    

    let signupFeedbackMessage = TextFieldService(["firstname", "lastname", "email", "pin", "confirmPin"], {firstname, lastname, email, pin, confirmPin})


    if (signupFeedbackMessage != "Successful"){
        
      return {status:400, message:signupFeedbackMessage};
    }



    try{
        const url = API_URL + '/checkuser';
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