import * as projectService from "./project.service.js";
import { getPaginationMeta } from "../../utils/pagination.js";

export const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProjectService(
      req.body,
      req.user.id,
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const result = await projectService.getProjectsService(req.query);

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    res.status(200).json({
      success: true,
      data: {
        projects: result.projects,

        pagination: getPaginationMeta(
          result.total,
          page,
          limit,
        ),
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const updated = await projectService.updateProjectService(
      req.params.id,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProjectService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
