import { useState } from "react";
import axios from "axios";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { Field } from "../components/ui/field";

function AgregarReserva({ setReservas, setMostrarFormulario }) {
    const [nuevaReserva, setNuevaReserva] = useState({
        fecha: "",
        hora: "",
        duracion: "",
        telefono: "",
        nombre_contacto: "",
        cancha_id: ""
    });
    const [error, setError] = useState(null);

    // Cuando cambia un campo, actualiza el estado de la reserva
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaReserva((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAgregarReserva = () => {
        if (!nuevaReserva.fecha || !nuevaReserva.hora || !nuevaReserva.telefono || !nuevaReserva.nombre_contacto || !nuevaReserva.cancha_id) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        axios
            .post("http://localhost:8000/reservas", nuevaReserva)
            .then((response) => {
                // Actualizar el estado de reservas para agregar la nueva reserva
                setReservas((prev) => [...prev, response.data]);
                setMostrarFormulario(false);
                setNuevaReserva({
                    fecha: "",
                    hora: "",
                    duracion: "",
                    telefono: "",
                    nombre_contacto: "",
                    cancha_id: ""
                });
                setError(null);
            })
            .catch((error) => {
                if (error.response && error.response.status === 500) {
                    setError("Ya existe una reserva en esa cancha para ese horario.");
                } else {
                    setError("Hubo un error al agregar la reserva.");
                }
            });
    };

    return (
        <Flex direction="column" align="center" mt={5}>
            <Field invalid={error}>
                <Text>Fecha</Text>
                <Input
                    type="date"
                    name="fecha"
                    value={nuevaReserva.fecha}
                    onChange={handleChange}
                />
            </Field>
            <Field invalid={error}>
                <Text>Hora</Text>
                <Input
                    type="time"
                    name="hora"
                    value={nuevaReserva.hora}
                    onChange={handleChange}
                />
            </Field>
            <Field invalid={error}>
                <Text>Duración (hs)</Text>
                <Input
                    type="number"
                    name="duracion"
                    value={nuevaReserva.duracion}
                    onChange={handleChange}
                />
            </Field>
            <Field invalid={error}>
                <Text>Telefono</Text>
                <Input
                    type="text"
                    name="telefono"
                    value={nuevaReserva.telefono}
                    onChange={handleChange}
                />
            </Field>
            <Field invalid={error}>
                <Text>Nombre de Contacto</Text>
                <Input
                    type="text"
                    name="nombre_contacto"
                    value={nuevaReserva.nombre_contacto}
                    onChange={handleChange}
                />
            </Field>
            <Field invalid={error}>
                <Text>Cancha</Text>
                <Input
                    type="text"
                    name="cancha_id"
                    value={nuevaReserva.cancha_id}
                    onChange={handleChange}
                />
            </Field>
            <Button onClick={handleAgregarReserva} mt={4}>
                Agregar Reserva
            </Button>
            {error && <Text color="red.500">{error}</Text>}
        </Flex>
    );
}

export default AgregarReserva;
