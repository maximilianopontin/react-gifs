
import React, { useState } from "react";


function GalleryGifs() {
    const [gifs, setGifs] = useState([]); //Estado para almacenar los GIFs cargados
    const [error, setError] = useState(''); // Estado para mostrar errores

    // Manejar la carga de archivos
    //cuando el usuario selecciona un archivo (input type file) se activa un evento,
    //en donde convertimos la lista de archivos en un array (array.from) para poder manipularlo
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);//archivos selecionados por el usuario
        const validGifs = []; //crea array de gifs validos vacio
        const errorMessages = [];

        //Filtrar los archivos que no sean de tipo 'image/gif'
        files.forEach((file) => { //itera una vez por cada archivo del array 
            // Validar el tipo MIME
            if (file.type !== 'image/gif') {//si el tipo mime del gif no es de tipo gif se agrega un msj de error al array
                errorMessages.push(`El archivo ${file.name} no es un GIF válido.`);
                return;
            }
            // Validar el tamaño del archivo (5 MB)
            if (file.size > 5 * 1024 * 1024) { // 5 MB en bytes
                errorMessages.push(`El archivo ${file.name} excede el tamaño permitido de 5 MB.`);
                return;
            }
            // Si pasa las validaciones, agregar a la lista de GIFs válidos
            validGifs.push(file);
        });
        // Manejar mensajes de error
        if (errorMessages.length > 0) {//si hay mensajes de error en el array de msj se combinan con el join y se muestran al usuario
            setError(errorMessages.join('\n')); // Mostrar todos los errores
            return; // Salir de la función si hay errores
        }


        const newGifs = [];//crea array vacio newgifs
        validGifs.forEach((file) => {//itera sobre validGifs y lee cada archivo GIF.
            // Leer cada archivo válido 
            const reader = new FileReader();//se crea filereader para cada objeto
            reader.onload = () => {//se ejecuta cuando el archivo ha sido leído correctamente
                newGifs.push(reader.result);//contiene la URL del archivo que se agrega al array newGifs.
                if (newGifs.length === validGifs.length) {//si el numero de gifs leidos es igual al numero de gifs validos
                    setGifs((prevGifs) => [...prevGifs, ...newGifs]);//Se actualiza el estado setGifs con todos los nuevos GIFs
                    setError(''); // Limpiar errores si todo es exitoso
                }
            };
            reader.readAsDataURL(file);//convierte el archivo en una URL, permitiendo que se pueda mostrar directamente en una etiqueta <img>.
        });
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Galería de GIFs</h1>
            <input
                type="file"
                accept="image/gif"
                multiple
                onChange={handleFileUpload}
                style={{ margin: '20px 0' }}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                {gifs.map((gif, index) => (
                    <div key={index} style={{ margin: '10px' }}>
                        <img
                            src={gif}
                            alt={`gif-${index}`}
                            style={{
                                width: '200px',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default GalleryGifs;