import axios from "axios";
import convert from "xml-js";


const errorCodes = ["000", "0130", "001", "952", "953", "954", "955", "801", "802", "804", "900", "902", "903", "904", "950", "951"]

export default async function chargeTokenMobile(
    companyToken: string,
    transactionToken: string,
    phoneNumber: string,
    mno: string,
    mnoCountry: string,
) {
    const data = `
    <?xml version="1.0" encoding="utf-8"?>
  <?xml version="1.0" encoding="UTF-8"?>
    <API3G>
    <CompanyToken>${companyToken}</CompanyToken>
    <Request>ChargeTokenMobile</Request>
    <TransactionToken>${transactionToken}</TransactionToken>
    <PhoneNumber>${phoneNumber}</PhoneNumber>
    <MNO>${mno}</MNO>
    <MNOcountry>${mnoCountry}</MNOcountry>
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
                statusCode: jsonResponse["API3G"]["StatusCode"]["_text"],
                resultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
                instructions: jsonResponse["API3G"]["Instructions"].map((instruction: any) => {
                    return instruction["_text"]
                }),
                redirectOption: jsonResponse["API3G"]["RedirectOption"]["_text"],
            }
            return parsedJson;
        }


    } catch (error) {
        console.log(error);
        return error;
    }

}