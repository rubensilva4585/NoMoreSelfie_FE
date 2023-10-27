import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import { submitRequest } from '../../API/General';
import "./SearchModal.css"

export default function SearchModal(props) {
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [request, setRequest] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
        supplier_id: props.supplier_id,
    })
    const [requestErrors, setRequestErrors] = useState({
        name: '',
        email: '',
        phone: '',
        description: '',
    })


    const handleChange = (prop) => (e) => {
        setRequest({ ...request, [prop]: e.target.value });
    }

    const handleChangePhone = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        input = input.slice(0, 9);

        e.target.value = input;
        setRequest({ ...request, phone: input });
    }

    const inputValidation = () => {
        let isValid = true;

        setRequestErrors({
            name: '',
            email: '',
            phone: '',
            description: '',
        })

        if (!request.name) {
            setRequestErrors(prevState => ({
                ...prevState,
                name: 'Nome é obrigatório'
            }))
            isValid = false;
        }

        if (!request.email && !request.phone) {
            setRequestErrors(prevState => ({
                ...prevState,
                email: 'Email ou telefone é obrigatório',
                phone: 'Email ou telefone é obrigatório'
            }))
            isValid = false;
        }

        if (request.email && !request.email.includes('@')) {
            setRequestErrors(prevState => ({
                ...prevState,
                email: 'Email inválido'
            }))
            isValid = false;
        }

        if (request.phone && request.phone.length < 9) {
            setRequestErrors(prevState => ({
                ...prevState,
                phone: 'Telefone inválido'
            }))
            isValid = false;
        }

        if (!request.description) {
            setRequestErrors(prevState => ({
                ...prevState,
                description: 'Mensagem é obrigatória'
            }))
            isValid = false;
        }
        if (request.description.length > 255) {
            setRequestErrors(prevState => ({
                ...prevState,
                description: 'Mensagem deve ter no máximo 255 caracteres'
            }))
            isValid = false;
        }
        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmiting(true);

        if (!inputValidation()) {
            setIsSubmiting(false);
            return;
        }

        console.log(request)

        submitRequest({
            name: request.name,
            ...(request.phone && { phone: request.phone }),
            ...(request.email && { email: request.email }),
            description: request.description,
            supplier_id: request.supplier_id,
        })
            .then((response) => {
                alert('Pedido enviado com sucesso!')
                props.closeModal();
            })
            .catch((error) => {
                alert('Erro ao enviar pedido!')
                console.log(error)
            })
            .finally(() => {
                setIsSubmiting(false);
            })
    }

    return (
        <>
            <div
                className="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 modal-animation-bg"
                onClick={props.closeModal}>
                <div
                    className="bg-white absolute bottom-0 w-full md:static md:min-w-[416px] md:max-w-[90vw] md:w-auto md:mx-16 p-4 rounded-lg shadow-lg modal-animation"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className="text-xl  font-bold text-gray-800">Pedir informação</h2>
                        <AiOutlineClose
                            onClick={props.closeModal}
                            className='text-gray-400 hover:text-gray-800  text-2xl transition ease-in duration-200' />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-light text-gray-400 mb-2">Nome:</label>
                            <input
                                type="text"
                                id="name"
                                className={` rounded-lg flex-1 appearance-none border ${requestErrors.name ? 'border-red-500' : 'border-gray-300'} w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                name="name"
                                placeholder="Nome"
                                onChange={handleChange('name')} />
                            {requestErrors.name &&
                                <p className='text-red-500 text-sm'>{requestErrors.name}</p>
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-light text-gray-400 mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className={`rounded-lg flex-1 appearance-none border ${requestErrors.email ? 'border-red-500' : 'border-gray-300'}  w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                name="email"
                                placeholder="Email"
                                onChange={handleChange('email')} />
                            {requestErrors.email &&
                                <p className='text-red-500 text-sm'>{requestErrors.email}</p>
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block font-light text-gray-400 mb-2">Telefone:</label>
                            <input
                                type="tel"
                                id="phone"
                                className={`rounded-lg flex-1 appearance-none border ${requestErrors.phone ? 'border-red-500' : 'border-gray-300'} w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                name="phone"
                                placeholder="Telefone"
                                onChange={handleChangePhone} />
                            {requestErrors.phone &&
                                <p className='text-red-500 text-sm'>{requestErrors.phone}</p>
                            }
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block font-light text-gray-400 mb-2">Mensagem:</label>
                            <textarea
                                id="description"
                                placeholder="Escreva a sua mensagem aqui..."
                                name="description"
                                rows="3"
                                className={`w-full border rounded-lg resize-none flex-1 appearance-none  ${requestErrors.description ? 'border-red-500' : 'border-gray-300'} py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50`}
                                onChange={handleChange('description')} />
                            {requestErrors.description &&
                                <p className='text-red-500 text-sm'>{requestErrors.description}</p>
                            }
                        </div>
                        <div>
                            <button
                                className="mt-5 tracking-wide font-semibold bg-orange-400 text-white w-full py-4 rounded-lg hover:bg-orange-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                type="submit"
                                disabled={isSubmiting}>
                                {isSubmiting ? (
                                    <FaSpinner className="animate-spin -ml-1 h-5 w-5 text-white" />
                                ) :
                                    (<span>Enviar</span>)}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}