import axios from "axios";
import convert from "xml-js";

// type TransactionResponse = {
//     country: string,
//     countryCode: string,
//     paymentname: string,
//     cellularprefix: string,
//     amount: string,
//     currency: string,
//     instructions: string,
// }

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

        const jsonResponse = convert.xml2js(xmlResponse.data, { compact: true, alwaysChildren: false });

        // const parsedJson: TransactionResponse = {
        //     country: jsonResponse["API3G"]["mobileoptions"]["country"]["_text"],
        //     countryCode: jsonResponse["API3G"]["mobileoptions"]["countrycode"]["_text"],
        //     paymentname: jsonResponse["API3G"]["mobileoptions"]["paymentname"]["_text"],
        //     cellularprefix: jsonResponse["API3G"]["mobileoptions"]["cellularprefix"]["_text"],
        //     amount: jsonResponse["API3G"]["mobileoptions"]["amount"]["_text"],
        //     currency: jsonResponse["API3G"]["mobileoptions"]["currency"]["_text"],
        //     instructions: jsonResponse["API3G"]["mobileoptions"]["instructions"]["_text"],

        // }
        return jsonResponse;
    } catch (error) {
        console.log(error);
        return error;

    }
}

// here I am just testing the function
const response = await getMobilePaymentOptions("0B6758B3-BB98-438A-A666-7BF2F9CA6B31", "8E01916D-4A60-4BBB-8A20-293BBE2DC0CB")
console.log(response);