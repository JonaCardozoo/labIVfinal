import React from 'react';
import { Box, Flex, Text, Button, Link, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {

    return (
        <Box as="nav" bg="teal.500" color="white" p={4}>
            <Flex align="center" justify="space-between" wrap="wrap">
                <Text fontSize="xl" fontWeight="bold">Reservas Paddle</Text>

                <Spacer />
                <Flex gap={6}>
                    <Link as={RouterLink} to="/" _hover={{ textDecoration: 'underline' }}>Inicio</Link>
                    <Link as={RouterLink} to="/canchas" _hover={{ textDecoration: 'underline' }}>Cancha</Link>
                    <Link as={RouterLink} to="/reservas" _hover={{ textDecoration: 'underline' }}>Reservas</Link>
                    <Link to="#consultar" _hover={{ textDecoration: 'underline' }}>Consultar</Link>
                </Flex>

            </Flex>
        </Box>
    );
};

export default Navbar;
