import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const VerifyUsersEmail = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [toastShown, setToastShown] = useState(false); // Add a flag to track if the toast has been shown

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    const verifyEmail = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/verify/${token}`
        );
        if (isMounted) {
          setVerificationStatus(response.data.message);
          if (!toastShown) {
            setToastShown(true); // Set the flag to true
            setTimeout(() => {
              navigate("/login");
              toast.success(`Email verified, you can log in now!`);
            }, 4000);
          }
        }
      } catch (error) {
        if (isMounted) {
          setVerificationStatus("Verification failed. Please try again.");
          console.error("Error verifying email:", error);
        }
      }
    };

    if (token) {
      verifyEmail();
    }

    return () => {
      isMounted = false; // Cleanup function to set the flag to false when the component unmounts
    };
  }, [token, navigate, toastShown]);

  return (
    <div className="flex flex-col items-center justify-center mt-10 py-52 bg-yellow-400">
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
