import { useState } from "react";
import axios from "axios";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { toaster } from "../components/ui/toaster";

function AgregarReserva({ setReservas, setMostrarFormulario, setReservasFiltradas }) {
    const [nuevaReserva, setNuevaReserva] = useState({
        fecha: "",
        hora: "",
        duracion: "",
        telefono: "",
        nombre_contacto: "",
        cancha_id: ""
    });
    const [error] = useState(null);

    // Cuando cambia un campo, actualiza el estado de la reserva
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaReserva((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAgregarReserva = () => {
        if (!nuevaReserva.fecha || !nuevaReserva.hora || !nuevaReserva.duracion || !nuevaReserva.telefono || !nuevaReserva.nombre_contacto || !nuevaReserva.cancha_id) {
            toaster.error({
                title: "Todos los campos son obligatorios.",
                status: "error",
                duration: 3000,
            });
            return;
        }

        if (nuevaReserva.duracion <= 0 || nuevaReserva.duracion > 3) {
            toaster.error({
                title: "La duración tiene que ser mayor a 0 y máximo de 3 horas.",
                status: "error",
                duration: 3000,
            });
            return;
        }

        axios
            .post("http://localhost:8000/reservas", nuevaReserva)
            .then((response) => {
                setReservas((prev) => [...prev, nuevaReserva]);
                setReservasFiltradas((prev) => [...prev, nuevaReserva]);
                setMostrarFormulario(false);

                setNuevaReserva({
                    fecha: "",
                    hora: "",
                    duracion: "",
                    telefono: "",
                    nombre_contacto: "",
                    cancha_id: ""
                });
                toaster.success({
                    title: "Reserva agregada con éxito",
                    status: "success",
                    duration: 3000,
                });
                window.location.reload();
            })
            .catch((error) => {
                if (error.response && error.response.status === 500) {
                    toaster.error({
                        title: "Ya existe una reserva en esa cancha para ese horario.",
                        status: "error",
                        duration: 3000,
                    });
                } else {
                    toaster.error({
                        title: "Hubo un error al agregar la reserva.",
                        status: "error",
                        duration: 3000,
                    });
                }
            });
    };
    1
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