import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";

const UserCard = ({ user }) => {
	return (
		<Card>
			<CardHeader>
				<Flex gap={4}>
					<Flex flex={"1"} gap={"4"} alignItems={"center"}>
						{/*<Avatar src={`${user.imgUrl}`} />*/}
						<Avatar src={`https://avatar.iran.liara.run/username?username=${user.firstName}+${user.lastName}`} />

						<Box>
							<Heading size='sm'>{user.firstName} {user.lastName}</Heading>
							<Text>{user.email}</Text>
						</Box>
					</Flex>

					<Flex>
						<EditModal />
						<IconButton
							variant='ghost'
							colorScheme='red'
							size={"sm"}
							aria-label='See menu'
							icon={<BiTrash size={20} />}
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
