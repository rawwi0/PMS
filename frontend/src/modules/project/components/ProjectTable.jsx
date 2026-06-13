import ProjectRow from "./ProjectRow";

const ProjectTable = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="overflow-auto border border-gray-700 rounded-2xl">
      <table className="w-full text-left">
        <thead className="text-sm text-gray-400 uppercase bg-gray-800">
          <tr>
            <th className="px-6 py-4">Name</th>

            <th className="px-6 py-4">Department</th>

            <th className="px-6 py-4">Assigned Users</th>

            <th className="px-6 py-4">Start</th>

            <th className="px-6 py-4">End</th>

            <th className="px-6 py-4">Status</th>

            <th className="px-6 py-4">Progress</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <ProjectRow 
              key={project.id} 
              project={project}
              onEdit={onEdit}
              onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
