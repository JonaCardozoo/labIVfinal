import axios from "axios";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react"
import { Table } from "@chakra-ui/react"
import { Button, Flex } from "@chakra-ui/react"

function Canchas() {
    const [canchas, setCanchas] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/canchas")
            .then((response) => {
                setCanchas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <Flex direction={"column"} justifyContent={"center"} align="center" >
                <Text textStyle={"6xl"} textAlign={"center"} m={10}>Canchas</Text>
                <Table.Root size="sm" width={"30%"}  >
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                            <Table.ColumnHeader>techada</Table.ColumnHeader>
                            <Table.ColumnHeader>Acciones</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {canchas.map((canchas) => (
                            <Table.Row key={canchas.id}>
                                <Table.Cell>{canchas.nombre}</Table.Cell>
                                <Table.Cell>{canchas.techada ? "Es techada" : "No es techada"}</Table.Cell>
                                <Table.Cell>
                                    <Button>Reservar</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Flex>
        </div>
    );
}

export default Canchas;