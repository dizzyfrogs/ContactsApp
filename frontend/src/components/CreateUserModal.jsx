import {
	Button,
	Flex,
	Input,
	Textarea,
	useDisclosure,
	useToast,
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
import { useState } from "react";
import { BASE_URL } from "../App";

const CreateUserModal = ({ setUsers }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		firstName: "",
		lastName: "",
		email: "",
		notes: ""
	});
	const toast = useToast()

	const handleCreateUser = async (e) => {
		e.preventDefault(); //prevent page refresh
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/contacts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs)
			})

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}

			toast({
				status: "success",
				title: "Success!",
				description: "Contact created successfully.",
				duration: 2000,
				position: "top-center",
				isClosable: true
			})

			onClose();
			setUsers((prevUsers) => [...prevUsers, data]);

			setInputs({
				firstName: "",
				lastName: "",
				email: "",
				notes: ""
			}); // clear inputs

		} catch (error) {
			toast({
				status: "error",
				title: "An error occured.",
				description: error.message,
				duration: 2000,
				position: "top-center",
				isClosable: true
			});
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<Button onClick={onOpen}>
				<BiAddToQueue size={20} />
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleCreateUser}>
					<ModalContent>
						<ModalHeader> Create New Contact </ModalHeader>
						<ModalCloseButton />

						<ModalBody pb={6}>
							<Flex alignItems={"center"} gap={4}>
								{/* Left */}
								<FormControl>
									<FormLabel>First Name</FormLabel>
									<Input placeholder='John' 
										value={inputs.firstName}
										onChange={(e) => setInputs({...inputs, firstName: e.target.value})}
									/>
								</FormControl>

								{/* Right */}
								<FormControl>
									<FormLabel>Last Name</FormLabel>
									<Input placeholder='Doe' 
										value={inputs.lastName}
										onChange={(e) => setInputs({...inputs, lastName: e.target.value})}
									/>
								</FormControl>
							</Flex>

							<FormControl mt={4}>
								<FormLabel>Email</FormLabel>
								<Input placeholder='email@email.com' 
									value={inputs.email}
									onChange={(e) => setInputs({...inputs, email: e.target.value})}
								/>
							</FormControl>

							<FormControl mt={4}>
								<FormLabel>Notes</FormLabel>
								<Textarea
									resize={"none"}
									overflowY={"hidden"}
									placeholder="Loves coding, watching movies, and eating pizza"
									value={inputs.notes}
									onChange={(e) => setInputs({...inputs, notes: e.target.value})}
								/>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} type='submit'
								isLoading={isLoading}
							>
								Add
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
};
export default CreateUserModal;
