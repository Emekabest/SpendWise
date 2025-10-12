import axios from "axios";
import Constants from 'expo-constants';



const GetWithdrawRequestsController = async()=>{
    const API_URL = Constants.expoConfig?.extra?.API_URL;
    

    try{
        const url = API_URL + '/getwithdraws'
        const response = await axios.get(url)
        


        if (response.data){

            return {status:200, message:"Successful", data:response.data}
        }
        else{
            return {status:403, message:response.data}
        }

    }
    catch(error){
          
          return {status:error.code, message:error}
    }




    
}

export default GetWithdrawRequestsController