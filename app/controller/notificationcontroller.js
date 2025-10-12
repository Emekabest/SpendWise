import axios from "axios"


const NotificationController = async(userEmail, type, title, message, time, read)=>{

    try{
        const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/set-notification'
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