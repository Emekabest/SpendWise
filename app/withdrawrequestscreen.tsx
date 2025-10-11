import { useEffect, useState } from "react";
import { View } from "react-native";


const WithdrawRequestscreen = ()=>{



    const [withdrawRequst, setWithDrawRequest] = useState([{}])


    useEffect(()=>{
        const getWithdrawRequests = async()=>{

            setWithDrawRequest([
                {
                    bankName:"Uba",
                    amount:3000
                },

                {
                    bankName:"Opay",
                    amount:5000
                },

                {
                    bankName:"Access",
                    amount:9000
                },

            ])


        }

        getWithdrawRequests()

    },[])


    return(
        <View>


        </View>
    )

}

export default WithdrawRequestscreen;