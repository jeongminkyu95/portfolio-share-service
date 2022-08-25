import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationAddForm({ portfolioOwnerId, setEducations, setIsAdding}) {
    //useState로 title 상태를 생성함.
    const [title, setTitle] = useState("");
    //useState로 description 상태를 생성함.
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); //고유 동작을 중단
        e.stopPropagation(); // 상위 엘리먼트들로의 이벤트 전파를 중단

        //portfolioOwnerId를 user_id 변수에 할당함.
        const user_id = portfolioOwnerId;

        //"education/create" 엔드포인트로 post요청함.
        await Api.post("education/create", {
            user_id : portfolioOwnerId,
            title,
            description,
        });

        // "educationlist/유저id" 엔드포인트로 get요청함.
        const res = await Api.get("educationlist", user_id);
        //educations를 response의 data로 세팅함.
        setEducations(res.data);
        //education을 추가하는 과정이 끝났으므로, is Adding을 false로 세팅함.
        setIsAdding(false);
    };

    return (
        <Form onSubmit = {handleSubmit}>
            <Form.Group controlId="formBasicTitle" className="mb-3">
                <Form.Control 
                type="text"
                placeholder = "학교이름"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicDescription" className="mb-3">
                <Form.Control 
                type="text"
                placeholder = "전공"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked/>
            <label class="form-check-label" for="inlineRadio1">재학중</label>
            </div>

            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
            <label class="form-check-label" for="inlineRadio2">학사졸업</label>
            </div>

            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
            <label class="form-check-label" for="inlineRadio3">석사졸업</label>
            </div>

            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4" />
            <label class="form-check-label" for="inlineRadio4">박사졸업</label>
            </div>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span : 20}}>
                    <Button variant = "primary" type="submit" className="me-3">
                    확인
                    </Button> 
                    <Button variant = "secondary" onClick={() => setIsAdding(false)}>
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    );  
}

export default EducationAddForm;