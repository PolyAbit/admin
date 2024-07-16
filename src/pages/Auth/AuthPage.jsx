import { useEffect, useState } from "react";
import {
  Form,
  Modal,
  Button,
  ModalHeader,
  ModalTitle,
  ModalBody,
  FormGroup,
  FormLabel,
  FormControl,
  ModalFooter,
} from "react-bootstrap";
import { handleLogin } from "../../utils/routing";
import { Api } from "../../constants/api";

const AuthNew = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("Почта должна быть указана");
  const [passwordError, setPasswordError] = useState(
    "Пароль должен быть указан"
  );
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const filter =
      /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (!filter.test(String(e.target.value).toLowerCase())) {
      setEmailError("Почта некорректна");
    } else setEmailError("");
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6 || e.target.value.length > 18) {
      setPasswordError("Пароль некорректный");
    } else setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Api.Auth}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const { token } = await response.json();
      if (token) {
        sessionStorage.setItem("Token", token);
        handleLogin();
      }
    } catch (error) {
      console.log("Ошибка при авторизации: ", error);
    }
  };

  return (
    <main
      className="d-flex vh-100 bg-cover p-0 m-0"
      style={{
        backgroundImage: "url('src/assets/bg1.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Modal show={true} className="p-0 m-0">
        <ModalHeader>
          <ModalTitle>Вход</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <FormLabel>Почта</FormLabel>
              <FormControl
                onChange={(e) => emailHandler(e)}
                type="email"
                placeholder="Введите почтовый адрес"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Пароль</FormLabel>

              <FormControl
                onChange={(e) => passwordHandler(e)}
                type="password"
                placeholder="Введите пароль"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleSubmit}
            disabled={!formValid}
            type="button"
            className="btn btn-success"
          >
            Войти
          </Button>
        </ModalFooter>
      </Modal>
    </main>
  );
};
export default AuthNew;
