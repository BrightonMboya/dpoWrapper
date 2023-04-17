import axios from "axios";
import convert from "xml-js";

const errorCodes = ["000", "700", "801", "802", "803", "804"]

type tranactionType = {
    transRef: string,
    providerName: string,
    transAmount: string,
    transCurrency: string,
    paymentDate: string,
    transCardType: string,
    transCardNum: string,
}

export default async function (
    companyToken: string,
    customerUnq: string,

    numberOfRecords?: number,
    indexOfRecords?: number,
) {
    const data = `
    <?xml version="1.0" encoding="utf-8"?>
        <API3G>
            <CompanyToken>${companyToken}</CompanyToken>
            <Request>SuperWalletGetTransactions</Request>
            <customerUnq>${customerUnq}</customerUnq>
            <indexOfRecords>${indexOfRecords}</indexOfRecords>
            <numberOfRecords>${numberOfRecords}</numberOfRecords>
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
                totalTransactions: jsonResponse["API3G"]["TotalTransactions"]["_text"],
                transHistory: jsonResponse["API3G"]["transHistory"].map((transaction: tranactionType) => {
                    return {
                        transRef: transaction["transRef"]["_text"],
                        providerName: transaction["providerName"]["_text"],
                        transAmount: transaction["transAmount"]["_text"],
                        transCurrency: transaction["transCurrency"]["_text"],
                        paymentDate: transaction["paymentDate"]["_text"],
                        transCardType: transaction["transCardType"]["_text"],
                        transCardNum: transaction["transCardNum"]["_text"],
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