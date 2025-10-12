import axios from "axios";
import Constants from 'expo-constants';



const BudgetController = async(email, type, limitAmount, alterDate)=>{
    const API_URL = Constants.expoConfig?.extra?.API_URL;
    

    try{
        const url = API_URL + '/setbudget'
        const response = await axios.post(url, {email, type, limitAmount, alterDate})

        if (response.data == "Successful"){

            return {status:200, message:"Successful"}
        }
        else{
            return {status:403, message:response.data}
        }
    }
    catch(error){
          
            return {status:error.code, message:error.message}
    }

}

export default BudgetController;