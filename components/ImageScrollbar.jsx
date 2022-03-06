import { useContext } from 'react';
import { Box, Icon, Flex } from '@chakra-ui/react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import Image from 'next/image';


const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginRight='1'>
      <Flex onClick={() => scrollPrev()} bg="gray.100" borderRadius="50%" p="2" alignItems='center' justifyContent='center' position='relative' zIndex='999'>
      <Icon
        as={FaAngleLeft}
        fontSize='2xl'
        cursor='pointer'
        style={{color:"#505050"}}
      />
      </Flex> 
    </Flex>
  );
}

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent='center' alignItems='center' marginLeft='1'>
      <Flex onClick={() => scrollNext()} bg="gray.100" borderRadius="50%" p="2" alignItems='center' justifyContent='center' position='relative' zIndex='999'>
      <Icon
        as={FaAngleRight}
        fontSize='2xl'
        cursor='pointer'
        style={{color:"#505050"}}
    />
      </Flex> 
    </Flex>
  );
}

export default function ImageSrollbar({ data }) {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{ overflow: 'hidden' }} >
      {data.map((item,i) => (
        <Box key={i} width='910px' itemId={item.id} overflow='hidden' p='1'>
                  
                  <Image placeholder="blur" blurDataURL={item.url} src={item.url} width={1000} height={500}  sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px" />
                   
        </Box>
      ))}
    </ScrollMenu>
  );
}