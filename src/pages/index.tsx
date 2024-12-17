import React, { useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, TablePagination } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainCard from "../components/common/MainCard";
import moment from 'moment';
import useFetchData from '../hooks/useFetchData';

interface EnrollmentData {
    enrolled_date: any;
    total_enrollments: any;
    debt_enrolled: any;
}

interface TableRowData {
    reservationcode: any;
    contact_firstname: any;
    contact_lastname: any;
    loan_amount: any;
    application_createtime: any;
    first_payment_date: any;
    payment_frequency: any;
    data: any;
    numberOfPages: any;
}

interface Enrollment {
    monthToDateWonCount: any;
    monthToDateWonSum: any;
    yearlyData: any[];
    monthlyData: any
    agent: any
}

const Home: React.FC = () => {
    const [value, setValue] = React.useState('1');
    const [limit, setLimit] = useState<any>(5);
    const [page, setPage] = useState<any>(1);

    const {
        data: enrollmentData,
        // loading: loadingEnrollment, 
        // error: enrollmentError 
    } = useFetchData<Enrollment>({
        url: "http://localhost:5001/api/enrollments",
    });

    const {
        data: tableDataResponse,
        // loading: loadingTableData, 
        // error: tableDataError 
    } = useFetchData<TableRowData>({
        url: `http://localhost:5001/api/enrollments/${limit}/${page}`,
    });

    const {
        data: tableDataResponseMtd,
        loading: loadingTableDataMtd,
        // error: tableDataErrorMtd 
    } = useFetchData<TableRowData>({
        url: `http://localhost:5001/api/enrollments/mtd/${limit}/${page}`,
    });

    console.log("tableDatatableDatatableDatatableData", tableDataResponse)
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleChangePageList = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPageList = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(1);
    };

    return (
        <Box sx={{ padding: '30px', }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Lunna Loans Enrollments" value="1" />
                            <Tab label="Individual enrollment" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ backgroundColor: '#e5e7eb' }}>
                        <Box sx={{ borderRadius: '10px' }}>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>YTD Enrollments</Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} sx={{ padding: '20px' }}>
                                    <MainCard title="YTD Enrollments" count={String(enrollmentData?.monthToDateWonCount || 0)} />
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ padding: '20px' }}>
                                    <MainCard title="Enrolled Debt" count={(enrollmentData?.monthToDateWonSum || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                                </Grid>

                                {/* Two tables horizontally */}
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TableContainer sx={{ margin: '20px', backgroundColor: '#fff', borderRadius: '10px' }}>
                                            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left" sx={{ fontSize: 18, color: 'gray', fontWeight: 700 }}>Enrolled Date</TableCell>
                                                        <TableCell align="left" sx={{ fontSize: 18, color: 'gray', fontWeight: 700 }}>Total Enrollments</TableCell>
                                                        <TableCell align="left" sx={{ fontSize: 18, color: 'gray', fontWeight: 700 }}>Debt Enrollments</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {enrollmentData?.yearlyData?.map((row, key) => (
                                                        <TableRow key={key}>
                                                            <TableCell align="left">{row?.enrolled_date}</TableCell>
                                                            <TableCell align="left">{row?.total_enrollments}</TableCell>
                                                            <TableCell align="left">{row?.debt_enrolled}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>

                                    <Grid item xs={12} md={5}>
                                        <TableContainer sx={{ marginRight: '50px',marginTop:'20px', marginLeft:'20px', backgroundColor: '#fff', borderRadius: '10px' }}>
                                            <Table sx={{  }} aria-label="second table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left" sx={{ fontSize: 18, color: 'gray', fontWeight: 700 }}>Agent name</TableCell>
                                                        <TableCell align="left" sx={{ fontSize: 18, color: 'gray', fontWeight: 700 }}>Total Enrollments</TableCell>
                                                        <TableCell align="left" sx={{ fontSize: 18, color: 'gray', fontWeight: 700 }}>Debt Enrolled</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {/* Replace with your second table's data */}
                                                    {enrollmentData?.agent?.map((row: any, key: any) => (
                                                        <TableRow key={key}>
                                                            <TableCell align="left">{row?.firstname} {row?.lastname}</TableCell>
                                                            <TableCell align="left">{row?.assigned_application_count}</TableCell>
                                                            <TableCell align="left">$ { row?.loan_amount}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </TabPanel>

                    <TabPanel value="2" sx={{ backgroundColor: '#e5e7eb' }}>

                        <TableContainer sx={{ marginTop: '50px' }}>
                            <Table sx={{  backgroundColor: '#fff', borderRadius: '10px' }} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>ID</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>CLIENT NAME</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>Enrolled Debt</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>Enrolled Date</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>1st Payment Date</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 16, color: 'gray', fontWeight: 700 }}>1st Payment Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loadingTableDataMtd ? (
                                        <CircularProgress sx={{ width: 30, height: 30, marginLeft: 10 }} />
                                    ) : (
                                        tableDataResponseMtd?.data?.map((row: any, key: any) => (
                                            <TableRow key={key} >
                                                <TableCell align="left">{row?.reservationcode}</TableCell>
                                                <TableCell align="left">{row?.contact_firstname} {row?.contact_lastname}</TableCell>
                                                <TableCell align="left">{row?.loan_amount}</TableCell>
                                                <TableCell align="left">{moment(Number(row?.application_createtime)).format('MM-DD-YYYY')}</TableCell>
                                                <TableCell align="left">{row?.first_payment_date}</TableCell>
                                                <TableCell align="left">{row?.payment_frequency}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                            <TablePagination
                                sx={{ width: '100%', marginTop: '20px' }}
                                rowsPerPageOptions={[5, 10, 15, 100]}
                                component="div"
                                count={tableDataResponse?.numberOfPages}
                                rowsPerPage={limit}
                                page={page - 1}
                                onPageChange={handleChangePageList}
                                onRowsPerPageChange={handleChangeRowsPerPageList}
                            />
                        </TableContainer>
                    </TabPanel>

                </TabContext>
            </Box>
        </Box>
    );
};

export default Home;
