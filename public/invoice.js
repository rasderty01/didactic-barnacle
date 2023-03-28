// Set the API endpoint URL
const apiUrl = "https://invoice-generator.com";

// Define the invoice data to send to the API
const invoiceData = {
  clientName: "John Doe",
  clientEmail: "john.doe@example.com",
  senderName: "Acme Inc.",
  senderAddress: "123 Main St., Anytown USA",
  invoiceNumber: "INV-001",
  invoiceDate: "2022-03-30",
  items: [
    {
      name: "Item 1",
      quantity: 1,
      price: 100,
    },
    {
      name: "Item 2",
      quantity: 2,
      price: 50,
    },
  ],
};

// Make a POST request to the API to generate the invoice
fetch(apiUrl + "/invoice", {
  method: "POST",
  body: JSON.stringify(invoiceData),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Log the URL of the generated invoice PDF
    console.log("Invoice URL:", data.pdfUrl);
  })
  .catch((error) => {
    // Log any errors that occur
    console.error("Error:", error);
  });
