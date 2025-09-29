import React from "react";

function Contact() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-10 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Contact Us
      </h2>

      <div className="space-y-4 text-gray-600">
        <p>
          If you have any complaints or need assistance, feel free to reach out to us.
        </p>

        <div>
          <h5 className="text-lg font-semibold text-gray-700">College Address:</h5>
          <p>BABA BANDA SINGH BAHADUR ENGINEERING COLLEGE, </p>
          <p>Fatehgarh Sahib, Punjab, 140407</p>
        </div>
        <div>
          <h5 className="text-lg font-semibold text-gray-700">Office Website</h5>
          <a href="http://bbsbec.edu.in">http://bbsbec.edu.in</a>
        </div>
        <div>
          <h5 className="text-lg font-semibold text-gray-700">Contact Number:</h5>
          <p> 01763-503060</p>
        </div>

        <div>
          <h5 className="text-lg font-semibold text-gray-700">Email:</h5>
          <p>support@bbsbecomplaints.com</p>
        </div>

        <div>
          <h5 className="text-lg font-semibold text-gray-700">Office Hours:</h5>
          <p>Monday - Friday | 9:00 AM - 5:00 PM</p>
        </div>
      </div>
    </div>

  );
}

export default Contact;
