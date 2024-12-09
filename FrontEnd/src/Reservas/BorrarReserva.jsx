import { useState } from "react";
import axios from "axios";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { toaster } from "../components/ui/toaster";

function BorrarReserva({ setReservas, setMostrarFormularioEliminar }) {
    const [borrarReserva, setBorrarReserva] = useState({
        reserva_id: 0
    });
    const [error] = useState(null);

    const handleBorrarReserva = () => {
        const { reserva_id } = borrarReserva;

        if (!reserva_id) {
            toaster.error({
                title: "Todos los campos son obligatorios.",
                status: "error",
                duration: 3000,
            });
            return;
        }

        axios
            .delete(`http://localhost:8000/reservas/${reserva_id}`)
            .then(() => {
                setReservas((prev) =>
                    prev.filter((reserva) => reserva.id !== reserva_id)
                );

                toaster.success({
                    title: "Reserva borrada con exito",
                    status: "success",
                    duration: 3000,
                });
                window.location.reload();

                setMostrarFormularioEliminar(false);

            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    toaster.error({
                        title: "Reserva no encontrada.",
                        status: "error",
                        duration: 3000,
                    });
                }
            });
    };

    return (
        <div>
            <Flex direction={"column"} color={"white"} justifyContent={"center"} align={"center"}>

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
            </Flex>

            <Flex justifyContent="center" mt={4}>
                <Button bg={"white"} color={"black"} onClick={handleBorrarReserva}>
                    Borrar Reserva
                </Button>
            </Flex>
        </div>
    );
}

export default BorrarReserva;