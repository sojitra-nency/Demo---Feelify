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
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { paths } from "@/paths";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import Cookies from "js-cookie";

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  features: string[];
}

export default function PremiumUpgrade() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([
    {
      id: 1,
      name: "Basic",
      price: 200,
      features: ["Video recommendations", "Book recommendations"],
    },
    {
      id: 2,
      name: "Premium",
      price: 400,
      features: [
        "Emotion based video recommendation",
        "Emotion based book recommendation",
      ],
    },
  ]);
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
              await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/success/`, response, {
                headers: {
                  Authorization: `Bearer ${Cookies.get("auth_token")}`,
                },
              });
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
    <>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Feelify Premium Plans
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {plan.name} - ₹{plan.price}/month
                  </Typography>
                  <List>
                    {plan.features.map((feature, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircleOutline />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    onClick={() => handleSubscribe(plan)}
                  >
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
