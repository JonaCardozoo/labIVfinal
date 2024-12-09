import axios from "axios";
import { useState, useEffect } from "react";
import { Text, Button, Flex, Table, Input } from "@chakra-ui/react";
import AgregarReserva from "./AgregarReserva";
import ModificarReserva from "./ModificarReserva";
import BorrarReserva from "./BorrarReserva";
import {
    NativeSelectField,
    NativeSelectRoot,
} from "../components/ui/native-select";
import "../index.css"

function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [reservasFiltradas, setReservasFiltradas] = useState([]);
    const [canchas, setCanchas] = useState([]);
    const [fechaBusqueda, setFechaBusqueda] = useState("");
    const [canchaBusqueda, setCanchaBusqueda] = useState("");
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarFormularioModificar, setMostrarFormularioModificar] = useState(false);
    const [mostrarFormularioBorrar, setMostrarFormularioBorrar] = useState(false);

    // Cargar las canchas disponibles
    useEffect(() => {
        axios
            .get("http://localhost:8000/canchas")
            .then((response) => {
                setCanchas(response.data);
            })
            .catch((error) => {
                console.log("Error al cargar las canchas:", error);
            });
    }, []);

    // Cargar todas las reservas iniciales
    useEffect(() => {
        axios
            .get("http://localhost:8000/reservas")
            .then((response) => {
                setReservas(response.data);
                setReservasFiltradas(response.data); // Inicialmente, mostramos todas las reservas
            })
            .catch((error) => {
                console.log("Error al cargar las reservas:", error);
            });
    }, []);

    const borrarFiltro = () => {
        setReservasFiltradas(reservas);
        setFechaBusqueda("");
        setCanchaBusqueda("");
    };

    // Filtrar reservas
    const handleFiltrarReservas = async () => {
        if (!fechaBusqueda || !canchaBusqueda) {
            alert("Por favor, selecciona tanto una fecha como una cancha.");
            return;
        }

        try {
            let url = "http://localhost:8000/reservas";
            if (canchaBusqueda && fechaBusqueda) {
                url += `/${canchaBusqueda}/${fechaBusqueda}`;
            } else if (canchaBusqueda) {
                url += `/${canchaBusqueda}`;
                // } else if (fechaBusqueda) {
                //     url += `/fecha/${fechaBusqueda}`;
                // }
            }
            const response = await axios.get(url);
            setReservasFiltradas(response.data);
        } catch (error) {
            console.error("Error al filtrar reservas:", error);
            alert("Ocurrió un error al filtrar las reservas. Por favor, inténtalo nuevamente.");
        }
    };

    return (
        <div>
            <Flex direction={"column"} justifyContent={"center"} align="center" color={"aliceblue"}>
                <Text textStyle={"6xl"} textAlign={"center"} m={10}>
                    Reservas
                </Text>
                <Flex gap={10}>
                    <NativeSelectRoot gap={4} >
                        <Input
                            type="date"
                            value={fechaBusqueda}
                            onChange={(e) => { setFechaBusqueda(e.target.value); console.log(e.target.value) }}
                            placeholder="Fecha"
                        />
                        <NativeSelectField
                            placeholder="Seleccionar Cancha"
                            value={canchaBusqueda}
                            onChange={(e) => { setCanchaBusqueda(e.target.value); console.log(e.target.value) }}
                            backgroundColor="black"
                        >
                            {canchas.map((cancha) => (
                                <option key={cancha.id} value={cancha.id}>
                                    {cancha.nombre}
                                </option>
                            ))}
                        </NativeSelectField>
                    </NativeSelectRoot>

                    <Button bg={"white"} color={"black"} onClick={handleFiltrarReservas}>Filtrar</Button>
                    <Button bg={"white"} color={"black"} onClick={borrarFiltro}>Borrar filtro</Button>
                </Flex>

                {reservasFiltradas && reservasFiltradas.length > 0 ? (
                    <Table.Root size="sm" width={"40%"} color={"aliceblue"}>
                        <Table.Header >
                            <Table.Row>
                                <Table.ColumnHeader>Fecha</Table.ColumnHeader>
                                <Table.ColumnHeader>Hora</Table.ColumnHeader>
                                <Table.ColumnHeader>Duración</Table.ColumnHeader>
                                <Table.ColumnHeader>Teléfono</Table.ColumnHeader>
                                <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                                <Table.ColumnHeader>Cancha</Table.ColumnHeader>
                                <Table.ColumnHeader>ID Reserva</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body >
                            {reservasFiltradas?.map((reserva) => (
                                <Table.Row bg={"black"} key={reserva?.id}>
                                    <Table.Cell>{reserva?.fecha}</Table.Cell>
                                    <Table.Cell>{reserva?.hora}</Table.Cell>
                                    <Table.Cell>{reserva?.duracion}{"hs"}</Table.Cell>
                                    <Table.Cell>{reserva?.telefono}</Table.Cell>
                                    <Table.Cell>{reserva?.nombre_contacto}</Table.Cell>
                                    <Table.Cell>{"Nro "}{reserva?.cancha_id}</Table.Cell>
                                    <Table.Cell>{reserva?.id}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                ) : (
                    <Text textAlign={"center"} mt={10}>
                        No hay reservas para esa fecha o cancha
                    </Text>
                )}

                <Flex direction="row" align="center" mt={5} gap={5}>
                    <Button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                        {mostrarFormulario ? "Cancelar" : "Agregar Reserva"}
                    </Button>

                    <Button onClick={() => setMostrarFormularioModificar(!mostrarFormularioModificar)}>
                        {mostrarFormularioModificar ? "Cancelar" : "Modificar Reserva"}
                    </Button>

                    <Button onClick={() => setMostrarFormularioBorrar(!mostrarFormularioBorrar)}>
                        {mostrarFormularioBorrar ? "Cancelar" : "Borrar Reserva"}
                    </Button>
                </Flex>

                {mostrarFormularioBorrar && <BorrarReserva setReservas={setReservas} />}
                {mostrarFormularioModificar && <ModificarReserva setReservas={setReservas} />}
                {mostrarFormulario && (
                    <AgregarReserva
                        setReservas={setReservas}
                        setMostrarFormulario={setMostrarFormulario}
                        setReservasFiltradas={setReservasFiltradas}
                    />
                )}
            </Flex>
        </div>
    );
}

export default Reservas;
