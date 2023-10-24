import { useState, useEffect } from 'react';
import { getUser, removeProfileImage, updateProfileImage, updateUser, updateUserPassword } from '../../API/User';
import { IMAGE_STORAGE_PATH } from '../../constants/General';
import { FaSpinner, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAvatar, getUserRole } from './../../redux/selectors';
import { update, updateAvatar } from '../../redux/actions';

export default function PageUserSettings() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        phone: '',
        dob: '',
        // suppliers only
        company: "",
        nif: "",
        address: '',
        // district_id: '',
        hasEdited: false,
    });
    const [personalInfoError, setPersonalInfoError] = useState({
        name: '',
        phone: '',
        dob: '',
        // suppliers only
        company: "",
        nif: "",
        address: '',
        // district_id: '',
    });
    const [isSubmittingPersonalInfo, setIsSubmittingPersonalInfo] = useState(false);
    const userRole = useSelector(getUserRole);
    const userAvatar = useSelector(getUserAvatar);
    const dispatch = useDispatch();


    const handleChange = (prop) => (e) => {
        setPersonalInfo({ ...personalInfo, [prop]: e.target.value, hasEdited: true });
        console.log(personalInfo)
    };
    const handleChangeNIF = () => (e) => {
        let input = e.target.value.replace(/\D/g, '');
        input = input.slice(0, 9);

        e.target.value = input;
        setPersonalInfo({ ...personalInfo, nif: input, hasEdited: true });
    };
    const handleChangePhone = () => (e) => {
        let input = e.target.value.replace(/\D/g, '');
        input = input.slice(0, 9);

        e.target.value = input;
        setPersonalInfo({ ...personalInfo, phone: input, hasEdited: true });
    };

    const personalDataValidation = () => {
        let isValid = true;

        setPersonalInfoError({
            name: '',
            phone: '',
            dob: '',
            // suppliers only
            company: "",
            nif: "",
            address: '',
            // district_id: '',
        });

        if (!personalInfo.name) {
            setPersonalInfoError((prevErrors) => ({
                ...prevErrors,
                name: 'Nome é obrigatório'
            }));
            isValid = false;
        }

        if (!personalInfo.phone || personalInfo.phone.length < 9 || !/^\d+$/.test(personalInfo.phone)) {
            setPersonalInfoError((prevErrors) => ({
                ...prevErrors,
                phone: 'Telefone inválido'
            }));
            isValid = false;
        }

        if (!personalInfo.dob || personalInfo.dob > new Date().toISOString().split('T')[0]) {
            setPersonalInfoError((prevErrors) => ({
                ...prevErrors,
                dob: 'Data de nascimento inválida'
            }));
            isValid = false;
        }

        if (userRole === 'supplier') {
            if (!personalInfo.company) {
                setPersonalInfoError((prevErrors) => ({
                    ...prevErrors,
                    company: 'Empresa é obrigatória'
                }));
                isValid = false;
            }

            if (!personalInfo.nif || personalInfo.nif.length < 9) {
                setPersonalInfoError((prevErrors) => ({
                    ...prevErrors,
                    nif: 'NIF inválido'
                }));
                isValid = false;
            }

            if (!personalInfo.address) {
                setPersonalInfoError((prevErrors) => ({
                    ...prevErrors,
                    address: 'Morada é obrigatória'
                }));
                isValid = false;
            }
        }

        return isValid;
    }


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
                setPersonalInfo({
                    name: response.name,
                    phone: response.phone,
                    dob: response.dob,
                    // suppliers only
                    company: response.company,
                    nif: response.nif,
                    address: response.address,
                    // district_id: '',
                    hasEdited: false,
                });
                setUser(response);
                console.log(response)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    function handleSubmitPersonalInfo(e) {
        e.preventDefault();
        setIsSubmittingPersonalInfo(true);

        if (!personalDataValidation()) {
            setIsSubmittingPersonalInfo(false);
            return;
        }

        updateUser({
            name: personalInfo.name,
            phone: personalInfo.phone,
            dob: personalInfo.dob,
            // supliers only
            ...(userRole === 'supplier'
                && {
                company: personalInfo.company,
                nif: personalInfo.nif,
                address: personalInfo.address,
            }),
        })
            .then((response) => {
                alert('Perfil atualizado com sucesso!');
                dispatch(
                    update(
                            response.data.user.name,
                            response.data.user.role,
                            response.data.user.avatar
                    ));
                //setValues((prevValues) => ({ ...prevValues, email: '' }));
            })
            .catch((error) => {
                alert(error.response.data.error);
            })
            .finally(() => {
                setIsSubmittingPersonalInfo(false);
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
                    //setUser((prevUser) => ({ ...prevUser, avatar: response.data.avatar }));
                    dispatch(
                        updateAvatar(
                                response.data.avatar
                        ));
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
                //setUser((prevUser) => ({ ...prevUser, avatar: null }));
                dispatch(
                    updateAvatar(
                            null
                    ));
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
                                    {userRole === 'supplier' &&
                                        <div className="max-w-sm mx-auto md:w-full md:mx-0">
                                            <label htmlFor="name">
                                                Foto de perfil
                                            </label>
                                            <div className="flex justify-start items-center gap-4">
                                                <div className="relative h-16 w-16 overflow-hidden">
                                                    <img
                                                        className="h-full w-full object-cover rounded-full"
                                                        src={userAvatar ? IMAGE_STORAGE_PATH + userAvatar : './../../images/noavatar.svg'}
                                                        alt=""
                                                    />
                                                    {userAvatar &&
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
                                    }
                                    <form onSubmit={handleSubmitPersonalInfo} className='space-y-2'>
                                        <div className="relative">
                                            <label htmlFor="name">
                                                Nome
                                            </label>
                                            <input
                                                className={`rounded-lg flex-1 appearance-none border ${personalInfoError.name === '' ? 'border-gray-200' : 'border-red-500'}  w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Nome e apelido"
                                                defaultValue={user.name}
                                                onChange={handleChange("name")}
                                            />
                                            {personalInfoError.name !== '' && <span className="text-red-600 text-sm">{personalInfoError.name}</span>}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="date">
                                                Data de nascimento
                                            </label>
                                            <input
                                                className={` rounded-lg flex-1 appearance-none border ${personalInfoError.dob === '' ? 'border-gray-200' : 'border-red-500'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                type="date"
                                                id="dob"
                                                name="dob"
                                                placeholder="Escreva a sua data de nascimento"
                                                defaultValue={user.dob}
                                                onChange={handleChange("dob")}
                                            />
                                            {personalInfoError.dob !== '' && <span className="text-red-600 text-sm">{personalInfoError.dob}</span>}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="phone">
                                                Telefone
                                            </label>
                                            <input
                                                className={` rounded-lg flex-1 appearance-none border ${personalInfoError.phone === '' ? 'border-gray-200' : 'border-red-500'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                placeholder="Telefone (9 dígitos)"
                                                defaultValue={user.phone}
                                                onChange={handleChangePhone()}
                                            />
                                            {personalInfoError.phone !== '' && <span className="text-red-600 text-sm">{personalInfoError.phone}</span>}
                                        </div>
                                        {userRole === 'supplier' &&
                                            <>
                                                <div className="relative">
                                                    <label htmlFor="name">
                                                        Morada
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        defaultValue={user.address}
                                                        className={` rounded-lg flex-1 appearance-none border ${personalInfoError.address === '' ? 'border-gray-200' : 'border-red-500'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                        name="address"
                                                        placeholder="Vive em..."
                                                    />
                                                    {personalInfoError.address !== '' && <span className="text-red-600 text-sm">{personalInfoError.address}</span>}
                                                </div>
                                                <div className="relative">
                                                    <label htmlFor="name">
                                                        Empresa
                                                    </label>
                                                    <input
                                                        className={` rounded-lg flex-1 appearance-none border ${personalInfoError.company === '' ? 'border-gray-200' : 'border-red-500'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                        type="text"
                                                        id="company"
                                                        name="company"
                                                        defaultValue={user.company}
                                                        placeholder="Empresa"
                                                        onChange={handleChange("company")}
                                                    />
                                                    {personalInfoError.company !== '' && <span className="text-red-600 text-sm">{personalInfoError.company}</span>}
                                                </div>

                                                <div className="relative">
                                                    <label htmlFor="name">
                                                        NIF
                                                    </label>
                                                    <input
                                                        className={` rounded-lg flex-1 appearance-none border ${personalInfoError.nif === '' ? 'border-gray-200' : 'border-red-500'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                        type="text"
                                                        id="nif"
                                                        name="nif"
                                                        defaultValue={user.nif}
                                                        placeholder="Número de identificação fiscal"
                                                        onChange={handleChangeNIF()}
                                                    />
                                                    {personalInfoError.nif !== '' && <span className="text-red-600 text-sm">{personalInfoError.nif}</span>}
                                                </div>
                                            </>
                                        }
                                        <div className="flex w-full mt-2 justify-end">
                                            {personalInfo.hasEdited &&
                                                <button
                                                    className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg "
                                                    type="submit"
                                                    disabled={isSubmittingPersonalInfo || !personalInfo.hasEdited}
                                                >
                                                    {isSubmittingPersonalInfo ? (
                                                        <FaSpinner className="animate-spin -ml-1 h-5 w-5 text-white" />
                                                    ) : (
                                                        <span>Guardar</span>
                                                    )}
                                                </button>
                                            }
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
                                                className={`rounded-lg flex-1 appearance-none border ${errors.email === '' ? 'border-gray-200' : 'border-red-500'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                                type="text"
                                                id="email"
                                                name="email"
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
                                    <form onSubmit={submitUserPassword} className='space-y-2'>
                                        <div className="relative">
                                            <label htmlFor="oldpassword">
                                                Password Atual
                                            </label>
                                            <input
                                                type="password"
                                                id="oldpassword"
                                                className={` rounded-lg flex-1 appearance-none border ${errors.password !== 'Invalid password' ? 'border-gray-200' : 'border-red-500'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
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
                                                className={` rounded-lg flex-1 appearance-none border ${errors.password !== 'New password cannot be the same as your current password.' ? 'border-gray-200' : 'border-red-500'} w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
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
