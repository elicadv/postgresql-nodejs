const Client = require ('pg').Client
const cliente = new Client({
    user: "postgres",
    password: "279719",
    host:"127.0.0.1",
    port: 5432,
    database:"CarrosNovo"
})

/*Maneira mais simples de criar uma conexão com o banco */

/*cliente.connect()// abri conexão com o banco
cliente.query("select * from carrosnovo")//execua a query SQl
.then(results => {//joga o resultado da query no results
    const resultado = results.rows//joga as linhas do rsultado na constante resultado
    console.table(resultado)//exibi resultado no console
})
.finally(()=> cliente.end())//fecha a conexão*/
//getCarros()
//insCarros("Hyundai", "Hb20")
delCarro("Hb20")

async function getCarros(){//função assincrona de leitura
try{  
    console.log("iniciando a conexão.")
    await cliente.connect()//inicia a conexão
    console.log("Conexão bem sucedida")
    const resultado = await cliente.query("select * from carrosnovo")//executa as querys
    console.table(resultado.rows)//lista as tabelas no terminal
}
catch (ex){
    console.log('Ocorreu erro no getCarros. Erro' + ex)
}
finally{
    await cliente.end()
    console.log('Cliente desconectado')
}
}

async function insCarros(marca, modelo){//função assincrona de inserção
    try{  
        console.log("iniciando a conexão.")
        await cliente.connect()
        console.log("Conexão bem sucedida")
        await cliente.query('insert into carrosnovo("marca", "modelo") values ('+"'"+marca+"', '" +modelo+"');")
        console.log("Valor inserido com sucesso")

        const resultado = await cliente.query("select * from carrosnovo")
        console.table(resultado.rows)
    }
    catch (ex){
        console.log('Ocorreu erro no getCarros. Erro' + ex)
    }
    finally{
        await cliente.end()
        console.log('Cliente desconectado')
    }
    }
    async function delCarro(modelo){//função assincrona de deletar
        try{  
            console.log("iniciando a conexão.")
            await cliente.connect()
            console.log("Conexão bem sucedida")
            await cliente.query("delete from carrosnovo where modelo = '"+modelo+"';")
            console.log("Valor removido da tabela")
    
            const resultado = await cliente.query("select * from carrosnovo")
            console.table(resultado.rows)
        }
        catch (ex){
            console.log('Ocorreu erro no getCarros. Erro' + ex)
        }
        finally{
            await cliente.end()
            console.log('Cliente desconectado')
        }
    }