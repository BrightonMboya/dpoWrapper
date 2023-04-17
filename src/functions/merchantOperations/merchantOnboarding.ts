import convert from "xml-js";
import axios from "axios";

type responseSuccess = {
    Result: string,
    ResultExplanation: string,
    companyData: Array<{
        CompanyId: string,
        CompanyToken: string,
        UploadFiles: string,
        CompanyCode: string,
        coId: string,
        services: Array<{
            name: string,
            id: string
        }>
    }>
}

type responseError = {
    Result: string,
    ResultExplanation: string,
}

type companyData = {
    CompanyId: string,
    CompanyToken: string,
    UploadFiles: string,
    coId: string,
    CompanyCode: string,
    services: Array<{ name: string, id: string }>
}


export default async function merchantOnboarding(
    companyToken: string,
    ContactEmail: string,
    contactFirstName: string,
    contactLastName: string,
    contactPhoneNumber: string,
    merchantName: string,
    merchantRegisteredName: string,
    merchantCountry: string,
    merchantAddress: string,
    merchantCity: string,
    merchantUrl: string,
    merchantAccountType: string,
    merchantIncorpDate: string,
    merchantNotificationUrl: string,
    merchantDisableEmail: string,
    files: Array<{ FileTypeId: string, FileType: string, FileBase: string }>

) {
    const dpoRequest = {
        _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
        API3G: {
            Request: "merchantOnBoarding",
            CompanyToken: companyToken,
            ContactEmail: ContactEmail,
            ContactFirstName: contactFirstName,
            ContactLastName: contactLastName,
            contactPhoneNumber: contactPhoneNumber,
            MerchantName: merchantName,
            MerchantRegisteredName: merchantRegisteredName,
            MerchantCountry: merchantCountry,
            MerchantAddress: merchantAddress,
            MerchantCity: merchantCity,
            MerchantUrl: merchantUrl,
            MerchantAccountType: merchantAccountType,
            MerchantIncorpDate: merchantIncorpDate,
            MerchantNotificationUrl: merchantNotificationUrl,
            MerchantDisableEmail: merchantDisableEmail,
            Files: {
                File: files.map(file => {
                    return {
                        FileTypeId: file.FileTypeId,
                        FileType: file.FileType,
                        FileBase: file.FileBase,
                    }
                }
                )

            }
        }
    }

    const xmlRequest = convert.js2xml(dpoRequest, { compact: true, ignoreComment: true, spaces: 4 });
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://secure.3gdirectpay.com/API/v6/",
        headers: {
            "Content-Type": "application/xml",
        },
        data: xmlRequest,
    };

    try {
        const xmlResponse = await axios(config);
        const jsonResponse = convert.xml2js(xmlResponse.data, { compact: true, alwaysChildren: true });
        console.log(jsonResponse);
        if (jsonResponse["API3G"]["Result"]["_text"] === "000") {
            const parsedJson: responseSuccess = {
                Result: jsonResponse["API3G"]["Result"]["_text"],
                ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
                companyData: jsonResponse["API3G"]["companyData"]["Company"].map((company: companyData) => {
                    return {
                        CompanyId: company["CompanyId"]["_text"],
                        CompanyToken: company["CompanyToken"]["_text"],
                        UploadFiles: company["UploadFiles"]["_text"],
                        CompanyCode: company["CompanyCode"]["_text"],
                        coId: company["coId"]["_text"],
                        services: company["services"]["service"].map((service: { name: string, id: string }) => {
                            return {
                                name: service["name"]["_text"],
                                id: service["id"]["_text"]
                            }
                        })
                    }
                })
            }
            return parsedJson;
        } else {
            const parsedJson: responseError = {
                Result: jsonResponse["API3G"]["Result"]["_text"],
                ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
            }
            return parsedJson;

        }
    } catch (error) {
        console.log(error);
        return error
    }
}

// testing some shit
const res = await merchantOnboarding(

    "0B6758B3-BB98-438A-A666-7BF2F9CA6B31",
    "jay@gmail.com",
    "John",
    "Green",
    "254556555656",
    "DPO test merchant",
    "DPO test merchant 1",
    "KE",
    "Rose Ave 5",
    "114",
    "http://www.directpay.online",
    "1",
    "2017/12/25",
    "www.directpay.online/notification.php",
    "0",
    [
        {
            FileTypeId: "1",
            FileType: "jpg",
            FileBase: "base 64 string"
        },
        {
            FileTypeId: "1",
            FileType: "pdf",
            FileBase: "base 64 string"
        }
    ]

)


console.log(res);

