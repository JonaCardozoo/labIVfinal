// MotionBox.jsx
import { chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Extiende el componente Chakra Box para aceptar animaciones de Framer Motion
const MotionBox = chakra(motion.div);

export default MotionBox;
