import axios from "axios";
import Constants from 'expo-constants';



const NotificationController = async(userEmail, type, title, message, time, read)=>{
    const API_URL = Constants.expoConfig?.extra?.API_URL;
    

    try{
        const url = API_URL + '/set-notification'
        const response = await axios.post(url, {userEmail, type, title, message, time, read})
        

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

export default NotificationController;