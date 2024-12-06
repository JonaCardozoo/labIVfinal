import { useState } from "react";
import axios from "axios";
import { Button, Input, Text, Flex } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Checkbox } from "../components/ui/checkbox";
import { toaster } from "../components/ui/toaster";
import { Radio, RadioGroup } from "../components/ui/radio";

function AgregarCancha({ setCanchas, setMostrarFormulario }) {
    const [nuevaCancha, setNuevaCancha] = useState({
        id: null,
        nombre: "",
        techada: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaCancha((prev) => ({
            ...prev,
            [name]: name === "id" ? parseInt(value) : value,
        }));
    };

    const handleCheckboxChange = (techadaValue) => {
        setNuevaCancha((prev) => ({
            ...prev,
            techada: prev.techada === techadaValue ? null : techadaValue,
        }));
    };

    const handleAgregarCancha = () => {
        if (!nuevaCancha.nombre) {
            toaster.error({
                title: "El nombre de la cancha es obligatorio.",
                status: "error",
                duration: 3000,
            });
            return;
        }
        if (nuevaCancha.techada === null) {
            toaster.error({
                title: "Debe seleccionar si la cancha es techada o no.",
                status: "error",
                duration: 3000,
            });
            return;
        }

        axios
            .post("http://localhost:8000/canchas", nuevaCancha)
            .then((response) => {
                setCanchas((prev) => [...prev, response.data.cancha]);
                setMostrarFormulario(false);
                setNuevaCancha({ id: null, nombre: "", techada: null });

                toaster.success({
                    title: "Cancha agregada",
                    status: "success",
                    duration: 3000,
                });
            })
            .catch((error) => {
                const errorMessage =
                    error.response?.data?.message || "Ya existe una cancha con ese nombre.";
                toaster.error({
                    title: `Error: ${errorMessage}`,
                    status: "error",
                    duration: 3000,
                });
            });
    };

    return (
        <Flex direction="column" align="center" mt={5}>
            <Field>
                <Text>Número de cancha</Text>
                <Input
                    type="number"
                    name="id"
                    value={nuevaCancha.id || ""}
                    onChange={handleChange}
                    placeholder="Número de la cancha"
                />
            </Field>
            <Field>
                <Text>Nombre</Text>
                <Input
                    type="text"
                    name="nombre"
                    value={nuevaCancha.nombre}
                    onChange={handleChange}
                    placeholder="Nombre de la cancha"
                />
            </Field>
            <RadioGroup>
                <Flex direction="row" gap={5} mt={4}>
                    <Text>Techada</Text>
                    <Radio
                        name="techada"
                        value="true"
                        checked={nuevaCancha.techada === true}
                        onChange={() => handleCheckboxChange(true)}
                    ></Radio>
                    <Text>No es techada</Text>
                    <Radio
                        name="techada"
                        value="false"
                        checked={nuevaCancha.techada === false}
                        onChange={() => handleCheckboxChange(false)}
                    ></Radio>
                </Flex>
            </RadioGroup>


            <Button onClick={handleAgregarCancha} mt={4}>
                Agregar Cancha
            </Button>
        </Flex>
    );
}

export default AgregarCancha;
