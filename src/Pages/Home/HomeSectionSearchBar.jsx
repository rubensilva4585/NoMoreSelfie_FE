import SearchServices from "../Search/SearchServices";

export default function HomeSectionSearchBar() {
  const regions = [
    { name: "Aveiro" },
    { name: "Beja" },
    { name: "Braga" },
    { name: "Bragança" },
    { name: "Castelo Branco" },
    { name: "Coimbra" },
    { name: "Évora" },
    { name: "Faro" },
    { name: "Guarda" },
    { name: "Leiria" },
    { name: "Lisboa" },
    { name: "Portalegre" },
    { name: "Porto" },
    { name: "Santarém" },
    { name: "Setúbal" },
    { name: "Viana do Castelo" },
    { name: "Vila Real" },
    { name: "Viseu" },
  ];

  const categories = [
    { name: "Casamento" },
    { name: "Fotografia" },
    { name: "Edição de Vídeo" },
  ];

  return (
    <>
      <section class="relative bg-gray-100/50 overflow-x-hidden" id="sobre">
        
        <div class="absolute bottom-0 right-0 mt-[100px] ml-[-50%] h-[200%] w-[50%] rounded-l-[50%] overflow-hidden">
          <img src='../../../images/wallsearch.jpg' alt="" className="bottom-0 absolute" />
        </div>

        <div className="container mx-auto px-3 md:px-12 py-20">
          <div className="flex items-end justify-between mb-12 header">
            <div className="flex flex-col justify-between gap-8 mb-12 header">
              <div className="title">
                <p className="mb-4 text-4xl font-bold text-gray-800">
                  Fornecedores
                </p>
                <p className="text-2xl font-light text-gray-400">
                  Procure o que precisa na nossa lista de fornecedores
                </p>
              </div>

              <SearchServices Regions={regions} Categories={categories} />

            </div>
          </div>

        </div>
      </section>
    </>
  )
}
