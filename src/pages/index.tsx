import React  from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, 
   // TablePagination 
} from '@mui/material';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import moment from 'moment';
import useFetchData from '../hooks/useFetchData';

interface AgentData {
    firstname: string;
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

// interface TableRowData {
//     reservationcode: string;
//     contact_firstname: string;
//     contact_lastname: string;
//     loan_amount: number;
//     application_createtime: string;
//     first_payment_date: string | null;
//     payment_frequency: string;
//     data: TableRowData[];
//     numberOfPages: number;
//     total: number;
// }

const Home: React.FC = () => {
    // const [value, setValue] = React.useState<string>('1');
    // const [limit, setLimit] = useState<number>(5);
    // const [page, setPage] = useState<number>(1);

    const { data: enrollmentData } = useFetchData<Enrollment>({
        url: "https://7fwwglseys3xlqk6hogiazspv40gzoug.lambda-url.us-east-1.on.aws/api/enrollments",
    });

    // const { data: tableDataResponseMtd } = useFetchData<TableRowData>({
    //     url: `http://localhost:5001/api/enrollments/mtd/${limit}/${page}`,
    // });

    // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //     setValue(newValue);
    // };

    // const handleChangePageList = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    //     setPage(newPage + 1);
    // };

    // const handleChangeRowsPerPageList = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setLimit(parseInt(event.target.value, 10));
    //     setPage(1);
    // };

    return (
        <Box sx={{ padding: '30px' }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        {/* <TabList onChange={handleChange} aria-label="API tabs example">
                            <Tab label="Lunna Loans Enrollments" value="1" />
                            <Tab label="Individual enrollment" value="2" />
                        </TabList> */}
                    </Box>
                    <Box  sx={{ backgroundColor: '#e5e7eb' }}>
                        <Box sx={{ borderRadius: '10px', padding:"15px" }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: '20px' }}>
                                MTD Enrollments
                            </Typography>
                            <TableContainer style={{ width: '100%', backgroundColor: '#fff', borderRadius: '10px' }}>
                                <Table aria-label="custom pagination table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left" sx={{ fontSize: 18, color: 'gray', fontWeight: 700 }}>
                                                Agent name
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontSize: 18, color: 'gray', fontWeight: 700 }}>
                                                Total Enrollments
                                            </TableCell>
                                            <TableCell align="left" sx={{ fontSize: 18, color: 'gray', fontWeight: 700 }}>
                                                Debt Enrolled
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {enrollmentData?.agent?.map((row, key) => (
                                            <TableRow key={key}>
                                                <TableCell align="left">{row.firstname} {row.lastname}</TableCell>
                                                <TableCell align="left">{row.assigned_application_count.toLocaleString()}</TableCell>
                                                <TableCell align="left">${row.loan_amount.toLocaleString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>

                    {/* <TabPanel value="2" sx={{ backgroundColor: '#e5e7eb' }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: '20px' }}>
                            Individual Enrollments
                        </Typography>
                        <TableContainer>
                            <Table sx={{ backgroundColor: '#fff', borderRadius: '10px' }} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>
                                            ID
                                        </TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>
                                            CLIENT NAME
                                        </TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>
                                            Enrolled Debt
                                        </TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>
                                            Enrolled Date
                                        </TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>
                                            1st Payment Date
                                        </TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>
                                            1st Payment Status
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableDataResponseMtd?.data?.map((row, key) => (
                                        <TableRow key={key}>
                                            <TableCell align="left">{row.reservationcode}</TableCell>
                                            <TableCell align="left">{row.contact_firstname} {row.contact_lastname}</TableCell>
                                            <TableCell align="left">${row.loan_amount.toLocaleString()}</TableCell>
                                            <TableCell align="left">
                                                {moment(Number(row.application_createtime)).format('MM-DD-YYYY')}
                                            </TableCell>
                                            <TableCell align="left">{row.first_payment_date || 'N/A'}</TableCell>
                                            <TableCell align="left">{row.payment_frequency}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                sx={{ width: '100%', marginTop: '20px' }}
                                rowsPerPageOptions={[5, 10, 15, 100]}
                                component="div"
                                count={tableDataResponseMtd?.total || 0}
                                rowsPerPage={limit}
                                page={page - 1}
                                onPageChange={handleChangePageList}
                                onRowsPerPageChange={handleChangeRowsPerPageList}
                            />
                        </TableContainer>
                    </TabPanel> */}
                
            </Box>
        </Box>
    );
};

export default Home;
