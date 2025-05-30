GRUPO:
Bruno Veronesi Silvestre,
Elias Henrique Felix Gomes,
Henrique Carlos Castilho Mangueira



README - Plataforma de Aluguel de Ferramentas

Descrição 
API para um sistema de aluguel de ferramentas, desenvolvida com Node.js, Express e MongoDB. Permite o gerenciamento de usuários, ferramentas e reservas.
Funcionalidades 
•	Cadastro e autenticação de usuários
•	CRUD completo de ferramentas disponíveis
•	Sistema de reservas com datas de início e fim
•	API RESTful com endpoints documentados


Softwares para funcionamento correto:
INSOMNIA
NODE JS
VISUAL STUDIO CODE
MONGODB COMPASS


Passo a passo:


Abra o MongoDb Compass, e faça a conexão com o servidor, clicando no botão "Add New Connection".

Quando a outra tela aparecer, Na Aba de URI, no fim desse texto: "mongodb://localhost:27017" adicione isso no final: "/tool-rental" e depois clique em Save e Connect.

Abra os arquivos deste repositório no Visual Studio Code.

Abra o terminal dentro do Visual studio code e digite esse comando: "cd mongo".

Ainda dentro do terminal digite esse comando: "npm install express mongoose nodemon".

Depois digite mais esse código dentro do terminal: "node server.js".

Após isso Abra o INSOMNIA.

Dentro do INSOMNIA clique no botão "Send a Request".

Na aba que vai abrir você vai colocar esse endreço : "http://localhost:3000/api/users" para fazer requisições na tabela de usuarios.

Esse endereço: "http://localhost:3000/api/tools" para requisições na tabela de ferramentas.

Esse endereço: "http://localhost:3000/api/reservations" para requisições na tabela de reservas.

Para adicionar dados clique no botão "Body" e selecione a opção JSON.

Temos alguns dados ja prontos para usar de teste:

USUARIOS

{
   "nome": "João Silva",
   "email": "joao@email.com",
   "senha": "123456",
   "telefone": "(11) 99999-1111",
   "endereco": {
     "rua": "Rua das Flores, 123",
     "cidade": "São Paulo",
     "cep": "01234-567",
     "estado": "SP"
   }
}


FERRAMENTAS

{
   "nome": "Martelo de Unha",
   "categoria": "Manual",
   "descricao": "Martelo de unha para carpintaria e construção civil",
   "marca": "Stanley",
   "modelo": "STHT51512",
   "preco": 15.50,
   "estado": "Usado - Bom",
   "especificacoes": {
     "peso": "450g",
     "dimensoes": "32cm x 12cm x 4cm"
   }
 }


RESERVAS

{
   "usuarioId": "68378d3c30a91a6ec08314e2",
   "ferramentaId": "68378e6f30a91a6ec08314ed",
   "dataInicio": "2025-05-29",
   "dataFim": "2025-06-02",
   "observacoes": "Preciso para reforma do banheiro"
}


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Para Atulizar um dado se dever colocar o Id do usuario, ferramenta ou reserva no fim do endereço, exemplo: "http://localhost:3000/api/users/-NUMERO ID-"
O mesmo deve ser feito para função de deletar.



