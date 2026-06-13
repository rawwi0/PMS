import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import userRoutes from "./modules/user/user.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import departmentRoutes from "./modules/department/department.route.js";
import projectRoutes from "./modules/project/project.routes.js";
import taskRoutes from "./modules/task/task.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//  Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
//  Error handler
app.use(errorHandler);

export default app;

// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./docs/swagger.js";
// import userRoutes from "./modules/user/user.routes.js";


// import { errorHandler } from "./middlewares/error.middleware.js";


// const app = express(); // ✅ FIRST create app

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(errorHandler);
// // Swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // Routes
// app.use("/api/users", userRoutes); // ✅ now it's safe

// // Test route
// app.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });

// export default app;