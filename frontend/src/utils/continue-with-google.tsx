import axios from 'axios';
import { toast } from "react-toastify";

export default async function continueWithGoogle(redirect: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_HOST}/login/o/google-oauth2/?redirect_uri=${'http://localhost:3000'}/auth/${redirect}`
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json"
      },
      withCredentials: true 
    });

    if (response.status === 200 && typeof window !== "undefined") {
      window.location.replace(response.data.authorization_url); 
    } else {
      toast.error("Something went wrong.");
    }

  } catch (err) {
    toast.error("Something went wrong.");
  }
}
