import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface MainCardProps {
  title: string;
  count: string;
}

const MainCard: React.FC<MainCardProps> = ({ title, count }) => {
  return (
    <Card style={{ marginBottom: "16px" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" color="textSecondary">{title}</Typography>
            <Typography variant="h4" color="textPrimary">{count}</Typography>
          </Box>
          {title === "YTD Enrollments" ? (
            <CalendarMonthIcon style={{ fontSize: "40px", color: "#757575" }} />
          ) : (
            <AttachMoneyIcon style={{ fontSize: "40px", color: "#757575" }} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MainCard;
