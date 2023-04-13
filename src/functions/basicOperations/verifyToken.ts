import axios from "axios";
import convert from "xml-js";

type TransactionResponse = {
    Result: string,
    ResultExplanation: string,
    customerName: string,
    customerCredit: string,
    customerCreditType: string,
    transactionApproval: string,
    transactionCurrency: string,
    transactionAmount: string,
    fraudAlert: string,
    fraudExplnation: string,
    transactionNetAmount: string,
    transactionSettlementDate: string,
    transactionRollingReserveAmount: string,
    transactionRollingReserveExpirationDate: string,
    transactionRollingReserveDate: string,
    customerPhone: string,
    customerCountry: string,
    customerAddress: string,
    customerCity: string,
    customerZip: string,
    mobilePaymentRequest: string,
    accRef: string,
}

export default async function verifyToken(
    companyToken: string,
    transactionToken: string
) {
    const data = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <Request>verifyToken</Request>
    <CompanyToken>${companyToken}</CompanyToken>
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
        const response = await axios.request(config);
        const jsonResponse = convert.xml2js(response.data, { compact: true, alwaysChildren: true });
        const parsedJson: TransactionResponse = {
            Result: jsonResponse["API3G"]["Result"]["_text"],
            ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
            customerName: jsonResponse["API3G"]["CustomerName"]["_text"],
            customerCredit: jsonResponse["API3G"]["CustomerCredit"]["_text"],
            customerCreditType: jsonResponse["API3G"]["CustomerCreditType"]["_text"],
            transactionApproval: jsonResponse["API3G"]["TransactionApproval"]["_text"],
            transactionCurrency: jsonResponse["API3G"]["TransactionCurrency"]["_text"],
            transactionAmount: jsonResponse["API3G"]["TransactionAmount"]["_text"],
            fraudAlert: jsonResponse["API3G"]["FraudAlert"]["_text"],
            fraudExplnation: jsonResponse["API3G"]["FraudExplnation"]["_text"],
            transactionNetAmount: jsonResponse["API3G"]["TransactionNetAmount"]["_text"],
            transactionSettlementDate: jsonResponse["API3G"]["TransactionSettlementDate"]["_text"],
            transactionRollingReserveAmount: jsonResponse["API3G"]["TransactionRollingReserveAmount"],
            transactionRollingReserveExpirationDate: jsonResponse["API3G"]["TransactionRollingReserveExpirationDate"],
            transactionRollingReserveDate: jsonResponse["API3G"]["TransactionRollingReserveDate"]["_text"],
            customerPhone: jsonResponse["API3G"]["CustomerPhone"]["_text"],
            customerCountry: jsonResponse["API3G"]["CustomerCountry"]["_text"],
            customerAddress: jsonResponse["API3G"]["CustomerAddress"]["_text"],
            customerCity: jsonResponse["API3G"]["CustomerCity"]["_text"],
            customerZip: jsonResponse["API3G"]["CustomerZip"]["_text"],
            mobilePaymentRequest: jsonResponse["API3G"]["MobilePaymentRequest"]["_text"],
            accRef: jsonResponse["API3G"]["AccRef"]["_text"],
        };
        return parsedJson;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//just testing shit
const response = await verifyToken(
    "0B6758B3-BB98-438A-A666-7BF2F9CA6B31",
    "C5F4B74A-9727-4BDC-BB5C-B8253C39A81B",
)

console.log(response)