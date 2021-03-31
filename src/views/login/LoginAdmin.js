import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/core";
import Logo from 'src/components/Logo'

import useLoginApi from './hooks/useLoginApi';

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [logar, carregando] = useLoginApi();
  const [file, setFile] = useState(React.createRef())

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      
      logar(email, password)
      
      setIsLoggedIn(true);
      setIsLoading(false);
      setShowPassword(false);
      
    } catch (error) {
      setError("Usuário ou password inválido");
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
    <Flex width="full" align="center" justifyContent="center" mt={200}>
      <Box p={8} width={580} borderWidth={1} borderRadius={8}>
        <Box textAlign="center">
          <img
            style={{margin: "20px auto"}}
            width="70%"
            alt="Logo"
            src="/static/logo_black.png"
          />
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="user@enapp.gov.ao"
                focusBorderColor="rgb(170,0,0)"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="*******"
                  focusBorderColor="rgb(170,0,0)"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <InputRightElement width="3rem">
                  <Button onClick={handlePasswordVisibility}>
                    {showPassword ? (
                      <Icon name="view-off" />
                    ) : (
                      <Icon name="view" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              bg="rgb(170,0,0)"
              color="white"
              isLoading={carregando}
              _hover={{ backgroundColor: "rgb(140,0,0)" }}
              variant="outline"
              type="submit"
              width="full"
              mt={4}
            >
              Entrar
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
    </>
  );
}
