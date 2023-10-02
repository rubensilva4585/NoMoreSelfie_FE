import { AiOutlineClose } from 'react-icons/ai'
import "./SearchModal.css"

export default function SearchModal(props) {

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
                    <form>
                        <div className="mb-4">
                            <label htmlFor="date" className="block font-light text-gray-400 mb-2">Data:</label>
                            <input
                                type="date"
                                id="date"
                                className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                name="date"
                                placeholder="dd/mm/yyyy" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block font-light text-gray-400 mb-2">Mensagem:</label>
                            <textarea
                                id="message"
                                placeholder="Escreva a sua mensagem aqui..."
                                name="message"
                                rows="3"
                                className="w-full border rounded-lg resize-none flex-1 appearance-none  border-gray-300 py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50" />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="py-3.5 px-5 bg-orange-400 hover:bg-orange-500 focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>







            {/* <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className="text-xl  font-bold text-gray-800">Pedir informação</h2>
                        <AiOutlineClose onClick={props.closeModal} />
                    </div>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="message" className="block font-light text-gray-400 mb-2">Mensagem:</label>
                            <textarea
                                id="message"
                                placeholder="Escreva a sua mensagem aqui..."
                                name="message"
                                rows="3"
                                className="w-full border rounded-lg resize-none flex-1 appearance-none  border-gray-300 py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block font-light text-gray-400 mb-2">Data:</label>
                            <input
                                type="date"
                                id="date"
                                className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-3.5 px-5 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                name="date"
                                placeholder="dd/mm/yyyy" />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="py-3.5 px-5 bg-orange-400 hover:bg-orange-500 focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div> */}

        </>
    )
}