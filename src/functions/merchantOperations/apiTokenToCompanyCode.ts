import axios from "axios";
import convert from "xml-js";

const errorCodes = ["000", "700", "801", "802", "803", "804"]
type TransactionResponse = {
    Result: string,
    ResultExplanation: string,
    companyCode: string,
    companyName: string,
    brandName: string,
    websiteURL: string,
    companyEmail: string,
    notificationEmail: string,
    companyAddress: string,
    companyCountry: string,
    companyMarket: string,
}

export default async function apiTokenToCompanyCode(
    companyToken: string,
    companyAPItokenUNQ: string
) {
    const data = `
    <API3G>
    <CompanyToken>${companyToken}</CompanyToken>
    <Request>APItokenToCompanyCode</Request>
    <companyAPItokenUNQ>${companyAPItokenUNQ}</companyAPItokenUNQ>
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
        if (errorCodes.includes(jsonResponse["API3G"]["Result"]["_text"])) {
            const parsedJson = {
                Result: jsonResponse["API3G"]["Result"]["_text"],
                ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
            }

            return parsedJson;
        } else {
            const parsedJson: TransactionResponse = {
                Result: jsonResponse["API3G"]["Result"]["_text"],
                ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
                companyCode: jsonResponse["API3G"]["companyCode"]["_text"],
                companyName: jsonResponse["API3G"]["CompanyName"]["_text"],
                brandName: jsonResponse["API3G"]["BrandName"]["_text"],
                websiteURL: jsonResponse["API3G"]["websiteURL"]["_text"],
                companyEmail: jsonResponse["API3G"]["CompanyEmail"]["_text"],
                notificationEmail: jsonResponse["API3G"]["NotificationEmail"]["_text"],
                companyAddress: jsonResponse["API3G"]["CompanyAddress"]["_text"],
                companyCountry: jsonResponse["API3G"]["CompanyCountry"]["_text"],
                companyMarket: jsonResponse["API3G"]["CompanyMarket"]["_text"],
            }
            return parsedJson;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}