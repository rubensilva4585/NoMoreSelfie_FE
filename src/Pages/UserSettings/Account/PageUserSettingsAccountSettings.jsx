
export default function PageUserSettingsAccountSettings() {
    return (
        <>             
            <div class="flex flex-row justify-between w-full mb-1 sm:mb-0">
                <h2 class="text-2xl leading-tight">
                    Ajustes de Conta
                </h2>
            </div>
            <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">           
                <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            Password
                        </h3>
                    </div>
                    <div class="border-t border-gray-200 px-4 py-5 flex flex-col gap-4">
                        <div className="relative">
                            <label for="oldpassword" class="text-gray-700">
                                Password Atual
                            </label>
                            <input
                                type="password"
                                id="oldpassword"
                                className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                name="oldpassword"
                                placeholder="Escreva a Password atual" />
                        </div>
                        <div className="relative">
                            <label for="newpassword" class="text-gray-700">
                                Nova Password
                            </label>
                            <input
                                type="password"
                                id="newpassword"
                                className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                name="newpassword"
                                placeholder="Escreva a nova Password" />
                        </div>
                        <div className="flex w-fit mt-2">
                            <button
                                type="submit"
                                className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                Alterar Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">           
                <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            Email
                        </h3>
                    </div>
                    <div class="border-t border-gray-200 px-4 py-5 flex flex-col gap-4">
                        <div>
                            O seu email atual é <span className="font-semibold">teste@gmail.com</span>
                        </div>
                        <div className="relative">
                            <label for="newemail" class="text-gray-700">
                                Novo Email
                            </label>
                            <input
                                type="email"
                                id="newemail"
                                className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                name="newemail"
                                placeholder="Escreva o seu novo Email"/>
                        </div>
                        <div className="flex w-fit mt-2">
                            <button
                                type="submit"
                                className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                Alterar Email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">           
                <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">
                            Eliminar Conta
                        </h3>
                    </div>
                    <div class="border-t border-gray-200 px-4 py-5 flex flex-col gap-4">
                        <div>
                        Ao eliminar a sua conta em NoMoreSelfie.pt todas as informações e conteúdos armazenados nessa conta serão <span className="font-semibold">perdidos</span>.
                        <br/>
                        Deseja excluir a sua conta? 
                        </div>
                        <div className="flex w-fit mt-2">
                            <button
                                type="submit"
                                className="py-2.5 px-4 text-red-400 border-red-400 border hover:bg-red-400 hover:text-white w-full transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                Eliminar Conta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>  
    )
}
