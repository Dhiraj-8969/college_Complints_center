import React from 'react';


function About() {
  return (
    <div className="max-w-4xl mx-10 mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        About BBSBE College Complaint Center
      </h2>

      <p className="text-gray-600 mb-6 leading-relaxed">
        Welcome to the <strong className="text-gray-800">BBSBE College Complaint Center</strong>,
        a dedicated platform for students to report and resolve issues effectively.
        Our goal is to create a transparent and responsive system where concerns are addressed
        in a timely manner.
      </p>

      <h4 className="text-xl font-semibold text-gray-700 mb-2">Why This Platform?</h4>
      <p className="text-gray-600 mb-6 leading-relaxed">
        At BBSBE College, we believe in open communication and continuous improvement.
        This platform allows students to raise complaints regarding academics, facilities,
        campus security, and more. The administration ensures that every complaint is reviewed
        and resolved efficiently.
      </p>

      <h4 className="text-xl font-semibold text-gray-700 mb-2">How It Works?</h4>
      <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
        <li>Submit a complaint through the Complaint Form.</li>
        <li>Track the status of your complaint in real time.</li>
        <li>Receive updates on actions taken.</li>
        <li>Provide feedback on the resolution.</li>
      </ul>

      <h4 className="text-xl font-semibold text-gray-700 mb-2">Contact Us</h4>
      <p className="text-gray-600 mb-2">
        If you have any queries or need assistance, feel free to reach out to our support team.
      </p>
      <p className="text-gray-800 font-medium"><strong>Email:</strong> support@bbsbecomplaints.com</p>
      <p className="text-gray-800 font-medium"><strong>Phone:</strong> +91 XXXXXXXXXX</p>
    </div>

  );
}

export default About;