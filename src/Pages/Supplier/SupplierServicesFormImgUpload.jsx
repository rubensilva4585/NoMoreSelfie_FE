import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaTrash } from 'react-icons/fa';

export default function SupplierServicesFormImgUpload() {
        const [selectedFiles, setSelectedFiles] = useState([]);

        const { getRootProps, getInputProps } = useDropzone({
                accept: 'image/png, image/jpeg, image/jpg', // Defina os tipos de imagem desejados
                onDrop: acceptedFiles => {
                        const imageFiles = acceptedFiles.filter(file =>
                                file.type.startsWith('image/')
                        );

                        setSelectedFiles(prevSelectedFiles => [
                                ...prevSelectedFiles,
                                ...imageFiles.map(file => Object.assign(file, {
                                        preview: URL.createObjectURL(file)
                                }))
                        ]);
                }
        });

        const dropzoneStyles = {
                border: '2px dashed #ccc',
                borderRadius: '4px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
        };

        const thumbsContainer = {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 16
        };

        const thumb = {
                position: 'relative',
                display: 'inline-flex',
                borderRadius: 2,
                border: '1px solid #eaeaea',
                marginBottom: 8,
                marginRight: 8,
                width: 100,
                height: 100,
                padding: 4,
                boxSizing: 'border-box'
        };

        const thumbInner = {
                display: 'flex',
                minWidth: 0,
                overflow: 'hidden'
        };

        const img = {
                display: 'block',
                width: 'auto',
                height: '100%'
        };

        const iconStyle = {
                position: 'absolute',
                top: 0,
                right: 0,
                cursor: 'pointer',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                padding: '4px',
                borderRadius: '50%'
        };

        const handleRemove = (index) => {
                const newSelectedFiles = [...selectedFiles];
                newSelectedFiles.splice(index, 1);
                setSelectedFiles(newSelectedFiles);
        };

        const handleFileUpload = async () => {
                if (selectedFiles.length === 0) {
                        alert('Por favor, selecione um ou mais arquivos.');
                        return;
                }

                const formData = new FormData();
                selectedFiles.forEach(file => {
                        formData.append('files[]', file);
                });

                try {
                        // Substitua a URL abaixo pela URL da rota de upload no seu backend Laravel
                        const response = await fetch('URL_DA_ROTA_DE_UPLOAD', {
                                method: 'POST',
                                body: formData,
                        });

                        if (response.ok) {
                                alert('Upload bem-sucedido!');
                                setSelectedFiles([]);
                        } else {
                                alert('Falha no upload. Por favor, tente novamente.');
                        }
                } catch (error) {
                        console.error('Erro ao fazer upload:', error);
                        alert('Ocorreu um erro ao fazer upload. Por favor, tente novamente.');
                }
        };

        return (
                <div>
                        <div {...getRootProps({ style: dropzoneStyles })} className="dropzone">
                                <input {...getInputProps()} />
                                <p>Arraste e solte arquivos aqui ou clique para selecionar arquivos.</p>
                        </div>
                        <aside style={thumbsContainer}>
                                {selectedFiles.map((file, index) => (
                                        <div style={thumb} key={file.name}>
                                                <div style={thumbInner}>
                                                        <img
                                                                src={file.preview}
                                                                style={img}
                                                                alt={file.name}
                                                        />
                                                        <div
                                                                style={iconStyle}
                                                                onClick={() => handleRemove(index)}
                                                        >
                                                                <FaTrash />
                                                        </div>
                                                </div>
                                        </div>
                                ))}
                        </aside>
                        {/* {selectedFiles.length > 0 && (
                                <div>
                                        <button onClick={handleFileUpload}>Enviar</button>
                                </div>
                        )} */}
                </div>
        );
}






