import React from "react";

const UserDetails = (props) => {
  const { userDetails } = props;
  if (!userDetails) {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <p>Loading user details...</p>
      </div>
    );
  }
  const dateString = userDetails.date;
  // Convert the date string to a Date object
  const dateObject = new Date(dateString);
  // Convert the Date object to a UTC string
  // const utcDateString = dateObject.toUTCString();
  const DateString = dateObject.toDateString();
  return (
    <div className="conatiner d-flex justify-content-center align-items-center mt-4">
      <div className="card ">
        <div className="card-body d-flex flex-column">
          <h4 className="card-title text-center">User Details</h4>
          <form className="d-flex justify-content-center">
            <p className="card-title mx-2" style={{ fontWeight: "bold" }}>
              Name:
            </p>
            <p className="card-text">{userDetails.name}</p>
          </form>
          <form className="d-flex justify-content-center">
            <p className="card-title mx-2" style={{ fontWeight: "bold" }}>
              Email:
            </p>
            <p className="card-text">{userDetails.email}</p>
          </form>
          <form className="d-flex justify-content-center">
            <p className="card-title mx-2" style={{ fontWeight: "bold" }}>
              Created On:
            </p>
            <p className="card-text">{DateString}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
