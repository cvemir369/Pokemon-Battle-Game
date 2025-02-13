import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyUsersEmail = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3000/users/verify/${token}`
        );
        setVerificationStatus(response.data.message);
        navigate("/login");
      } catch (error) {
        setVerificationStatus("Verification failed. Please try again.");
        console.error("Error verifying email:", error);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Verify User's Email</h1>
      {verificationStatus ? (
        <p>{verificationStatus}</p>
      ) : (
        <p>Verifying your email...</p>
      )}
    </div>
  );
};

export default VerifyUsersEmail;
