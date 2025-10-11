import axios from "axios"


const UpdateWithdrawController = async(id, email, accountNumber, accountName, bankName, amount, settled)=>{


    try{
        const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/updatewithdraw'
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