import axios from "axios";


const BudgetController = async(email, type, limitAmount, alterDate)=>{

    try{
        const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/setbudget'
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