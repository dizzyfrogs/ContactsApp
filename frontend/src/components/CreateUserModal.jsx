import {
	Button,
	Flex,
	Input,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { 
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from "@chakra-ui/modal"
import { BiAddToQueue } from "react-icons/bi";

const CreateUserModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button onClick={onOpen}>
				<BiAddToQueue size={20} />
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader> Create New Contact </ModalHeader>
					<ModalCloseButton />

					<ModalBody pb={6}>
						<Flex alignItems={"center"} gap={4}>
							{/* Left */}
							<FormControl>
								<FormLabel>First Name</FormLabel>
								<Input placeholder='John' />
							</FormControl>

							{/* Right */}
							<FormControl>
								<FormLabel>Last Name</FormLabel>
								<Input placeholder='Doe' />
							</FormControl>
						</Flex>

						<FormControl mt={4}>
							<FormLabel>Notes</FormLabel>
							<Textarea
								resize={"none"}
								overflowY={"hidden"}
								placeholder="Loves coding, watching movies, and eating pizza"
							/>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3}>
							Add
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
export default CreateUserModal;
