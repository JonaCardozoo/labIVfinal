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
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [fechaBusqueda, setFechaBusqueda] = useState("");
    const [canchaBusqueda, setCanchaBusqueda] = useState("");
    const [mostrarFormularioModificar, setMostrarFormularioModificar] = useState(false);
    const [mostrarFormularioBorrar, setMostrarFormularioBorrar] = useState(false);
    const [reservasOriginales, setReservasOriginales] = useState([]);
    const [reservasFiltradas, setReservasFiltradas] = useState([]);  // Definir como estado

    useEffect(() => {
        axios
            .get("http://localhost:8000/reservas")
            .then((response) => {
                setReservas(response.data);
                setReservasOriginales(response.data);
                setReservasFiltradas(response.data);  // Inicializar también en reservasFiltradas
                setMostrarFormulario(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleBuscarPorFechaYCancha = () => {
        const reservasFiltradas = reservasOriginales.filter((reserva) => {
            const coincideFecha = !fechaBusqueda || reserva.fecha === fechaBusqueda;
            const coincideCancha = !canchaBusqueda || reserva.cancha_id === (parseInt(canchaBusqueda, 10));
            return coincideFecha && coincideCancha;
        });
        setReservasFiltradas(reservasFiltradas);
    };

    return (
        <div>
            <Flex direction={"column"} justifyContent={"center"} align="center">
                <Text textStyle={"6xl"} textAlign={"center"} m={10}>Reservas</Text>
                <Flex gap={10}>
                    <NativeSelectRoot gap={4}>
                        <Input
                            type="date"
                            value={fechaBusqueda}
                            onChange={(e) => setFechaBusqueda(e.target.value)}
                            placeholder="Fecha"
                        />
                        <NativeSelectField
                            placeholder="Seleccionar Cancha"
                            value={canchaBusqueda}
                            onChange={(e) => setCanchaBusqueda(e.target.value)}
                            backgroundColor="black"
                        >
                            <option value="">Todas las canchas</option>
                            <option value="1">Cancha 1</option>
                            <option value="2">Cancha 2</option>
                            <option value="3">Cancha 3</option>
                        </NativeSelectField>
                    </NativeSelectRoot>
                    <Button onClick={handleBuscarPorFechaYCancha}>
                        Buscar
                    </Button>
                </Flex>

                {reservasFiltradas && reservasFiltradas.length > 0 ? (
                    <Table.Root size="sm" width={"40%"}>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Fecha</Table.ColumnHeader>
                                <Table.ColumnHeader>Hora</Table.ColumnHeader>
                                <Table.ColumnHeader>Duración</Table.ColumnHeader>
                                <Table.ColumnHeader>Telefono</Table.ColumnHeader>
                                <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                                <Table.ColumnHeader>Cancha</Table.ColumnHeader>
                                <Table.ColumnHeader>ID reserva</Table.ColumnHeader>
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
                    <Text textAlign={"center"} mt={10}>No hay reservas para esa fecha o cancha</Text>
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
                {mostrarFormulario && <AgregarReserva setReservas={setReservas} setMostrarFormulario={setMostrarFormulario} />}
            </Flex>
        </div>
    );
}

export default Reservas;
