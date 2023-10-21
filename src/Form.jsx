import React, { useState } from "react";

const Form = () => {
  const [selectedOption, setSelectedOption] = useState("subheading");
  const [inputs, setInputs] = useState([]);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAddButtonClick = () => {
    const newInputs = [...inputs];
    newInputs.push({
      id: new Date().getTime(),
      label: selectedOption,
      value: "", // Initialize input value as an empty string
    });
    setInputs(newInputs);
    console.log("Selected Option:", selectedOption);
  };

  const handleInputChange = (id, value) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, value } : input
    );
    setInputs(updatedInputs);
  };

  const handleDeleteButtonClick = (id) => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedInputs);
  };

  const handleSubmit = () => {
    // Gather all form values for submission
    const formValues = inputs.map((input) => ({
      label: input.label,
      value: input.value,
    }));
    console.log("Form Values:", formValues);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const redirectToGoogleDrive = () => {
    window.open("https://drive.google.com", "_blank"); // Opens Google Drive in a new tab
  };

  const redirectToGoogleSlides = () => {
    window.open("https://slides.google.com", "_blank"); // Opens Google Slides in a new tab
  };

  return (
    <div>
      {inputs.map((input) => (
        <div key={input.id} className="input-area">
          <label>{capitalizeFirstLetter(input.label)}</label>
          {input.label === "paragraph" ? (
            <textarea
              placeholder="Enter Paragraph"
              value={input.value}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder={
                input.label === "photo"
                  ? "https://drive.google.com/file/..."
                  : input.label === "slide"
                  ? "https://docs.google.com/presentation/..."
                  : `Enter ${input.label}`
              }
              value={input.value}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
            />
          )}
          {input.label === "photo" && (
            <button onClick={redirectToGoogleDrive}><i class="fas fa-external-link-alt"></i></button>
          )}
          {input.label === "slide" && (
            <button onClick={redirectToGoogleSlides}><i class="fas fa-external-link-alt"></i></button>
          )}
          <button onClick={() => handleDeleteButtonClick(input.id)}><i class="fas fa-trash-alt"></i></button>
        </div>
      ))}
      <div className="add-input">
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="subheading">Subheading</option>
          <option value="paragraph">Paragraph</option>
          <option value="photo">Photo (Google Drive)</option>
          <option value="slide">Slide (Google Slides)</option>
        </select>
        <button onClick={handleAddButtonClick}>Add</button>
      </div>
      <div className="submit-form">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default <Form/>;
