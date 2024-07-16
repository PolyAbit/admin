import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  FormGroup,
  FormLabel,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import { Api } from "../../../constants/api";

const DirectionsNew = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exams, setExams] = useState([]);
  const [directions, setDirections] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  const handleDeleteDirection = async (id) => {
    if (!window.confirm("Вы уверены, что хотите удалить эту строку?")) {
      return;
    }

    const response = await fetch(`${Api.Content}/direction/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
    });
    try {
      if (response.status === 200) {
        fetchDirections();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateDirection = async () => {
    const response = await fetch(`${Api.Content}/direction`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
      body: JSON.stringify({
        code: code,
        name: name,
        exams: `${exams[0]},${exams[1]},${exams[2]}`,
        description: description,
      }),
    });
    try {
      if (response.ok) {
        fetchDirections();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDirections = async () => {
    const response = await fetch(`${Api.Content}/direction`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        "content-type": "application/json",
      },
    });

    try {
      if (response.status === 200) {
        const { directions } = await response.json();

        setDirections(
          directions.map((direction) => ({
            ...direction,
            exams: direction.exams.split(","),
          }))
        );
      } else {
        setDirections([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDirections();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateDirection();
    toggleModal();
  };

  const toggleModal = () => {
    setVisibleModal(!visibleModal);
  };

  return (
    <>
      <Container className="d-flex justify-content-end p-3">
        <Button
          onClick={toggleModal}
          type="button"
          className="btn btn-secondary"
        >
          Зарегистрировать направление
        </Button>
      </Container>
      <Modal show={visibleModal}>
        <ModalHeader>
          <ModalTitle>Регистрация направления</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup value={code} onChange={(e) => setCode(e.target.value)}>
              <FormLabel>Код</FormLabel>
              <FormControl type="text" />
            </FormGroup>
            <FormGroup value={name} onChange={(e) => setName(e.target.value)}>
              <FormLabel>Наименование</FormLabel>
              <FormControl type="text" />
            </FormGroup>
            <FormGroup
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
              <FormLabel>Описание</FormLabel>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </FormGroup>
            <FormSelect
              multiple
              aria-label="Default select example"
              className="mt-3"
              onChange={(e) => {
                const options = [...e.target.selectedOptions];
                const values = options.map((option) => option.value);
                setExams(values);
              }}
            >
              <option disabled>Предметы ЕГЭ</option>
              <option value="РЯ">РЯ</option>
              <option value="МАТ">МАТ</option>
              <option value="ФИЗ">ФИЗ</option>
              <option value="ХИМ">ХИМ</option>
              <option value="БИО">БИО</option>
              <option value="ГЕО">ГЕОГР</option>
              <option value="ЛИТ">ЛИТ</option>
              <option value="ИСТ">ИСТ</option>
              <option value="ОБЩ">ОБЩ</option>
            </FormSelect>
            <Container className="mt-3 d-flex justify-content-between">
              <Button
                onClick={toggleModal}
                type="button"
                className="btn btn-secondary"
              >
                Закрыть
              </Button>
              <Button type="submit" className="btn btn-success">
                Зарегистрировать
              </Button>
            </Container>
          </Form>
        </ModalBody>
      </Modal>
      <table className="table table-striped table-hover table-bordered table-sm">
        <thead>
          <tr>
            <th scope="col">Код</th>
            <th scope="col">Наименование</th>
            <th scope="col">Предметы ЕГЭ</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {directions.map((row) => (
            <tr key={row.id}>
              <td>{row.code}</td>
              <td>{row.name}</td>
              <td>{row.exams.join(",")}</td>
              <td>
                <Button
                  type="button"
                  className="btn btn-light "
                  onClick={() => handleDeleteDirection(row.id)}
                >
                  <span>
                    <i className="fa-solid fa-trash"></i>
                  </span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default DirectionsNew;
