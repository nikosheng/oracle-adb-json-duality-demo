const oracledb = require('oracledb');


const result = async () => {
    connection = await oracledb.getConnection({
        user: 'ADMIN',
        password: 'xx',
        configDir: '/home/opc/showcase-ecommerce-store/wallet',
        walletLocation: '/home/opc/showcase-ecommerce-store/wallet',
        walletPassword: 'xx',
        connectString: "sgadw_low"
      });

    const result = await connection.execute(
        `select stock_number from OCWECOMMERCE fetch first 1 rows only`
      );
    console.log(result.rows);
    connection.close();
}

result();