import { useState } from "react";
import axios from "axios";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { Field } from "../components/ui/field";

function BorrarReserva({ setReservas, setMostrarFormularioEliminar }) {
    const [borrarReserva, setBorrarReserva] = useState({
        reserva_id: 0
    });
    const [error, setError] = useState(null);

    const handleBorrarReserva = () => {
        const { reserva_id } = borrarReserva;

        if (!reserva_id) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        // Llamada a la API
        axios
            .delete(`http://localhost:8000/reservas/${reserva_id}`)
            .then((response) => {
                setReservas((prev) =>
                    prev.filter((reserva) => reserva.id !== reserva_id)
                );
                setMostrarFormularioEliminar(false);
                setError(null);
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    setError("Hubo un error al borrar la reserva.");
                }
            });
    };

    return (
        <div>
            <Text fontSize="2xl" mb={4}>
                Borrar Reserva
            </Text>

            <Field invalid={error}>
                <Text>ID de la Reserva</Text>
                <Input
                    type="number"
                    name="reserva_id"
                    value={borrarReserva.reserva_id}
                    onChange={(e) =>
                        setBorrarReserva((prev) => ({
                            ...prev,
                            reserva_id: parseInt(e.target.value),
                        }))
                    }
                    placeholder="ID de la Reserva"
                />
            </Field>

            {error && (
                <Text color="red.500" mt={2}>
                    {error}
                </Text>
            )}

            <Flex justifyContent="center" mt={4}>
                <Button colorScheme="blue" onClick={handleBorrarReserva}>
                    Borrar Reserva
                </Button>
                <Button ml={4} onClick={() => setMostrarFormularioEliminar(false)}>
                    Cancelar
                </Button>
            </Flex>
        </div>
    );
}

export default BorrarReserva;