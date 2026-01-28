import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { StopMotionEditor } from './StopMotionEditor';

/**
 * Represents the main area of the Stop Motion Studio application.
 * It allows users to navigate between different screens including the home screen and the editor.
 * The home screen provides instructions and options to enter the editor.
 * The editor screen is where users can create and edit stop motion animations.
 */

function StopMotionStudioArea(): JSX.Element {
  // Screen types available in the Stop Motion Studio
  type Screen = 'home' | 'studio' | 'view screen';
  // State to manage the current screen
  const [screen, setScreen] = useState<Screen>('home');

  // Function to navigate back to the home screen
  const goBackHome = () => {
    setScreen('home');
  };
  // Render logic based on the current screen
  if (screen == 'home') {
    // Home screen layout with instructions and navigation button
    return (
      <Box backgroundColor={'white'} height="100%" width="100%">
        <VStack spacing={6} align="stretch" padding={8}>
          {/* Header text */}
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Text fontSize={32} fontWeight={600}>Stop Motion Studio</Text>
          </Box>
          {/* Button to navigate to the editor */}
          <Button colorScheme="blue" size="lg" alignSelf="center" onClick={() => setScreen('studio')}>
            Go to editor
          </Button>
          {/* Instructional text for users */}
          <Box>
            <Text fontSize={18} fontWeight={600} marginBottom={2}>
              Quick start
            </Text>
            <VStack align="start" spacing={2}>
              <Text fontSize={16}>• Use the left panel to add new shapes.</Text>
              <Text fontSize={16}>• Add a new frame with “Add Latest Frame”.</Text>
              <Text fontSize={16}>• Use the arrow buttons to navigate frames.</Text>
              <Text fontSize={16}>• Hit play to preview the animation.</Text>
              <Text fontSize={16}>• Load projects with “Load Project”.</Text>
              <Text fontSize={16}>• Save work with “Save Project”.</Text>
              <Text fontSize={16}>• Export as a GIF with “Export Movie”.</Text>
            </VStack>
          </Box>
        </VStack>
      </Box>
    );
  } else if (screen == 'studio') {
    // Editor screen where stop motion animation is created
    return <StopMotionEditor backHome={goBackHome} />;
  } else return <></>;
}

/**
 * A wrapper component for the StopMotionStudioArea component.
 * Determines if the player is currently in a StopMotionAnimatorArea on the map, and if so,
 * renders the StopMotionStudioArea component in a modal.
 */
const StopMotionStudioModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered size="full" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent height="90vh" maxW="90vw" maxH="90vh" borderRadius="18px">
        <ModalHeader>Stop Motion Studio</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding={0} overflowY="auto">
          <StopMotionStudioArea />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StopMotionStudioModal;
