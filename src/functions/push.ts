import convert from "xml-js";


type TransactionResponse = {
  Result: string;
  ResultExplanation: string;
  TransactionToken: string;
  TransactionRef: string;
  CustomerName: string;
  CustomerCredit: string;
  TransactionApproval: string;
  TransactionCurrency: string;
  TransactionAmount: string;
  FraudAlert: string;
  FraudExplnation: string;
  TransactionNetAmount: string;
  TransactionSettlementDate: string;
  TransactionRollingReserveAmount: string;
  TransactionRollingReserveDate: string;
  CustomerPhone: string;
  CustomerCountry: string;
  CustomerAddress: string;
  CustomerCity: string;
  CustomerZip: string;
  MobilePaymentRequest: string;
  AccRef: string;

}

const xml = `
    <?xml version=\"1.0\" encoding=\"utf-8\"?>
<API3G>
  <Result>000</Result>
  <ResultExplanation>Transaction paid</ResultExplanation>
  <TransactionToken>68B90B5E-25F6-4146-8AB1-G5B3A0C41N9E</TransactionToken>
  <TransactionRef>A123BEWDSD</TransactionRef>
  <CustomerName>John Doe</CustomerName>
  <CustomerCredit>4432</CustomerCredit>
  <TransactionApproval>938204312</TransactionApproval>
  <TransactionCurrency>USD</TransactionCurrency>
  <TransactionAmount>950.00</TransactionAmount>
  <FraudAlert>000</FraudAlert>
  <FraudExplnation>No Fraud detected</FraudExplnation>
  <TransactionNetAmount>945</TransactionNetAmount>
  <TransactionSettlementDate>2013/12/31</TransactionSettlementDate>
  <TransactionRollingReserveAmount>5</TransactionRollingReserveAmount>
  <TransactionRollingReserveDate>2014/12/31</TransactionRollingReserveDate>
  <CustomerPhone>254123456789</CustomerPhone>
  <CustomerCountry>KE</CustomerCountry>
  <CustomerAddress>Stranfe blvd.</CustomerAddress>
  <CustomerCity>Nairobi</CustomerCity>
  <CustomerZip>AH1</CustomerZip>
  <MobilePaymentRequest>Sent</MobilePaymentRequest>
  <AccRef>ABC123REF</AccRef>
</API3G>
`;




var xmlResponse = convert.xml2js(xml, { compact: true, alwaysChildren: true });

const data: TransactionResponse = {
  Result: xmlResponse["API3G"]["Result"]["_text"],
  ResultExplanation: xmlResponse["API3G"]["ResultExplanation"]["_text"],
  TransactionToken: xmlResponse["API3G"]["TransactionToken"]["_text"],
  TransactionRef: xmlResponse["API3G"]["TransactionRef"]["_text"],
  CustomerName: xmlResponse["API3G"]["CustomerName"]["_text"],
  CustomerCredit: xmlResponse["API3G"]["CustomerCredit"]["_text"],
  TransactionApproval: xmlResponse["API3G"]["TransactionApproval"]["_text"],
  TransactionCurrency: xmlResponse["API3G"]["TransactionCurrency"]["_text"],
  TransactionAmount: xmlResponse["API3G"]["TransactionAmount"]["_text"],
  FraudAlert: xmlResponse["API3G"]["FraudAlert"]["_text"],
  FraudExplnation: xmlResponse["API3G"]["FraudExplnation"]["_text"],
  TransactionNetAmount: xmlResponse["API3G"]["TransactionNetAmount"]["_text"],
  TransactionSettlementDate: xmlResponse["API3G"]["TransactionSettlementDate"]["_text"],
  TransactionRollingReserveAmount: xmlResponse["API3G"]["TransactionRollingReserveAmount"]["_text"],
  TransactionRollingReserveDate: xmlResponse["API3G"]["TransactionRollingReserveDate"]["_text"],
  CustomerPhone: xmlResponse["API3G"]["CustomerPhone"]["_text"],
  CustomerCountry: xmlResponse["API3G"]["CustomerCountry"]["_text"],
  CustomerAddress: xmlResponse["API3G"]["CustomerAddress"]["_text"],
  CustomerCity: xmlResponse["API3G"]["CustomerCity"]["_text"],
  CustomerZip: xmlResponse["API3G"]["CustomerZip"]["_text"],
  MobilePaymentRequest: xmlResponse["API3G"]["MobilePaymentRequest"]["_text"],
  AccRef: xmlResponse["API3G"]["AccRef"]["_text"],
}
console.log(xmlResponse);
console.log(data.Result);  
