import React from 'react';
import { Box, Flex, Link, Image } from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {

    return (
        <Box as="nav" bg="white" boxShadow={"0 0 5px white"} p={4}>
            <Flex align="center" justify="space-between" wrap="wrap">
                <Link as={RouterLink} to="/" _hover={{ textDecoration: 'underline' }} color={'black'}>
                    <Image w={"50px"} src='/padel.png'></Image>
                </Link>

                <Flex gap={6}>
                    <Link as={RouterLink} to="/" _hover={{ textDecoration: 'underline' }} color={'black'} >Inicio</Link>
                    <Link as={RouterLink} to="/canchas" _hover={{ textDecoration: 'underline' }} color={'black'}>Cancha</Link>
                    <Link as={RouterLink} to="/reservas" _hover={{ textDecoration: 'underline' }} color={'black'}>Reservas</Link>
                </Flex>

            </Flex>
        </Box>
    );
};

export default Navbar;
