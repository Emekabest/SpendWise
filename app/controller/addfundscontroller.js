import axios from "axios";
import Constants from 'expo-constants';




const AddFundsController = async(email, amount)=>{
    const API_URL = Constants.expoConfig?.extra?.API_URL;
    

        try{

            //Authenication Procedure should be implemented in this api for security analysis

            const url = API_URL + `/addfunds`;
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