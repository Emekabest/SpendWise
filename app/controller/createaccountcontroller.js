import axios from "axios";

const CreateAccountController = async(firstname, lastname, email, pin)=>{

    try{
        const url = 'https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/signup'
        const response = await axios.post(url, {firstname, lastname, email, pin})
        

        if (response.data == "Successful"){

            return {status:200, message:"Successful"}
        }
        else{
                return {status:403, message:response.data}
        }

    }
    catch(error){
          
          return error.code
    }





    




}

export default CreateAccountController;