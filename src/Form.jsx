import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './form.css';

const PairsInput = () => {
  const [inputs, setInputs] = useState([{ id: 0, key: 0 }]);

  const handleInput = (event, id, textareaNumber) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        return {
          ...input,
          [textareaNumber === 1 ? "textarea1" : "textarea2"]: event.target.value,
        };
      }
      return input;
    });

    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 5 + 'px';

    setInputs(updatedInputs);
  };

  const handleSwapButtonClick = (id) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        // Swap textarea1 and textarea2 values
        return {
          ...input,
          textarea1: input.textarea2,
          textarea2: input.textarea1,
        };
      }
      return input;
    });

    setInputs(updatedInputs);
  };

  const addInput = () => {
    const newIndex = inputs.length;
    const newInputs = [
      ...inputs,
      {
        id: new Date().getTime(),
        key: newIndex,
        textarea1: "",
        textarea2: "",
      },
    ];
    setInputs(newInputs);
    var div = document.getElementById('set-scroll');

    setTimeout(function() {    
      div.scrollTo({
        top: div.scrollHeight - div.clientHeight,
        behavior: 'smooth'
      });
    },100); 

  };

  const handleDeleteButtonClick = (id) => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedInputs);
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
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="droppable" >
        {(provided) => (
                    <div className="drop-scroll" id="set-scroll">
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {inputs.map((input, index) => (
              <Draggable key={input.id} draggableId={input.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="extra-input-holder"
                  >
                    <div className="textarea">
                      <textarea
                        type="text"
                        onInput={(event) => handleInput(event, input.id, 1)}
                        value={input.textarea1}
                        className="extra-input"
                      ></textarea>

                  </div>
          <div className="extra-input-gap" >
            <button onClick={() => handleSwapButtonClick(input.id)}>
              <i className="fas fa-exchange-alt"></i>
            </button>
            

            <div className="drag-handle" {...provided.dragHandleProps}>
              <i className="fas fa-bars"></i>
            </div>
            
            <button onClick={() => handleDeleteButtonClick(input.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
          <div className="textarea">
          <textarea
            type="text"
            onInput={(event) => handleInput(event, input.id, 2)}
            value={input.textarea2}
            className="extra-input"
          ></textarea>
          </div>

            </div>
                )}
              </Draggable>
            ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="extra-input-add">
        <button onClick={addInput}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </DragDropContext>

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
    <div className="react-form">
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
                  {input.label === "cards" && (
                    <PairsInput/>
                  )}
                    </div>
                      {input.label === "photo" && (
                        <button className="top-input" onClick={redirectToGoogleDrive}>
                          <i className="fas fa-external-link-alt"></i>
                        </button>
                      )}
                      {input.label === "slide" && (
                        <button className="top-input" onClick={redirectToGoogleSlides}>
                          <i className="fas fa-external-link-alt"></i>
                        </button>
                      )}
                      
                      <div className="drag-handle" {...provided.dragHandleProps}>
                        <i className="fas fa-bars"></i>
                      </div>
                      <button className="top-input" onClick={() => handleDeleteButtonClick(input.id)}>
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
          <option value="cards">Flashcards/Quiz</option>
        </select>
        <button onClick={handleAddButtonClick}><i className="fas fa-plus"></i></button>
      </div>
      <div className="submit-form">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </DragDropContext>
    </div>
  );
};


export default <Form/>;
