import React from 'react';

function Footer() {
  return (
<footer className="bg-dark text-light text-center py-3 mt-5">
  <div className="container">
    <p className="mb-1">© 2025 BBSBE College Complaint Center</p>
    <p className="mb-1">Ensuring a better campus experience for everyone</p>
    <div>
      <a href="/about" className="text-light mx-2">About</a> | 
      <a href="/contact" className="text-light mx-2">Contact</a> | 
      <a href="/help" className="text-light mx-2">Help</a>
    </div>
    <p className="mt-2">Email: support@bbsbecomplaints.com | Phone: +91 XXXXXXXXXX</p>
  </div>
</footer>
  );
}

export default Footer;

