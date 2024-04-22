import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_Auth_Refresh } from "../API/Api";

const RefreshAccessToken = () => {
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));

    // Function to store refresh token in localStorage
    const storeRefreshToken = (token) => {
        localStorage.setItem("refreshToken", token);
        setRefreshToken(token); // Update the state with the new refresh token
    };

    useEffect(() => {
        const refreshTokenData = async () => {
            const accessToken = localStorage.getItem("token");
            const currentRefreshToken = localStorage.getItem("refreshToken");

            if (!accessToken || !currentRefreshToken) {
                navigate("/");
                return;
            }

            const accessTokenExp = decodeToken(accessToken).exp * 1000;
            const currentTime = new Date().getTime();

            // Check if access token is expired or still valid
            if (currentTime >= accessTokenExp) {
                if (!isRefreshing) {
                    setIsRefreshing(true);
                    try {
                        const response = await fetch(
                            `${API_Auth_Refresh}/refresh?refreshToken=${currentRefreshToken}`,
                            {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            }
                        );

                        if (response.ok) {
                            const data = await response.json();
                            console.log(data, "refresh");
                            localStorage.setItem("token", data.access_token);

                            // Set expiry time of new token
                            const newAccessTokenExp = decodeToken(data.access_token).exp * 1000;
                            localStorage.setItem("accessTokenExp", newAccessTokenExp.toString());

                            // Update the refresh token if it's changed
                            if (data.refresh_token && data.refresh_token !== currentRefreshToken) {
                                storeRefreshToken(data.refresh_token);
                            }
                        }
                        else {
                            // If refresh token is expired or invalid, redirect to login page
                            navigate("/");
                        }
                    } catch (error) {
                        console.error("Error refreshing token:", error);
                        toast.error("An unexpected error occurred");
                    } finally {
                        setIsRefreshing(false);
                    }
                }
            }
        };

        refreshTokenData();
    }, [isRefreshing, navigate]);

    const decodeToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    return null;
};

export default RefreshAccessToken;
