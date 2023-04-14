import { type TransactionResponse } from "../basicOperations/emailToToken";
import axios from "axios";
import convert from "xml-js";

export default async function voidTokenAuth(
    companyToken: string,
    transactionToken: string,
    voidDetails: string
) {

    const data = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <Request>voidTokenAuth</Request>
    <CompanyToken>${companyToken}</CompanyToken>
    <TransactionToken>${transactionToken}</TransactionToken>
    <voidDetails>${voidDetails}</voidDetails>
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
    try {
        const xmlResponse = await axios.request(config);
        // here if no terminal is found, the response is a string, not an object
        if (xmlResponse.data === "no terminal found") {
            return xmlResponse.data;
        } else {
            const jsonResponse = convert.xml2js(xmlResponse.data, { compact: true, alwaysChildren: true });
            const parsedJson: TransactionResponse = {
                Result: jsonResponse["API3G"]["Result"]["_text"],
                ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
            }
            return parsedJson;
        }



    } catch (error) {
        console.log(error);
        return error;
    }

}

// here I am just testing the function
const response = await voidTokenAuth("0B6758B3-BB98-438A-A666-7BF2F9CA6B31", "8E01916D-4A60-4BBB-8A20-293BBE2DC0CB", "voiding the transaction");
console.log(response);