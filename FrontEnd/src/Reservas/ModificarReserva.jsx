import { useState } from "react";
import axios from "axios";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { Field } from "../components/ui/field";

function ModificarReserva({ setReservas, setMostrarFormularioModificar }) {
    const [modificarReserva, setModificarReserva] = useState({
        reserva_id: 0,
        cancha_id: 0,
        fecha: "",
        hora: "",
        duracion: 0,
        telefono: "",
        nombre_contacto: "",
    });
    const [error, setError] = useState(null);

    const handleModificarReserva = () => {
        const { reserva_id, cancha_id, fecha, duracion, telefono, nombre_contacto } = modificarReserva;

        if (!reserva_id || !cancha_id || !fecha || !duracion || !telefono || !nombre_contacto) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        // Llamada a la API
        axios
            .put(`http://localhost:8000/reservas/${reserva_id}`, {
                cancha_id,
                fecha,
                hora: modificarReserva.hora,
                duracion,
                telefono,
                nombre_contacto,
            })
            .then((response) => {
                setReservas((prev) =>
                    prev.map((reserva) =>
                        reserva.id === reserva_id ? response.data : reserva
                    )
                );
                setMostrarFormularioModificar(false);
                setError(null);
            })
            .catch((error) => {
                if (error.response && error.response.status === 500) {
                    setError("Ya existe una reserva en esa cancha para ese horario.");
                } else if (error.response && error.response.status === 404) {
                    setError("Reserva no encontrada.");
                } else {
                    setError("Ya existe una reserva en esa cancha para ese horario.");
                }
            });
    };

    return (
        <div>
            <Text fontSize="2xl" mb={4}>
                Modificar Reserva
            </Text>

            <Field invalid={error}>
                <Text>ID de la Reserva</Text>
                <Input
                    type="number"
                    name="reserva_id"
                    value={modificarReserva.reserva_id}
                    onChange={(e) =>
                        setModificarReserva((prev) => ({
                            ...prev,
                            reserva_id: parseInt(e.target.value),
                        }))
                    }
                    placeholder="ID de la Reserva"
                />
            </Field>

            <Field>
                <Text>Cancha nro</Text>
                <Input
                    type="number"
                    name="cancha_id"
                    value={modificarReserva.cancha_id}
                    onChange={(e) =>
                        setModificarReserva((prev) => ({
                            ...prev,
                            cancha_id: parseInt(e.target.value),
                        }))
                    }
                    placeholder="ID de la Cancha"
                />
            </Field>

            <Field>
                <Text>Fecha</Text>
                <Input
                    type="date"
                    name="fecha"
                    value={modificarReserva.fecha}
                    onChange={(e) =>
                        setModificarReserva((prev) => ({
                            ...prev,
                            fecha: e.target.value,
                        }))
                    }
                />
            </Field>

            <Field>
                <Text>Hora</Text>
                <Input
                    type="time"
                    name="hora"
                    value={modificarReserva.hora}
                    onChange={(e) =>
                        setModificarReserva((prev) => ({
                            ...prev,
                            hora: e.target.value,
                        }))
                    }
                />
            </Field>

            <Field>
                <Text>Duración (en horas)</Text>
                <Input
                    type="number"
                    name="duracion"
                    value={modificarReserva.duracion}
                    onChange={(e) =>
                        setModificarReserva((prev) => ({
                            ...prev,
                            duracion: parseInt(e.target.value),
                        }))
                    }
                    placeholder="Duración"
                />
            </Field>

            <Field>
                <Text>Teléfono</Text>
                <Input
                    type="text"
                    name="telefono"
                    value={modificarReserva.telefono}
                    onChange={(e) =>
                        setModificarReserva((prev) => ({
                            ...prev,
                            telefono: e.target.value,
                        }))
                    }
                    placeholder="Teléfono"
                />
            </Field>

            <Field>
                <Text>Nombre de Contacto</Text>
                <Input
                    type="text"
                    name="nombre_contacto"
                    value={modificarReserva.nombre_contacto}
                    onChange={(e) =>
                        setModificarReserva((prev) => ({
                            ...prev,
                            nombre_contacto: e.target.value,
                        }))
                    }
                    placeholder="Nombre de Contacto"
                />
            </Field>

            {error && (
                <Text color="red.500" mt={2}>
                    {error}
                </Text>
            )}

            <Flex justifyContent="center" mt={4}>
                <Button colorScheme="blue" onClick={handleModificarReserva}>
                    Guardar Cambios
                </Button>
                <Button ml={4} onClick={() => setMostrarFormularioModificar(false)}>
                    Cancelar
                </Button>
            </Flex>
        </div>
    );
}

export default ModificarReserva;