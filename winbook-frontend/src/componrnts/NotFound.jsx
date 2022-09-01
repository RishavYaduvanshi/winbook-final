import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Grid } from '@mui/material';
import error from '../resources/error.png';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://winbook.d3m0n1k.engineer/">
                WinBook
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function StickyFooter() {
    return (
        <Grid
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundImage: 'url(https://wallpapercave.com/wp/wp3354898.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <CssBaseline />
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom color={'white'}>
                    Error 404
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom color={'white'}>
                    {'Seems there is nothing here.'}</Typography>
                    <Typography variant="h5" component="h2" gutterBottom color={'white'}>
                    {'The Content you are looking for is not found.'}</Typography>
                <img src={error} alt="error" height={200} width={300} 
                />
            </Container>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        You can visit the login page from below link..
                    </Typography>
                    <Copyright />
                </Container>
            </Box>
        </Grid>
    );
}