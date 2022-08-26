import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";
import { ProjectModel } from "../db/schemas/project";

class projectService {
    static async addProject({ user_id, title, description, from_date, to_date }) {
        const id = uuidv4();

        const newProject = { id, user_id, title, description, from_date, to_date };
        
        const createdNewProject = await Project.create({ newProject });
        createdNewProject.errorMessage = null;

        return createdNewProject;
    }

    static async setProject({ id, toUpdate}) {
        let project = await Project.findById({ id });

        if (!project) {
            const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            project = await Project.update({ id, fieldToUpdate, newValue });
        }
  
        if (toUpdate.description) {
          const fieldToUpdate = "description";
          const newValue = toUpdate.description;
          project = await Project.update({ id, fieldToUpdate, newValue });
        }
    
        if (toUpdate.from_date) {
          const fieldToUpdate = "from_date";
          const newValue = toUpdate.from_date;
          project = await Project.update({ id, fieldToUpdate, newValue });
        }

        if (toUpdate.to_date) {
          const fieldToUpdate = "to_date";
          const newValue = toUpdate.to_date;
          project = await Project.update({ id, fieldToUpdate, newValue });
        }
  
        return project;
    }

    static async getProjects({ user_id }) {
        const projects = await Project.findByUserId({ user_id });
        
        if (projects.length === 0) {
            const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return projects;
    }

    static async deleteProject({ id }) {
        const projects = await Project.findById({ id });
        // const projects = await ProjectModel
        // console.log({id});
        
        if (!projects) {
            const errorMessage = "내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const deletedProject = await ProjectModel.deleteOne({ id });

        return deletedProject;
    }

}

export { projectService };