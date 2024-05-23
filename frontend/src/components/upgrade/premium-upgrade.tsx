"use client";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Stack,
  Divider,
  CardHeader,
} from "@mui/material";
import {
  CheckCircleOutline,
  CurrencyBitcoin,
  CurrencyRupee,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import Cookies from "js-cookie";
import { neonBlue } from "@/styles/theme/colors";

interface SubscriptionPlan {
  name: string;
  price: number;
  features: string[];
}

export default function PremiumUpgrade() {
  // const [plans, setPlans] = useState<SubscriptionPlan[]>([
  //   {
  //     name: "Current",
  //     price: 0,
  //     features: ["Video Search", "Book Search"],
  //   },
  //   {
  //     name: "Standard",
  //     price: 200,
  //     features: [
  //       "Video Search",
  //       "Book Search",
  //       "Video Recommendation",
  //       "Book Recommendation",
  //     ],
  //   },
  //   {
  //     name: "Premium",
  //     price: 400,
  //     features: [
  //       "Video Search",
  //       "Book Search",
  //       "Video Recommendation",
  //       "Book Recommendation",
  //       "Emotion Based Video Recommendation",
  //       "Emotion Based Book Recommendation",
  //     ],
  //   },
  // ]);
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

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/upgrades/`,
        {
          email: userEmail,
          amount: plan.price,
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
        Feelify Premium Plans
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4} md={4}>
          <Card
            sx={{
              maxWidth: 400,
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    textShadow: "1px 1px 2px black",
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
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "#fff",
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
                          mb: 2,
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
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    textShadow: "1px 1px 2px black",
                  }}
                >
                  BUY NOW
                </Typography>
              }
              sx={{
                backgroundColor: neonBlue[900],
                color: "#fff",
                textAlign: "center",
              }}
            />
          </Card>
        </Grid>
        {/* <Grid item xs={6} sm={4} md={4}>
          <Card>
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: "bold",
                    textShadow: "1px 1px 2px black",
                    fontSize: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    backgroundColor: neonBlue[900],
                    color: "#fff",
                    padding: "0.5rem",
                    borderRadius: "5px",
                  }}
                >
                  <CurrencyRupee sx={{ fontSize: "1.5em" }} /> 200
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
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "#fff",
                  color: neonBlue[900],
                  textAlign: "left",
                }}
              >
                <Stack spacing={1}>
                  //  {plans.map((feature, index) => (
                  //   <Box key={feature}>
                  //     <Typography variant="body1" sx={{ textAlign: "center" }}>
                  //       {feature}
                  //     </Typography>
                  //     {index < plans.length - 1 && <Divider sx={{ my: 1 }} />}
                  //   </Box>
                  // ))} 
                </Stack>
              </CardContent>
            </Card>

            <CardHeader
              title="Buy Now"
              sx={{
                backgroundColor: neonBlue[900],
                color: "#fff",
                textAlign: "center",
              }}
            />
          </Card>
        </Grid> */}
      </Grid>
    </Box>
  );
}
