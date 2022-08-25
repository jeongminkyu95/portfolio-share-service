import React, {useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({currentEducation, setEducations, setIsEditing}){
    //useState로 title 상태를 생성함.
    const [title, setTitle ] = useState(currentEducation.title);
    //useState로 description 상태를 생성함.
    const [description, setDescription] = useState(currentEducation.description);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        //curruentEducation의 user_id를 user_id 변수에 할당함.
        const user_id = currentEducation.user_id;

        //"Educations/학력 id"엔드포인트로 PUT 요청함.
        await Api.put(`educations/${currentEducation.id}`,{
            user_id,
            title,
            description,
        });

        //"awardlist/유저id" 엔드포인트로 GET 요청함.
        const res = await Api.get("educationlist", user_id);
        //awards를 response의 data로 세팅함.
        setEducations(res.data);
        //편집 과정이 끝났으므로, isEditing을 false로 세팅함.
        setIsEditing(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
                <Form.Control
                type="text"
                placeholder="학교이름"
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

            <Form.Group as={Row} className="mt-3" text-center mb-4>
                <Col sm={{ span : 20}}>
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
}

export default EducationEditForm;