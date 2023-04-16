import convert from "xml-js";


const xmlResponse = `
<?xml version="1.0" encoding="utf-8"?>
<API3G>
    <Request>merchantOnBoarding</Request>
    <CompanyToken>68B90B**************************5RVE</CompanyToken>
    <ContactEmail>test@directpay.online</ContactEmail>
    <ContactFirstName>John</ContactFirstName>
    <ContactLastName>Green</ContactLastName>
    <ContactPhoneNumber>254556555656</ContactPhoneNumber>
    <MerchantName>DPO test merchant</MerchantName>
    <MerchantRegisteredName>DPO test merchant 1</MerchantRegisteredName>
    <MerchantCountry>KE</MerchantCountry>
    <MerchantAddress>Rose Ave 5</MerchantAddress>
    <MerchantCity>114</MerchantCity>
    <MerchantUrl>http://www.directpay.online</MerchantUrl>
    <MerchantAccountType>1</MerchantAccountType>
    <MerchantIncorpDate>2017/12/25</MerchantIncorpDate>
    <MerchantNotificationUrl>www.directpay.online/notification.php</MerchantNotificationUrl>
    <MerchantDisableEmail>0</MerchantDisableEmail>
    <Files>
        <File>
            <FileTypeId>1</FileTypeId>
            <FileType>jpg</FileType>
            <FileBase>base 64 string</FileBase>
        </File>
        <File>
            <FileTypeId>1</FileTypeId>
            <FileType>pdf</FileType>
            <FileBase>base 64 string</FileBase>
        </File>
    </Files>
</API3G>
`
const result = convert.xml2js(xmlResponse, { compact: true, alwaysChildren: true });


type fileType = {
    FileTypeId: string,
    FileType: string,
    FileBase: string,
}

const fileArray = result['API3G']["Files"]['File'];
for (const file of Object.values(fileArray) as fileType[]) {
    Object.keys(file).forEach(key => {

        file[key] = file[key]["_text"];

    },)
}
// const jsonResponse = {
//     Request: result['API3G']["Request"]["_text"],
//     CompanyToken: result['API3G']["CompanyToken"]["_text"],
//     ContactEmail: result['API3G']["ContactEmail"]["_text"],
//     ContactFirstName: result['API3G']["ContactFirstName"]["_text"],
//     ContactLastName: result['API3G']["ContactLastName"]["_text"],
//     ContactPhoneNumber: result['API3G']["ContactPhoneNumber"]["_text"],
//     MerchantName: result['API3G']["MerchantName"]["_text"],
//     MerchantRegisteredName: result['API3G']["MerchantRegisteredName"]["_text"],
//     MerchantCountry: result['API3G']["MerchantCountry"]["_text"],
//     MerchantAddress: result['API3G']["MerchantAddress"]["_text"],
//     MerchantCity: result['API3G']["MerchantCity"]["_text"],
//     MerchantUrl: result['API3G']["MerchantUrl"]["_text"],
//     MerchantAccountType: result['API3G']["MerchantAccountType"]["_text"],
//     MerchantIncorpDate: result['API3G']["MerchantIncorpDate"]["_text"],
//     MerchantNotificationUrl: result['API3G']["MerchantNotificationUrl"]["_text"],
//     MerchantDisableEmail: result['API3G']["MerchantDisableEmail"]["_text"],
//     Files: fileArray

// }


// const json = {
//     _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
//     Request: "merchantOnBoarding",
//     CompanyToken: "68B90B**************************5RVE",
//     ContactEmail: "jay@gmail.com",
//     ContactFirstName: "John",
//     ContactLastName: "Green",
//     contactPhoneNumber: "254556555656",
//     MerchantName: "DPO test merchant",
//     MerchantRegisteredName: "DPO test merchant 1",
//     MerchantCountry: "KE",
//     MerchantAddress: "Rose Ave 5",
//     MerchantCity: "114",
//     MerchantUrl: "http://www.directpay.online",
//     MerchantAccountType: "1",
//     MerchantIncorpDate: "2017/12/25",
//     MerchantNotificationUrl: "www.directpay.online/notification.php",
//     MerchantDisableEmail: "0",
//     Files: [
//         {
//             FileTypeId: "1",
//             FileType: "jpg",
//             FileBase: "base 64 string"
//         },
//         {
//             FileTypeId: "1",
//             FileType: "pdf",
//             FileBase: "base 64 string"
//         }
//     ]
// }

// const xml = convert.js2xml(json, { compact: true, ignoreComment: true, spaces: 4 });

// console.log(xml);

