/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
const DisplayContent = ({ content }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: content }} />
    );
};

export default DisplayContent;
