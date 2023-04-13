import axios from "axios";
import convert from "xml-js";
import { TransactionResponse } from "./emailToToken";


export default async function mVisa(
    companyToken: string,
    transactionToken: string,
    staticQR?: number) {
    const data = `

    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <CompanyToken>${companyToken}</CompanyToken>
    <Request>createMvisaQRcode</Request>
    <TransactionToken>${transactionToken}</TransactionToken>
    <StaticQR>${staticQR ? staticQR : 0}</StaticQR>
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
    const xmlResponse = await axios.request(config);
    const jsonResponse = convert.xml2js(xmlResponse.data, { compact: true, alwaysChildren: true });
    const parsedJson: TransactionResponse = {
        Result: jsonResponse["API3G"]["Result"]["_text"],
        ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
    };
    return parsedJson;
};

// here I am just testing the function
const response = await mVisa("0B6758B3-BB98-438A-A666-7BF2F9CA6B31", "50671986-5CAE-4C18-955E-C60BB2CAC20F");
console.log(response);