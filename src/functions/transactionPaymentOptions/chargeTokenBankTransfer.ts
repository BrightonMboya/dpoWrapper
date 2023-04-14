import axios from "axios";
import convert from "xml-js";

// type TransactionResponse = {
//     Result: string,
//     ResultExplanation: string,
//     ConvertedAmount: string,
//     ConvertedCurrency: string,
// }

export default async function chargeTokenBankTransfer(
    companyToken: string,
    transactionToken: string,
    bankCode: string,
) {
    const data = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <Request>chargeTokenBankTransfer</Request>
    <CompanyToken>${companyToken}</CompanyToken>
    <TransactionToken>${transactionToken}</TransactionToken>
    <BankCode>${bankCode}</BankCode>
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
        const jsonResponse = convert.xml2js(xmlResponse.data, { compact: true, alwaysChildren: true });
        return jsonResponse["API3G"];

    } catch (error) {
        console.log(error);
        return error;
    }

}

// here I am just testing the function
const response = await chargeTokenBankTransfer("0B6758B3-BB98-438A-A666-7BF2F9CA6B31", "50671986-5CAE-4C18-955E-C60BB2CAC20F", "BANCO DO BRASIL S.A.");
console.log(response);