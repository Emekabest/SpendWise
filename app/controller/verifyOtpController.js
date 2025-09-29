import axios from "axios";


const VerifyOtpController = async(email, otp)=>{

    try{
            const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/verifyotp';
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