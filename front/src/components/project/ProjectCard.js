import { Card, Button, Row, Col } from "react-bootstrap";
import ModalAlert from "./ProjectDeleteModal";

function ProjectCard({ project, setProjects, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted">
            {`${project.from_date} ~ ${project.to_date}`}
          </span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
            <ModalAlert
              propsProject={project}
              currentProject={project}
              setProjects={setProjects}
              setIsEditing={setIsEditing}
            />
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default ProjectCard;
