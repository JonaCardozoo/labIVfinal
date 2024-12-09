import React from 'react';
import { Box, Flex, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            h="90vh"
            bgGradient="linear(to-r, teal.700, gray.900)"
            color="white"
            p={4}
        >
            <Box maxW="600px">
                <Image
                    src="https://p.turbosquid.com/ts-thumb/7J/1olAm4/lUbTfm4N/tennis_racket_broken_thumbnail_0002/jpg/1589964315/600x600/fit_q87/6c86d83000a94eba1565ba8421b9916f7fc69368/tennis_racket_broken_thumbnail_0002.jpg" // Imagen funcional desde Flaticon
                    alt="Raqueta rota"
                    boxSize="250px"
                    mx="auto"
                    mb={8}
                    animation="float 3s ease-in-out infinite"
                    borderRadius={"50px"}
                />
                <Heading as="h1" fontSize="6xl" mb={4}>
                    404
                </Heading>
                <Text fontSize="xl" mb={6}>
                    ¡Oops! Esta cancha está fuera de juego...
                </Text>
                <Text fontSize="lg" mb={6}>
                    La página que buscas no está disponible. Intenta regresar al inicio o revisa tu URL.
                </Text>
                <Button
                    as={Link}
                    to="/"
                    colorScheme="yellow"
                    size="lg"
                    px={8}
                    _hover={{ bg: "yellow.400" }}
                >
                    Volver al Inicio
                </Button>
            </Box>
        </Flex>
    );
}

export default NotFound;
