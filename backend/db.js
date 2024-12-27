const mysql = require('mysql2');

const connexionDB = mysql.createConnection({
    host: 'h3vir.h.filess.io',
    user: 'timesEuropeus_trunkmark',
    password: '40280e5b229a16526d64ec2beabd3d9827ad2a2d',
    database: 'timesEuropeus_trunkmark'
});

connexionDB.connect((erro) => {
    if(erro) {
        console.log(`Falha ao se conectar ao MySQL`);
    } else {
        console.log(`Conexão efetuada com sucesso`);
    }
})

module.exports = connexionDB;