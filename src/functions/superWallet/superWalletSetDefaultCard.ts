import convert from "xml-js";
import axios from "axios";

export default async function (
    companyToken: string,
    customerToken: string,
    customerCreditCardToken: string,
) {
    const data = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
        <CompanyToken>${companyToken}</CompanyToken>
        <Request>SuperWalletSetDefaultCard</Request>
        <customerToken>${customerToken}</customerToken>
        <customerCreditCardToken>${customerCreditCardToken}</customerCreditCardToken>
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
        const parsedJson = {
            Result: jsonResponse["API3G"]["Result"]["_text"],
            ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
        }
        return parsedJson;
    } catch (error) {
        return error;
    }
}