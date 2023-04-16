import axios from "axios";
import convert from "xml-js";
// import { errorCodes } from "./getMobilePaymentOptions"
const errorCodes = ["801", "802", "803", "804", "0130", "001", "904", "950"]

type terminalType = {
    terminalredirecturi: string,
    terminaltype: string,
    terminalmnocountry: string,
    terminalmno: string,

}

export default async function companyMobilePaymentOptions(companyToken: string) {
    const data = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <Request>CompanyMobilePaymentOptions</Request>
    <CompanyToken>${companyToken}</CompanyToken>
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

        if (jsonResponse["API3G"]["Result"]) {

            if (errorCodes.includes(jsonResponse["API3G"]["Result"]["_text"])) {
                const parsedJson = {
                    Result: jsonResponse["API3G"]["Result"]["_text"],
                    ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
                }
                return parsedJson;
            }
        } else {
            const parsedJson = {
                paymentOptionsMobile: jsonResponse["API3G"]["paymentoptionsmobile"]["terminalmobile"].map((terminal: terminalType) => {

                    return {
                        terminalredirecturi: terminal["terminalredirecturi"]["_text"],
                        terminalType: terminal["terminaltype"]["_text"],
                        terminalmno: terminal["terminalmno"]["_text"],
                        terminalmnocountry: terminal["terminalmnocountry"]["_text"],
                    }
                })
            }
            return parsedJson;
        }

    } catch (error) {
        console.log(error);
        return error;
    }
}


const res = await companyMobilePaymentOptions("0B6758B3-BB98-438A-A666-7BF2F9CA6B61")
console.log(res)