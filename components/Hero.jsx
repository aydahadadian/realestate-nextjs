import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import { Image } from '@chakra-ui/react'

import { filterData, getFilterValues } from '../utils/filterData';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/Images/noresult.svg';
import Navbar from './Navbar';
 

const Hero = () => {
   
    
    const [purpose, setPurpose] = useState('for-sale');
    const [searchTerm, setSearchTerm] = useState('');
    const [locationData, setLocationData] = useState();
    const [showLocations, setShowLocations] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  

    const searchProperties = (filterValues) => {
      
      const { query } = router;
  
      const values = getFilterValues(filterValues)
  
      values.forEach((item) => {
        if(item.value && filterValues?.[item.name]) {
          query[item.name] = item.value
        }
      })
  console.log({pathname: `/search`, query: query})
  console.log(filterValues)
      router.push({ pathname: `/search`, query: query });
    };
  
    useEffect(() => {
      if (searchTerm !== '') {
        const fetchData = async () => {
          setLoading(true);
          const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
          setLoading(false);
          setLocationData(data?.hits);
        };
  
        fetchData();
      }
    }, [searchTerm]);
  
    return (
      <Flex width="100%" height="100vh" justifyContent='center' position='relative'>
        {/* <Box width='100%' height='100%'> */}
        <Image src="https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"  objectFit="conver"  width='100%' height='100%' />
        {/* </Box> */}
        <Navbar position="absolute"/>
      <Flex p='4' justifyContent='center'  position='absolute' top='0' bottom='0' m="auto" height='30%'>
     
        <Flex flexDir='column' bg='#eeeeee6e' borderRadius='34px' padding="1rem 2rem">
       
         <Flex>
          <Flex onClick={() => setPurpose('for-sale')}  marginTop='2' p='2' flexDir='column' alignItems='center' cursor='pointer' lineHeight='30px'>
          {purpose === 'for-sale' &&
          <Icon 
          width='7px'
          height='7px'
          borderRadius='50%'
          bg='#4299e1'
          position='absolute'
        />
          }
           <b>Sale</b> 
          </Flex>
          <Flex onClick={() => setPurpose('for-rent')}  marginTop='2' p='2' flexDir='column' alignItems='center' cursor='pointer' lineHeight='30px'>
          {purpose === 'for-rent' &&
          <Icon 
          width='7px'
          height='7px'
          borderRadius='50%'
          bg='#4299e1'
          position='absolute'
        />
          }
          
           <b>Rent</b> 
            
          </Flex>
          </Flex>
         
        
            <Flex flexDir='column' pos='relative' paddingTop='2'>
              <Input
                placeholder='Enter Location'
                bg='#fff'
                value={searchTerm}
                w={{sm:'500px', md: '600px', lg: '700px' }}
                borderRadius='18px'
                focusBorderColor='gray.300'
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm !== '' && (
                <Icon
                  as={MdCancel}
                  pos='absolute'
                  cursor='pointer'
                  right='5'
                  top='5'
                  zIndex='100'
                  onClick={() => setSearchTerm('')}
                />
              )}
              {loading && <Spinner margin='auto' marginTop='3' />}
              {showLocations && searchTerm !== '' && (
                <Box height='300px' overflow='auto' borderRadius="10px">
                  {locationData?.map((location) => (
                    <Box
                      key={location.id}
                      onClick={() => {
                        searchProperties({purpose:purpose,locationExternalIDs: location.externalID });
                        setShowLocations(false);
                        setSearchTerm(location.name);
                      }}
                    >
                      <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100' >
                        {location.name}
                      </Text>
                    </Box>
                  ))}
              
                </Box>
              )}
            </Flex>
         
        </Flex>
      </Flex>
      </Flex>
  );
};

export default Hero;
