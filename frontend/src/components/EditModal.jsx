import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import { BASE_URL } from "../App";

function EditModal({setUsers, user}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		notes: user.notes
	})

	const toast = useToast();

	const handleEditUser = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/contacts/" + user.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs)
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setUsers((prevUsers) => prevUsers.map((u) => u.id === user.id ? data : u));
			toast({
				status: "success",
				title: "Success!",
				description: "Contact updated successfully.",
				duration: 2000,
				position: "top-center",
				isClosable: true
			})
		} catch (error) {
			toast({
				status: "error",
				title: "An error occured.",
				description: "See console logs for details.",
				duration: 2000,
				position: "top-center",
				isClosable: true
			})
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<IconButton
				onClick={onOpen}
				variant='ghost'
				colorScheme='blue'
				aria-label='See menu'
				size={"sm"}
				icon={<BiEditAlt size={20} />}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleEditUser}>
					<ModalContent>
						<ModalHeader>Edit Contact</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<Flex alignItems={"center"} gap={4}>
								<FormControl>
									<FormLabel>First Name</FormLabel>
									<Input placeholder='John' 
										value={inputs.firstName}
										onChange={(e) => setInputs((prev) => ({...prev, firstName: e.target.value}))}
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Last Name</FormLabel>
									<Input placeholder='Doe' 
										value={inputs.lastName}
										onChange={(e) => setInputs((prev) => ({...prev, lastName: e.target.value}))}
									/>
								</FormControl>
							</Flex>
							<FormControl mt={4}>
								<FormLabel>Email</FormLabel>
								<Input placeholder='email@email.com' 
									value={inputs.email}
									onChange={(e) => setInputs((prev) => ({...prev, email: e.target.value}))}
								/>
							</FormControl>
							<FormControl mt={4}>
								<FormLabel>Notes</FormLabel>
								<Textarea
									resize={"none"}
									overflowY={"hidden"}
									placeholder="Loves coding, watching movies, and eating pizza"
									value={inputs.notes}
									onChange={(e) => setInputs((prev) => ({...prev, notes: e.target.value}))}
								/>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
								Update
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
}

export default EditModal;