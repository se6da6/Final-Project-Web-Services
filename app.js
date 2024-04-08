let options = {
    data: () => ({
        title: "Country Info",
        capitalData: [],
        independentData: [],
        languages: ["English", "Spanish", "French", "German", "Italian", "Chinese", "Japanese", "Arabic", "Russian", "Portuguese", "Hindi", "Bengali", "Urdu", "Dutch", "Swahili", "Turkish"],
        filteredCountries: [],
        showTable: false,
        showCapitalTable: false,
        showIndependentTable: false,
        showLanguageTable: false,
        selectedLanguage: '', 
        region:'',
        countriesInRegion: [], // Hold countries in the entered region
        showRegionTable: false, // Show the region table
        countryName: '', // Input field value for country name
        showFlag: false, // Flag display status
        flagUrl: '' // URL of the flag image
    }),
    methods: {
        async fetchCountryFlag() {
            try {
                // Check if countryName is provided
                if (!this.countryName) {
                    console.error("Country name is required.");
                    return;
                }
                
                // Look up the ISO2 country code for the provided country name
                const iso2CountryCode = countryNameToISO2[this.countryName];
                if (!iso2CountryCode) {
                    console.error(`ISO2 country code not found for ${this.countryName}`);
                    return;
                }
                
                // Make a POST request to fetch the flag using the ISO2 country code
                let response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        iso2: iso2CountryCode
                    })
                });
        
                // Check if the response is successful
                if (!response.ok) {
                    console.error(`Failed to fetch flag data for ${this.countryName}: ${response.status}`);
                    return;
                }
        
                let flagData = await response.json();
        
                // Check if the flag data is found
                if (!flagData.data || !flagData.data.flag) {
                    console.error(`Flag data not found for ${this.countryName}`);
                    return;
                }
                
                // Log the flag data for the specified country
                console.log("Flag data for", this.countryName + ":", flagData.data.flag);
                
                // Set the flag data to be displayed in the user interface
                this.flagUrl = flagData.data.flag;
                this.showFlag = true; // Show the flag
                
                // Show flag URL in the browser
                alert("Flag URL: " + this.flagUrl);
            } catch (error) {
                console.error("Error fetching flag data:", error);
            }
        },
        
        async fetchCountriesByRegion() {
            if (!this.region) return; // Exit if no region is entered
            
            try {
                let response = await fetch(`https://restcountries.com/v3.1/region/${this.region}`);
                let json = await response.json();
                
                // Extract country names
                this.countriesInRegion = json.map(country => country.name.common);
        
                // Show the table
                this.showTable = true;
                this.showRegionTable = true; // Show the region table
            } catch (error) {
                console.error(error);
            }
        },
        
        async fetchCountriesByLanguage(event) {
            const selectedLanguage = event.target.value;
            if (!selectedLanguage) return; // Exit if no language is selected
            
            try {
                this.selectedLanguage = selectedLanguage; // Set the selected language
                let response = await fetch(`https://restcountries.com/v3.1/lang/${selectedLanguage}`);
                let json = await response.json();
                
                // Extract country names
                this.filteredCountries = json.map(country => ({
                    name: country.name.common
                }));

                // Show the table
                this.showTable = true;
                this.showLanguageTable = true;
            } catch (error) {
                console.error(error);
            }
        },
        
        async fetchCapitalData() {
            try {
                let response = await fetch("https://restcountries.com/v3.1/all");
                let json = await response.json();
                
                // Extract country name and capital and store them as objects
                this.capitalData = json.map(country => ({
                    country: country.name.common,
                    capital: country.capital && country.capital[0] ? country.capital[0] : 'N/A'
                }));
        
                this.showTable = true;
                this.showCapitalTable = true;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchIndependentData() {
            try {
                let response = await fetch("https://restcountries.com/v3.1/independent?status=true&fields=name,independent");
                let json = await response.json();
                this.independentData = json;
                this.showTable = true;
                this.showIndependentTable = true;
            } catch (error) {
                console.error(error);
            }
        },
        backToMainPage() {
            this.selectedLanguage = ''; // Reset the selected language
            this.showCapitalTable = false; // Hide the capital table
            this.showIndependentTable = false; // Hide the independent table
            this.showTable = false; // Back to main page, hide everything
            this.showLanguageTable = false;
            this.showRegionTable = false; // Hide the region table
        }
    }
};
const countryNameToISO2 = {
    "Afghanistan": "AF",
    "Albania": "AL",
    "Bangladesh": "BD",
    "Belgium": "BE",
    "Burkina Faso": "BF",
    "Bulgaria": "BG",
    "Bosnia and Herzegovina": "BA",
    "Barbados": "BB",
    "Wallis and Futuna": "WF",
    "Saint Barthelemy": "BL",
    "Bermuda": "BM",
    "Brunei": "BN",
    "Bolivia": "BO",
    "Bahrain": "BH",
    "Burundi": "BI",
    "Benin": "BJ",
    "Bhutan": "BT",
    "Jamaica": "JM",
    "Bouvet Island": "BV",
    "Botswana": "BW",
    "Samoa": "WS",
    "Bonaire, Saint Eustatius and Saba": "BQ",
    "Brazil": "BR",
    "Bahamas": "BS",
    "Jersey": "JE",
    "Belarus": "BY",
    "Belize": "BZ",
    "Russia": "RU",
    "Rwanda": "RW",
    "Serbia": "RS",
    "East Timor": "TL",
    "Reunion": "RE",
    "Turkmenistan": "TM",
    "Tajikistan": "TJ",
    "Romania": "RO",
    "Tokelau": "TK",
    "Guinea-Bissau": "GW",
    "Guam": "GU",
    "Guatemala": "GT",
    "South Georgia and the South Sandwich Islands": "GS",
    "Greece": "GR",
    "Equatorial Guinea": "GQ",
    "Guadeloupe": "GP",
    "Japan": "JP",
    "Guyana": "GY",
    "Guernsey": "GG",
    "Georgia": "GE",
    "Grenada": "GD",
    "United Kingdom": "GB",
    "Gabon": "GA",
    "El Salvador": "SV",
    "Guinea": "GN",
    "Gambia": "GM",
    "Greenland": "GL",
    "Gibraltar": "GI",
    "Ghana": "GH",
    "Oman": "OM",
    "Tunisia": "TN",
    "Jordan": "JO",
    "Croatia": "HR",
    "Haiti": "HT",
    "Hungary": "HU",
    "Hong Kong": "HK",
    "Honduras": "HN",
    "Heard Island and McDonald Islands": "HM",
    "Venezuela": "VE",
    "Vatican": "VA",
    "Puerto Rico": "PR",
    "Palestinian Territory": "PS",
    "Palau": "PW",
    "Portugal": "PT",
    "Svalbard and Jan Mayen": "SJ",
    "Paraguay": "PY",
    "Iraq": "IQ",
    "Panama": "PA",
    "French Polynesia": "PF",
    "Papua New Guinea": "PG",
    "Peru": "PE",
    "Pakistan": "PK",
    "Philippines": "PH",
    "Pitcairn": "PN",
    "Poland": "PL",
    "Saint Pierre and Miquelon": "PM",
    "Zambia": "ZM",
    "Western Sahara": "EH",
    "Estonia": "EE",
    "Egypt": "EG",
    "Cocos Islands": "CC",
    "South Africa": "ZA",
    "Ecuador": "EC",
    "Italy": "IT",
    "Vietnam": "VN",
    "Solomon Islands": "SB",
    "Ethiopia": "ET",
    "Somalia": "SO",
    "Zimbabwe": "ZW",
    "Saudi Arabia": "SA",
    "Spain": "ES",
    "Eritrea": "ER",
    "Montenegro": "ME",
    "Moldova": "MD",
    "Madagascar": "MG",
    "Saint Martin": "MF",
    "Morocco": "MA",
    "Monaco": "MC",
    "Uzbekistan": "UZ",
    "Myanmar": "MM",
    "Mali": "ML",
    "Macao": "MO",
    "Mongolia": "MN",
    "Marshall Islands": "MH",
    "Macedonia": "MK",
    "Mauritius": "MU",
    "Malta": "MT",
    "Malawi": "MW",
    "Maldives": "MV",
    "Martinique": "MQ",
    "Northern Mariana Islands": "MP",
    "Montserrat": "MS",
    "Mauritania": "MR",
    "Isle of Man": "IM",
    "Uganda": "UG",
    "Tanzania": "TZ",
    "Malaysia": "MY",
    "Mexico": "MX",
    "Israel": "IL",
    "France": "FR",
    "British Indian Ocean Territory": "IO",
    "Saint Helena": "SH",
    "Finland": "FI",
    "Fiji": "FJ",
    "Falkland Islands": "FK",
    "Micronesia": "FM",
    "Faroe Islands": "FO",
    "Nicaragua": "NI",
    "Netherlands": "NL",
    "Norway": "NO",
    "Namibia": "NA",
    "Vanuatu": "VU",
    "New Caledonia": "NC",
    "Niger": "NE",
    "Norfolk Island": "NF",
    "Nigeria": "NG",
    "New Zealand": "NZ",
    "Nepal": "NP",
    "Nauru": "NR",
    "Niue": "NU",
    "Cook Islands": "CK",
    "Kosovo": "XK",
    "Ivory Coast": "CI",
    "Switzerland": "CH",
    "Colombia": "CO",
    "China": "CN",
    "Cameroon": "CM",
    "Chile": "CL",
    "Cocos Islands": "CC",
    "Canada": "CA",
    "Congo": "CG",
    "Central African Republic": "CF",
    "Democratic Republic of the Congo": "CD",
    "Czech Republic": "CZ",
    "Cyprus": "CY",
    "Christmas Island": "CX",
    "Costa Rica": "CR",
    "Curacao": "CW",
    "Cape Verde": "CV",
    "Cuba": "CU",
    "Swaziland": "SZ",
    "Syria": "SY",
    "Sint Maarten": "SX",
    "Kyrgyzstan": "KG",
    "Kenya": "KE",
    "South Sudan": "SS",
    "Suriname": "SR",
    "Kiribati": "KI",
    "Cambodia": "KH",
    "Saint Kitts and Nevis": "KN",
    "Comoros": "KM",
    "Sao Tome and Principe": "ST",
    "Slovakia": "SK",
    "South Korea": "KR",
    "Slovenia": "SI",
    "North Korea": "KP",
    "Kuwait": "KW",
    "Senegal": "SN",
    "San Marino": "SM",
    "Sierra Leone": "SL",
    "Seychelles": "SC",
    "Kazakhstan": "KZ",
    "Cayman Islands": "KY",
    "Singapore": "SG",
    "Sweden": "SE",
    "Sudan": "SD",
    "Dominican Republic": "DO",
    "Dominica": "DM",
    "Djibouti": "DJ",
    "Denmark": "DK",
    "British Virgin Islands": "VG",
    "Germany": "DE",
    "Yemen": "YE",
    "Algeria": "DZ",
    "United States": "US",
    "Uruguay": "UY",
    "Mayotte": "YT",
    "United States Minor Outlying Islands": "UM",
    "Lebanon": "LB",
    "Saint Lucia": "LC",
    "Laos": "LA",
    "Tuvalu": "TV",
    "Taiwan": "TW",
    "Trinidad and Tobago": "TT",
    "Turkey": "TR",
    "Sri Lanka": "LK",
    "Liechtenstein": "LI",
    "Latvia": "LV",
    "Tonga": "TO",
    "Lithuania": "LT",
    "Luxembourg": "LU",
    "Liberia": "LR",
    "Lesotho": "LS",
    "Thailand": "TH",
    "French Southern Territories": "TF",
    "Togo": "TG",
    "Chad": "TD",
    "Turks and Caicos Islands": "TC",
    "Libya": "LY",
    "Vatican": "VA",
    "Saint Vincent and the Grenadines": "VC",
    "United Arab Emirates": "AE",
    "Andorra": "AD",
    "Antigua and Barbuda": "AG",
    "Afghanistan": "AF",
    "Anguilla": "AI",
    "U.S. Virgin Islands": "VI",
    "Iceland": "IS",
    "Iran": "IR",
    "Armenia": "AM",
    "Albania": "AL",
    "Angola": "AO",
    "Antarctica": "AQ",
    "American Samoa": "AS",
    "Argentina": "AR",
    "Australia": "AU",
    "Austria": "AT",
    "Aruba": "AW",
    "India": "IN",
    "Aland Islands": "AX",
    "Azerbaijan": "AZ",
    "Ireland": "IE",
    "Indonesia": "ID",
    "Ukraine": "UA",
    "Qatar": "QA",
    "Mozambique": "MZ",

    // Add more mappings for other countries
};
let app = Vue.createApp(options);
app.mount("#app");
