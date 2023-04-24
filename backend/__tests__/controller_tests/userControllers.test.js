const {
  registerUser,
  authUser,
  getAllUsers,
} = require("../../controllers/userControllers");
const UserService = require("../../services/userService");
const { generateToken } = require("../../config/generateToken");
require("dotenv").config();

jest.mock("../../services/userService"); // Mock the UserService module
describe("registerUser", () => {
  it("should create a new user and return a token", async () => {
    // Mock the UserService.registerUser method to return a user object
    UserService.registerUser.mockResolvedValueOnce({
      _id: "abc123",
      name: "John Doe",
      email: "johndoe@example.com",
      picture: "https://example.com/johndoe.jpg",
    });

    const req = {
      body: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
        picture: "https://example.com/johndoe.jpg",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await registerUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      _id: "abc123",
      name: "John Doe",
      email: "johndoe@example.com",
      picture: "https://example.com/johndoe.jpg",
      token: generateToken("abc123"),
    });
  });

  it("should throw an error if any of the required fields are missing", async () => {
    const req = {
      body: {
        name: "John Doe",
        email: "johndoe@example.com",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await expect(registerUser(req, res)).rejects.toThrow(
      "Please fill all the fields"
    );
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
