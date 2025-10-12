import axios from "axios";
import Constants from 'expo-constants';



const VerifyOtpController = async(email, otp)=>{
    const API_URL = Constants.expoConfig?.extra?.API_URL;
    

    try{
            const url = API_URL + '/verifyotp';
            const response = await axios.post(url, {email, otp})

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

export default VerifyOtpController;