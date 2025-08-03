import React, { useState } from 'react';
const items=[
          {
            value: 'html',
            label: 'HTML',
            panel:
              'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
          },
          {
            value: 'css',
            label: 'CSS',
            panel:
              'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
          },
          {
            value: 'javascript',
            label: 'JavaScript',
            panel:
              'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
          }
        ];
const Tabs = ({ items }) => {
  const [focusTab, setFocusTab] = useState(0);

  const handleBtnClick = (index) => {
    setFocusTab(index);
  };
  return (
    <>
      <section className="tabs_group">
        {items.map(({ label }, index) => {
          return (
            <button
              className="tabs_btn"
              key={`${label}_${index}`}
              onClick={() => handleBtnClick(index)}
            >
              {label}
            </button>
          );
        })}
      </section>

      <p>{items[focusTab].panel}</p>
    </>
  );
};

export default Tabs;
