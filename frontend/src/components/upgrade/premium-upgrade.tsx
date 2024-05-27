"use client";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Divider,
  CardHeader,
} from "@mui/material";
import {
  CancelOutlined,
  CheckCircleOutline,
  CurrencyRupee,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import Cookies from "js-cookie";
import { neonBlue } from "@/styles/theme/colors";

export default function PremiumUpgrade() {
  const plans = [
    "Video Search",
    "Book Search",
    "Video Recommendation",
    "Book Recommendation",
    "Emotion Based Video Recommendation",
    "Emotion Based Book Recommendation",
  ];
  const router = useRouter();
  const { data: userData, isLoading, isError } = useRetrieveUserQuery();
  const userEmail = userData?.email || "";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  }, []);

  const handleSubscribe = async (price: number) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/upgrades/`,
        {
          email: userEmail,
          amount: price,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("upgraded");
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: response.data.payment_id,
          handler: async (response: any) => {
            try {
              await axios.post(
                `${process.env.NEXT_PUBLIC_HOST}/api/success/`,
                response,
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get("auth_token")}`,
                  },
                }
              );
              router.push(paths.home);
            } catch (error) {
              console.error("Error updating payment status:", error);
            }
          },
        };

        if ((window as any).Razorpay) {
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } else {
          console.error("Razorpay SDK failed to load. Are you online?");
        }
      }
    } catch (error) {
      console.error("Error creating upgrade:", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        sx={{
          color: neonBlue[700],
          fontStyle: "bold",
          textAlign: "center",
          mb: 5,
        }}
      >
        Monthly Subscription
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={6} sm={4} md={4}>
          <Card
            sx={{
              maxWidth: 400,
              backgroundColor: "#eaebfe",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    textShadow: `1px 1px 2px ${neonBlue[900]}`,
                  }}
                >
                  PRICING PLANS
                </Typography>
              }
              sx={{
                backgroundColor: neonBlue[900],
                color: "#fff",
                textAlign: "center",
              }}
            />
            <Card
              sx={{
                maxWidth: 400,
                margin: "auto",
                padding: 2,
                textAlign: "center",
                backgroundColor: "#eaebfe",
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "#eaebfe",
                  color: neonBlue[900],
                  textAlign: "left",
                }}
              >
                <Stack spacing={1}>
                  {plans.map((feature, index) => (
                    <Box key={feature}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          lineHeight: "1.6",
                          mb: 1.4,
                          color: neonBlue[900],
                          textAlign: "center",
                        }}
                      >
                        {feature}
                      </Typography>
                      {index < plans.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <CardHeader
              title={
                <Button>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ color: "white", fontWeight: "bold", textShadow: `1px 1px 2px ${neonBlue[900]}`,fontSize:"2rem", display:"flex", justifyContent:"center"}}
                    >
                      BUY NOW
                    </Typography>
                  </Button>
              }
              sx={{
                backgroundColor: neonBlue[900],
                color: "#fff",
                textAlign: "center",
              }}
            />
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              maxWidth: 200,
              backgroundColor: "#eaebfe",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    textShadow: `1px 1px 2px ${neonBlue[900]}`,
                  }}
                >
                  FREE PLAN
                </Typography>
              }
              sx={{
                backgroundColor: neonBlue[400],
                color: "#fff",
                textAlign: "center",
              }}
            />

            <Card
              sx={{
                maxWidth: 200,
                margin: "auto",
                padding: 2,
                textAlign: "center",
                backgroundColor: "#eaebfe",
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "#eaebfe",
                  color: neonBlue[900],
                  textAlign: "left",
                }}
              >
                <Stack spacing={1}>
                  {plans.map((feature, index) => (
                    <Box key={feature}>
                      <center>
                        {index < 2 ? (
                          <CheckCircleOutline sx={{ color: "green" }} />
                        ) : (
                          <CancelOutlined sx={{ color: "red" }} />
                        )}
                      </center>
                      {index < plans.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
            <CardHeader
              title={
                <Button>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ color: "white", fontWeight: "bold", textShadow: `1px 1px 2px ${neonBlue[900]}`,fontSize:"2rem", display:"flex", justifyContent:"center"}}
                    >
                      <CurrencyRupee sx={{ color: "white", fontSize:"2rem" }} /> 0
                    </Typography>
                  </Button>
              }
              sx={{
                backgroundColor: neonBlue[400],
                color: "#fff",
                textAlign: "center",
              }}
            />
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              maxWidth: 200,
              backgroundColor: "#eaebfe",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    textShadow: `1px 1px 2px ${neonBlue[900]}`,
                  }}
                >
                  BASIC
                </Typography>
              }
              sx={{
                backgroundColor: neonBlue[600],
                color: "#fff",
                textAlign: "center",
              }}
            />

            <Card
              sx={{
                maxWidth: 200,
                margin: "auto",
                padding: 2,
                textAlign: "center",
                backgroundColor: "#eaebfe",
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "#eaebfe",
                  color: neonBlue[900],
                  textAlign: "left",
                }}
              >
                <Stack spacing={1}>
                  {plans.map((feature, index) => (
                    <Box key={feature}>
                      <center>
                        {index < 4 ? (
                          <CheckCircleOutline sx={{ color: "green" }} />
                        ) : (
                          <CancelOutlined sx={{ color: "red" }} />
                        )}
                      </center>
                      {index < plans.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    textShadow: `1px 1px 2px ${neonBlue[900]}`,
                  }}
                >
                  <Button onClick={() => handleSubscribe(200)}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ color: "white", fontWeight: "bold", textShadow: `1px 1px 2px ${neonBlue[900]}`,fontSize:"2rem", display:"flex", justifyContent:"center"}}
                    >
                     <CurrencyRupee sx={{ color: "white", fontSize:"2rem" }} />200
                    </Typography>
                  </Button>
                </Typography>
              }
              sx={{
                backgroundColor: neonBlue[600],
                color: "#fff",
                textAlign: "center",
              }}
            />
          </Card>
        </Grid>
        <Grid item>
          <Card
            sx={{
              maxWidth: 200,
              backgroundColor: "#eaebfe",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    textShadow: `1px 1px 2px ${neonBlue[900]}`,
                  }}
                >
                  PREMIUM
                </Typography>
              }
              sx={{
                backgroundColor: neonBlue[700],
                color: "#fff",
                textAlign: "center",
              }}
            />

            <Card
              sx={{
                maxWidth: 200,
                margin: "auto",
                padding: 2,
                textAlign: "center",
                backgroundColor: "#eaebfe",
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "#eaebfe",
                  color: neonBlue[900],
                  textAlign: "left",
                }}
              >
                <Stack spacing={1}>
                  {plans.map((feature, index) => (
                    <Box key={feature}>
                      <center>
                        <CheckCircleOutline sx={{ color: "green" }} />
                      </center>
                      {index < plans.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    textShadow: `1px 1px 2px ${neonBlue[900]}`,
                  }}
                >
                  <Button onClick={() => handleSubscribe(400)}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ color: "white", fontWeight: "bold", textShadow: `1px 1px 2px ${neonBlue[900]}`,fontSize:"2rem", display:"flex", justifyContent:"center"}}
                    >
                      <CurrencyRupee sx={{ color: "white", fontSize:"2rem" }} />400
                    </Typography>
                  </Button>
                </Typography>
              }
              sx={{
                backgroundColor: neonBlue[600],
                color: "#fff",
                textAlign: "center",
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
