import { useState } from "react";
import axios from "axios";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Checkbox } from "../components/ui/checkbox";

function AgregarCancha({ setCanchas, setMostrarFormulario }) {
    const [nuevaCancha, setNuevaCancha] = useState({
        id: 0,
        nombre: "",
        techada: null, //para representar que no se ha seleccionado una opción
    });
    const [error, setError] = useState(null);

    const handleCheckboxChange = (techadaValue) => {
        setNuevaCancha((prev) => ({
            ...prev,
            techada: techadaValue,
        }));
    };

    const handleAgregarCancha = () => {
        if (!nuevaCancha.nombre) {
            setError("El nombre de la cancha es obligatorio.");
            return;
        }
        if (nuevaCancha.techada === null) {
            setError("Debe seleccionar si la cancha es techada o no.");
            return;
        }

        axios
            .post("http://localhost:8000/canchas", nuevaCancha)
            .then((response) => {
                setCanchas((prev) => [...prev, response.data]);
                setMostrarFormulario(false);
                setNuevaCancha({
                    nombre: "",
                    techada: null,
                });
                setError(null);
            })
            .catch((error) => {
                console.error("Error al agregar cancha:", error); // Imprime el error completo en la consola

                if (error.response) {
                    console.log("Datos de respuesta del error:", error.response.data);
                    if (error.response.status === 500) {
                        setError("Ya existe una cancha con ese nombre.");
                    } else {
                        setError(`Error: ${error.response.data.message || "No se pudo agregar la cancha."}`);
                    }
                } else {
                    setError("Hubo un error al agregar la cancha.");
                }
            });

    };

    return (
        <Flex direction="column" align="center" mt={5}>
            <Field invalid={error}>
                <Field invalid={error}>
                    <Text>Numero de cancha</Text>
                    <Input
                        type="number"
                        name="numero"
                        value={nuevaCancha.id}
                        onChange={(e) =>
                            setNuevaCancha((prev) => ({
                                ...prev,
                                id: parseInt(e.target.value),
                            }))
                        }
                        placeholder="Número de la cancha"
                    />
                </Field>
                <Text>Nombre</Text>
                <Input
                    type="text"
                    name="nombre"
                    value={nuevaCancha.nombre}
                    placeholder="Nombre de la cancha"
                    onChange={(e) =>
                        setNuevaCancha((prev) => ({
                            ...prev, //Copia el objeto anterior
                            nombre: e.target.value, //Asigna el valor al campo actualizado
                        }))
                    }
                />
            </Field>
            <Flex direction="row" gap={5} mt={4}>
                <Checkbox
                    label="Es techada"
                    isChecked={nuevaCancha.techada === true}
                    onChange={() => handleCheckboxChange(true)}
                >
                    Es techada
                </Checkbox>
                <Checkbox
                    label="No es techada"
                    isChecked={nuevaCancha.techada === false}
                    onChange={() => handleCheckboxChange(false)}
                >
                    No es techada
                </Checkbox>
            </Flex>

            <Button onClick={handleAgregarCancha} mt={4}>
                Agregar Cancha
            </Button>
            {error && <Text color="red.500" mt={2}>{error}</Text>}
        </Flex>
    );
}

export default AgregarCancha;