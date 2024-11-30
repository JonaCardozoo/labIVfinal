// Reservas.js

import axios from "axios";
import { useState, useEffect } from "react";
import { Text, Button, Flex, Table } from "@chakra-ui/react";
import AgregarReserva from "./AgregarReserva";


function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8000/reservas")
            .then((response) => {
                setReservas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    return (
        <div>
            <Flex direction={"column"} justifyContent={"center"} align="center">
                <Text textStyle={"6xl"} textAlign={"center"} m={10}>Reservas</Text>
                <Table.Root size="sm" width={"30%"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>Fecha</Table.ColumnHeader>
                            <Table.ColumnHeader>Hora</Table.ColumnHeader>
                            <Table.ColumnHeader>Duración</Table.ColumnHeader>
                            <Table.ColumnHeader>Telefono</Table.ColumnHeader>
                            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                            <Table.ColumnHeader>Cancha</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {reservas.map((reserva) => (
                            <Table.Row key={reserva.id}>
                                <Table.Cell>{reserva.fecha}</Table.Cell>
                                <Table.Cell>{reserva.hora}</Table.Cell>
                                <Table.Cell>{reserva.duracion}{" hs"}</Table.Cell>
                                <Table.Cell>{reserva.telefono}</Table.Cell>
                                <Table.Cell>{reserva.nombre_contacto}</Table.Cell>
                                <Table.Cell>{reserva.cancha_id}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>

                <Flex direction="column" align="center" mt={5}>
                    {/* Ya no necesitas el Link aquí */}
                    <Button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                        {mostrarFormulario ? "Cancelar" : "Agregar Reserva"}
                    </Button>
                </Flex>

                {/* Mostrar el formulario solo si `mostrarFormulario` es true */}
                {mostrarFormulario && <AgregarReserva setReservas={setReservas} setMostrarFormulario={setMostrarFormulario} />}
            </Flex>
        </div>
    );
}

export default Reservas;
