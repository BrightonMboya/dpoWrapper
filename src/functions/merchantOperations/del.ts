import convert from "xml-js";

const xml = `

<?xml version="1.0" encoding="UTF-8"?>
<API3G>
    <CompanyData>
        <CompanyId>9556</CompanyId>
        <CompanyToken>9EF044**************************F99B</CompanyToken>
        <UploadFiles>
            https://secure.3gdirectpay.com/external/uploadfileform/uploadfileform.php?token=9EF044**************************F99B
        </UploadFiles>
        <CompanyCode>HKRUA</CompanyCode>
        <coId>2</coId>
        <services>
            <service>
                <name>PC</name>
                <id>30008</id>
            </service>
            <service>
                <name>Flight</name>
                <id>30009</id>
            </service>
        </services>
    </CompanyData>
    <Result>000</Result>
    <ResultExplanation>Merchant has been created</ResultExplanation>
</API3G>
`
const jsonResponse = convert.xml2js(xml, { compact: true, alwaysChildren: true });
const parsedJson = {
    Result: jsonResponse["API3G"]["Result"]["_text"],
    ResultExplanation: jsonResponse["API3G"]["ResultExplanation"]["_text"],
    CompanyData: {
        CompanyId: jsonResponse["API3G"]["CompanyData"]["CompanyId"]["_text"],
        CompanyToken: jsonResponse["API3G"]["CompanyData"]["CompanyToken"]["_text"],
        UploadFiles: jsonResponse["API3G"]["CompanyData"]["UploadFiles"]["_text"],
        CompanyCode: jsonResponse["API3G"]["CompanyData"]["CompanyCode"]["_text"],
        coId: jsonResponse["API3G"]["CompanyData"]["coId"]["_text"],
        services: {
            service: jsonResponse["API3G"]["CompanyData"]["services"]["service"].map((service) => {
                return {
                    name: service["name"]["_text"],
                    id: service["id"]["_text"]
                }
            }
            )
        }
    },

}


console.log(parsedJson.CompanyData.services.service);
