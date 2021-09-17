import { useMutation } from "@apollo/client";
import { Box, Button, Input } from "@chakra-ui/react"
import React from "react"
import { SendNewMessageDocument, SendNewMessageMutation } from "../_graphql/api";


export const ChatSubmit = () => {

    const [message, setMessage] = React.useState("");

    const [sendNewMessage, { error, data }] = useMutation<
        SendNewMessageMutation
    >(SendNewMessageDocument, {
        variables: { message }
    }
    );

    const submit = () => {
        sendNewMessage();
        setMessage("");
    }

    return <Box marginTop="auto" >
        <Button colorScheme="teal" size="xs" onClick={(e) => { submit() }}>Send</Button>
        <Input placeholder="Basic usage" value={message} onChange={(event) => { setMessage(event.target.value) }} onKeyUp={(e) => { if (e.key === "Enter") submit() }} />
    </Box>
}