import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSideBar from "./components/ProjectSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    seletedProjectId: undefined,
    projects: [],
    tasks: [],
  })

  function handleAddTask(text) {
    setProjectState(prevState => {
      const taskId = Math.floor(Math.random() * 100000);
      const newTask = { 
        id: taskId, 
        projectId: prevState.seletedProjectId,
        text, 
      }

      return {
        ...prevState,
        tasks: [  newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        seletedProjectId: id,
      }
    })
  }

  function handleStartAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        seletedProjectId: null,
      }
    })
  }

  function handleCancelAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        seletedProjectId: undefined,
      }
    })
  }

  function handleAddProject(projectData) {
    const projectId = Math.floor(Math.random() * 100000);
    setProjectState(prevState => {
      const newProject = { ...projectData, id: projectId, }
      return {
        ...prevState,
        seletedProjectId: undefined,
        projects: [ ...prevState.projects, newProject],
      }
    })
  }

  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        seletedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.seletedProjectId)
      };
    });
  };

  const selectedProject = projectState.projects.find(project => project.id === projectState.seletedProjectId);

  let content = <SelectedProject 
    project={selectedProject} 
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectState.tasks}
  />;

  if(projectState.seletedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if(projectState.seletedProjectId === undefined) {
    content = <NoProjectSelected onStatrtAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen  flex gap-8">
      <ProjectSideBar 
        onStatrtAddProject={handleStartAddProject} 
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
      />
      {content}
    </main>
  );
}

export default App;
