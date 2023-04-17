import convert from "xml-js";
import axios from "axios";

const errorCodes = ["000", "902", "999"]

export default async function SuperWalletGetTransactions(
    companyToken: string,
    customerToken: string,
    customerCurrentPassword: string,
    customerNewPassword: string,
) {
    const data = `
  <?xml version="1.0" encoding="utf-8"?>
<API3G>
    <CompanyToken>${companyToken}</CompanyToken>
    <Request>SuperWalletChangePassword</Request>
    <customerToken>${customerToken}</customerToken>
    <customerCurrentPassword>${customerCurrentPassword}</customerCurrentPassword>
    <customerNewPassword>${customerNewPassword}</customerNewPassword>
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
        if (errorCodes.includes(jsonResponse["API3G"]["Result"]["_text"])) {
            const parsedJson = {
                Result: jsonResponse["API3G"]["Result"]["_text"],
                ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
            }
            return parsedJson;
        } else {
            const parsedJson = {
                Result: jsonResponse["API3G"]["Result"]["_text"],
                ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
            }
            return parsedJson;
        }
    } catch (error) {
        return error;
    }
}