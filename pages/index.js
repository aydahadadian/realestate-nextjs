import { Image } from '@chakra-ui/react';
import Link from "next/link";
import { Flex,Box,Text,Button} from '@chakra-ui/react';
import { baseUrl,fetchApi } from "../utils/fetchApi";
import Property from '../components/Property';
import Hero from '../components/Hero';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '300px',
  md: '700',
  lg: '1400',
 
})

export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap='wrap' justifyContent='spaceBetween' alignItems='center' m='10' bg="#eee" borderRadius="5px" overflow='hidden' objectFit="cover" flexDir={{ md: 'column',lg:'row'}}>
    <Image src={imageUrl} width={{ md: '100%', lg: '60%' }} height={{ sm: '50vh' ,md: '60vh', lg: '78vh' }}/>
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl' bg="#1E1E1E30" mt='10'>
        <Link href={linkName}><a>{buttonText}</a></Link>
      </Button>
    </Box>
  </Flex>
);


export default function Home({propertiesForSale,propertiesForRent}) {
  console.log(propertiesForSale,propertiesForRent)
  return (
    <Box>
      <Hero breakpoints={breakpoints}/>
      <Box>
     <Banner
      purpose='RENT A HOME'
      title1='Rental Homes for'
      title2='Everyone'
      desc1=' Explore from Apartments, builder floors, villas'
      desc2='and more'
      buttonText='Explore Renting'
      linkName='/search?purpose=for-rent'
      imageUrl='https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    />
    <Flex flexWrap='wrap' justifyContent="center">
      {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
    <Banner
      purpose='BUY A HOME'
      title1=' Find, Buy & Own Your'
      title2='Dream Home'
      desc1=' Explore from Apartments, land, builder floors,'
      desc2=' villas and more'
      buttonText='Explore Buying'
      linkName='/search?purpose=for-sale'
      imageUrl='https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=865&q=80'
    />
       <Flex flexWrap='wrap' justifyContent="center">
      {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
    </Flex>

    </Box>
    </Box>
  
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}