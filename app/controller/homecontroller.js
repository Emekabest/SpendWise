import axios from "axios"


const HomeController = async(email)=>{



    try{

            const url = `https://50gjymfsz0.execute-api.us-east-1.amazonaws.com/dev/home?email=${email}`
            const response = await axios.get(url)

            // console.log(response.data)
            
            if (response.data.user.firstname != undefined){

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

export default HomeController;