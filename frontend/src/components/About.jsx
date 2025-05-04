import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function About() {
  return (
    <div className="container mt-5 w-lighter">
      <h2 className="text-center mb-4 w-lighter">About BBSBE College Complaint Center</h2>
      <p className='w-lighter'>
        Welcome to the <strong>BBSBE College Complaint Center</strong>, a dedicated platform for students to report and resolve issues effectively. Our goal is to create a transparent and responsive system where concerns are addressed in a timely manner.
      </p>

      <h4>Why This Platform?</h4>
      <p>
        At BBSBE College, we believe in open communication and continuous improvement. This platform allows students to raise complaints regarding academics, facilities, campus security, and more. The administration ensures that every complaint is reviewed and resolved efficiently.
      </p>

      <h4>How It Works?</h4>
      <ul>
        <li>Submit a complaint through the Complaint Form.</li>
        <li>Track the status of your complaint in real time.</li>
        <li>Receive updates on actions taken.</li>
        <li>Provide feedback on the resolution.</li>
      </ul>

      <h4>Contact Us</h4>
      <p>
        If you have any queries or need assistance, feel free to reach out to our support team.
      </p>
      <p><strong>Email:</strong> support@bbsbecomplaints.com</p>
      <p><strong>Phone:</strong> +91 XXXXXXXXXX</p>
      
    </div>
  );
}

export default About;