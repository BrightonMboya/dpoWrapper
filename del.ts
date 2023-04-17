import convert from "xml-js";


const xmlResponse = `
<?xml version="1.0" encoding="utf-8"?>
<API3G>
    <Result>000</Result>
    <ResultExplanation>Success</ResultExplanation>
    <bankOptions>
        <option>
            <bankName>DTB Kenya USD</bankName>
            <bankCode>DTB</bankCode>
            <instructions>
                <bankInstructionsEN>Please use the below details for your bank transfer;Account Name : '3G Direct Pay Limited';Bank Name : Diamond Trust Bank;Branch : Tom Mboya;Bank Address : 'MondLane/Tom Mboya, Nairobi, Kenya';Account Number : 0002725005;SWIFT CODE : DTKEKENA ; Please add the following text within your transaction (additional information field): 654597 ;</bankInstructionsEN>
                <bankInstructionsIT>Usa i dettagli sottostanti per il tuo trasferimento bancario;Nome del Conto : '3G Direct Pay Limited';Nome della Banca : Diamond Trust Bank;Filiale : Tom Mboya;Indirizzo della Banca : 'MondLane/Tom Mboya, Nairobi, Kenya';Numero del Conto : 0002725005;CODICE SWIFT : DTKEKENA ; Aggiungi il seguente testo nella tua transazione (campo ulteriori informazioni) 654597 ;</bankInstructionsIT>
                <bankInstructionsFR>Veuillez utiliser les d and eacutetails ci-dessous pour votre virement bancaire;Nom du compte : '3G Direct Pay Limited';Nom de la banque : Diamond Trust Bank;Agence : Tom Mboya;Adresse de la banque : 'MondLane/Tom Mboya, Nairobi, Kenya';Num and eacutero de compte : 0002725005;CODE SWIFT : DTKEKENA ; Veuillez ajouter le texte suivant dans votre transaction (champ des informations supplémentaires) 654597 ;</bankInstructionsFR>
                <bankInstructionsSW>Tafadhali tumia maelezo yaliyo chini kwa ajili ya uhamishaji wa benki;Jina la Akaunti : '3G Direct Pay Limited';Jina la Benki : Diamond Trust Bank;Tawi : Tom Mboya;Anwani ya Benki : 'MondLane/Tom Mboya, Nairobi, Kenya';Namba ya Akaunti : 0002725005;SWIFT CODE : DTKEKENA ; Tafadhali ongeza maandishi yafuatayo katika mapatano (eneo la maelezo zaidi) 654597 ;</bankInstructionsSW>
            </instructions>
        </option>
        <option>
            <bankName>DTB Kenya KES</bankName>
            <bankCode>DTBKE</bankCode>
            <instructions>
                <bankInstructionsEN>Please use the below details for your bank transfer;Account Name : '3G Direct Pay Limited';Bank Name : Diamond Trust Bank;Branch : Tom Mboya;Bank Address : 'MondLane/Tom Mboya, Nairobi, Kenya';Account Number : 0002725004;SWIFT CODE : DTKEKENA ; Please add the following text within your transaction (additional information field): 654597 ;</bankInstructionsEN>
                <bankInstructionsIT>Usa i dettagli sottostanti per il tuo trasferimento bancario;Nome del Conto : '3G Direct Pay Limited';Nome della Banca : Diamond Trust Bank;Filiale : Tom Mboya;Indirizzo della Banca : 'MondLane/Tom Mboya, Nairobi, Kenya';Numero del Conto : 0002725004;CODICE SWIFT : DTKEKENA ; Aggiungi il seguente testo nella tua transazione (campo ulteriori informazioni) 654597 ;</bankInstructionsIT>
                <bankInstructionsFR>Veuillez utiliser les d and eacutetails ci-dessous pour votre virement bancaire;Nom du compte : '3G Direct Pay Limited';Nom de la banque : Diamond Trust Bank;Agence : Tom Mboya;Adresse de la banque : 'MondLane/Tom Mboya, Nairobi, Kenya';Num and eacutero de compte : 0002725004;CODE SWIFT : DTKEKENA ; Veuillez ajouter le texte suivant dans votre transaction (champ des informations supplémentaires) 654597 ;</bankInstructionsFR>
                <bankInstructionsSW>Tafadhali tumia maelezo yaliyo chini kwa ajili ya uhamishaji wa benki;Jina la Akaunti : '3G Direct Pay Limited';Jina la Benki : Diamond Trust Bank;Tawi : Tom Mboya;Anwani ya Benki : 'MondLane/Tom Mboya, Nairobi, Kenya';Namba ya Akaunti : 0002725004;SWIFT CODE : DTKEKENA ; Tafadhali ongeza maandishi yafuatayo katika mapatano (eneo la maelezo zaidi) 654597 ;</bankInstructionsSW>
            </instructions>
        </option>
        <option>
            <bankName>AIB Ireland</bankName>
            <bankCode>AIB</bankCode>
            <instructions>
                <bankInstructionsEN>Please use the below details for your bank transfer;Account Name : '3G Direct Pay Limited';Bank Name : Allied Irish Bank;Bank Address : 140 Lower Drumcondra Road, Drumcondra, Dublin 9;Account Number : 18597896;Sort Code : 93-21-08;SWIFT CODE : AIBKIE2D;IBAN : IE03AIBK93006718597896;SWIFT CODE : AIBKIE2D ; Please add the following text within your transaction (additional information field): 654597 ;</bankInstructionsEN>
                <bankInstructionsIT>Usa i dettagli sottostanti per il tuo trasferimento bancario;Nome del Conto : '3G Direct Pay Limited' ;Nome della Banca : Allied Irish Bank ;Indirizzo della Banca : 140 Lower Drumcondra Road, Drumcondra, Dublino 9 ;Numero del Conto : 18597896 ;Codice Filiale : 93-21-08 ;CODICE SWIFT : AIBKIE2D ;IBAN : IE03AIBK93006718597896 ;CODICE SWIFT : AIBKIE2D ; Aggiungi il seguente testo nella tua transazione (campo ulteriori informazioni) 654597 ;</bankInstructionsIT>
                <bankInstructionsFR>Veuillez utiliser les d and eacutetails ci-dessous pour votre virement bancaire;Nom du compte : '3G Direct Pay Limited' ;Nom de la banque : Allied Irish Bank ;Adresse de la banque : 140 Lower Drumcondra Road, Drumcondra, Dublin 9 ;Num and eacutero de compter : 18597896 ;Code guichet : 93-21-08 ;CODE SWIFT : AIBKIE2D ;IBAN : IE03AIBK93006718597896 ;CODE SWIFT : AIBKIE2D ; Veuillez ajouter le texte suivant dans votre transaction (champ des informations supplémentaires) 654597 ;</bankInstructionsFR>
                <bankInstructionsSW>Tafadhali tumia maelezo yaliyo chini kwa ajili ya uhamishaji wa benki;Jina la Akaunti : '3G Direct Pay Limited' ;Jina la Benki : Allied Irish Bank ;Anwani ya Benki : 140 Lower Drumcondra Road, Drumcondra, Dublin 9 ;Namba ya Akaunti : 18597896 ;Sort Code : 93-21-08 ;SWIFT CODE : AIBKIE2D ;IBAN : IE03AIBK93006718597896 ;SWIFT CODE : AIBKIE2D ; Tafadhali ongeza maandishi yafuatayo katika mapatano (eneo la maelezo zaidi) 654597 ;</bankInstructionsSW>
            </instructions>
        </option>
        <option>
            <bankName>Bank of Ireland</bankName>
            <bankCode>BOI</bankCode>
            <instructions>
                <bankInstructionsEN>Please use the below details for your bank transfer;Account Name : ÐG Direct Pay Limited' ;Bank Name : Bank of Ireland ;Bank Address : 'Lower Baggot St 2 Co. Dublin, City of Dublin' ;SWIFT CODE : BOFIIE2D ;IBAN : IE23BOFI90139474308003 ; Please add the following text within your transaction (additional information field): 654597 ;</bankInstructionsEN>
                <bankInstructionsIT>Usa i dettagli sottostanti per il tuo trasferimento bancario;Nome del Conto : ÐG Direct Pay Limited' ;Nome della Banca : Bank of Ireland ;Indirizzo della Banca : 'Lower Baggot St 2 Co. Dublin, City of Dublin' ;CODICE SWIFT : BOFIIE2D ;IBAN : IE23BOFI90139474308003 ; Aggiungi il seguente testo nella tua transazione (campo ulteriori informazioni) 654597 ;</bankInstructionsIT>
                <bankInstructionsFR>Veuillez utiliser les d and eacutetails ci-dessous pour votre virement bancaire;Nom du compte : ÐG Direct Pay Limited' ;Nom de la banque : Bank of Ireland ;Adresse de la banque : 'Lower Baggot St 2 Co. Dublin, City of Dublin' ;CODE SWIFT : BOFIIE2D ;IBAN : IE23BOFI90139474308003 ; Veuillez ajouter le texte suivant dans votre transaction (champ des informations supplémentaires) 654597 ;</bankInstructionsFR>
                <bankInstructionsSW>Tafadhali tumia maelezo yaliyo chini kwa ajili ya uhamishaji wa benki;Jina la Akaunti : ÐG Direct Pay Limited' ;Jina la Benki : Bank of Ireland ;Anwani ya Benki : 'Lower Baggot St 2 Co. Dublin, City of Dublin' ;SWIFT CODE : BOFIIE2D ;IBAN : IE23BOFI90139474308003 ; Tafadhali ongeza maandishi yafuatayo katika mapatano (eneo la maelezo zaidi) 654597 ;</bankInstructionsSW>
            </instructions>
        </option>
    </bankOptions>
</API3G>
`
const result = convert.xml2js(xmlResponse, { compact: true, alwaysChildren: true });
const jsonResponse = {
    Result: result['API3G']["Result"]["_text"],
    ResultExplanation: result['API3G']["ResultExplanation"]["_text"],
    bankOptions: result["API3G"]['bankOptions']['option'].map((option) => {
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
console.log(jsonResponse.bankOptions[0].instructions.bankInstructionsEN)





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

