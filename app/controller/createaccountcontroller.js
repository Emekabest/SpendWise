import axios from "axios";
import Constants from 'expo-constants';

const CreateAccountController = async(firstname, lastname, email, pin)=>{
    const API_URL = Constants.expoConfig?.extra?.API_URL;
    

    try{
        const url =  API_URL + '/signup'
        const response = await axios.post(url, {firstname, lastname, email, pin})
        

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

export default CreateAccountController;