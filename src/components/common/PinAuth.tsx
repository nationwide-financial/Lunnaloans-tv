import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

interface PinAuthProps {
  onSuccess: () => void;
}

const PinAuth: React.FC<PinAuthProps> = ({ onSuccess }) => {
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string>("");

  const HOST = `https://7fwwglseys3xlqk6hogiazspv40gzoug.lambda-url.us-east-1.on.aws/api`;
  const handleSubmit = async() => {
    const response = await axios.post(`${HOST}/enrollments/verify-pin`, {
        pass: pin,
    });
    if(response?.status === 200){
        console.log(response?.data?.login)
        if (response?.data?.login) {
            onSuccess();
        } else {
            setError("Incorrect PIN. Try again.");
            setPin("");
        }
    }else{
        setError("Something wrong. Try again.");
        setPin("");
    }
    
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Enter PIN to Access Dashboard
      </Typography>
      <TextField
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter PIN"
        inputProps={{ maxLength: 8 }}
        sx={{ marginBottom: 2 }}
      />
      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default PinAuth;
