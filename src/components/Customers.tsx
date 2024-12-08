import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Grid2, Paper, Typography } from "@mui/material";
import { useFetch } from "../hooks/FetchApi";
import Header from "./Header";
import { useState } from "react";
import { CustomerData } from "../interface/CustomerData";
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
};

const Customer = () => {
    const propsData = {
        url : "https://gist.githubusercontent.com/Caparico/e659762c877508040395/raw/6ecbd992dbb3167f5d6467785c78cafb7e35106f/Bank%2520Data%2520JSON",
        method: "GET"
    }
    const customerData = useFetch(propsData);
    const [modalOpen, setModalOpen] = useState(false)
    const [customer, setCustomer] = useState<CustomerData>()

    const handleModalOpen = (customer:CustomerData) => {
        setCustomer(customer);
        setModalOpen(true);
    }
    
    return (
        <React.Fragment>
            <Header />
            <Grid2 container size={{ xs: 4, sm: 8, md: 12, lg: 4}} spacing={2} sx={{paddingTop:"20px"}}>

            {customerData && customerData.map((customer, index) => (
                <React.Fragment key={index}>
                <Paper>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: 'red[500]' }}>
                                    R
                                </Avatar>
                            }
                            title={customer.name}
                            subheader={customer.isActive ? 'Active' : 'Not Active'}
                        />
                    </Card>
                    <CardContent sx={{maxWidth:"250px"}}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {customer.email}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {customer.gender}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {customer.balance}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {customer.address}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleModalOpen(customer) }>More Details</Button>
                    </CardActions>
                    </Paper>
              </React.Fragment>
            ))}
              </Grid2>
            {modalOpen && (
                 <CustomModal
                    open = {modalOpen}
                    setModal = {(bool:boolean) => setModalOpen(bool)}>
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {customer?.name}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                isActive: {customer?.isActive ? 'Active' : 'Inactive'} <br/>
                                balance: {customer?.balance} <br/>
                                age:{customer?.age} <br/>
                                eyeColor: {customer?.eyeColor} <br/>
                                gender: {customer?.gender} <br/>
                                company:{customer?.company} <br/>
                                email: {customer?.email} <br/>
                                phone: {customer?.phone} <br/>
                                address: {customer?.address} <br/>
                            </Typography>
                        </Box>
                </CustomModal>
            )}
        </React.Fragment>
    )
}

export default Customer;