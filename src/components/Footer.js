import React from "react";
import { Container, Grid, Typography } from "@mui/material";

function Footer() {
    return (
        <footer>
            <Container>
                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item>
                        <Typography variant="body1" color="text.secondary" align="center">
                            Copyright &copy; FooTshop
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;
