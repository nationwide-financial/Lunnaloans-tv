import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface MainCardProps {
  title: string;
  count: string;
}

const MainCard: React.FC<MainCardProps> = ({ title, count }) => {
  return (
    <Card style={{ marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{count}</Typography>
      </CardContent>
    </Card>
  );
};

export default MainCard;
