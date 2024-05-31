import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { StyleClass } from 'primereact/styleclass';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import reactLogo from '../assets/react.svg';
import { Rating } from "primereact/rating";
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { ColorPicker } from 'primereact/colorpicker';
import InputCustom from './InputCustom';

function Principal() {

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [number, setNumber] = useState(0);
    const [Lista, setLista] = useState([]);
    const [buscar, setBuscar] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [value, setValue] = useState(null);
    const [value1, setValue1] = useState(null);
    const [backColor, setBackColor] = useState('#000');
    const items = [
        { name: 'Option 1', value: 1 },
        { name: 'Option 2', value: 2 },
        { name: 'Option 3', value: 3 }
    ];
    const toast = useRef(null);
    const toggleBtnRef = useRef(null);

    useEffect(() => {
        console.log('Se ha cambiado el color:', backColor);
    }, [backColor]);


    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const confirm1 = () => {
        confirmDialog({
            group: 'headless',
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    const numRandom = () => Math.floor(Math.random() * 1025) + 1;

    const load = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const justifyOptions = [
        { icon: 'pi pi-align-left', value: 'left' },
        { icon: 'pi pi-align-right', value: 'Right' },
        { icon: 'pi pi-align-center', value: 'Center' },
        { icon: 'pi pi-align-justify', value: 'Justify' }
    ];

    const justifyTemplate = (option) => {
        return <i className={option.icon}></i>;
    }

    const loadPokemon = async (num) => {
        setLoading(true);
        console.log(num);
        return fetch(`https://pokeapi.co/api/v2/pokemon/${num.toString()}`)
            .then(res => res.json())
            .then(data => {
                if (data != null) {
                    setLoading(false);
                    console.log(data.forms[0].name);
                    setName(data.forms[0].name);
                    setNumber(num);
                    return data;
                } else {
                    console.log(`Ocurrió un error`);
                    return null;
                }
            }).catch(error => console.error(error));
    };

    const chargeList = async (num) => {
        setLoading(true);
        console.log(num);
        return fetch(`https://pokeapi.co/api/v2/pokemon/${num.toString()}`)
            .then(res => res.json())
            .then(data => {
                if (data != null) {
                    setLoading(false);
                    console.log(data.forms[0].name);
                    return data;
                } else {
                    console.log(`Ocurrió un error`);
                    return null;
                }
            }).catch(error => console.error(error));
    };

    const loadListaPokemon = async () => {
        let num = numRandom();
        let listTemp = [];
        let x = 0;
        while (x < 6) {
            listTemp.push(chargeList(num));
            num++;
            x++;
        }
        Promise.all(listTemp)
            .then(
                pokemonData => {
                    const listPokemon = pokemonData
                        .map(
                            data => ({
                                name: data.forms[0].name,
                                number: data.id
                            }));
                    setLista(listPokemon);
                    console.log(listPokemon);
                });
    };

    const searchPokemon = async () => {
        setLoading(true);
        return fetch(`https://pokeapi.co/api/v2/pokemon/${buscar.toString().toLowerCase()}`)
            .then(res => res.json())
            .then(data => {
                if (data != null) {
                    setLoading(false);
                    console.log(data.forms[0].name);
                    setName(data.forms[0].name);
                    setNumber(data.id);
                    return data;
                } else {
                    console.log(`Ocurrió un error`);
                    return null;
                }
            }).catch(error => console.error(error));
    };

    let textButton = `Toggle p-${disabled ? 'enabled' : 'disabled'}`;

    return (
        <>
        <div style={{ backgroundColor: backColor }}>
            <div >
        <div>
            <div className="card flex justify-content-center">
                <ColorPicker value={backColor} onChange={(e) => {
                    setBackColor(e.value);
                }} />
            </div>

            <div>
                <p>{backColor}</p>
            </div>
            </div>
            <Toast ref={toast}></Toast>
            <div className="App">
                <header className="App-header">
                    <img src={reactLogo} className="App-logo" alt="logo" style={{ width: 80 }} />
                    <p className='text-xl'>
                        Patio de Juegos
                    </p>

                    <div style={{ marginBottom: 10, marginTop: 10 }}>
                        <Button label='Prueba' icon="pi-check" loading={loading} onClick={() => {
                            const numtemp = numRandom();
                            loadPokemon(numtemp)
                        }} />
                    </div>
                </header>

                <div>
                    <Button label='Cargar lista' icon="pi-check" loading={loading} onClick={() => {
                        loadListaPokemon();
                    }} />
                </div>

                <div className="card flex justify-content-center">
                    <FloatLabel>
                        <InputText id="buscarPokemon" value={buscar} onChange={(e) => setBuscar(e.target.value)} />
                        <label htmlFor="buscarPokemon">Nombre</label>
                    </FloatLabel>
                    <Button label='Buscar Pokemon' icon="pi-check" loading={loading} onClick={() => {
                        searchPokemon();
                    }} />
                </div>

                <Toast ref={toast} />
                <ConfirmDialog
                    group="headless"
                    content={({ headerRef, contentRef, footerRef, hide, message }) => (
                        <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
                            <div className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                                <i className="pi pi-question text-5xl"></i>
                            </div>
                            <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
                                {message.header}
                            </span>
                            <p className="mb-0" ref={contentRef}>
                                {message.message}
                            </p>
                            <div className="flex align-items-center gap-2 mt-4" ref={footerRef}>
                                <Button
                                    label="Save"
                                    onClick={(event) => {
                                        hide(event);
                                        accept();
                                    }}
                                    className="w-8rem"
                                ></Button>
                                <Button
                                    label="Cancel"
                                    outlined
                                    onClick={(event) => {
                                        hide(event);
                                        reject();
                                    }}
                                    className="w-8rem"
                                ></Button>
                            </div>
                        </div>
                    )}
                />
                <div className="card flex flex-wrap gap-2 justify-content-center">
                    <Button onClick={confirm1} icon="pi pi-check" label="Confirm"></Button>
                </div>

                <div className="flex flex-column md:flex-row justify-content-between my-5">
                    <Button type="button" label="Button 1" className="mb-3 md:mb-0"></Button>
                    <Button type="button" label="Button 2" className="p-button-secondary mb-3 md:mb-0"></Button>
                    <Button type="button" label="Button 3" className="p-button-danger"></Button>
                </div>
                <div className="grid">
                    <div className='lg:col-6 md:col-9'>
                        <div style={{ backgroundColor: 'var(--highlight-bg)', color: 'var(--highlight-text-color)', borderRadius: 'var(--border-radius)', padding: '3rem' }}>
                            Highlighted Item
                        </div>
                        <div style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)', borderRadius: 'var(--border-radius)', padding: '3rem' }}>
                            Primary Color
                        </div>
                    </div>
                    <div className='lg:col-6 md:col-3'>
                        <div style={{ color: 'white', borderRadius: 'var(--border-radius)', padding: '3rem' }}
                        className='bg-primary hover:bg-indigo-400 border-3 border-round hover:border-red-900' >
                            Highlighted Item
                        </div>
                        <div style={{ backgroundColor: 'var(--primary-color)', color: 'var(--primary-color-text)', borderRadius: 'var(--border-radius)', padding: '3rem' }}>
                            Primary Color
                        </div>
                    </div>
                </div>
                <div className="card">
                    <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                </div>

                {number > 0 ? <h1>{name} - {number}</h1> : null}
                <div>
                    {
                        loading ?
                            <h1>Buscando: {buscar}</h1>
                            : buscar === '' && !loading ? 'No se ha encontrado nada' : null
                    }
                </div>

                <div className="card flex flex-column align-items-center gap-3">
                    <StyleClass nodeRef={toggleBtnRef} selector="@next" toggleClassName="p-disabled" />
                    <Button ref={toggleBtnRef} label={textButton} onClick={() => setDisabled(!disabled)} />
                    <InputText />
                </div>

                <div className="card">
                    <DataTable value={Lista}>
                        <Column field="name" header="Nombre"></Column>
                        <Column field="number" header="Número"></Column>
                    </DataTable>
                </div>
            </div>

            <div className="card flex justify-content-center">
                <Rating value={value} onChange={(e) => setValue(e.value)} stars={5} />
            </div>
            <div>
                <p>{value}</p>
            </div>

            <div>
                <h1>Hello Unhappy</h1>
                <InputCustom />
            </div>

            <div className="card flex justify-content-center">
                <SelectButton value={value} onChange={(e) => setValue(e.value)} optionLabel="name" options={items} multiple />
            </div>

            <div className="p-inputgroup flex-1">
                <Button icon="pi pi-check" className="p-button-success" />
                <InputText placeholder="Vote" />
                <Button icon="pi pi-times" className="p-button-danger" />
            </div>

            <div className="card flex justify-content-center">
                <SelectButton value={value1} onChange={(e) => setValue1(e.value)} itemTemplate={justifyTemplate} optionLabel="value" options={justifyOptions} />
            </div>

            <div>
                <p>{value1}</p>
            </div>
        </div>
        </div>
        
        </>
    )
}

export default Principal;
