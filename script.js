document.addEventListener("DOMContentLoaded", function(){
    const form = document.getElementById("formboxcont");
    const cardHolderName = document.getElementById("cname");
    const cardnumberInput = document.getElementById("cnumber");
    const expiryMonth = document.querySelector(".month");
    const expiryYear = document.querySelector(".year");
    const cvcNumber = document.getElementById("cvc");

    cardnumberInput.addEventListener("input", function(event) {
        const input = event.target.value.replace(/\s/g, ''); // Remove existing spaces
        const formattedInput = input.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits
        event.target.value = formattedInput;
    });
    

    form.addEventListener("submit", function(event){
        event.preventDefault();

        const errorMessages = document.querySelectorAll(".error");
        errorMessages.forEach(error => error.textContent = ""); //clear any existing error messages

        let hasErrors = false;

        if (cardHolderName.value.trim() === "" || !/^[a-zA-Z\s]+$/.test(cardHolderName.value)) {
            displayErrorMessage(cardHolderName, "Enter a valid card holder name!");
            hasErrors = true;
        }
        
        if(cardnumberInput.value.trim() === ""){
            displayErrorMessage(cardnumberInput, "Field cannot be empty!");
            hasErrors = true;
        }else if (!/^\d{4}(?: \d{4}){3}$/.test(cardnumberInput.value)){
            displayErrorMessage(cardnumberInput, "Invalid input!");
            hasErrors = true;
        }

    });

    function displayErrorMessage(inputElement, message) {
        const errorElement = inputElement.nextElementSibling; // Assuming the error element is the next sibling
        errorElement.textContent = message;
    }

});




































// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("formboxcont");
//     const cardHolder = document.getElementById("cname");
//     const cnumberInput = document.getElementById("cnumber");

//     cnumberInput.addEventListener("input", function(event) {
//         const input = event.target.value.replace(/\s/g, ''); // Remove existing spaces
//         const formattedInput = input.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 '); // Restrict to 16 digits and add space after every 4 digits
//         event.target.value = formattedInput;
//     });

//     form.addEventListener("submit", function(event){
//         event.preventDefault();

//         const errorMessageElements = document.querySelectorAll(".error");
//         errorMessageElements.forEach(error => error.textContent = "");

//         let hasErrors = false;

//         if (cardHolder.value.trim() === "") {
//             displayErrorMessage(cardHolder, "Field cannot be empty!");
//             hasErrors = true;
//         } else if (!/^[a-zA-Z\s]*$/.test(cardHolder.value)) {
//             displayErrorMessage(cardHolder, "Only alphabetic characters are allowed.");
//             hasErrors = true;
//         }

//         const cardNumberValue = cnumberInput.value.replace(/\s/g, '');
//         if (cardNumberValue.length !== 16) {
//             displayErrorMessage(cnumberInput, "Invalid card number length!");
//             hasErrors = true;
//         }

//         if (!hasErrors) {
//             updateCardDetails(cardHolder.value, cardNumberValue);
//         }
//     });

//     function displayErrorMessage(inputElement, message) {
//         const errorElement = inputElement.nextElementSibling; // Assuming the error element is the next sibling
//         errorElement.textContent = message;
//     }

//     function updateCardDetails(cardHolderName, cardNumber) {
//         const cardNumberElement = document.querySelector(".cardNumber");
//         const userNameElement = document.querySelector(".userName");

//         cardNumberElement.textContent = formatCardNumber(cardNumber);
//         userNameElement.textContent = cardHolderName.toUpperCase();
//     }

//     function formatCardNumber(cardNumber) {
//         return cardNumber.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
//     }
// });
