import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { IMAGE_TOTAL_MAX } from '../../../constants/General';
import { uploadSupplierImages } from '../../../API/User';

export default function SupplierPorfolioFormImgUpload({ totalImages, handleGetImages }) {
        // states
        const [isLoading, setIsLoading] = useState(false);

        // functions
        const { getRootProps, getInputProps } = useDropzone({
                accept: 'image/png, image/jpeg, image/jpg',
                onDrop: acceptedFiles => {
                        setIsLoading(true);
                        const imageFiles = acceptedFiles.filter(file =>
                                file.type.startsWith('image/')
                        );

                        handleFileUpload(imageFiles);
                }
        });

        const handleFileUpload = (imageFiles) => {
                setIsLoading(true);
                try {
                        if (imageFiles.length === 0)
                                throw new Error('Por favor, selecione um ou mais arquivos válidos (png, jpeg, jpg).');

                        if (totalImages + imageFiles.length > IMAGE_TOTAL_MAX)
                                throw new Error(`Limite de imagens atingido (${totalImages + imageFiles.length}/${IMAGE_TOTAL_MAX})`);
                }
                catch (error) {
                        alert(error);
                        setIsLoading(false);
                        return;
                }

                uploadSupplierImages(imageFiles)
                        .then((response) => {
                                if (response.status === 201) {
                                        return handleGetImages();
                                } else {
                                        throw new Error('Falha no upload. Por favor, tente novamente.');
                                }
                        })
                        .catch((error) => {
                                alert(error.response.data.error);
                        })
                        .finally(() => {
                                setIsLoading(false);
                        });
        };

        
        return (
                <div className="h-60 w-full flex justify-center items-center border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer">
                        {isLoading
                                ? <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400 bg-gray-100/50" />
                                : !totalImages >= IMAGE_TOTAL_MAX ? (
                                        <p>Limite de {IMAGE_TOTAL_MAX} imagens atingido.</p>
                                )
                                        : (
                                                <div {...getRootProps()} className='flex flex-col gap-4 justify-center items-center h-full'>
                                                        <input {...getInputProps()} />
                                                        <FaPlus className="text-gray-400 text-4xl" />
                                                        <p>Arraste e solte ou clique aqui para adicionar imagens. ({totalImages}/{IMAGE_TOTAL_MAX})</p>
                                                </div>
                                        )
                        }
                </div>
        );
}
