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
                
                // Fetch all countries with flags
                let response = await fetch("https://restcountries.com/v3.1/all?fields=flags");
                let json = await response.json();
        
                // Log the entire API response
                console.log("API Response:", json);
                
                // Normalize the entered country name
                const normalizedCountryName = this.countryName.trim().toLowerCase();
        
                // Find the flag data for the specified country
                const countryFlagData = json.find(country => country.name && country.name.common.toLowerCase() === normalizedCountryName);
                
                // Check if country flag data is found
                if (!countryFlagData) {
                    console.error(`Flag data not found for ${this.countryName}`);
                    return;
                }
                
                // Log the flag data for the specified country
                console.log("Flag data for", this.countryName + ":", countryFlagData.flags);
                
                // Set the flag data to be displayed in the user interface
                this.countryFlag = countryFlagData.flags;
            } catch (error) {
                console.error("Error fetching flag data:", error);
            }
        } ,
        
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

let app = Vue.createApp(options);
app.mount("#app");
