import axios from "axios";
import convert from "xml-js";

export const errorCodes = ["0130", "001", "801", "802", "803", "804", "904", "950"]
type optionsType = {
    country: string,
    countryCode: string,
    paymentname: string,
    logo: string,
    cellularprefix: string,
    amount: string,
    currency: string,
    instructions: string,

}

type TransactionResponse = {
    paymentOptions: optionsType[],
}

export default async function getMobilePaymentOptions(companyToken: string, transactionToken: string) {
    const data = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <CompanyToken>${companyToken}</CompanyToken>
    <Request>GetMobilePaymentOptions</Request>
    <TransactionToken>${transactionToken}</TransactionToken>
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

        console.log(xmlResponse.data)
        const jsonResponse = convert.xml2js(xmlResponse.data, { compact: true, alwaysChildren: true });

        if (errorCodes.includes(jsonResponse["API3G"]["Result"]["_text"])) {
            const parsedJson = {
                Result: jsonResponse["API3G"]["Result"]["_text"],
                ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
            }
            return parsedJson;
        } else {
            const parsedJson: TransactionResponse = {
                paymentOptions: jsonResponse["API3G"]["mobileoptions"]["option"].map((option: optionsType) => {
                    return {
                        country: option["country"]["_text"],
                        countryCode: option["countrycode"]["_text"],
                        paymentname: option["paymentname"]["_text"],
                        logo: option["logo"]["_text"],
                        cellularprefix: option["cellularprefix"]["_text"],
                        amount: option["amount"]["_text"],
                        currency: option["currency"]["_text"],
                        instructions: option["instructions"]["_text"],
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

// here I am just testing the function
const response = await getMobilePaymentOptions("0B6758B3-BB98-438A-A666-7BF2F9CA6B31",
    "C5F4B74A-9727-4BDC-BB5C-B8253C39A81B")
console.log(response);

