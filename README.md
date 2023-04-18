# dpoWrapper
dpoWrapper is a tiny wrapper that sits on top of the [DPO Payments](https://directpayonline.atlassian.net/wiki/spaces/API/pages/3234988093/DPO+3G+Full+API+Endpoint+list)
API. It is designed to make it easier to use the API in a node.js environment and integrating the API on your website. 

dpoWrapper handles parsing of the xmlResponses, handles error formatting and allows you to call the api in type-safe way.

## How to Get Started.
1. You will have to contact DPO Payment sales for company onboarding and getting the API Credentials.
2. To receive payments, you need to create a token on each payment request. This token is used to identify the payment request and is used to verify the payment request on the callback URL.
3. Setting up a webhook that DPO will hit upon succesful payments.
4. Most of the endpoints requires you to call them on a server as calling them on a browser will result to a CORS error. You can use a serverless function to call the endpoints.

## Basic Transaction Operations 
These include basic transactions operations that are required to get started with DPO Payments.

1. emailToToken
The emailToToken request will be used send/resend email request to the customer.
parameters:
- `companyToken` - String [Mandatory]
- `transactionToken` - string  [Mandatory]


```javascript
import { emailToToken } from 'dpoWrapper'
const res = await emailToToken(
    "68B90B5E-25F6-4146-8AB1-C7A3A0C41A7F",
    "9D3D99F7-3FEE-4792-961A-6EFFB5B642BA",
    
)
// res = {
//     Result: 000,
//     resultExplanation: "Success",
//  }
```

2. mVisa QR code
The createMvisaQRcode request will return mVISA QR code string

parameters:
- `companyToken` - String [Mandatory]
- `transactionToken` - string  [Mandatory]
- `staticQR` - optional  [optional]

```javascript
import { createMvisaQRcode } from 'dpoWrapper'
const res = await createMvisaQRcode(
    "68B90B5E-25F6-4146-8AB1-C7A3A0C41A7F",
    "9D3D99F7-3FEE-4792-961A-6EFFB5B642BA",
    23
)
// res = {
//     Result: 000,
//     resultExplanation: "007834004328790355736269932231701153034045413981.0000000005802KE5925Direct Pay Online Test Ac6007Nairobi62060502186304212|4039 8410 0000 0061|Direct Pay Online Test Ac",
//  }
```
3. refundToken
The refundToken request will create refund for the transaction currency.

parameters: 
- `companyToken`: string, [Mandatory]
-    `transactionToken`: string, [Mandatory]
-    `amount`: number, [Mandatory]
-    `refundDetails`: string, [Mandatory]
-    `refundRef?`: string, [optional]
-    `refundApproval?`: number [optional]

```javascript
const response = await refundToken(
    "0B6758B3-BB98-438A-A666-7BF2F9CA6B31",
    "50671986-5CAE-4C18-955E-C60BB2CAC20F",
    1,
    "test");
// response = {
//     Result: 000,
//     resultExplanation: "refund Succesful",
//}
```

4. updateToken
The updateToken request will be used to modify existing transaction data.

parameters:
 - `companyToken`: string,
 - `transactionToken`: string,
 - `amount?`: number,
 - `ref?`: string,
 - `customerEmail?`: string,
 - `customerFirstName?`: string,
 - `customerLastName?`: string,
 - `customerAddress?`: string,
 - `customerCity?`: string,
 - `customerCountry?`: string,
 - `customerDialCode?`: string,
 - `customerPhone?`: string,
 - `customerZip?`: string,
 - `companyAccRef?`: string,
 - `userToken?`: string,

```javascript
const response = await updateToken(
    "0B6758B3-BB98-438A-A666-7BF2F9CA6B31",
    "50671986-5CAE-4C18-955E-C60BB2CAC20F",
    1,
    "test");
```
5. verifyToken
The verifyToken request can be initiated at any time, and it is mandatory to verify the token when the customer will return to the application, not verifying the token within 30 minutes of transaction completed of payment, will generate an alert e-mail to the provider announcing that there was no verification process.

parameters:
- `companyToken`: string,
- `transactionToken`: string,
- `companyRef?`: string,
- `verifyTransaction?`: number,
- `AccRef?`: string,
- `customerPhone?`: string,
- `customerPhonePrefix?`: string,
- `customerEmail?`: string,

```javascript
const response = await verifyToken(
    "0B6758B3-BB98-438A-A666-7BF2F9CA6B31",
    "C5F4B74A-9727-4BDC-BB5C-B8253C39A81B",
)
// response returned is of this type
type TransactionResponse = {
    Result: string,
    ResultExplanation: string,
    customerName: string,
    customerCredit: string,
    customerCreditType: string,
    transactionApproval: string,
    transactionCurrency: string,
    transactionAmount: string,
    fraudAlert: string,
    fraudExplnation: string,
    transactionNetAmount: string,
    transactionSettlementDate: string,
    transactionRollingReserveAmount: string,
    transactionRollingReserveExpirationDate: string,
    transactionRollingReserveDate: string,
    customerPhone: string,
    customerCountry: string,
    customerAddress: string,
    customerCity: string,
    customerZip: string,
    mobilePaymentRequest: string,
    accRef: string,
}
```
6. verifyXpay
Request for xPay information

parameters:
- `companyToken`: string,
- `xpayID`: number

7. cancelToken
The cancelToken request will be used to cancel active transactions.

paramaters: 
- `companyToken`: string, 
- `transactionToken`: string