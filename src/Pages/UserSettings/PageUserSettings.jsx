
export default function PageUserSettings() {
    return (
        <>
            <section class=" bg-gray-100/50 py-16">
                <div class="container max-w-4xl mx-auto shadow-md">
                    <div class="p-4 border-t-2 border-orange-400 rounded-lg bg-gray-100/5 flex justify-between items-center">
                        <h2 class="text-2xl leading-tight">
                            Definiçoes de conta
                        </h2>

                    </div>
                    <div class="space-y-6 bg-white">
                        <div class="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                            <h2 class="max-w-sm mx-auto md:w-1/3 text-gray-800">
                                Informação Pessoal
                            </h2>
                            <div class="max-w-sm mx-auto space-y-5 md:w-2/3 ">
                                <div class=" relative flex flex-col gap-4">
                                    <div class="max-w-sm mx-auto md:w-full md:mx-0">
                                        <label for="name">
                                            Foto de perfil
                                        </label>
                                        <div className="flex justify-start items-center gap-4">
                                            <img alt="profil" src="https://www.tailwind-kit.com/images/person/1.jpg" class="object-cover rounded-full h-16 w-16 " />
                                            <div className="mt-2">
                                                <button
                                                    type="submit"
                                                    className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                                    Alterar Foto
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <label for="name">
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                            name="name"
                                            placeholder="Escreva o seu nome e apelido" />
                                    </div>
                                    <div className="relative">
                                        <label for="name">
                                            Data de nascimento
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                            name="name"
                                            placeholder="Escreva o seu nome" />
                                    </div>
                                    <div className="relative">
                                        <label for="phone">
                                            Telefone
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                            name="phone"
                                            placeholder="Escreva o seu contacto" />
                                    </div>
                                    <div className="relative">
                                        <label for="name">
                                            Morada
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                            name="name"
                                            placeholder="Escreva a sua localizaçao" />
                                    </div>
                                    <div className="flex w-full mt-2 justify-end">
                                        <button
                                            type="submit"
                                            className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />


                        <div class="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                            <h2 class="max-w-sm mx-auto md:w-4/12 text-gray-800">
                                Alterar Email
                            </h2>
                            <div class="max-w-sm mx-auto space-y-5 md:w-2/3 ">
                                <div class=" relative flex flex-col gap-4">
                                    <div>
                                        O seu email atual é <span className="font-semibold text-black">teste@gmail.com</span>
                                    </div>
                                    <div className="relative">
                                        <label for="newemail">
                                            Novo Email
                                        </label>
                                        <input
                                            type="email"
                                            id="newemail"
                                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                            name="newemail"
                                            placeholder="Escreva o seu novo Email" />
                                    </div>
                                    <div className="flex w-full mt-2 justify-end">
                                        <button
                                            type="submit"
                                            className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                            Alterar Email
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div class="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                            <h2 class="max-w-sm mx-auto md:w-4/12 text-gray-800">
                                Alterar Password
                            </h2>
                            <div class="max-w-sm mx-auto space-y-5 md:w-2/3 ">
                                <div class=" relative flex flex-col gap-4">
                                    <div className="relative">
                                        <label for="oldpassword">
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
                                        <label for="newpassword">
                                            Nova Password
                                        </label>
                                        <input
                                            type="password"
                                            id="newpassword"
                                            className=" rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition ease-in duration-200 hover:bg-gray-50"
                                            name="newpassword"
                                            placeholder="Escreva a nova Password" />
                                    </div>
                                    <div className="flex w-full mt-2 justify-end">
                                        <button
                                            type="submit"
                                            className="py-2.5 px-4 text-orange-400 border-orange-400 border hover:bg-orange-400 hover:text-white w-fit transition ease-in duration-200 text-center text-sm font-semibold shadow-md focus:outline-none rounded-lg ">
                                            Alterar Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div class="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                            <h2 class="max-w-sm mx-auto md:w-4/12 text-gray-800">
                                Eliminar Conta
                            </h2>
                            <div class="max-w-sm mx-auto space-y-5 md:w-2/3 ">
                                <div class=" relative flex flex-col gap-4">
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
            </section>
        </>
    );
}





