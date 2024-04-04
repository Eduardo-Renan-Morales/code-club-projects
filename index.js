/* 
- Query params => meusite.com/users?nome=eduardo&age=27  // FILTROS
- Route params  => /users2               //  BUSCAR,DELETAR,OU ATUALIZAR  ALGO ESPECIFICO.
- request Body  => {"name":"eduardo","age":}

- GET    -   Leitura.    => Buscar informações no Back-end
- POST   -  Criação.     => Criar informações no Back-end
- PUT    -  Atualização. => Alterar/ Atualizar informações no bach-end
- PATCH  -  Atualização  => Parcial. Alterar/ Atualizar informações no bach-end
- DELETE -  Deleção.     => Deletar informações no back-end

- Middleware             => INTERCEPTAR => Tem poder de parar ou de alterar dados da requisição.

*/



const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())


const users = []

const checkUserId = (request, response, next) =>{
    const { id } = request.params
    const  index = users.findIndex(user=> user.id === id)
    
    if ( index < 0) {
        return response.status(404).json({error: "User not foud"})
    }
    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})


app.put('/users/:id',checkUserId,(request, response) => {
    const {name, age } = request.body
    const index =  request.userIndex
    const id = request.userId
    const updateUser = {id, name, age }

    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id',checkUserId, (request, response) => {
    const index =  request.userIndex

        users.splice(index,1)

    return response.status(204).json()
})



app.listen(port, () => {
    console.log('server started on port 3000 ${port}')
})


