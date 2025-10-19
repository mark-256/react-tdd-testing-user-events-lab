import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setInterests((prev) =>
      checked ? [...prev, value] : prev.filter((i) => i !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <h2>Thank you, {name}!</h2>
        <p>We’ll reach out to {email} soon.</p>
        {interests.length > 0 && (
          <ul>
            {interests.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <fieldset>
        <legend>Interests</legend>
        <label>
          <input
            type="checkbox"
            value="Coding"
            onChange={handleCheckboxChange}
          />
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            value="Music"
            onChange={handleCheckboxChange}
          />
          Music
        </label>
        <label>
          <input type="checkbox" value="Art" onChange={handleCheckboxChange} />
          Art
        </label>
      </fieldset>

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default App;
