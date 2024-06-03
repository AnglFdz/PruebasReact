import React, { useState } from 'react';
import './CustomInput.css';

const InputCustom = () => {
    const [fileName, setFileName] = useState('Seleccionar archivo');
    const [fileExtension, setFileExtension] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fileUpload, setFileUpload] = useState(null);

    const allowedExtensions = ['jpg', 'jpeg', 'png'];


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name.split('.').shift();
            const extension = file.name.split('.').pop().toLowerCase();
            if (allowedExtensions.includes(extension)) {
                setFileName(fileName);
                setFileUpload(file);
                setFileExtension(extension);
                setErrorMessage('');
            } else {
                setFileName('Seleccionar archivo');
                setFileExtension('');
                setErrorMessage('Tipo de archivo no permitido. Solo se permiten archivos: ' + allowedExtensions.join(', '));
            }
        } else {
            setFileName('Seleccionar archivo');
            setFileExtension('');
            setErrorMessage('');
        }
    };

    const UploadFile = () => {
        if (fileUpload) {
            console.log(fileUpload, "Archivo subido correctamente");
            setFileUpload(null);
        } else {
            setErrorMessage('No se ha seleccionado ningún archivo');
        }
    }

    return (
        <>
            <h1>Subir archivo</h1>
            <div className="file-upload">
                <input
                    type="file"
                    id="fileInput"
                    className="file-input"
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png" // especifica los tipos de archivo permitidos
                />
                <label htmlFor="fileInput" className="file-label">
                    <span className="file-label-text">{fileName}</span>
                </label>

                {fileExtension && (
                    <div className="file-extension">
                        <p>Extensión del archivo: {fileExtension}</p>
                    </div>
                )}
                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>

            <div style={{ marginTop: 30 }}>
                <button onClick={UploadFile}>Subir archivo</button>
            </div>

        </>
    );
};

export default InputCustom