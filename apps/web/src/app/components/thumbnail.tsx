import { Circle, Icon, Image, useColorModeValue } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

type ThumbnailProps = {
  avatar_url?: string;
  alt?: string;
};

export const Thumbnail = ({ avatar_url, alt }: ThumbnailProps) => {
  const border = useColorModeValue('gray.200', 'gray.600');

  return avatar_url ? (
    <Image
      borderRadius="full"
      boxSize="40px"
      src={avatar_url}
      alt={alt}
      marginRight="1rem"
    />
  ) : (
    <Circle
      width="40px"
      height="40px"
      borderWidth="2px"
      borderStyle="solid"
      borderColor={border}
      marginRight="1rem"
    >
      <Icon as={FaUser} />
    </Circle>
  );
};
