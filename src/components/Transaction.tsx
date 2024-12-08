import { Box, Button, FormControl, Input, InputLabel, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import Header from "./Header"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { addDeposit } from "../redux/reducers/transactionReducer";
import CustomModal from "../modal/CustomModal";
import React from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    padding: '32px',
    display: 'block'
};

// const [userData, setUserData] = useState([
//     {
//         name: 'Das',
//         email: 'das@gmail.com',
//         balance: 200000
//     },
//     {
//         name: 'Rick',
//         email: 'rick@gmail.com',
//         balance: 40000
//     },
// ])

// export const accountTransfer = (amount: number, user: any) => {
//     userData.filter((data) => {
//         if(data.email === user.email) {
//             data.balance-=amount
//         }
//         setUserData([...userData])
//         return data.balance;
//     })
// }

const Transaction = () => {
    const [formModalOpen, setFormModalOpen] = useState(false)
    const dispatch = useDispatch();
    const depositData = useSelector((state:any) => state.transaction)
    const inputObj:any = {}

    const handleFormSubmit = () => {
        dispatch(
            addDeposit(
                inputObj 
            )
        )
        setFormModalOpen(false)
    }
    

    return (
        <React.Fragment>
            <Header />
            <Button variant="contained" sx={{margin:'auto', display:'flex', top:'10px'}} onClick={() => setFormModalOpen(true)}>Create FD/RD</Button>
            {formModalOpen && 
                 <CustomModal
                    open = {formModalOpen}
                    setModal = {(bool:boolean) => setFormModalOpen(bool)}>
                    <Box sx={style}>
                        <FormControl variant="standard" sx={{paddingRight:'11px', paddingBottom:'20px'}}>
                            <InputLabel sx={{left:"15px"}} htmlFor="component-simple">Name</InputLabel>
                            <Input type="text" id="component-simple" defaultValue="" onChange={(e) => inputObj['name'] = e.currentTarget.value}/>
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel sx={{left:"15px"}} htmlFor="component-simple">Email</InputLabel>
                            <Input type="email" id="component-simple" defaultValue="" onChange={(e) => inputObj['email'] = e.currentTarget.value} />
                        </FormControl>
                        <FormControl variant="standard">
                            <TextField
                                sx={{minWidth:'194px',paddingRight:'11px', paddingBottom:'20px'}}
                                select
                                label="Deposit Type"
                            >
                                <MenuItem key='FD' value='FD' onClick={() => inputObj["type"] = 'FD'}>
                                    FD
                                </MenuItem>
                                <MenuItem key='RD' value='RD' onClick={() => inputObj["type"] = 'RD'}>
                                    RD
                                </MenuItem>
                            </TextField>
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel sx={{left:"15px"}} htmlFor="component-simple">Amount</InputLabel>
                            <Input type="number" id="component-simple" defaultValue="" onChange={(e) => inputObj['amount'] = e.currentTarget.value}/>
                        </FormControl>
                        <Button variant="contained" onClick={handleFormSubmit}>Submit</Button>
                    </Box>
                </CustomModal>
            }
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Deposit Type</TableCell>
                            <TableCell>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {depositData?.length > 0 ? 
                            depositData.map((deposit:any) => (
                                <TableRow
                                    key={deposit.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{deposit.name}</TableCell>
                                    <TableCell>{deposit.email}</TableCell>
                                    <TableCell>{deposit.type}</TableCell>
                                    <TableCell>{deposit.amount}</TableCell>
                                </TableRow>
                            ))
                        :
                            <Typography>No Deposits Available</Typography>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default Transaction;