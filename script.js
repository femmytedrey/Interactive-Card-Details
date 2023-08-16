// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function(){
    // Get references to the form and input elements
    const form = document.getElementById("formboxcont");
    const cardHolderName = document.getElementById("cname");
    const cardnumberInput = document.getElementById("cnumber");
    const expiryMonth = document.querySelector(".month");
    const expiryYear = document.querySelector(".year");
    const cvvNumber = document.getElementById("cvc");

    // Event listener for card number input to format and add spaces
    cardnumberInput.addEventListener("input", function(event) {
        const input = event.target.value.replace(/\s/g, ''); // Remove existing spaces
        const formattedInput = input.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits
        event.target.value = formattedInput;
    });

    // Event listener for expiry month input to sanitize input
    expiryMonth.addEventListener("input", function() {
        const sanitizedValue = expiryMonth.value.replace(/\D/g, "");
        expiryMonth.value = sanitizedValue;
    });

    // Event listener for expiry year input to sanitize input
    expiryYear.addEventListener("input", function() {
        const sanitizedValue = expiryYear.value.replace(/\D/g, "");
        expiryYear.value = sanitizedValue;
    });

    // Event listener for CVV input to sanitize input
    cvvNumber.addEventListener("input", function() {
        const sanitizedValue = cvvNumber.value.replace(/\D/g, "");
        cvvNumber.value = sanitizedValue;
    });

    // Select the "Continue" button element using its class name
    const continueButton = document.querySelector(".continuebutton");

    // Add an event listener to the "Continue" button
    continueButton.addEventListener("click", function() {
        // When the "Continue" button is clicked, perform the following actions:

        // Hide the "thank you" container
        const thankYouContainer = document.querySelector(".thankyou");
        thankYouContainer.style.display = "none";

        // Display the form container
        const formContainer = document.querySelector(".formbox");
        formContainer.style.display = "block"; // Change to "flex" if that's the display value in your CSS
    });


    // Event listener for form submission
    form.addEventListener("submit", function(event){
        event.preventDefault();

        // Clear any existing error messages
        const errorMessages = document.querySelectorAll(".error");
        errorMessages.forEach(error => error.textContent = "");

        let hasErrors = false;

        // Validate card holder name
        if (cardHolderName.value.trim() === "" || !/^[a-zA-Z\s]+$/.test(cardHolderName.value)) {
            displayErrorMessage(cardHolderName, "Enter a valid card holder name!");
            hasErrors = true;
        }
        
        // Validate card number
        if(cardnumberInput.value.trim() === ""){
            displayErrorMessage(cardnumberInput, "Field cannot be empty!");
            hasErrors = true;
        }else if (!/^\d{4}(?: \d{4}){3}$/.test(cardnumberInput.value)){
            displayErrorMessage(cardnumberInput, "Invalid");
            hasErrors = true;
        }

        // Validate expiry month
        if(expiryMonth.value.trim() === "" || expiryMonth.value > 12 || expiryMonth.value < 1){
            displayErrorMessage(expiryMonth, "Invalid");
            hasErrors = true;
        }

        // Validate expiry year
        if(expiryYear.value.trim() === "" || expiryYear.value > 30){
            displayErrorMessage(expiryYear, "Invalid");
            hasErrors = true;
        } else if (!/^[0-9\s]+$/.test(expiryYear.value)){
            displayErrorMessage(expiryYear, "Invalid");
            hasErrors = true;
        }

        // Validate CVV
        if(cvvNumber.value.trim() === "" || cvvNumber.value.length < 3 || cvvNumber.value < 1){
            displayErrorMessage(cvvNumber, "Invalid");
            hasErrors = true;
        }

        // If there are no errors, update card details
        if (!hasErrors) {
            // Update card details and card holder name
            document.querySelector(".userName").textContent = cardHolderName.value.toUpperCase();
            document.querySelector(".cardNumber").textContent = cardnumberInput.value;
            document.querySelector(".cardMonth").textContent = expiryMonth.value;
            document.querySelector(".cardYear").textContent = expiryYear.value;
            document.querySelector(".cvvSample").textContent = cvvNumber.value;

            // Clear input fields
            cardHolderName.value = "";
            cardnumberInput.value = "";
            expiryMonth.value = "";
            expiryYear.value = "";
            cvvNumber.value = "";

            const thankYouContainer = document.querySelector(".thankyou");
            thankYouContainer.style.display = "block"; // Change to "flex" if that's the display value in your CSS

            // Hide the form container
            const formContainer = document.querySelector(".formbox");
            formContainer.style.display = "none";

            

        }
    });

    // Function to display error message
    function displayErrorMessage(inputElement, message) {
        const errorElement = inputElement.nextElementSibling; // Assuming the error element is the next sibling
        errorElement.textContent = message;
    }
});
