import axios from "axios";
import convert from "xml-js";
import { TransactionResponse } from "./emailToToken";

export default async function updateToken(
    companyToken: string,
    transactionToken: string,
    amount?: number,
    ref?: string,
    customerEmail?: string,
    customerFirstName?: string,
    customerLastName?: string,
    customerAddress?: string,
    customerCity?: string,
    customerCountry?: string,
    customerDialCode?: string,
    customerPhone?: string,
    customerZip?: string,
    companyAccRef?: string,
    userToken?: string,
) {
    const data = `
    <?xml version="1.0" encoding="utf-8"?>
        <API3G>
        <CompanyToken>${companyToken}</CompanyToken>
        <Request>updateToken</Request>
        <TransactionToken>${transactionToken}</TransactionToken>
        <PaymentAmount>${amount}</PaymentAmount>
        <CompanyRef>${ref}</CompanyRef>
        <CustomerEmail>${customerEmail}</CustomerEmail>
        <CustomerFirstName>${customerFirstName}</CustomerFirstName>
        <CustomerLastName>${customerLastName}</CustomerLastName>
        <CustomerAddress>${customerAddress} </CustomerAddress>
        <CustomerCity>${customerCity}</CustomerCity>
        <CustomerCountry>${customerCountry}</CustomerCountry>
        <CustomerDialCode>${customerDialCode}</CustomerDialCode>
        <CustomerPhone>${customerPhone}</CustomerPhone>
        <CustomerZip>${customerZip}</CustomerZip>
        <CompanyAccRef>${companyAccRef}</CompanyAccRef>
        <UserToken>${userToken}</UserToken>
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
const response = await updateToken(
    "0B6758B3-BB98-438A-A666-7BF2F9CA6B31",
    "50671986-5CAE-4C18-955E-C60BB2CAC20F",
    1,
    "test");
console.log(response);