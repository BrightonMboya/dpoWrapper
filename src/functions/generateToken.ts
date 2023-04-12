import axios from "axios";
interface IGenerateToken {
    companyToken: string;
    amount: number;
    currency: string;
    country: string;
    redircetUrl: string;
    backUrl: string;

}
export async function generateToken({ companyToken, amount, country, currency, redircetUrl }: IGenerateToken) {
    let data = `
                <?xml version="1.0" encoding="utf-8"?>
                <API3G>
                <CompanyToken>${companyToken}</CompanyToken>
                <Request>createToken</Request>
                <Transaction>
                <PaymentAmount>${amount}</PaymentAmount >
                <PaymentCurrency>${currency}</PaymentCurrency>
                <DefaultPayment>MO</DefaultPayment>
                <DefaultPaymentCountry>${country}</DefaultPaymentCountry>
                <RedirectURL>${redircetUrl}</RedirectURL>
                <BackURL>http://www.shamba-data.com/zambia/</BackURL>
                <CompanyRefUnique>0</CompanyRefUnique>
                <PTL>5</PTL>
                </Transaction>
                <Services>
                <Service>
                    <ServiceType>57819</ServiceType>
                    <ServiceDescription>Subscription Services</ServiceDescription>
                    <ServiceDate>2023/04/4 19:00</ServiceDate>
                </Service>

                <Service>
                    <ServiceType>71973</ServiceType>
                    <ServiceDescription>Monthly Subscription</ServiceDescription>
                    <ServiceDate>2023/04/4 19:00</ServiceDate>
                </Service>

                <Service>
                    <ServiceType>73458</ServiceType>
                    <ServiceDescription>Agriculture Data</ServiceDescription>
                    <ServiceDate>2023/04/4 19:00</ServiceDate>
                </Service>
                </Services>
                <Additional>
                <BlockPayment>BT</BlockPayment>
                <BlockPayment>PP</BlockPayment>
                </Additional>
                </API3G>
            `;
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://secure.3gdirectpay.com/API/v6/",
        headers: {
            "Content-Type": "application/xml",
            Cookie: "AFIDENT=0B6758B3-BB98-438A-A666-7BF2F9CA6B31",
        },
        data: data,
    };

    const token = await axios.request(config);
    //   axios
    //     .request(config)
    //     .then((response) => {

    //         console.log(response.data, "aaaaaaaaaaa");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    console.log(token.data, "Yes daddy");
    // const response = await axios.request(config);
    // return response.data;
}


