import { useState } from "react";
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

const CreateDirectionModal = ({ visibleModal, onClose, onSubmit }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exams, setExams] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      code,
      name,
      description,
      exams: exams.join(","),
    });
    onClose();
  };

  return (
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
              onClick={onClose}
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
  );
};

export default CreateDirectionModal;
