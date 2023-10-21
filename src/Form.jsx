import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const PairsInput = () => {
  const [textareaValue, setTextareaValue] = useState('');

  const handleInput = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 5 + 'px';
    setTextareaValue(textarea.value);
  };

  return (
    <div>
      <textarea type="text" onInput={handleInput} className="extra-input"></textarea>
      <textarea type="text" onInput={handleInput} className="extra-input"></textarea>
    </div>
  );
};

// export default PairsInput;














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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedInputs = Array.from(inputs);
    const [removed] = reorderedInputs.splice(result.source.index, 1);
    reorderedInputs.splice(result.destination.index, 0, removed);

    setInputs(reorderedInputs);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="inputs">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {inputs.map((input, index) => (
              <Draggable key={input.id} draggableId={input.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="input-area"
                  >
                    <div className="input-header">
                      <label>{capitalizeFirstLetter(input.label)}</label>
                    </div>
                    <div className="top-input">
                    {input.label === "paragraph" ? (
                      <textarea
                        placeholder="Enter Paragraph"
                        value={input.value}
                        onChange={(e) => handleInputChange(input.id, e.target.value)}
                        className="main-input"
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
                        className="main-input"
                      />
                    )}
                  {input.label === "subheading" && (
                    <PairsInput/>
                  )}
                    </div>
                      {input.label === "photo" && (
                        <button onClick={redirectToGoogleDrive}>
                          <i className="fas fa-external-link-alt"></i>
                        </button>
                      )}
                      {input.label === "slide" && (
                        <button onClick={redirectToGoogleSlides}>
                          <i className="fas fa-external-link-alt"></i>
                        </button>
                      )}
                      
                      <div className="drag-handle" {...provided.dragHandleProps}>
                        <i className="fas fa-bars"></i>
                      </div>
                      <button onClick={() => handleDeleteButtonClick(input.id)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>

                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="add-input">
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="subheading">Subheading</option>
          <option value="paragraph">Paragraph</option>
          <option value="photo">Photo (Google Drive)</option>
          <option value="slide">Slide (Google Slides)</option>
        </select>
        <button onClick={handleAddButtonClick}><i className="fas fa-plus"></i></button>
      </div>
      <div className="submit-form">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </DragDropContext>
  );
};


export default <Form/>;
