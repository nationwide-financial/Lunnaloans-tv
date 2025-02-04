import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Avatar,
} from "@mui/material";

import useFetchData from "../hooks/useFetchData";
import Leaderboard from "../components/common/Leaderboard";
import PinAuth from "../components/common/PinAuth"; // Import the new PIN component

interface AgentData {
  firstname: string;
  imageid: string;
  lastname: string;
  assigned_application_count: number;
  loan_amount: number;
}

interface YearlyData {
  enrolled_date: string;
  total_enrollments: number;
  debt_enrolled: number;
}

interface Enrollment {
  monthToDateWonCount: number;
  monthToDateWonSum: number;
  yearlyData: YearlyData[];
  agent: AgentData[];
}

const Home: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const S3_URL = "https://nationwideimages.s3.amazonaws.com/";
  const HOST = `https://7fwwglseys3xlqk6hogiazspv40gzoug.lambda-url.us-east-1.on.aws/api`;

  const { data: enrollmentData } = useFetchData<Enrollment>({
    url: `${HOST}/enrollments`,
  });

  return (
    <Box sx={{ padding: "30px" }}>
      {!isAuthenticated ? (
        <PinAuth onSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box sx={{ backgroundColor: "#e5e7eb" }}>
            <Box sx={{ borderRadius: "10px", padding: "15px" }}>
              <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: "20px" }}>
                MTD Enrollments
              </Typography>
              <Leaderboard leaderboardData={enrollmentData?.agent?.slice(0, 3)}/>
              <TableContainer
                style={{
                  width: "100%",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                }}
              >
                <Table aria-label="custom pagination table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ fontSize: 18, color: "gray", fontWeight: 700 }}>
                        Rank
                      </TableCell>
                      <TableCell align="left" sx={{ fontSize: 18, color: "gray", fontWeight: 700 }}>
                        Agent name
                      </TableCell>
                      <TableCell align="left" sx={{ fontSize: 18, color: "gray", fontWeight: 700 }}>
                        Total Enrollments
                      </TableCell>
                      <TableCell align="left" sx={{ fontSize: 18, color: "gray", fontWeight: 700 }}>
                        Debt Enrolled
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {enrollmentData?.agent?.map((row, key) => (
                      <TableRow key={key}>
                        <TableCell align="left">{key + 1}</TableCell>
                        <TableCell align="left">
                          <Box display="flex" alignItems="center">
                            <Avatar alt={row.firstname} src={S3_URL + row.imageid} />
                            <Typography sx={{ ml: 1 }}>
                              {row.firstname} {row.lastname}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="left">{row.assigned_application_count.toLocaleString()}</TableCell>
                        <TableCell align="left">${row.loan_amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
