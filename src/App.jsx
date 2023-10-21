import React, { useEffect } from 'react';

const jsonData = {
  "title": "Main Title",
  "content": [
    {
      "section": [
        {
          "subtitle": "Introduction"
        },
        {
          "paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor vitae purus. Augue ut lectus arcu bibendum at varius vel pharetra. Sagittis id consectetur purus ut faucibus pulvinar elementum. Pellentesque nec nam aliquam sem. Varius quam quisque id diam vel quam elementum. Semper eget duis at tellus at urna condimentum. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Sit amet est placerat in egestas erat. Adipiscing at in tellus integer feugiat scelerisque varius morbi enim."
        },
        {
          "paragraph": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse potenti nullam ac tortor vitae purus. Augue ut lectus arcu bibendum at varius vel pharetra. Sagittis id consectetur purus ut faucibus pulvinar elementum. Pellentesque nec nam aliquam sem. Varius quam quisque id diam vel quam elementum. Semper eget duis at tellus at urna condimentum. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Sit amet est placerat in egestas erat. Adipiscing at in tellus integer feugiat scelerisque varius morbi enim."
        },
        {
          "formula": "\\(x = \\frac{{-b \\pm \\sqrt{{b^2 - 4ac}}}}{{2a}}\\)"
        }
      ]
    },
    {
      "section": [
        {
          "subtitle": "Introduction"
        },
        {
          "paragraph": "Sit amet est placerat in egestas erat. Sit amet venenatis urna cursus eget. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Nunc faucibus a pellentesque sit. Feugiat vivamus at augue eget arcu dictum varius duis at. Fermentum et sollicitudin ac orci phasellus egestas. Dolor morbi non arcu risus quis varius quam. Neque egestas congue quisque egestas diam in arcu. Ac feugiat sed lectus vestibulum. Mauris in aliquam sem fringilla ut morbi tincidunt. Risus ultricies tristique nulla aliquet enim. Fermentum odio eu feugiat pretium nibh ipsum. Luctus accumsan tortor posuere ac ut consequat semper. Posuere urna nec tincidunt praesent semper feugiat nibh sed."
        }
      ]
    }
  ]
};

const App = () => {
  useEffect(() => {
    // Use MathJax to typeset formulas after component renders
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  }, []); // Empty dependency array ensures this effect runs once after initial render

  return (
    <div>
      <h1>{jsonData.title}</h1>
      {jsonData.content.map((section, index) => (
        <div key={index}>
          {section.section.map((content, idx) => (
            <div key={idx}>
              {content.subtitle && <h2>{content.subtitle}</h2>}
              {content.paragraph && <p>{content.paragraph}</p>}
              {content.formula && <div id={`formula-${idx}`} className="math-formula">{content.formula}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default < App />;
