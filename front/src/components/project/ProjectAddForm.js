import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Api from "../../api";

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const user_id = portfolioOwnerId;
    const start_date = startDate.toISOString().split("T")[0];
    const end_date = endDate.toISOString().split("T")[0];

    await Api.post("project/create", {
      user_id: portfolioOwnerId,
      title,
      description,
      start_date,
      end_date,
    });

    const res = await Api.get("projectlist", user_id);
    setProjects(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
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
      <Form.Group as={Row} className="mt-3">
        <Col xs="auto">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Col>
        <Col xs="auto">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Col>
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

export default ProjectAddForm;
