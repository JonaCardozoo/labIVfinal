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

function Reservas() {
    const [reservas, setReservas] = useState([]);
    const [reservasOriginales, setReservasOriginales] = useState([]);
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
                console.log(error);
            });
    }, []);

    // Cargar todas las reservas iniciales
    useEffect(() => {
        axios
            .get("http://localhost:8000/reservas")
            .then((response) => {
                setReservas(response.data);
                setReservasOriginales(response.data);
                setReservasFiltradas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Filtrar reservas
    const filtrarReservas = (cancha_id, fecha) => {
        // Si no hay filtros, mostrar todas las reservas originales
        if (!fecha && !cancha_id) {
            setReservasFiltradas(reservasOriginales);
            return;
        }

        // Construir URL dinámica para la API
        let url = "http://localhost:8000/reservas";
        if (cancha_id && fecha) {
            url += `/${cancha_id}/${fecha}`;
        } else if (cancha_id) {
            url += `/${cancha_id}`;
        } else if (fecha) {
            url += `/fecha/${fecha}`;
        }

        // Realizar la solicitud con los filtros
        axios
            .get(url)
            .then((response) => {
                setReservasFiltradas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Flex direction={"column"} justifyContent={"center"} align="center">
                <Text textStyle={"6xl"} textAlign={"center"} m={10}>
                    Reservas
                </Text>
                <Flex gap={10}>
                    <NativeSelectRoot gap={4}>
                        <Input
                            type="date"
                            value={fechaBusqueda}
                            onChange={(e) => {
                                const nuevaFecha = e.target.value;
                                setFechaBusqueda(nuevaFecha);
                                filtrarReservas(canchaBusqueda, nuevaFecha);
                            }}
                            placeholder="Fecha"
                        />
                        <NativeSelectField
                            placeholder="Seleccionar Cancha"
                            value={canchaBusqueda}
                            onChange={(e) => {
                                const nuevaCancha = e.target.value; // "" si se selecciona "Todas las canchas"
                                setCanchaBusqueda(nuevaCancha);
                                filtrarReservas(nuevaCancha, fechaBusqueda);
                            }}
                            backgroundColor="black"
                        >
                            <option value="">Todas las canchas</option> {/* Esta opción tiene valor "" */}
                            {canchas.map((cancha) => (
                                <option key={cancha.id} value={cancha.id}>
                                    {cancha.nombre}
                                </option>
                            ))}
                        </NativeSelectField>

                    </NativeSelectRoot>
                </Flex>

                {reservasFiltradas && reservasFiltradas.length > 0 ? (
                    <Table.Root size="sm" width={"40%"}>
                        <Table.Header>
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
                        <Table.Body>
                            {reservasFiltradas.map((reserva) => (
                                <Table.Row key={reserva.id}>
                                    <Table.Cell>{reserva.fecha}</Table.Cell>
                                    <Table.Cell>{reserva.hora}</Table.Cell>
                                    <Table.Cell>{reserva.duracion}{"hs"}</Table.Cell>
                                    <Table.Cell>{reserva.telefono}</Table.Cell>
                                    <Table.Cell>{reserva.nombre_contacto}</Table.Cell>
                                    <Table.Cell>{"Nro "}{reserva.cancha_id}</Table.Cell>
                                    <Table.Cell>{reserva.id}</Table.Cell>
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
                    />
                )}
            </Flex>
        </div>
    );
}

export default Reservas;
