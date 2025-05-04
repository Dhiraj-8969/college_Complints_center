import React from "react";

function Feedback() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6"> {/* Adjusts size for tablets & laptops */}
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">
              <i className="fas fa-comment-dots text-primary"></i> Feedback
            </h2>

            <form>

              {/* Feedback Message */}
              <div className="mb-3">
                <label className="form-label">
                  <i className="fas fa-pencil-alt"></i> Your Feedback
                </label>
                <textarea className="form-control" rows="4" placeholder="Write your feedback..."></textarea>
              </div>

              {/* Rating */}
              <div className="mb-3">
                <label className="form-label">
                  <i className="fas fa-star"></i> Rate Us
                </label>
                <div className="d-flex justify-content-start">
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="fas fa-star text-warning"></i>
                  <i className="far fa-star text-warning"></i> {/* Unfilled Star */}
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                <i className="fas fa-paper-plane"></i> Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
