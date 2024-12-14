import React from 'react';
import { Box, Flex, Link, Image } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import "./index.css";

const Navbar = () => {

    return (
        <Box
            as="nav"
            bg="black"
            p={4}
            marginTop={2}
            borderRadius="50px"
            mx="auto"
            maxWidth="600px"
            backgroundColor={'transparent'}
            boxShadow={'0 0 10px white'}

        >
            <Flex align="center" justify="space-between" wrap="wrap" >
                <Flex align="center" gap={2}>
                    <Link as={RouterLink} to="/">
                        <Image w="50px" src='/padel.png' alt="Logo" />
                    </Link>
                </Flex>

                <Flex gap={8}>
                    <Link as={RouterLink} to="/" color="white"  >Inicio</Link>
                    <Link as={RouterLink} to="/canchas" color="white"  >Gestionar canchas</Link>
                    <Link as={RouterLink} to="/reservas" color="white"  >Gestionar reservas</Link>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Navbar;
