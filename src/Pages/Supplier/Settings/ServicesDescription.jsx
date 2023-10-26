import React, { useEffect, useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import { ServiceDescription } from './ServicesDescription';
import { getUser } from '../../../API/User';


export function ServiceDescription(props) {
    // const [text, setText] = useState('');
    const reactQuillRef = useRef(null);
    const maxCharacterCount = 255;
    let [sDescription, setSDescription] = useState(null);

    useEffect(() => {
        getUser()
            .then((response) => {
                setSDescription(response.service_description);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
                <ReactQuill
                    theme="snow"
                    placeholder='Dê informações sobre o seu serviço...'
                    onChange={props.setText}
                    defaultValue={sDescription}
                    ref={reactQuillRef}
                    className='h-40'
                />

            {/* <div className="absolute bottom-2 right-2 text-sm text-gray-400">"asd"/{maxCharacterCount}</div> */}
        </>
    )
}