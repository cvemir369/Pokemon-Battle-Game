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
        setTimeout(() => {
          navigate("/login");
        }, 4000);
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
    <div className="flex flex-col items-center justify-center mt-10 py-52  bg-yellow-400">
      <h1 className="text-3xl font-bold mb-4">Verify User's Email</h1>
      {verificationStatus ? (
        <p className="text-lg">{verificationStatus}</p>
      ) : (
        <p className="text-lg">Verifying your email...</p>
      )}
    </div>
  );
};

export default VerifyUsersEmail;
