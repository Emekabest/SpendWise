import axios from "axios";


const otpController = async(email)=>{

    try{
            const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/sendotp';
            const response = await axios.post(url, {email})

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

export default otpController;