const url =
  "https://script.google.com/macros/s/AKfycbziCF9K03FS4b7FnlDGgmRY816iVTKYMFHSmgClcHwL1IB0GuOh8heOkhRsQsn-cRggtQ/exec";

document.addEventListener("DOMContentLoaded", function () {
  var form1 = document.getElementById("VV"); //visitvisa
  var form2 = document.getElementById("FV"); //fiancevisa
  var form3 = document.getElementById("SV"); //spousevisa
  var form4 = document.getElementById("MV"); //marriedvisa
  var form5 = document.getElementById("UMVV"); //unmarriedvisa

  // Bind validation function to the form submit event
  form1.addEventListener("submit", function (event) {
    if (!form1.checkValidity()) {
      event.preventDefault(); // Prevent form submission if not valid
    } else {
      validateForm1(event); // Call validateForm1 if the form is valid
    }
  });

  form2.addEventListener("submit", function (event) {
    if (!form2.checkValidity()) {
      event.preventDefault(); // Prevent form submission if not valid
    } else {
      validateForm2(event); // Call validateForm2 if the form is valid
    }
  });

  form3.addEventListener("submit", function (event) {
    if (!form3.checkValidity()) {
      event.preventDefault(); // Prevent form submission if not valid
    } else {
      validateForm3(event); // Call validateForm3 if the form is valid
    }
  });

  form4.addEventListener("submit", function (event) {
    if (!form4.checkValidity()) {
      event.preventDefault(); // Prevent form submission if not valid
    } else {
      validateForm4(event); // Call validateForm4 if the form is valid
    }
  });

  form5.addEventListener("submit", function (event) {
    if (!form5.checkValidity()) {
      event.preventDefault(); // Prevent form submission if not valid
    } else {
      validateForm5(event); // Call validateForm5 if the form is valid
    }
  });

  //visitvisafunction
  function validateForm1(e) {
    // Prevent the default form submission
    e.preventDefault();

    // Perform validation for Form 1
    const formAlerts = document.getElementById("form_alerts");
    const metSponsor = document.querySelector(
      'input[name="metSponsor"]:checked'
    ).value;
    const applicantSourceOfIncome =
      document.querySelector("#applicant-income").value;
    const sponsorSourceOfIncome =
      document.querySelector("#sponsor-income").value;
    const lname = document.querySelector("#lname").value;
    const fname = document.querySelector("#fname").value;
    const email = document.querySelector("#email").value;
    const pnumber = document.querySelector("#pnumber").value;
    const address = document.querySelector("#address").value;
    const pcode = document.querySelector("#pcode").value;
    const relationship = document.querySelector("#relationship").value;
    const salary = document.querySelector("#salary").value;
    const eligibility =
      metSponsor === "Yes" &&
      (applicantSourceOfIncome === "Employment (more than a year)" ||
        applicantSourceOfIncome === "Business (more than a year)") &&
      (sponsorSourceOfIncome === "Employment" ||
        sponsorSourceOfIncome === "Pension" ||
        sponsorSourceOfIncome === "Business");

    console.log(
      metSponsor,
      eligibility,
      relationship,
      sponsorSourceOfIncome,
      applicantSourceOfIncome
    );

    if (eligibility) {
      const visaType = document.getElementById("choosevisatype").value;

      // Create a FormData object and append the form data
      const formData = new FormData();
      formData.append("formName", "VV"); // Change this value to the name or identifier of the form being submitted
      formData.append("visaType", visaType);
      formData.append("eligibility", eligibility ? "Eligible" : "Not Eligible");
      formData.append("lname", lname);
      formData.append("fname", fname);
      formData.append("email", email);
      formData.append("pnumber", pnumber);
      formData.append("address", address);

      const countryValue = document.querySelector("#country").value;
      const otherCountryValue = document.querySelector("#otherCountry").value;

      formData.append("country", countryValue);
      formData.append("otherCountry", otherCountryValue);

      formData.append("pcode", pcode);
      formData.append("relationship", relationship);
      formData.append("metSponsor", metSponsor);
      formData.append("applicant-income", applicantSourceOfIncome);
      formData.append("sponsor-income", sponsorSourceOfIncome);
      formData.append("salary", salary);
      // Send data to the Google Apps Script
      const options = {
        method: "post",
        body: formData,
      };
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            formAlerts.innerHTML =
              "<div class='bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded relative' role='alert'>Sent Successfully.</div>";
          } else {
            formAlerts.innerHTML =
              "<div class='alert alert-danger'>Error: " +
              response.statusText +
              "</div>";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          formAlerts.innerHTML =
            "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>Not Sent.</div>";
        });
    } else {
      formAlerts.innerHTML =
        "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'> You are not eligible for the visa application.</div>";
    }
  }

  //fiancevisafunc
  function valdiateForm2(e) {
    // Prevent the default form submission
    e.preventDefault();

    const fiance = document.getElementById("FV");

    const sponsor = fiance.elements["sponsor"].value;
    const lname = fiance.elements["lname"].value;
    const fname = fiance.elements["fname"].value;
    const email = fiance.elements["email"].value;
    const pnumber = fiance.elements["pnumber"].value;
    const address = fiance.elements["address"].value;
    const pcode = fiance.elements["pcode"].value;
    const amrital = fiance.elements["AMaritalStatus"].value;
    const smrital = fiance.elements["SMaritalStatus"].value;
    const financialrequirement = document.querySelector(
      'input[name="financialrequirement"]:checked'
    ).value;

    // Perform validation for Form 2
    const formAlerts = document.getElementById("form_alerts");
    const metSponsor = document.querySelector(
      'input[name="metSponsor"]:checked'
    ).value;
    const eligibility =
      metSponsor === "Yes" &&
      financialrequirement === "Yes" &&
      (amrital === "Single" || amrital === "Divorce/Anulled") &&
      (smrital === "Single" || smrital === "Divorce/Anulled") &&
      (sponsor === "Employment" ||
        sponsor === "Pension" ||
        sponsor === "Business");

    console.log(
      metSponsor,
      sponsor,
      lname,
      fname,
      email,
      pnumber,
      address,
      pcode,
      amrital,
      smrital
    );

    if (eligibility) {
      const visaType = document.getElementById("choosevisatype").value;

      // Create a FormData object and append the form data
      const formData = new FormData();
      formData.append("formName", "FV"); // Change this value to the name or identifier of the form being submitted
      formData.append("visaType", visaType);
      formData.append("eligibility", eligibility ? "Eligible" : "Not Eligible");
      formData.append("lname", lname);
      formData.append("fname", fname);
      formData.append("email", email);
      formData.append("pnumber", pnumber);
      formData.append("address", address);

      const countryValue = fiance.elements["country"].value;
      const otherCountryValue = fiance.elements["otherCountry"].value;

      formData.append("country", countryValue);
      formData.append("otherCountry", otherCountryValue);

      formData.append("pcode", pcode);
      formData.append("amrital", amrital);
      formData.append("smrital", smrital);
      formData.append("metSponsor", metSponsor);
      formData.append("financialrequirement", financialrequirement);
      formData.append("sponsor-income", sponsor);

      // Send data to the Google Apps Script
      const options = {
        method: "post",
        body: formData,
      };
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            formAlerts.innerHTML =
              "<div class='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' role='alert'>Sent Successfully.</div>";
          } else {
            formAlerts.innerHTML =
              "<div class='alert alert-danger'>Error: " +
              response.statusText +
              "</div>";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          formAlerts.innerHTML =
            "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>Not Sent.</div>";
        });
    } else {
      formAlerts.innerHTML =
        "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'> You are not eligible for the visa application.</div>";
    }
  }
  //spousevisafunc
  function validateForm3(e) {
    // Prevent the default form submission
    e.preventDefault();

    const spouse = document.getElementById("SV");

    const sponsor = spouse.elements["sponsor-income"].value;
    const lname = spouse.elements["lname"].value;
    const fname = spouse.elements["fname"].value;
    const email = spouse.elements["email"].value;
    const pnumber = spouse.elements["pnumber"].value;
    const address = spouse.elements["address"].value;
    const pcode = spouse.elements["pcode"].value;
    const financialrequirement = document.querySelector(
      'input[name="financialrequirement"]:checked'
    ).value;
    const pom1 = spouse.elements["pofmarriage"].value;
    const dom1 = spouse.elements["dofmarriage"].value;
    const benefits3 = spouse.elements["benefits-type"].value;
    // Perform validation for Form 3
    const formAlerts = document.getElementById("form_alerts");

    const eligibility = financialrequirement === "Yes";

    console.log(eligibility);

    if (eligibility) {
      const visaType = document.getElementById("choosevisatype").value;

      // Create a FormData object and append the form data
      const formData = new FormData();
      formData.append("formName", "SV"); // Change this value to the name or identifier of the form being submitted
      formData.append("visaType", visaType);
      formData.append("eligibility", eligibility ? "Eligible" : "Not Eligible");
      formData.append("lname", lname);
      formData.append("fname", fname);
      formData.append("email", email);
      formData.append("pnumber", pnumber);
      formData.append("address", address);

      const countryValue = spouse.elements["country"].value;
      const otherCountryValue = spouse.elements["otherCountry"].value;

      formData.append("country", countryValue);
      formData.append("otherCountry", otherCountryValue);

      formData.append("pcode", pcode);
      formData.append("financialrequirement", financialrequirement);
      formData.append("benefits", benefits3);
      formData.append("pom", pom1);
      formData.append("dom", dom1);
      formData.append("sponsor-income", sponsor);
      // Send data to the Google Apps Script
      const options = {
        method: "post",
        body: formData,
      };
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            formAlerts.innerHTML =
              "<div class='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' role='alert'>Sent Successfully.</div>";
          } else {
            formAlerts.innerHTML =
              "<div class='alert alert-danger'>Error: " +
              response.statusText +
              "</div>";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          formAlerts.innerHTML =
            "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>Not Sent.</div>";
        });
    } else {
      formAlerts.innerHTML =
        "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'> You are not eligible for the visa application.</div>";
    }
  }
  //marriedvisitvisafunc
  function valdiateForm4(e) {
    // Prevent the default form submission
    e.preventDefault();

    const married = document.getElementById("MV");

    const lname = married.elements["lname"].value;
    const fname = married.elements["fname"].value;
    const email = married.elements["email"].value;
    const pnumber = married.elements["pnumber"].value;
    const address = married.elements["address"].value;
    const pcode = married.elements["pcode"].value;
    const amrital = married.elements["AMaritalStatus"].value;
    const smrital = married.elements["SMaritalStatus"].value;
    const sties = married.elements["sties"].value;

    // Perform validation for Form 4
    const formAlerts = document.getElementById("form_alerts");
    const metSponsor = document.querySelector(
      'input[name="metSponsor"]:checked'
    ).value;
    const sponsorSourceOfIncome = married.elements["sponsor-income"].value;
    const applicantSourceOfIncome = married.elements["applicant-income"].value;

    const eligibility =
      metSponsor === "Yes" &&
      (amrital === "Single" || amrital === "Divorce/Anulled") &&
      (smrital === "Single" || smrital === "Divorce/Anulled") &&
      (sponsorSourceOfIncome === "Employment" ||
        sponsorSourceOfIncome === "Pension" ||
        sponsorSourceOfIncome === "Business") &&
      (applicantSourceOfIncome === "Business (more than a year)" ||
        applicantSourceOfIncome === "Employment (more than a year)");

    if (eligibility) {
      const visaType = document.getElementById("choosevisatype").value;

      // Create a FormData object and append the form data
      const formData = new FormData();
      formData.append("formName", "MV"); // Change this value to the name or identifier of the form being submitted
      formData.append("visaType", visaType);
      formData.append("eligibility", eligibility ? "Eligible" : "Not Eligible");
      formData.append("lname", lname);
      formData.append("fname", fname);
      formData.append("email", email);
      formData.append("pnumber", pnumber);
      formData.append("address", address);

      const countryValue = married.elements["country"].value;
      const otherCountryValue = married.elements["otherCountry"].value;

      formData.append("country", countryValue);
      formData.append("otherCountry", otherCountryValue);

      formData.append("pcode", pcode);
      formData.append("amrital", amrital);
      formData.append("metSponsor", metSponsor);
      formData.append("applicant-income", applicantSourceOfIncome);
      formData.append("sties", sties);
      formData.append("smrital", smrital);
      formData.append("sponsor-income", sponsorSourceOfIncome);

      // Send data to the Google Apps Script
      const options = {
        method: "post",
        body: formData,
      };
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            formAlerts.innerHTML =
              "<div class='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' role='alert'>Sent Successfully.</div>";
          } else {
            formAlerts.innerHTML =
              "<div class='alert alert-danger'>Error: " +
              response.statusText +
              "</div>";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          formAlerts.innerHTML =
            "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>Not Sent.</div>";
        });
    } else {
      formAlerts.innerHTML =
        "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'> You are not eligible for the visa application.</div>";
    }
  }
  //unmarriedvisitvisafunc
  function valdiateForm5(e) {
    // Prevent the default form submission
    e.preventDefault();

    const umarried = document.getElementById("UMVV");

    const lname = umarried.elements["lname"].value;
    const fname = umarried.elements["fname"].value;
    const email = umarried.elements["email"].value;
    const pnumber = umarried.elements["pnumber"].value;
    const address = umarried.elements["address"].value;
    const pcode = umarried.elements["pcode"].value;
    const amrital = umarried.elements["AMaritalStatus"].value;
    const smrital = umarried.elements["SMaritalStatus"].value;
    const financialrequirement = document.querySelector(
      'input[name="financialrequirement"]:checked'
    ).value;
    // Perform validation for Form 5
    const formAlerts = document.getElementById("form_alerts");
    const metSponsor = document.querySelector(
      'input[name="metSponsor"]:checked'
    ).value;
    const lived = document.querySelector('input[name="lived"]:checked').value;
    const sponsorSourceOfIncome = umarried.elements["sponsor-income"].value;
    const eligibility =
      financialrequirement === "Yes" &&
      lived === "Yes" &&
      metSponsor === "Yes" &&
      (sponsorSourceOfIncome === "Employment" ||
        sponsorSourceOfIncome === "Pension" ||
        sponsorSourceOfIncome === "Business" ||
        sponsorSourceOfIncome === "On Benefits");

    console.log(metSponsor, eligibility, lived, sponsorSourceOfIncome);

    if (eligibility) {
      const visaType = document.getElementById("choosevisatype").value;

      // Create a FormData object and append the form data
      const formData = new FormData();
      formData.append("formName", "UMVV"); // Change this value to the name or identifier of the form being submitted
      formData.append("visaType", visaType);
      formData.append("eligibility", eligibility ? "Eligible" : "Not Eligible");
      formData.append("lname", lname);
      formData.append("fname", fname);
      formData.append("email", email);
      formData.append("pnumber", pnumber);
      formData.append("address", address);

      const countryValue = umarried.elements["country"].value;
      const otherCountryValue = umarried.elements["otherCountry"].value;

      formData.append("country", countryValue);
      formData.append("otherCountry", otherCountryValue);

      formData.append("pcode", pcode);
      formData.append("amrital", amrital);
      formData.append("metSponsor", metSponsor);
      formData.append("lived", lived);
      formData.append("smrital", smrital);
      formData.append("financialrequirement", financialrequirement);
      formData.append("sponsor-income", sponsorSourceOfIncome);

      // Send data to the Google Apps Script
      const options = {
        method: "post",
        body: formData,
      };
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            formAlerts.innerHTML =
              "<div class='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative' role='alert'>Sent Successfully.</div>";
          } else {
            formAlerts.innerHTML =
              "<div class='alert alert-danger'>Error: " +
              response.statusText +
              "</div>";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          formAlerts.innerHTML =
            "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>Not Sent.</div>";
        });
    } else {
      formAlerts.innerHTML =
        "<div class='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'> You are not eligible for the visa application.</div>";
    }
  }
});

function handleCountryChange(event, containerId) {
  const countrySelect = event.target;
  const otherCountryContainer = document.getElementById(containerId);

  if (countrySelect.value === "Other") {
    otherCountryContainer.classList.remove("hidden");
  } else {
    otherCountryContainer.classList.add("hidden");
  }
}

function benefitchange(event, containerId) {
  const countrySelect1 = event.target;
  const otherCountryContainer1 = document.getElementById(containerId);

  if (countrySelect1.value === "On Benefits") {
    otherCountryContainer1.classList.remove("hidden");
  } else {
    otherCountryContainer1.classList.add("hidden");
  }
}

const benefits = document.getElementById("sponsor-income1");
const benefits1 = document.getElementById("btf");
benefits.addEventListener("change", (event) => {
  benefitchange(event, "btf");
});

const countrySelect1 = document.getElementById("country");
const otherCountryContainer1 = document.getElementById("otherCountryContainer");
countrySelect1.addEventListener("change", (event) => {
  handleCountryChange(event, "otherCountryContainer");
});

const countrySelect2 = document.getElementById("country2");
const otherCountryContainer2 = document.getElementById(
  "otherCountryContainer2"
);
countrySelect2.addEventListener("change", (event) => {
  handleCountryChange(event, "otherCountryContainer2");
});

const countrySelect3 = document.getElementById("country3");
const otherCountryContainer3 = document.getElementById(
  "otherCountryContainer3"
);
countrySelect3.addEventListener("change", (event) => {
  handleCountryChange(event, "otherCountryContainer3");
});

const countrySelect4 = document.getElementById("country4");
const otherCountryContainer4 = document.getElementById(
  "otherCountryContainer4"
);
countrySelect4.addEventListener("change", (event) => {
  handleCountryChange(event, "otherCountryContainer4");
});

const countrySelect5 = document.getElementById("country5");
const otherCountryContainer5 = document.getElementById(
  "otherCountryContainer5"
);
countrySelect5.addEventListener("change", (event) => {
  handleCountryChange(event, "otherCountryContainer5");
});
