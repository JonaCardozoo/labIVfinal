import React from 'react';
import { Box, Flex, Link, Spacer, Image } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {

    return (
        <Box as="nav" bg="black" boxShadow={"0 0 5px white"} color="white" p={4}>
            <Flex align="center" justify="space-between" wrap="wrap">
                <Image w={"50px"} src='/padel.png'></Image>

                <Spacer />
                <Flex gap={6}>
                    <Link as={RouterLink} to="/" _hover={{ textDecoration: 'underline' }}>Inicio</Link>
                    <Link as={RouterLink} to="/canchas" _hover={{ textDecoration: 'underline' }}>Cancha</Link>
                    <Link as={RouterLink} to="/reservas" _hover={{ textDecoration: 'underline' }}>Reservas</Link>
                </Flex>

            </Flex>
        </Box>
    );
};

export default Navbar;
