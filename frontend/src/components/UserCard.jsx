import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) => {
	const toast = useToast();
	const handleDeleteUser = async () => {
		try {
			const res = await fetch(BASE_URL + "/contacts/" + user.id, {
				method: "DELETE",
			})
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id))
			toast({
				status: "success",
				title: "Success!",
				description: "Contact deleted successfully.",
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
		}
	}
	return (
		<Card>
			<CardHeader>
				<Flex gap={4}>
					<Flex flex={"1"} gap={"4"} alignItems={"center"}>
						<Avatar src={`${user.imgUrl}`} />
						<Box>
							<Heading size='sm'>{user.firstName} {user.lastName}</Heading>
							<Text>{user.email}</Text>
						</Box>
					</Flex>

					<Flex>
						<EditModal user={user} setUsers={setUsers}/>
						<IconButton
							variant='ghost'
							colorScheme='red'
							size={"sm"}
							aria-label='See menu'
							icon={<BiTrash size={20} />}
							onClick={handleDeleteUser}
						/>
					</Flex>
				</Flex>
			</CardHeader>

			<CardBody>
				<Text>{user.notes}</Text>
			</CardBody>
		</Card>
	);
};
export default UserCard;
