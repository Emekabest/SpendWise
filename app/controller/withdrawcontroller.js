import axios from "axios"


const WithdrawController = async(email, accountNumber, accountName, bankName, amount, isSettled)=>{

    try{
        const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/withdraw'
        const response = await axios.post(url, {email, accountNumber, accountName, bankName, amount, isSettled})
        

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

export default WithdrawController