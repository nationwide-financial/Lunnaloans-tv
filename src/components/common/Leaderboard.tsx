import React from "react";
import { Box, Typography, Avatar } from "@mui/material";

const S3_URL = "https://nationwideimages.s3.amazonaws.com/";

interface LeaderboardEntry {
  name: string;
  score: number;
  color: string;
  position: number;
  image: string;
  sn: number;
}

interface LeaderboardProps {
  leaderboardData: { firstname: string; lastname: string; imageid: string; assigned_application_count: string }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboardData }) => {
  const formattedData: LeaderboardEntry[] = leaderboardData
    .map((user, index) => ({
      name: `${user.firstname} ${user.lastname}`,
      score: parseInt(user.assigned_application_count),
      color: index === 0 ? "#FDD835" : index === 1 ? "#FB8C00" : "#4DB6AC", // Adjust colors based on rank
      position: index + 1,
      image: user.imageid ? `${S3_URL}${user.imageid}` : "/default-avatar.jpg", // Use a default image if none is available
      sn: index + 1
    }))
    .sort((a, b) => b.score - a.score); // Sort by assigned_application_count in descending order

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-end" gap={4} height={300} m={2}>
      {formattedData.map(({ name, score, color, position, image }) => (
        <Box key={name} display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Avatar
            src={image}
            alt={name}
            sx={{
              width: 80,
              height: 80,
              border: "4px solid white",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            }}
          />
          <Typography variant="body1" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2">{score}</Typography>
          <Box
            width={100}
            height={position === 1 ? 150 : position === 2 ? 120 : 100} // Adjust height based on position
            bgcolor={color}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h6" fontWeight="bold">
              {position}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Leaderboard;
