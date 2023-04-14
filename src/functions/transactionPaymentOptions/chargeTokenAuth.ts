import { type TransactionResponse } from "../basicOperations/emailToToken";
import convert from "xml-js";
import axios from "axios";

export default async function chargeTokenAuth(
    companyToken: string,
    transactionToken: string,) {

    const data = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <CompanyToken>${companyToken}</CompanyToken>
    <Request>chargeTokenAuth</Request>
    <TransactionToken>${transactionToken}</TransactionToken>
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
    }
    try {
        const xmlResponse = await axios.request(config);
        const jsonResponse = convert.xml2js(xmlResponse.data, { compact: true, alwaysChildren: true });
        const parsedJson: TransactionResponse = {
            Result: jsonResponse["API3G"]["Result"]["_text"],
            ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
        }
        return parsedJson;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// here I am just testing the function
const response = await chargeTokenAuth("0B6758B3-BB98-438A-A666-7BF2F9CA6B31", "8E01916D-4A60-4BBB-8A20-293BBE2DC0CB")
console.log(response);