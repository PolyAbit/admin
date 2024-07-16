import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Api } from "../../constants/api";
import CreateDirectionModal from "../../components/CreateDirectionModal";

const DirectionsNew = () => {
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

  const handleCreateDirection = async (payload) => {
    const response = await fetch(`${Api.Content}/direction`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      },
      body: JSON.stringify(payload),
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

        setDirections(directions);
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

      <CreateDirectionModal
        visibleModal={visibleModal}
        onClose={() => setVisibleModal(false)}
        onSubmit={(payload) => handleCreateDirection(payload)}
      />
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
              <td>{row.exams}</td>
              <td>
                <Button
                  type="button"
                  className="btn btn-light"
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
