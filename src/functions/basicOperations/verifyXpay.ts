import axios from "axios";
import convert from "xml-js";

type TransactionResponse = {
    result: string;
    status: string;
    sender: string;
    receiver: string;
    currency: string;
    amount: string;
    description: string;
    serviceType: string;

}

export default async function verifyXpay(
    companyToken: string,
    xpayID: number) {
    const data = `
        <?xml version="1.0" encoding="utf-8"?>
        <API3G>
        <CompanyToken>${companyToken}</CompanyToken>
        <Request>verifyXpay</Request>
        <XpayId>${xpayID}</XpayId>
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
        const response = await axios.request(config);
        const jsonResponse = convert.xml2js(response.data, { compact: true, alwaysChildren: true });
        const parsedJson: TransactionResponse = {
            result: jsonResponse["API3G"]["Result"]["_text"],
            status: jsonResponse["API3G"]["Status"]["_text"],
            sender: jsonResponse["API3G"]["Sender"]["_text"],
            receiver: jsonResponse["API3G"]["Receiver"]["_text"],
            currency: jsonResponse["API3G"]["Currency"]["_text"],
            amount: jsonResponse["API3G"]["Amount"]["_text"],
            description: jsonResponse["API3G"]["Description"]["_text"],
            serviceType: jsonResponse["API3G"]["ServiceType"]["_text"],
        };
        return parsedJson;
    } catch (error) {
        console.log(error);
        return error
    }

}