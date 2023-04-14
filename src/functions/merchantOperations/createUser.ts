import axios from "axios";
import convert from "xml-js";


type TransactionResponse = {
    Result: string,
    ResultExplanation: string,
    usrUNQ: string,
}

export default async function (
    companyToken: string,
    userCompanyToken: string,
    userFirstName: string,
    userLastName: string,
    userEmail: string,
    userPhoneCode?: string,
    userPhoneNumber?: string,
    userSendSms?: string,
) {
    const data = `
    
    <API3G>
    <CompanyToken>${companyToken}</CompanyToken>
    <Request>CreateUser</Request>
    <userCompanyToken>${userCompanyToken}/userCompanyToken>
    <userLastName>${userLastName}</userLastName>
    <userFirstName>${userFirstName}</userFirstName>
    <userEmail>${userEmail}</userEmail>
    <userPhoneCode>${userPhoneCode}</userPhoneCode>
    <userPhoneNumber>${userPhoneNumber}</userPhoneNumber>
    <userSendSms>${userSendSms}</userSendSms>
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
        const parsedJson: TransactionResponse = {
            Result: jsonResponse["API3G"]["Result"]["_text"],
            ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
            usrUNQ: jsonResponse["API3G"]["usrUNQ"]["_text"],
        }
        return parsedJson;
    } catch (error) {
        console.log(error);
        return error;
    }
}