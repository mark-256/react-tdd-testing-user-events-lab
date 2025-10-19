import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Newsletter Signup Form", () => {
  test("renders name, email, and interests inputs", () => {
    render(<App />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/interests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/coding/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/music/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/art/i)).toBeInTheDocument();
  });

  test("updates name and email when user types", async () => {
    render(<App />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await userEvent.type(nameInput, "Alex");
    await userEvent.type(emailInput, "alex@example.com");

    expect(nameInput).toHaveValue("Alex");
    expect(emailInput).toHaveValue("alex@example.com");
  });

  test("allows user to select interests", async () => {
    render(<App />);
    const codingCheckbox = screen.getByLabelText(/coding/i);
    const musicCheckbox = screen.getByLabelText(/music/i);

    await userEvent.click(codingCheckbox);
    await userEvent.click(musicCheckbox);

    expect(codingCheckbox).toBeChecked();
    expect(musicCheckbox).toBeChecked();
  });

  test("shows success message when form is submitted", async () => {
    render(<App />);

    await userEvent.type(screen.getByLabelText(/name/i), "Alex");
    await userEvent.type(screen.getByLabelText(/email/i), "alex@example.com");
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(screen.getByText(/thank you, alex/i)).toBeInTheDocument();
    expect(screen.getByText(/alex@example.com/i)).toBeInTheDocument();
  });

  test("displays selected interests in success message", async () => {
    render(<App />);

    await userEvent.type(screen.getByLabelText(/name/i), "Sam");
    await userEvent.type(screen.getByLabelText(/email/i), "sam@example.com");

    const codingCheckbox = screen.getByLabelText(/coding/i);
    const musicCheckbox = screen.getByLabelText(/music/i);

    await userEvent.click(codingCheckbox);
    await userEvent.click(musicCheckbox);
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(screen.getByText(/thank you, sam/i)).toBeInTheDocument();
    expect(screen.getByText(/coding/i)).toBeInTheDocument();
    expect(screen.getByText(/music/i)).toBeInTheDocument();
  });
});
