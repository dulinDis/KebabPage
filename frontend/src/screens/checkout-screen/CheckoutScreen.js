import React, { useState, useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store";
import { useEffect } from "react";
import CheckoutSteps from "../../components/checkout-steps/CheckoutSteps";
import ShippingAddress from "../shipping-address-screen/ShippingAddress";
import { Box } from "@mui/system";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const steps = [
  //   "Sign In",
  "Shipping Address",
  "Payment Details",
  "Review Your Order",
];

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    // cart: { shippingAddress },
  } = state;

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!userInfo) {
      //   navigate("/signin?redirect=/shipping");
      // navigate("/signin");
      navigate("/signin?redirect=/checkout");
    }
  }, [userInfo, navigate]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ShippingAddress
            activeStep={activeStep}
            steps={steps}
            handleNext={handleNext}
          />
        );
      //   <AddressForm />;
      case 1:
        return;
      //    <PaymentForm />;
      case 2:
        return;
      //   <Review />;

      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = ({ children }) => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <CheckoutSteps steps={steps} activeStep={activeStep} />
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    {activeStep === 0 ? (
                      ""
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        {activeStep === steps.length - 1
                          ? "Place order"
                          : "Next2"}
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </Container>
      </ThemeProvider>
      )
    </React.Fragment>
  );
}