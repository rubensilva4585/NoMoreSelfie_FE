import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export function ServiceDescription(props) {
    // const [text, setText] = useState('');
    const reactQuillRef = useRef(null);
    const maxCharacterCount = 255;


    return (
        <>
            <ReactQuill
                theme="snow"
                placeholder='Dê informações sobre o seu serviço...'
                value={props.text}
                onChange={props.setText}
                ref={reactQuillRef}
            />

            {/* <div className="absolute bottom-2 right-2 text-sm text-gray-400">"asd"/{maxCharacterCount}</div> */}
        </>
    )
}