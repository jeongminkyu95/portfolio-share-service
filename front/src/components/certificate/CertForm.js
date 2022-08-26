import React, { useEffect, useState } from "react";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import * as Api from "../../api";
import { EditCert } from "./CertCard";
import Calendar from "./CertCalendar";

function CertAddForm({ portfolioOwnerId, setCerts, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId;
    const when_date = new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .split("T")[0];

    await Api.post("certificate/create", {
      user_id: portfolioOwnerId,
      title,
      description,
      when_date,
    });

    const res = await Api.get("certificatelist", user_id);
    setCerts(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          dateformat="yyyy-MM-dd"
          type="text"
          placeholder="자격증 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-3">
        <Calendar
          type="text"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

function CertForm({ portfolioOwnerId, isEditable }) {
  const [certs, setCerts] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("certificatelist", portfolioOwnerId).then((res) =>
      setCerts(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        {certs.map((cert) => (
          <EditCert
            key={cert.id}
            cert={cert}
            setCerts={setCerts}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <CertAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCerts={setCerts}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default CertForm;
