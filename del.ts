// import convert from "xml-js";
import { parseString } from "xml2js";



// const xmlResponse = `
// <?xml version="1.0" encoding="utf-8"?>
// <API3G>
//     <paymentoptions>
//         <mobileoption>
//             <country>zambia</country>
//             <countryCode>ZM</countryCode>
//             <paymentname>MTNZM</paymentname>
//             <logo>https://s3-eu-west-1.amazonaws.com/directpaystorage/icons/mtn.png</logo>
//             <celluarprefix>260</celluarprefix>
//             <amount>80</amount>
//             <currency>ZMW</currency>
//             <instructions>Shortly&#8218 you will receive a push prompt on your phone to enter your MoMo PIN and authorize the payment</instructions>
//         </mobileoption>
//         <mobileoption>
//             <country>zambia</country>
//             <countryCode>ZM</countryCode>
//             <paymentname>AirtelZM</paymentname>
//             <logo>https://s3-eu-west-1.amazonaws.com/directpaystorage/icons/airtelmoney.png</logo>
//             <celluarprefix>260</celluarprefix>
//             <amount>80</amount>
//             <currency>ZMW</currency>
//             <instructions>Shortly&#8218 you will receive a push prompt on your phone to enter your Airtel PIN and authorize the payment</instructions>
//         </mobileoption>
//     </paymentoptions>
// </API3G>
// `

const xml = `
<?xml version="1.0" encoding="utf-8"?>
<API3G>
	<paymentoptions>
		<mobileoption>
			<country>zambia</country>
			<countryCode>ZM</countryCode>
			<paymentname>MTNZM</paymentname>
			<logo>https://s3-eu-west-1.amazonaws.com/directpaystorage/icons/mtn.png</logo>
			<celluarprefix>260</celluarprefix>
			<amount>80</amount>
			<currency>ZMW</currency>
			<instructions>Shortly&#8218 you will receive a push prompt on your phone to enter your MoMo PIN and
				authorize the payment</instructions>
		</mobileoption>
		<mobileoption>
			<country>zambia</country>
			<countryCode>ZM</countryCode>
			<paymentname>AirtelZM</paymentname>
			<logo>https://s3-eu-west-1.amazonaws.com/directpaystorage/icons/airtelmoney.png</logo>
			<celluarprefix>260</celluarprefix>
			<amount>80</amount>
			<currency>ZMW</currency>
			<instructions>Shortly&#8218 you will receive a push prompt on your phone to enter your Airtel PIN and
				authorize the payment</instructions>
		</mobileoption>
	</paymentoptions>
</API3G>
`
try {
    parseString(xml, (err, result) => {
        let data = JSON.stringify(result)
        console.log(data)
        if (err) {
            console.log(err)
        }
    })

} catch (error) {
    console.log(error)

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

