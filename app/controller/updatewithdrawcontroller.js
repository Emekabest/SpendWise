import axios from "axios";
import Constants from 'expo-constants';



const UpdateWithdrawController = async(id, email, accountNumber, accountName, bankName, amount, settled)=>{
const API_URL = Constants.expoConfig?.extra?.API_URL;


    try{
        const url = API_URL +  '/updatewithdraw'
        const response = await axios.post(url, {id, email, accountNumber, accountName, bankName, amount, settled})
        

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


export default UpdateWithdrawController;