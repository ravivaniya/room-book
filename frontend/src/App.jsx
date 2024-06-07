import "./App.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [rooms, setRooms] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:5000/api/rooms"
      );
      setRooms(response);
      setRoomList(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    let searchQuery = e.target.query.value;
    e.preventDefault();
    if (searchQuery === "") {
      setRooms(rooms);
      return;
    }
    const filterBySearch = roomList.filter((item) => {
      if (
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return item;
      }
    });
    setRooms(filterBySearch);
  };

  const bookRoom = (e, item) => {
    e.preventDefault();
    let room = item;
    let date = e.target.date.value;
    let startTime = e.target.startTime.value;
    let endTime = e.target.endTime.value;
    let user = e.target.user.value;

    axios
      .post("http://localhost:5000/api/book", {
        room,
        date,
        startTime,
        endTime,
        user,
      })
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err.response.data.message));
  };

  const handleCardClick = (e, item) => {
    e.preventDefault();
    setCurrentRoom([item]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="search-wrapper">
        <Form className="search-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Search" name="query" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <div className="booking-area">
        <div className="rooms-wrapper">
          {rooms.map(
            (item, index) =>
              item.availability && (
                <Card
                  style={{ width: "18rem" }}
                  key={index}
                  onClick={(e) => handleCardClick(e, item)}
                >
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {item.subtitle}
                    </Card.Subtitle>
                    <Card.Text>{item.seatingCapcity}</Card.Text>
                  </Card.Body>
                </Card>
              )
          )}
        </div>
        <div className="room-details-wrapper">
          {currentRoom.map((item, index) => (
            <Card key={index}>
              <Card.Body>
                <div className="room-details">
                  <div>
                    <Card.Title>{item.title}</Card.Title>
                    <Form
                      className="search-form"
                      onSubmit={(e) => bookRoom(e, item.title)}
                    >
                      <Form.Group className="mb-3">
                        <Form.Control type="date" name="date" required />
                        <Form.Control type="time" name="startTime" required />
                        <Form.Control type="time" name="endTime" required />
                        <Form.Control
                          type="text"
                          name="user"
                          placeholder="User"
                          required
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Book Room
                      </Button>
                    </Form>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <Card.Subtitle>{item.subtitle}</Card.Subtitle>
                  </div>
                </div>
                <Card.Text>{item.seatingCapcity}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
