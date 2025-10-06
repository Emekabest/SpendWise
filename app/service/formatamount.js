


const formatAmount = (amount)=>{

    const formattedAmount = amount.toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
    });
 
    return formattedAmount;
}

export default formatAmount