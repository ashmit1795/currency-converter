const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns = document.querySelectorAll(".dropdown select") // * First of all select elements(including to & from) are chosen using query selector
let btn = document.querySelector("form button"); //* Button is selected
let fromCurrCode = document.querySelector(".from select");
let toCurrCode = document.querySelector(".to select");
let msg = document.querySelector(".msg");

// ? Retrieving the select items from the dropdowns' nodeList:
for (let select of dropdowns) {
  // ? For each select items we're retrieving currency code from countryList and creating a option element with the each currency code and finally appending it to the select element.
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    // Here we're setting the default value to be shown
    if (currCode === "USD" && select.name === "from"){
      newOption.selected = 'selected'
    }else if(currCode === "INR" && select.name === "to"){
      newOption.selected = 'selected'
    }
    select.append(newOption);
  }

  //* Whenever there's a change in the each of the select element we've created a event listener, to change the flag img.
  select.addEventListener("change", (evt)=>{
    updateFlag(evt.target); //Here, the evt.target gives the select's option where change has ocurred
  });
}

//? This is a function to update the flag img whenever there's a change in select element
let updateFlag = (element)=>{
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let flag = element.parentElement.querySelector("img");
  flag.setAttribute("src", newSrc)
}


let updateExchangeRate = async ()=>{
  let amount =  document.querySelector(".amount input"); // Amount element is accessed
  let amtVal = amount.value // The value of the amount entered by the user is accessed
  console.log(amtVal);
  if (amtVal === "" || amtVal<1){
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurrCode.value.toLowerCase()}/${toCurrCode.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json(); //Parsing the JSON response
  let rate = data[toCurrCode.value.toLowerCase()];
  // console.log(rate);
  msg.innerText = `${amtVal} ${fromCurrCode.value} = ${amtVal*rate} ${toCurrCode.value}`
}

// Whenever the button is clicked it triggers the updateExchangeRate function
btn.addEventListener("click", (evt)=>{
  evt.preventDefault();
  updateExchangeRate();
})

window.addEventListener("load", ()=>{
  updateExchangeRate();
})
