import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Img,
  Button,
} from "@react-email/components";

interface PasswordResetEmailProps {
  resetCode: string;
  userName: string;
  logoUrl: string;
  homePageUrl: string;
}

const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({
  resetCode,
  userName,
  logoUrl,
  homePageUrl,
}) => {
  return (
    <Html>
      <Head />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
        rel="stylesheet"
      />
      <Preview>Password Reset Code</Preview>
      <Body
        style={{
          fontFamily: '"Poppins", sans-serif',
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            padding: "20px",
            maxWidth: "500px",
            margin: "50px auto", // Center the card vertically and horizontally
            backgroundColor: "#fffbf0", // Black background for the card
            border: "1px solid ", // White border around the card
            borderRadius: "15px", // Rounded corners
          }}
        >
          <Section style={{ textAlign: "center", marginBottom: "20px" }}>
            <Img
              src={logoUrl}
              alt="Logo"
              width="60" // Smaller logo size
              height="auto"
              style={{ margin: "0 auto" }} // Center logo
            />
          </Section>
          <Section>
            <Text
              style={{ fontSize: "16px", color: "#000", marginBottom: "20px" }}
            >
              Hey {userName}, it's Luke from the Ebright.
            </Text>
            <Text style={{ fontSize: "16px", color: "#000" }}>
              We received a request to reset your password. Use the code below
              to proceed:
            </Text>
            <Text
              style={{
                fontSize: "24px",
                color: "#000",
                textAlign: "center",
                margin: "20px 0",
                fontWeight: "bold",
              }}
            >
              {resetCode}
            </Text>
            <Text
              style={{ fontSize: "16px", color: "#000", marginBottom: "20px" }}
            >
              This code will expire in 1 hour. If you did not request a password
              reset, please ignore this email.
            </Text>
            <Button
              href={homePageUrl}
              style={{
                display: "block",
                width: "200px",
                margin: "20px auto", // Center the button
                padding: "15px 10px",
                backgroundColor: "#000",
                color: "#fff",
                textDecoration: "none",
                textAlign: "center",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              Go to Homepage
            </Button>
            <Text
              style={{ fontSize: "16px", color: "#000", marginTop: "20px" }}
            >
              Thank you!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PasswordResetEmail;
