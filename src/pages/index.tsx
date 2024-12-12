import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, TablePagination } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainCard from "../components/common/MainCard";
import moment from 'moment';
import useFetchData from '../hooks/useFetchData';

interface EnrollmentData {
    enrolled_date: string;
    total_enrollments: number;
    debt_enrolled: number;
}

interface TableRowData {
    reservationcode: string;
    contact_firstname: string;
    contact_lastname: string;
    loan_amount: number;
    application_createtime: string;
    first_payment_date: string;
    payment_frequency: string;
    data:any;
    numberOfPages:any;
}

interface Enrollment {
    monthToDateWonCount: number;
    monthToDateWonSum: number;
    monthlyData: EnrollmentData[];
}

const Home: React.FC = () => {
    const [value, setValue] = React.useState('1');
    const [limit, setLimit] = useState<number>(5);
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const [tableData, setTableData] = useState<any>();
    const [enrollment, setEnrollment] = useState<Enrollment | null>(null);

    const { data: enrollmentData, loading: loadingEnrollment, error: enrollmentError } = useFetchData<Enrollment>({
        url: "http://localhost:5001/api/enrollments",
    });

    const { data: tableDataResponse, loading: loadingTableData, error: tableDataError } = useFetchData<TableRowData>({
        url: `http://localhost:5001/api/enrollments/${limit}/${page}`,
    });
    console.log("tableDatatableDatatableDatatableData",tableDataResponse)
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

    useEffect(() => {
        if (enrollmentData) {
            setEnrollment(enrollmentData);
        }
        if (Array.isArray(tableDataResponse)) {
            setTableData(tableDataResponse);
        } else {
            setTableData({}); // Ensure it's an array
        }
    }, [enrollmentData, tableDataResponse]);

    return (
        <Box sx={{ padding: '30px', textAlign: 'center', background: 'linear-gradient(to right, rgba(0, 100, 255, 0.8), rgba(135, 206, 250, 0.8))' }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="YTD Enrollments" value="1" sx={{ color: '#fff' }} />
                            <Tab label="MTD Enrollments" value="2" sx={{ color: '#fff' }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Box pt={5} pl={2} sx={{ backgroundColor: 'rgba(173, 216, 230, 0.5)', borderRadius: '10px' }}>
                            <Grid container>
                                <Grid item xs={12} md={6} sx={{ padding: '20px' }}>
                                    <Typography variant="h4" sx={{ color: '#fff', fontWeight: 600 }}>YTD Enrollments</Typography>
                                    {loadingEnrollment && <CircularProgress sx={{ width: 30, height: 30, marginLeft: 10 }} />}
                                    <Box sx={{ marginTop: '30px' }}>
                                        <MainCard title="YTD Enrollments" count={String(enrollment?.monthToDateWonCount || 0)} />
                                        <MainCard title="Enrolled Debt" count={(enrollment?.monthToDateWonSum || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ padding: '20px' }}>
                                    <TableContainer sx={{ marginTop: '50px' }}>
                                        <Table sx={{ minWidth: 500, backgroundColor: '#fff', borderRadius: '10px' }} aria-label="custom pagination table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left" sx={{ fontSize: 18, color: '#333', fontWeight: 800 }}>Enrolled Date</TableCell>
                                                    <TableCell align="left" sx={{ fontSize: 18, color: '#333', fontWeight: 800 }}>Total Enrollments</TableCell>
                                                    <TableCell align="left" sx={{ fontSize: 18, color: '#333', fontWeight: 800 }}>Debt Enrollments</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {enrollment?.monthlyData?.map((row, key) => (
                                                    <TableRow key={key} sx={{ '&:nth-of-type(even)': { backgroundColor: 'rgba(173, 216, 230, 0.2)' } }}>
                                                        <TableCell align="left">{row?.enrolled_date}</TableCell>
                                                        <TableCell align="left">{row?.total_enrollments}</TableCell>
                                                        <TableCell align="left">{row?.debt_enrolled}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Box>
                        <TableContainer sx={{ marginTop: '50px' }}>
                            <Table sx={{ minWidth: 500, backgroundColor: '#fff', borderRadius: '10px' }} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left" sx={{ fontSize: 18, color: '#333', fontWeight: 800 }}>ID</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 18, color: '#333', fontWeight: 800 }}>CLIENT NAME</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 18, color: '#333', fontWeight: 800 }}>Enrolled Debt</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 18, color: '#333', fontWeight: 800 }}>Enrolled Date</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 18, color: '#333', fontWeight: 800 }}>1st Payment Date</TableCell>
                                        <TableCell align="left" sx={{ fontSize: 18, color: '#333', fontWeight: 800 }}>1st Payment Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loadingTableData ? (
                                        <CircularProgress sx={{ width: 30, height: 30, marginLeft: 10 }} />
                                    ) : (
                                        tableDataResponse?.data?.map((row:any, key:any) => (
                                            <TableRow key={key} sx={{ '&:nth-of-type(even)': { backgroundColor: 'rgba(173, 216, 230, 0.2)' } }}>
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
                    <TabPanel value="2">Item Two</TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
};

export default Home;
