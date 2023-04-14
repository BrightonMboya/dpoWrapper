import axios from "axios";
import convert from "xml-js";


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
        return jsonResponse["API3G"];

    } catch (error) {
        console.log(error);
        return error;
    }

}