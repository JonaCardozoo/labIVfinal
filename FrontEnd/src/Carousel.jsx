// The error suggests that the issue is related to `Symbol.iterator` being accessed on a value that is not iterable.
// Let's refactor the component with corrections and checks.

'use client';

import React from 'react';
import {
    Box,
    IconButton,
    useBreakpointValue,
    Stack,
    Heading,
    Text,
    Container,
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';

// Settings for the slider
const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function CaptionCarousel() {
    const [slider, setSlider] = React.useState(null);

    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });

    // Carousel data
    const cards = [
        {
            title: 'Canchas techadas',
            text: "disfruta de las canchas techadas",
            image:
                'https://scontent.fros2-1.fna.fbcdn.net/v/t39.30808-6/257463773_4691254064230538_8681578396484356022_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=3a1ebe&_nc_eui2=AeEWtcnrCldOdlav86rFCLZy4Absp4KGurHgBuyngoa6sQjhRJilgNsdmr3WKlUdBsvupvyTPhBvnAvC2WJG7l1T&_nc_ohc=yWDplE9-xj0Q7kNvgGrwzrv&_nc_zt=23&_nc_ht=scontent.fros2-1.fna&_nc_gid=Aiqnn6f8bA1WNfsxFrcA3XI&oh=00_AYAnTmskp60tSyFuSQfjDniqkPpLmsz9LcNABju4iW7gGQ&oe=675EBEF1',
        },
        {
            title: 'Canchas sin techar',
            text: "disfruta de las canchas sin techar",
            image:
                'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/PETRTNQVQBHJRCDS3B6RF7IJK4.jpg',
        },
    ];

    return (
        <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'} marginTop={'30px'} borderRadius={'10px'}>
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            {/* Left Icon */}
            <IconButton
                aria-label="left-arrow"
                variant="ghost"
                position="absolute"
                left={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickPrev()}
            >
                <BiLeftArrowAlt size="40px" />
            </IconButton>
            {/* Right Icon */}
            <IconButton
                aria-label="right-arrow"
                variant="ghost"
                position="absolute"
                right={side}
                top={top}
                transform={'translate(0%, -50%)'}
                zIndex={2}
                onClick={() => slider?.slickNext()}
            >
                <BiRightArrowAlt size="40px" />
            </IconButton>
            {/* Slider */}
            <Slider {...settings} ref={setSlider}>
                {cards.map((card, index) => (
                    <Box
                        key={index}
                        position="relative"
                        backgroundPosition="center"
                        backgroundSize="cover"
                        backgroundImage={`url(${card.image})`}

                    >
                        <Container size="container.lg" height="600px" position="relative">
                            <Stack
                                spacing={6}
                                w={'full'}
                                maxW={'lg'}
                                position="absolute"
                                top="50%"
                                transform="translate(0, -50%)"
                            >
                                <Heading color={"white"} fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                                    {card.title}
                                </Heading>
                                <Text fontSize={{ base: 'md', lg: 'lg' }} color="white" fontWeight="bold">
                                    {card.text}
                                </Text>
                            </Stack>
                        </Container>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}