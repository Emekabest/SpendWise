import axios from "axios";

const CreateAccountController = async(firstname, lastname, email, phone, pin, confirmPin)=>{


    try{
        const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/signup'
        const response = await axios.post(url, {firstname, lastname, email, phone, pin})
        

        if (response.data != "Successful"){

            return {status:403, message:response.data}
        }
        else{
            return {status:200, message:"Successful"}
        }

    }
    catch(error){
          
          return error.code
    }





    




}

export default CreateAccountController;