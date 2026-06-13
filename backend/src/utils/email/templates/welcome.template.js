export const welcomeTemplate = ({
  name,
  email,
  password,
}) => {
  return `
    <h2>Welcome to ProjectFlow</h2>

    <p>Hello ${name},</p>

    <p>Your account has been created successfully.</p>

    <p><strong>Email:</strong> ${email}</p>

    <p><strong>Temporary Password:</strong> ${password}</p>

    <p>Please change your password after your first login.</p>

    <br />

    <p>ProjectFlow Team</p>
  `;
};