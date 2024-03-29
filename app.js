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
        showLanguageTable: false 
    }),
    methods: {
        async fetchCountriesByLanguage(event) {
            const selectedLanguage = event.target.value;
            if (!selectedLanguage) return; // Exit if no language is selected
            
            try {
                let response = await fetch(`https://restcountries.com/v3.1/lang/${selectedLanguage}`);
                let json = await response.json();
                
                // Extract country names
                this.countries = json.map(country => ({
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
            this.showCapitalTable = false; // Hide the capital table
            this.showIndependentTable = false; // Hide the independent table
            this.showTable = false; // Back to main page, hide everything
            this.showLanguageTable = false;
        }
    }
};

let app = Vue.createApp(options);
app.mount("#app");
