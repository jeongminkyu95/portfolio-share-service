import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import Calendar from "./CertCalendar";
import * as Api from "../../api";

const CertEditForm = ({ currentCert, setCerts, setIsEditing }) => {
  const [title, setTitle] = useState(currentCert.title);
  const [description, setDescription] = useState(currentCert.description);
  const [when_date, setWhen_date] = useState(currentCert.when_date);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = currentCert.user_id;

    await Api.put(`certificates/${currentCert.id}`, {
      user_id,
      title,
      description,
      when_date,
    });

    const res = await Api.get("certificatelist", user_id);
    setCerts(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
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
          value={when_date}
          onChange={(e) => {
            setWhen_date(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default CertEditForm;
