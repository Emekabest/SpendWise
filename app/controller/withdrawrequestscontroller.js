import axios from "axios"


const WithdrawRequestsController = async()=>{

    try{
        const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/getwithdraws'
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

export default WithdrawRequestsController