import axios from "axios";
import convert from "xml-js";
import { TransactionResponse } from "./emailToToken";

export default function refundToken(
    companyToken: string,
    transactionToken: string,
    amount: number,
    refundDetails: string,
    refundRef?: string,
    refundApproval?: number

) {
    const data = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <Request>refundToken</Request>
    <CompanyToken>${companyToken}</CompanyToken>
    <TransactionToken>${transactionToken}</TransactionToken>
    <refundAmount>${amount}</refundAmount>
    <refundDetails>${refundDetails}</refundDetails>
    <refundRef>${refundRef}</refundRef>
    <refundApproval>${refundApproval ? refundApproval : 0}</refundApproval>
    
    </API3G>
    `;
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://secure.3gdirectpay.com/API/v6/",
        headers: {
            "Content-Type": "application/xml",
        },
        data: data,
    };
    return axios.request(config)
        .then((response) => {
            const jsonResponse = convert.xml2js(response.data, { compact: true, alwaysChildren: true });
            const parsedJson: TransactionResponse = {
                Result: jsonResponse["API3G"]["Result"]["_text"],
                ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
            };
            return parsedJson;
        })
        .catch((error) => {
            console.log(error);
        });
}

// here I am just testing the function
const response = await refundToken(
    "0B6758B3-BB98-438A-A666-7BF2F9CA6B31",
    "50671986-5CAE-4C18-955E-C60BB2CAC20F",
    1,
    "test");
console.log(response);