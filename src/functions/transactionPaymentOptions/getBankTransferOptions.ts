import axios from 'axios';
import convert from 'xml-js';

const errorCodes = ["000", "999", "804", "950",]
export const getBankTransferOptions = async (companyToken: string, transactionToken: string) => {
    const data = `
    <?xml version="1.0" encoding="UTF-8"?>
    <API3G>
    <CompanyToken>${companyToken}</CompanyToken>
    <Request>GetBankTransferOptions</Request>
    <TransactionToken>${transactionToken}</TransactionToken>
    </API3G>
    `
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
                Result: jsonResponse['API3G']["Result"]["_text"],
                ResultExplanation: jsonResponse['API3G']["ResultExplanation"]["_text"],
                bankOptions: jsonResponse["API3G"]['bankOptions']['option'].map((option) => {
                    return {
                        bankName: option['bankName']['_text'],
                        bankCode: option['bankCode']['_text'],
                        instructions: {
                            bankInstructionsEN: option['instructions']['bankInstructionsEN']['_text'],
                            bankInstructionsIT: option['instructions']['bankInstructionsIT']['_text'],
                            bankInstructionsFR: option['instructions']['bankInstructionsFR']['_text'],
                            bankInstructionsSW: option['instructions']['bankInstructionsSW']['_text'],
                        }
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


// testing the function
const res = await getBankTransferOptions("0B6758B3-BB98-438A-A666-7BF2F9CA6B31", "84601007-3411-419F-8818-DF90C93B0898");
console.log(res);