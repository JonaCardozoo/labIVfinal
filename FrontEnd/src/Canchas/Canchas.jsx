import axios from "axios";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react"
import { Table } from "@chakra-ui/react"
import { Button, Flex } from "@chakra-ui/react"
import AgregarCancha from "./AgregarCancha";

function Canchas() {
    const [canchas, setCanchas] = useState([]);
    const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
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
            <Flex direction={"column"} justifyContent={"center"} align="center" color={"white"} >
                <Text textStyle={"6xl"} textAlign={"center"} m={10}>Canchas</Text>
                <Table.ScrollArea borderWidth="2px" rounded="md" height="300px" width={"100%"} overflowX={"auto"}>
                    <Table.Root size="sm" stickyHeader>
                        <Table.Header>
                            <Table.Row bg="bg.subtle">
                                <Table.ColumnHeader >Nombre</Table.ColumnHeader>
                                <Table.ColumnHeader >Techada</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign={"center"}>ID</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {canchas.map((canchas) => (
                                <Table.Row key={canchas.id}>
                                    <Table.Cell >{canchas.nombre}</Table.Cell>
                                    <Table.Cell >{canchas.techada ? "Si" : "No"}</Table.Cell>
                                    <Table.Cell textAlign={"center"}>{canchas.id}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
                <Flex direction={"row"} justifyContent={"center"} align="center" m={10} gap={5}>


                    <Button bg={"white"} color={"black"} onClick={() => setMostrarFormularioAgregar(!mostrarFormularioAgregar)}>
                        {mostrarFormularioAgregar ? "Cancelar" : "Agregar Cancha"}
                    </Button>

                    {mostrarFormularioAgregar && <AgregarCancha setCanchas={setCanchas} setMostrarFormulario={setMostrarFormularioAgregar} />}
                </Flex>
            </Flex>
        </div>
    );
}

export default Canchas;