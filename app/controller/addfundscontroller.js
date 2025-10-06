import axios from "axios";


const AddFundsController = async(email, amount)=>{

        try{

            //Authenication Procedure should be implemented in this api for security analysis

            const url = `https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/addfunds`;
            const response = await axios.post(url, {email, balance:amount })

            console.log(response.data)
            

            if (response.data == "Successful"){

                return {status:200, message:"Successful"}
            }
            else{
                    return {status:403, message:response.data}
            }
    }
    catch(error){
          
          return {status:error.code, message:error}
    }






}


export default AddFundsController;