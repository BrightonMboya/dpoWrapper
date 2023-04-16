import axios from "axios";
import convert from "xml-js";

type serviceType = {
    serviceID: string,
    ServiceName: string,
}

const errorCodes = ["801", "802", "803", "804"]
// console.log(errorCodes.includes(801))

export default async function getServices(companyToken: string) {
    const data = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
    <Request>getServices</Request>
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

        if (errorCodes.includes(jsonResponse["API3G"]["Result"]["_text"])) {
            const parsedJson = {
                Result: jsonResponse["API3G"]["Result"]["_text"],
                ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
            }

            return parsedJson;
        } else {

            const parsedJson = {
                Services: jsonResponse["API3G"]["Services"]["Service"].map((service: serviceType) => {
                    return {
                        serviceID: service["ServiceID"]["_text"],
                        ServiceName: service["ServiceName"]["_text"],

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

const res = await getServices("0B6758B3-BB98-438A-A666-7BF2F9CA8B31")
console.log(res)