import axios from "axios";
import convert from "xml-js";
import { type TransactionResponse } from "../basicOperations/emailToToken";

export default async function getBankTransferOptions(
    companyToken: string,
    transactionToken: string,
    creditCardNumber: number,
    creditCardExpiry: string,
    creditCardCVV: number,
    cardHolderName: string,
    chargeType?: string,
    enrolled?: string,
    eci?: string,
    threeDSTransId?: string,
    cavv?: string,
    threedMessageVersion?: string,
    transactionStatus?: string,
    threedACSIssuerCode?: number

) {
    const data = `
        <?xml version="1.0" encoding="utf-8"?>
        <API3G>
        <CompanyToken>${companyToken}</CompanyToken>
        <Request>chargeTokenCreditCard</Request>
        <TransactionToken>${transactionToken}</TransactionToken>
        <CreditCardNumber>${creditCardNumber}</CreditCardNumber>
        <CreditCardExpiry>${creditCardExpiry}</CreditCardExpiry>
        <CreditCardCVV>${creditCardCVV}</CreditCardCVV>
        <CardHolderName>${cardHolderName}</CardHolderName>
        <ChargeType>${chargeType}</ChargeType>
        <ThreeD>
                <Enrolled>${enrolled}</Enrolled>
                <Eci>${eci}</Eci>
                <ThreedDSTransId>${threeDSTransId}</ThreedDSTransId>
                <Cavv>${cavv}</Cavv>
                <ThreedACSIssuerCode>${threedACSIssuerCode}</ThreedACSIssuerCode>
                <ThreedMessageVersion>${threedMessageVersion}</ThreedMessageVersion>
                <TransactionStatus>${transactionStatus}</TransactionStatus>
            </ThreeD>
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
        const parsedJson: TransactionResponse = {
            Result: jsonResponse["API3G"]["Result"]["_text"],
            ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
        }
        return parsedJson;
    } catch (error) {
        console.log(error);
        return error;
    }
}