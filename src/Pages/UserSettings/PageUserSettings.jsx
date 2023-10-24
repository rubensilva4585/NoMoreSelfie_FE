import { useState, useEffect } from 'react';
import { getUser, removeProfileImage, updateProfileImage, updateUser, updateUserPassword } from '../../API/User';
import { IMAGE_STORAGE_PATH } from '../../constants/General';
import { FaTrash } from 'react-icons/fa';

export default function PageUserSettings() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({
        name: '',
        dob: '',
        phone: '',
        address: '',
        email: '',
        password: '',
    })

    const updateError = (fieldName, value) => {
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: value }));
    }

    const clearErrors = () => {
        setErrors({
            name: '',
            dob: '',
            phone: '',
            address: '',
            email: '',
            password: '',
        })
    };

    useEffect(() => {
        getUser()
            .then((response) => {
                setUser(response);
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    function submitPersonalInfo(e) {
        e.preventDefault();
        let hasErrors = false;
        clearErrors();

        if (e.target.name.value === "") {
            updateError('name', 'Nome inválido');
            hasErrors = true;
        }
        if (e.target.dob.value === "" || e.target.dob.value > new Date().toISOString().split('T')[0]) {
            updateError('dob', 'Data de nascimento inválida');
            hasErrors = true;
        }
        if (e.target.phone.value === "" || e.target.phone.value.length !== 9) {
            updateError('phone', 'Número de telefone inválido');
            hasErrors = true;
        }
        if (e.target.address.value === "") {
            updateError('address', 'Morada inválida');
            hasErrors = true;
        }

        if (hasErrors) return;

        updateUser({
            name: e.target.name.value,
            district_id: parseInt(e.target.address.value, 10),
            dob: e.target.dob.value,
            phone: e.target.phone.value,
        })
            .then((response) => {
                alert('Perfil atualizado com sucesso!');
                //setValues((prevValues) => ({ ...prevValues, email: '' }));
            })
            .catch((error) => {
                alert(error.response.data.error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function submitUserEmail(e) {
        e.preventDefault();
        let hasErrors = false;
        clearErrors();

        if (e.target.newemail.value === "" || !emailPattern.test(e.target.newemail.value)) {
            updateError('email', 'Email inválido');
            hasErrors = true;
        }
        if (e.target.newemail.value === user.email) {
            updateError('email', 'Email igual ao atual');
            hasErrors = true;
        }

        if (hasErrors) return;

        const newUser = {
            email: e.target.newemail.value,
        }

        updateUser({
            email: values.email
        })
            .then((response) => {
                alert('Email alterado com sucesso!');
                //setValues((prevValues) => ({ ...prevValues, email: '' }));
            })
            .catch((error) => {
                alert(error.response.data.error);
            })
            .finally(() => {
                //setIsLoading(false);
            });
    }

    function submitUserPassword(e) {
        e.preventDefault();

        updateUserPassword({
            oldpassword: e.target.oldpassword.value,
            newpassword: e.target.newpassword.value
        })
            .then((response) => {
                alert('Password alterada com sucesso!');
                // setValues((prevValues) => ({ ...prevValues, password: '' }));
            })
            .catch((error) => {
                alert(error.response.data.error);
            })
            .finally(() => {
                //setIsLoading(false);
            });
    }

    const handleAvatarChange = (e) => {

        const selectedImage = e.target.files[0];

        if (!selectedImage) return;

        updateProfileImage({
            avatar: selectedImage
        })
            .then((response) => {
                if (response.status === 201) {
                    alert('Foto de perfil alterada com sucesso!');
                    // return handleGetImages();
                } else {
                    throw new Error('Falha no upload. Por favor, tente novamente.');
                }
            })
            .catch((error) => {
                alert(error.response.data.error);
            })
            .finally(() => {
                //setIsLoading(false);
            });
    };

    const handleDeteleAvatar = () => {
        removeProfileImage()
            .then((response) => {
                alert('Foto de perfil removida com sucesso!');
                setUser((prevUser) => ({ ...prevUser, avatar: null }));
            })
            .catch((error) => {
                alert(error.response.data.error);
            })
            .finally(() => {
                //setIsLoading(false);
            });
    }

    return (
        <>
            <section className=" bg-gray-100/50 py-16">
                <div className="container max-w-4xl mx-auto shadow-md">
                    <div className="p-4 border-t-2 border-orange-400 rounded-lg bg-gray-100/5 flex justify-between items-center">
                        <h2 className="text-2xl leading-tight">
                            Definições de conta
                        </h2>
                    </div>
                    <div className="space-y-6 bg-white">
                        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                            <h2 className="max-w-sm mx-auto md:w-1/3 text-gray-800">
                                Informação Pessoal
                            </h2>
                            <div className="max-w-sm mx-auto space-y-5 md:w-2/3 ">
                                <div className=" relative flex flex-col gap-4">
                                    <div className="max-w-sm mx-auto md:w-full md:mx-0">
                                        <label htmlFor="name">
                                            Foto de perfil
                                        </label>
                                        <div className="flex justify-start items-center gap-4">
                                            <div className="relative h-16 w-16 overflow-hidden">
                                                <img
                                                    className="h-full w-full object-cover rounded-full"
                                                    src={user.avatar ? IMAGE_STORAGE_PATH + user.avatar : './../../images/noavatar.svg'}
                                                    alt=""
                                                />
                                                {user.avatar &&
                                                    <div
                                                        className="absolute flex justify-center items-center w-full h-full top-0 cursor-pointer text-transparent p-2 rounded-full hover:bg-red-500/50 hover:text-white"
                                                        onClick={handleDeteleAvatar}
                                                    >
                                                        <FaTrash />
                                                    </div>
                                                }
                                            </div>

                                            <div className="mt-2">
                                                <label className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg">
                                                    Alterar Foto
                                                    <input
                                                        type="file"
                                                        accept="image/jpeg, image/png, image/jpg"
                                                        max="2048"
                                                        style={{ display: 'none' }}
                                                        onChange={handleAvatarChange}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <form onSubmit={submitPersonalInfo}>
                                        <div className="relative">
                                            <label htmlFor="name">
                                                Nome
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                defaultValue={user.name}
                                                className={`rounded-lg flex-1 appearance-none border ${errors.name === '' ? 'border-gray-300' : 'border-red-600'}  w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                name="name"
                                                placeholder="Escreva o seu nome e apelido" required />
                                            {errors.name !== '' && <span className="text-red-600 text-sm">{errors.name}</span>}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="date">
                                                Data de nascimento
                                            </label>
                                            <input
                                                type="date"
                                                id="dob"
                                                defaultValue={user.dob}
                                                className={` rounded-lg flex-1 appearance-none border ${errors.dob === '' ? 'border-gray-300' : 'border-red-600'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                name="dob"
                                                placeholder="Escreva a sua data de nascimento" required />
                                            {errors.dob !== '' && <span className="text-red-600 text-sm">{errors.dob}</span>}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="phone">
                                                Telefone
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                defaultValue={user.phone}
                                                className={` rounded-lg flex-1 appearance-none border ${errors.phone === '' ? 'border-gray-300' : 'border-red-600'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                name="phone"
                                                placeholder="Escreva o seu contacto" required />
                                            {errors.phone !== '' && <span className="text-red-600 text-sm">{errors.phone}</span>}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="name">
                                                Morada
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                defaultValue={user.address}
                                                className={` rounded-lg flex-1 appearance-none border ${errors.address === '' ? 'border-gray-300' : 'border-red-600'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                name="address"
                                                placeholder="Escreva a sua localizaçao" required />
                                            {errors.address !== '' && <span className="text-red-600 text-sm">{errors.address}</span>}
                                        </div>
                                        <div className="flex w-full mt-2 justify-end">
                                            <button
                                                type="submit"
                                                className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                                Guardar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <hr />


                        <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">

                            <h2 className="max-w-sm mx-auto md:w-4/12 text-gray-800">
                                Alterar Email
                            </h2>
                            <div className="max-w-sm mx-auto space-y-5 md:w-2/3 ">
                                <div className=" relative flex flex-col gap-4">
                                    <div>
                                        O seu email atual é <span className="font-semibold text-black">{user.email}</span>
                                    </div>
                                    <form onSubmit={submitUserEmail}>
                                        <div className="relative">
                                            <label htmlFor="newemail">
                                                Novo Email
                                            </label>

                                            <input
                                                type="text"
                                                id="newemail"
                                                className={`rounded-lg flex-1 appearance-none border ${errors.email === '' ? 'border-gray-300' : 'border-red-600'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                name="newemail"
                                                placeholder="Escreva o seu novo Email" />
                                            {errors.email !== '' && <span className="text-red-600 text-sm">{errors.email}</span>}
                                        </div>
                                        <div className="flex w-full mt-2 justify-end">
                                            <button
                                                type="submit"
                                                className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                                Alterar Email
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>

                        </div>

                        <hr />

                        <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                            <h2 className="max-w-sm mx-auto md:w-4/12 text-gray-800">
                                Alterar Password
                            </h2>
                            <div className="max-w-sm mx-auto space-y-5 md:w-2/3 ">
                                <div className=" relative flex flex-col gap-4">
                                    <form onSubmit={submitUserPassword}>
                                        <div className="relative">
                                            <label htmlFor="oldpassword">
                                                Password Atual
                                            </label>
                                            <input
                                                type="password"
                                                id="oldpassword"
                                                className={` rounded-lg flex-1 appearance-none border ${errors.password !== 'Invalid password' ? 'border-gray-300' : 'border-red-600'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                name="oldpassword"
                                                placeholder="Escreva a Password atual" />
                                            {errors.password === 'Invalid password' && <span className="text-red-600 text-sm">{errors.password}</span>}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="newpassword">
                                                Nova Password
                                            </label>
                                            <input
                                                type="password"
                                                id="newpassword"
                                                className={` rounded-lg flex-1 appearance-none border ${errors.password !== 'New password cannot be the same as your current password.' ? 'border-gray-300' : 'border-red-600'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                name="newpassword"
                                                placeholder="Escreva a nova Password" />
                                            {errors.password === 'New password cannot be the same as your current password.' && <span className="text-red-600 text-sm">{errors.password}</span>}
                                        </div>
                                        <div className="flex w-full mt-2 justify-end">
                                            <button
                                                type="submit"
                                                className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                                Alterar Password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                            <h2 className="max-w-sm mx-auto md:w-4/12 text-gray-800">
                                Eliminar Conta
                            </h2>
                            <div className="max-w-sm mx-auto space-y-5 md:w-2/3 ">
                                <div className=" relative flex flex-col gap-4">
                                    <div>
                                        Ao eliminar a sua conta em NoMoreSelfie.pt todas as informações e conteúdos armazenados nessa conta serão <span className="font-semibold text-black">perdidos</span>.
                                        <br />
                                        <span className="font-semibold text-black">Deseja excluir a sua conta?</span>
                                    </div>
                                    <div className="flex w-full mt-2 justify-end">
                                        <button
                                            type="submit"
                                            className="py-2.5 px-4 text-red-400 border-red-400 border hover:bg-red-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                            Excluir conta
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}
