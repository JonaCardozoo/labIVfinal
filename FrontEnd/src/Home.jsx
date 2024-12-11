import { Text } from "@chakra-ui/react"
import Carousel from "./Carousel"
function Home() {
    return (
        <>

            <Text textStyle={"6xl"} textAlign={"center"} color={'white'} m={10}>Bienvenido!</Text>
            <Carousel></Carousel>
        </>
    )
}

export default Home